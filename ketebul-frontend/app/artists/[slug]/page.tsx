import { notFound } from "next/navigation";
import ArtistProfile from "./ArtistProfile";

const artists = [
  { name: 'Winyo', image: '/artists/winyo.jpg', slug: 'winyo', bio: 'Born Shiphton Onyango, Winyo adopted his artistic name from his grandfather. His music is a blend of traditional Luo melodies with modern jazz and soul.' },
  { name: 'Ogoya Nengo', image: '/artists/ogoya.jpg', slug: 'ogoya-nengo', bio: 'Ogoya Nengo was born Anastasia Oluoch in the 1930s. A legendary folk singer from the shores of Lake Victoria.' },
  { name: 'Makadem', image: '/artists/makadem.jpg', slug: 'makadem', bio: 'Makadem, also known as the Ohanglaman, is a powerhouse of African rhythm and master of the Nyatiti.' },
  { name: 'Bado', image: '/artists/bado.jpg', slug: 'bado', bio: 'Born Mohamed Said Ngana, Bado is a multi-instrumentalist from coastal Kenya.' },
  { name: 'Ontiri Bikundo', image: '/artists/ontiri.jpg', slug: 'ontiri-bikundo', bio: 'Ontiri Bikundo was born in Kisii and is a master of the Obokano.' },
  { name: 'Olith Ratego', image: '/artists/olith.jpg', slug: 'olith-ratego', bio: 'Olith Ratego is a singer and songwriter who specializes in "dodo" rhythms.' },
  { name: 'Gargar', image: '/artists/gargar.jpg', slug: 'gargar', bio: 'Gargar is a group of Kenyan women of Somali origin from Garissa.' },
  { name: 'Anyango Nyar Siaya', image: '/artists/nyar.jpg', slug: 'anyango-nyar-siaya', bio: "Anyango is the world's first female Nyatiti player." },
];

// ✅ Next.js 15: params must be a Promise
export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = artists.find(a => a.slug === slug);

  if (!artist) return notFound();

  return <ArtistProfile artist={artist} />;
}