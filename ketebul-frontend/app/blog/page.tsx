// app/blog/page.tsx
import "./blog.css";

const posts = [
  {
    title: "Inside the Studio: Recording Benga Revival",
    image: "/blog/benga-revival.jpg",
    excerpt:
      "Go behind the scenes of Ketebul’s latest recording sessions breathing new life into classic Benga tunes...",
  },
  {
    title: "Artist Spotlight: Winyo",
    image: "/blog/winyo.jpg",
    excerpt:
      "From soulful vocals to storytelling — explore Winyo’s journey with Ketebul Music and his impact on East African sound...",
  },
  {
    title: "Cultural Exchange in Addis Ababa",
    image: "/blog/addis-exchange.jpg",
    excerpt:
      "Highlights from our recent residency with Ethiopian musicians fostering regional music dialogue and collaboration...",
  },
];

export default function BlogPage() {
  return (
    <main className="blog-page">
      <h1>Ketebul Blog</h1>
      <div className="blog-grid">
        {posts.map((post, idx) => (
          <div className="blog-card" key={idx}>
            <img src={post.image} alt={post.title} />
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a className="read-more" href="#">Read more →</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
