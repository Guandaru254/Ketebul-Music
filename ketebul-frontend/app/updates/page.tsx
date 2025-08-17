'use client';

import Image from 'next/image';
import { motion, Variants, Transition } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Framer Motion variants for item entry animation
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      delay: i * 0.2,
      duration: 0.8,
    } as Transition,
  }),
};

// Framer Motion variants for item hover animation
const hoverVariants: Variants = {
  highlight: {
    boxShadow: "0 0 0 3px rgba(253, 224, 71, 0.6)",
    borderColor: "rgba(253, 224, 71, 0.6)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18
    } as Transition,
  }
};

// Separate component for Image with Skeleton Loader
function ImageLoader({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`
          object-cover object-center
          transition-opacity duration-500 ease-in-out
          ${loading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          setLoading(false);
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/placeholder.png"; 
        }}
        priority={false}
      />
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading Image...</span>
        </div>
      )}
    </div>
  );
}

// Define the structure of an update item based on your actual console output
interface PostItem {
  id: number;
  documentId?: string;
  title: string;
  // content is now an array of rich text blocks
  content: Array<{ type: string; children?: Array<{ type: string; text?: string }> }>;
  link?: string;
  image?: {
    data: {
      attributes: {
        url: string;
      };
    } | null;
  };
  created?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Helper function to extract plain text from Strapi rich text content array
const extractTextFromStrapiBlocks = (blocks: PostItem['content']): string => {
  if (!Array.isArray(blocks)) {
    // Fallback for unexpected content type, attempt to convert to string
    console.warn("Strapi content is not an array, attempting to stringify:", blocks);
    return String(blocks);
  }

  let fullText = '';
  blocks.forEach(block => {
    // Check if the block is a paragraph and has children
    if (block.type === 'paragraph' && Array.isArray(block.children)) {
      block.children.forEach(child => {
        // If it's a text child, append its text
        if (child.type === 'text' && child.text) {
          fullText += child.text;
        }
      });
      fullText += '\n\n'; // Add double newline for paragraph separation
    }
    // Add more conditions here for other block types (e.g., 'list', 'heading') if needed
    // Example for a simple heading:
    // if (block.type === 'heading' && Array.isArray(block.children)) {
    //   block.children.forEach(child => {
    //     if (child.type === 'text' && child.text) {
    //       fullText += `## ${child.text}\n`; // Markdown-style heading
    //     }
    //   });
    // }
  });
  return fullText.trim();
};


export default function UpdatesPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching from API URL:", `${STRAPI_API_URL}/posts?populate=image&sort=created:desc`);
        const response = await fetch(`${STRAPI_API_URL}/posts?populate=image&sort=created:desc`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Raw API Response Data:", data);
        setPosts(data.data); // Strapi typically wraps response in a 'data' array
      } catch (e: any) {
        console.error("Failed to fetch posts:", e);
        setError(`Failed to load updates: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [STRAPI_API_URL]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-josefin-sans flex items-center justify-center">
        <p className="text-xl text-yellow-300">Loading updates...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-josefin-sans flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-josefin-sans flex items-center justify-center">
        <p className="text-xl text-gray-400">No updates found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-josefin-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        {posts.map((post, index) => {
          console.log(`Processing Post ${index}:`, post); 
          
          // Access properties directly from the post object
          const imageUrl = post.image?.data?.attributes?.url;
          const postTitle = post.title;
          // Use the helper function to get renderable content
          const postContent = extractTextFromStrapiBlocks(post.content); 
          const postLink = post.link;
          const postDate = post.created;

          // Only render if a title is present
          if (!postTitle) {
            console.warn(`Skipping post ${post.id} due to missing title.`);
            return null; // Skip rendering this post
          }

          return (
            <motion.div
              key={post.id}
              className="bg-gray-800 rounded-lg shadow-xl flex flex-col md:flex-row items-center overflow-hidden cursor-pointer border-2 border-transparent relative group"
              initial="hidden"
              whileInView="visible"
              whileHover="highlight"
              viewport={{ once: false, amount: 0.1 }}
              variants={itemVariants}
              custom={index}
            >
              {imageUrl && (
                <div className="relative w-full h-48 md:w-1/3 md:h-auto flex-shrink-0 overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                  <ImageLoader src={`${STRAPI_API_URL.replace('/api', '')}${imageUrl}`} alt={postTitle} />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-800 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow items-start md:w-2/3">
                <div className="text-sm font-medium text-yellow-300 mb-2">
                  {postDate ? new Date(postDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'No date'}
                </div>
                <h2 className="text-2xl font-semibold text-white text-left leading-snug mb-3">
                  {postTitle}
                </h2>
                <p className="text-gray-300 text-base leading-relaxed flex-grow line-clamp-4 whitespace-pre-wrap">
                  {postContent}
                </p>
                {postLink && (
                  <a
                    href={postLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center text-yellow-400 hover:text-yellow-200 font-semibold transition-colors duration-200 group-hover:translate-x-1"
                  >
                    {postLink.includes('youtube') ? 'Watch Full Episode →' : 'Read Full Article →'}
                    <svg className="ml-2 w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
