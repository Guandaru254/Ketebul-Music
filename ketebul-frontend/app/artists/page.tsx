// app/artists/page.tsx
import Image from "next/image";
import "./artists.css";

const artists = [
  {
    name: "Sauti Sol",
    image: "/artists/sauti-sol.jpg",
    bio: "A celebrated Kenyan Afro-pop band blending harmony and modern rhythms.",
  },
  {
    name: "Ayub Ogada",
    image: "/artists/ayub-ogada.jpg",
    bio: "A legendary nyatiti player known for fusing traditional Luo music with global sounds.",
  },
  {
    name: "Muthoni Drummer Queen",
    image: "/artists/muthoni.jpg",
    bio: "Artist, entrepreneur, and cultural innovator pioneering Nairobi’s urban sound.",
  },
  // Add more as needed
];

export default function ArtistsPage() {
  return (
    <main className="artists-page">
      <h1>Our Artists</h1>
      <div className="artist-grid">
        {artists.map((artist, index) => (
          <div className="artist-card" key={index}>
            <div className="image-wrapper">
              <Image
                src={artist.image}
                alt={artist.name}
                width={300}
                height={300}
                className="artist-img"
              />
            </div>
            <h2>{artist.name}</h2>
            <p>{artist.bio}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
