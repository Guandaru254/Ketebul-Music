import { notFound } from "next/navigation";
import ArtistProfile from "./ArtistProfile";

// FULL ARTISTS ARRAY
const artists = [
  { name: "Winyo", image: "/artists/winyo.jpg", bio: "Born Shiphton Onyango...", slug: "winyo" },
  { name: "Ogoya Nengo", image: "/artists/ogoya.jpg", bio: "Ogoya Nengo was born...", slug: "ogoya-nengo" },
  { name: "Makadem", image: "/artists/makadem.jpg", bio: "Makadem also known...", slug: "makadem" },
  { name: "Bado", image: "/artists/bado.jpg", bio: "Hailing from...", slug: "bado" },
  { name: "Ontiri Bikundo", image: "/artists/ontiri.jpg", bio: "Ontiri was born...", slug: "ontiri-bikundo" },
  { name: "Olith Ratego", image: "/artists/olith.jpg", bio: "Olith was born...", slug: "olith-ratego" },
  { name: "Gargar", image: "/artists/gargar.jpg", bio: "Gargar is a group...", slug: "gargar" }
];

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = artists.find(a => a.slug === params.slug);

  if (!artist) return notFound();

  return <ArtistProfile artist={artist} />;
}
