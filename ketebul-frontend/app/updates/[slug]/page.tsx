// app/updates/[slug]/page.tsx
import { client, urlFor } from '../../../lib/api';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function UpdateDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const query = `*[_type == "update" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug: resolvedParams.slug });

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-gray-400">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <Link href="/updates" className="text-[#FFD700] hover:underline">← Back to Updates</Link>
      </div>
    );
  }

  const src = post.mainImage ? urlFor(post.mainImage).width(1200).url() : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/updates" className="inline-block text-[#FFD700] hover:text-[#E5BE00] font-bold mb-8 transition-colors">
          ← Back to Updates
        </Link>
        {src && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-800 mb-8">
            <Image src={src} alt={post.title} fill className="object-cover" priority unoptimized />
          </div>
        )}
        <span className="text-sm uppercase tracking-widest text-[#FFD700] font-semibold">{post.date}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-6 leading-tight">{post.title}</h1>
        {post.venue && <p className="text-sm text-gray-400 mb-6"><strong>Venue:</strong> {post.venue}</p>}
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
          {post.content ? <PortableText value={post.content} /> : <p className="italic text-gray-500">No content available.</p>}
        </div>
      </div>
    </div>
  );
}