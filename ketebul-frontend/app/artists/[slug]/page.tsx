import { notFound } from "next/navigation";
import ArtistProfile from "./ArtistProfile";

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  deezer?: string;
  audiomack?: string;
}

export interface DiscographyItem {
  title: string;
  year: string;
  type: 'Album' | 'EP' | 'Single' | 'Compilation';
}

export interface Artist {
  name: string;
  realName?: string;
  origin?: string;
  genres: string[];
  instruments: string[];
  image: string;
  slug: string;
  tagline: string;
  bioSections: {
    title: string;
    content: string;
  }[];
  albumsAndEPs?: DiscographyItem[];
  singles?: DiscographyItem[];
  streamingLinks: StreamingLinks;
}

const artists: Artist[] = [
  {
    name: 'Winyo',
    realName: 'Shiphton Onyango',
    origin: 'Lake Victoria region, Western Kenya',
    genres: ['Benga', 'Afro-Jazz', 'Luo Folk', 'Afro-Fusion'],
    instruments: ['Acoustic Guitar', 'Vocals'],
    image: '/artists/winyo.jpg',
    slug: 'winyo',
    tagline: 'A custodian of Benga music bringing ancient Luo harmonies into modern Afro-jazz.',
    bioSections: [
      {
        title: 'Origins & Artistic Name',
        content: `Born Shiphton Onyango on the shores of Lake Victoria, Kenya, Winyo adopted his stage name from the Luo word for "bird". The name reflects his vocal style—mellow, expressive, and soaring with high sensitivity over acoustic guitar arrangements. Growing up steeped in traditional Luo folk music, his sound borrows heavily from the repetitive, melodic guitar styles that mirror the 8-string Nyatiti lyre.`
      },
      {
        title: 'Musical Evolution & International Acclaim',
        content: `Winyo gained major international recognition when he was shortlisted twice for the prestigious Radio France Internationale (RFI) Discoveries competition in 2010 and 2011. His critically acclaimed debut album, "Benga Blues" (2012), firmly established him as an ambassador for modern Kenyan music. Since then, he has performed across the globe, including at the Smithsonian Folklife Festival, the US Library of Congress, and major festivals across Europe.`
      },
      {
        title: 'Collaborations & Legacy',
        content: `Beyond his solo work, Winyo is a producer, actor, and photographer who collaborates with cultural preservation efforts like Singing Wells. Signed under Ketebul Music and Abubilla Music, he continues to evolve by blending traditional Dholuo lyrics with modern contemporary production, collaborating with artists like Fancy Fingers (Sauti Sol).`
      }
    ],
    albumsAndEPs: [
      { title: 'Pole Sana (with Samuel Cosmic & BHANA)', year: '2026', type: 'EP' },
      { title: 'Jawaya Jathum (with Fancy Fingers)', year: '2025', type: 'Album' },
      { title: 'Sazile', year: '2020', type: 'EP' },
      { title: 'Yote Yote', year: '2014', type: 'Album' },
      { title: 'Benga Blues', year: '2012', type: 'Album' }
    ],
    singles: [
      { title: 'Abiro (Love Wins, Always) (with Baptiste Caffrey)', year: '2026', type: 'Single' },
      { title: 'Mapenzi Sumu', year: '2026', type: 'Single' },
      { title: 'The King (with Niraj Naik)', year: '2026', type: 'Single' },
      { title: 'Yuapi ?', year: '2026', type: 'Single' },
      { title: 'Duog Dala (with Estère & Fancy Fingers)', year: '2025', type: 'Single' },
      { title: 'Pokunena (with Fancy Fingers)', year: '2025', type: 'Single' },
      { title: 'Maria (with Fancy Fingers)', year: '2025', type: 'Single' },
      { title: 'Kendo (with ELEVEN)', year: '2024', type: 'Single' },
      { title: 'Running for Gold (with Edward Kamau)', year: '2024', type: 'Single' },
      { title: 'Suna (Da Africa Deep Remixes)', year: '2022', type: 'Single' },
      { title: 'Africities Kisumu 2022', year: '2022', type: 'Single' }
    ],
    streamingLinks: {
      spotify: 'https://open.spotify.com/artist/0xYZnLkJHs6y9Ts7Yq2C1C',
      appleMusic: 'https://music.apple.com/ke/artist/winyo/274558737',
      youtube: 'https://www.youtube.com/@winyomusic',
      deezer: 'https://www.deezer.com/artist/winyo',
      audiomack: 'https://audiomack.com/winyo-1'
    }
  },
  {
    name: 'Ogoya Nengo',
    realName: 'Anastasia Oluoch',
    origin: 'Magoya village, near Rang\'ala, Siaya County, Kenya',
    genres: ['Dodo', 'Luo Folk', 'Afro-Folk', 'Experimental Folk'],
    instruments: ['Lead Vocals'],
    image: '/artists/ogoya.jpg',
    slug: 'ogoya-nengo',
    tagline: 'The legendary matriarch of Luo Dodo music, carrying decades of heritage from the shores of Lake Victoria.',
    bioSections: [
      {
        title: 'Origins & Early Life',
        content: `Born Anastasia Oluoch around 1943 in Magoya village near Rang'ala, Siaya County, Ogoya Nengo grew up in a family of traditional singers and musicians. From a young age, she enchanted local communities with her powerful voice and mastery of Dodo—a traditional praise-singing style performed primarily by Luo women to celebrate notable figures, spread news, and preserve community oral histories.`
      },
      {
        title: 'The Dodo Legacy & Rise to Prominence',
        content: `Her stage name "Ogoya Nengo" roughly translates to "the prized one" or "the expensive one," earned due to the high esteem and substantial gifts her commanding performances demanded. Over a career spanning more than six decades, she led the Dodo Women's Group, keeping the acoustic and percussive vocal tradition alive through changing musical eras while mentoring generations of folk musicians across Western Kenya.`
      },
      {
        title: 'International Acclaim & Experimental Projects',
        content: `In the 2010s, Ogoya Nengo achieved global prominence through recordings with The Singing Wells project and international releases on labels like Honest Jon's and Pingipung. Her collaborative work extended beyond traditional borders, notably partnering with German producer Sven Kacirek and percussionist Olith Ratego in the experimental electronic-folk project Odd Okoddo, performing at major global festivals including Sauti za Busara and Oerol.`
      }
    ],
    albumsAndEPs: [
      { title: 'Palagoma (with Odd Okoddo)', year: '2026', type: 'Album' },
      { title: 'On Mande', year: '2018', type: 'Album' },
      { title: 'On Mande Versions', year: '2017', type: 'EP' },
      { title: 'Rang\'ala: New Recordings from Siaya County', year: '2014', type: 'Album' },
      { title: 'Matatu', year: '2012', type: 'Album' }
    ],
    singles: [
      { title: 'Palagoma', year: '2026', type: 'Single' },
      { title: 'Bara', year: '2026', type: 'Single' }
    ],
    streamingLinks: {
      spotify: 'https://open.spotify.com/artist/3sUKddk4dvry1RvimGeqJ6',
      appleMusic: 'https://music.apple.com/us/artist/ogoya-nengo-and-the-dodo-womens-group/940386870',
      youtube: 'https://www.youtube.com/results?search_query=Ogoya+Nengo',
      deezer: 'https://www.deezer.com/artist/6877861'
    }
  },
  {
    name: 'Makadem',
    realName: 'Charles Odero Ademson',
    origin: 'Siaya County, Western Kenya',
    genres: ['Benga Beats', 'Nyatiti Jazz', 'NyatitiTronik', 'Afro-Dance', 'Ohangla'],
    instruments: ['Nyatiti (8-string lyre)', 'Kalimba', 'Vocals', 'Acoustic Guitar'],
    image: '/artists/makadem.jpg',
    slug: 'makadem',
    tagline: 'The "Ohanglaman" — a high-energy performer fusing ancient Nyatiti lyre rhythms with modern electronic beats, Afro-jazz, and witticism.',
    bioSections: [
      {
        title: 'Origins & The "Ohanglaman"',
        content: `Born Charles Odero Ademson in Siaya County, Makadem began his musical journey in Nairobi's vibrant urban music scene. Early in his career, he earned the nickname "Mr. Lolwe" and later "The Ohanglaman" due to his explosive stage energy and deep roots in Ohangla rhythms—the energetic Luo percussive dance music. His witty, humorous, and socially conscious lyrics address contemporary socio-economic realities with infectious warmth.`
      },
      {
        title: 'Nyatiti Mastery & Innovation',
        content: `A true multi-instrumentalist, Makadem adopted the 8-string Luo Nyatiti lyre, modernizing its tradition by fusing it with contemporary genres. He pioneered "NyatitiTronik" and "Nyatiti Jazz"—groundbreaking styles that blend raw traditional string work with electronic dance beats, Afrobeat, and funk. His electric stage presence and commanding vocal delivery have earned him acclaim as one of Kenya's most dynamic live performers.`
      },
      {
        title: 'Global Impact & Discography',
        content: `Makadem has represented Kenyan music on major international stages across Europe, North America, and Africa, performing at WOMEX, the Smithsonian Folklife Festival, and numerous cultural showcases. Signed with Ketebul Music and featured across international record labels, his discography spans celebrated releases including "Ohanglaman" (2005), "Koko Rio" (2015), and "Unplugged" (2024).`
      }
    ],
    albumsAndEPs: [
      { title: 'Unplugged', year: '2024', type: 'Album' },
      { title: 'Highlife World Series: Kenya', year: '2015', type: 'Album' },
      { title: 'Koko Rio', year: '2015', type: 'Album' },
      { title: 'Ohanglaman', year: '2008', type: 'Album' }
    ],
    singles: [
      { title: 'Vitendo', year: '2026', type: 'Single' },
      { title: 'Halua (Live)', year: '2024', type: 'Single' },
      { title: 'Igobi Keke (Max Doblhoff RMX)', year: '2024', type: 'Single' },
      { title: 'Obon\'go Bless Me', year: '2023', type: 'Single' },
      { title: 'Hot Like a Fire', year: '2023', type: 'EP' }
    ],
    streamingLinks: {
      spotify: 'https://open.spotify.com/artist/0mbhGA9S4pADQEqouZqqgL',
      appleMusic: 'https://music.apple.com/ke/artist/makadem/261261415',
      youtube: 'https://www.youtube.com/results?search_query=Makadem',
      deezer: 'https://www.deezer.com/artist/4172551'
    }
  },
  {
    name: 'Mr. Bado Kuhusafi',
    realName: 'Mohamed Said Ngana',
    origin: 'Watamu, Malindi, Coastal Kenya',
    genres: ['Mwanzele', 'Chakacha', 'Taarab', 'Afro-Pop', 'Swahili Fusion'],
    instruments: ['Keyboard', 'Acoustic Guitar', 'Vocals', 'Percussion'],
    image: '/artists/bado.jpg',
    slug: 'bado',
    tagline: 'A coastal Kenyan multi-instrumentalist, vocalist, and producer weaving rich Swahili poetry with modern Taarab and Mwanzele rhythms.',
    bioSections: [
      {
        title: 'Musical Lineage & Coastal Roots',
        content: `Born Mohamed Said Ngana in the coastal town of Watamu near Malindi, Mr. Bado comes from a deeply musical lineage. He is the son of the legendary Mwanzele composer Nyerere wa Konde. Raised surrounded by the distinct sounds of the Swahili coast, Bado developed a passion for traditional rhythms such as Mwanzele, Chakacha, and Taarab from an early age.`
      },
      {
        title: 'Sound & Production Mastery',
        content: `Bado is a versatile multi-instrumentalist, vocalist, and studio engineer. His signature sound blends traditional Mijikenda and Swahili acoustic instruments with modern keyboards, syncopated afro-pop grooves, and lilting Swahili poetry. Through his studio, Bado Records (Bado Kuhusafi), in Watamu, he serves as a pivotal producer and mentor for emerging coastal talent.`
      },
      {
        title: 'Performances & Cultural Ambassadorship',
        content: `Over his career, Bado has taken coastal Kenyan music to international audiences, performing at the Smithsonian Folklife Festival, the Library of Congress, and major venues across East Africa and Europe. Collaborating with organizations like Ketebul Music and Singing Wells, he remains a champion for preserving coastal musical heritage while innovating modern Swahili pop.`
      }
    ],
    albumsAndEPs: [
      { title: 'Ladha', year: '2026', type: 'Album' },
      { title: 'Kazi Ni Mimba', year: '2026', type: 'Album' },
      { title: 'Album 3', year: '2026', type: 'Album' },
      { title: 'Na Bado', year: '2026', type: 'Album' }
    ],
    singles: [
      { title: 'Luwa', year: '2026', type: 'Single' },
      { title: 'Mbola (Remix)', year: '2026', type: 'Single' }
    ],
    streamingLinks: {
      spotify: 'https://open.spotify.com/artist/6FnCZBoUnhKJvjdixMPZh9',
      appleMusic: 'https://music.apple.com/us/artist/mr-bado-kuhusafi/1840443776',
      youtube: 'https://www.youtube.com/@Mrbadokuhusafi',
      deezer: 'https://www.deezer.com/artist/8537210'
    }
  },
  {name: 'Ontiri Bikundo',
      realName: 'Ronald Ontiri Onchuru',
      origin: 'Kisii County, Nyanza, Kenya',
      genres: ['Gusii Folk', 'Obokano Music', 'Afro-Folk', 'East African Traditional'],
      instruments: ['Obokano (Gusii Bass Lyre)', 'Vocals'],
      image: '/artists/ontiri.jpg',
      slug: 'ontiri-bikundo',
      tagline: 'Master of the Obokano — preserving Gusii oral heritage through the booming resonance of Kenya’s ancient bass lyre.',
      bioSections: [
        {
          title: 'Origins & Self-Taught Mastery',
          content: `Born Ronald Ontiri Onchuru in 1974 in Kisii County, Ontiri Bikundo taught himself to play the Obokano—the massive 8-stringed bass lyre central to the musical tradition of the Gusii community. Known for its powerful low-frequency resonance and resonant frame, the instrument requires immense skill and physical endurance to play, earning Ontiri distinction as one of its foremost modern custodians.`
        },
        {
          title: 'Storytelling & Social Impact',
          content: `Ontiri’s music serves as both commentary and cultural preservation. Produced by Tabu Osusa under Ketebul Music, his deep vocal delivery and rhythmic obokano plucking address critical contemporary issues including HIV/AIDS awareness, ethnic harmony, social morality, marriage, and love. Iconic tracks like "Ekayaba" and "Echirani" stand as widely celebrated stories across East Africa.`
        },
        {
          title: 'Global Preservation & Recordings',
          content: `Ontiri Bikundo has represented Kenyan folk traditions globally, performing at international forums including the Smithsonian Folklife Festival and feature showcases with Singing Wells and Ketebul Music. His recorded works, such as "Ekayaba" (2010) and "Ontiri Bikundo (Live)" (2022), document the endangered art of the Obokano for future generations.`
        }
      ],
      albumsAndEPs: [
        { title: 'Ontiri Bikundo (Live)', year: '2022', type: 'Album' },
        { title: 'Ekayaba', year: '2010', type: 'Album' }
      ],
      singles: [
        { title: 'Mbwate Buya', year: '2025', type: 'Single' },
        { title: 'Obotaka', year: '2010', type: 'Single' },
        { title: 'Echirani', year: '2010', type: 'Single' },
        { title: 'Mama', year: '2010', type: 'Single' },
        { title: 'Speedy Governor', year: '2010', type: 'Single' }
      ],
      streamingLinks: {
        spotify: 'https://open.spotify.com/artist/43zTI0yoBAKaloZAocKXGb',
        appleMusic: 'https://music.apple.com/ke/artist/ontiri-bukundo/1469950060',
        youtube: 'https://www.youtube.com/results?search_query=Ontiri+Bikundo',
        deezer: 'https://www.deezer.com/artist/OntiriBikundo'
      }
    },
    {
      name: 'Olith Ratego',
      realName: 'Musa Odhiambo Omondi',
      origin: 'Asere, Ugenya, Siaya County, Kenya',
      genres: ['Dodo Rhythms', 'Luo Folk', 'Afro-Folk', 'Ohangla Fusion'],
      instruments: ['Nyatiti (8-string lyre)', 'Ohangla Drums', 'Lead Vocals'],
      image: '/artists/olith.jpg',
      slug: 'olith-ratego',
      tagline: 'High-energy proponent of Luo Dodo rhythms, blending rich vocal improvisation with raw traditional instrumentation.',
      bioSections: [
        {
          title: 'Musical Roots & Early Influence',
          content: `Born Musa Odhiambo Omondi on December 26, 1974, in Asere village, Ugenya, Siaya County, Olith Ratego grew up immersed in the rich musical traditions of Nyanza. His passion for singing was sparked by his mother, a traditional Dodo singer, whose vocal improvisations and storytelling influenced his unique style.`
        },
        {
          title: 'Mastery of Dodo Rhythms',
          content: `Olith specializes in adapting Dodo—traditionally a female praise-singing genre—into a high-energy contemporary folk style. Armed with a soulful voice, the Nyatiti (8-stringed lyre), and traditional percussion, his music weaves stories of communal life, love, social reflection, and cultural pride.`
        },
        {
          title: 'International Reach & Ketebul Collaboration',
          content: `A core collaborator of Ketebul Music, Olith Ratego has performed across East Africa and Europe, frequently collaborating with artists like Ogoya Nengo and Sven Kacirek (Odd Okoddo). His discography includes seminal releases such as "Osuga" (2005) and "Olith Ratego (Live)" (2022).`
        }
      ],
      albumsAndEPs: [
        { title: 'Olith Ratego (Live)', year: '2022', type: 'Album' },
        { title: 'Osuga', year: '2005', type: 'Album' }
      ],
      singles: [
        { title: 'Jamaoko', year: '2022', type: 'Single' },
        { title: 'Nyiri Gi', year: '2022', type: 'Single' },
        { title: 'Awuoro - live', year: '2022', type: 'Single' },
        { title: 'Jomoko', year: '2022', type: 'Single' },
        { title: 'Juddi', year: '2005', type: 'Single' },
        { title: 'Osuga (Track)', year: '2005', type: 'Single' }
      ],
      streamingLinks: {
        spotify: 'https://open.spotify.com/artist/1YXEeME6PvKhLZO8Z8XPZA',
        appleMusic: 'https://music.apple.com/ke/artist/olith-ratego/1470130048',
        youtube: 'https://www.youtube.com/results?search_query=Olith+Ratego',
        deezer: 'https://www.deezer.com/artist/OlithRatego'
      }
    },
    {
      name: 'Gargar',
      realName: 'Bismillahi Gargar Group',
      origin: 'Garissa, North Eastern Region, Kenya',
      genres: ['Somali Folk', 'Afro-Pop', 'East African Traditional', 'Desert Blues'],
      instruments: ['Vocals', 'Hand Percussion', 'Acoustic Guitar'],
      image: '/artists/gargar.jpg',
      slug: 'gargar',
      tagline: 'Empowering Somali-Kenyan women through rich vocal harmonies, traditional rhythms, and social storytelling.',
      bioSections: [
        {
          title: 'Origins & Empowerment',
          content: `Formed in 2003 in Garissa, North Eastern Kenya, as part of the broader Bismillahi Gargar women's self-help group, Gargar derives its name from the Somali word meaning "joining together." The collective was created by local women to promote women's empowerment, preserve Somali cultural heritage, and support local community livelihoods through music, weaving, and economic solidarity.`
        },
        {
          title: 'National Recognition & Social Impact',
          content: `Gargar rose to national prominence in 2008 as finalists in Ketebul Music’s "Spotlight on Kenyan Music" program. Their signature track, "Aids Wadila" ("AIDS Kills"), used infectious traditional Somali vocal arrangements and dance rhythms to raise crucial public health awareness, earning them widespread acclaim across East Africa.`
        },
        {
          title: 'Global Outreach & Garissa Express',
          content: `In 2010, Gargar released their acclaimed studio album "Garissa Express" under Ketebul Music, blending traditional Somali chant and call-and-response vocal structures with modern instrumental arrangements. The group has represented Kenyan cultural diversity on prominent global stages, including the Kennedy Center and the Smithsonian Folklife Festival.`
        }
      ],
      albumsAndEPs: [
        { title: 'Garissa Express', year: '2010', type: 'Album' }
      ],
      singles: [
        { title: 'Aids Wadila', year: '2010', type: 'Single' },
        { title: 'Deshayaga', year: '2010', type: 'Single' },
        { title: 'Spotlight on Kenyan Music Vol. 5 (Feature)', year: '2008', type: 'Compilation' }
      ],
      streamingLinks: {
        spotify: 'https://open.spotify.com/artist/0FTZaMkWC1jQIGnu0eSYQr',
        appleMusic: 'https://music.apple.com/us/artist/gargar/1481384234',
        youtube: 'https://www.youtube.com/results?search_query=Gargar+',
        deezer: 'https://www.deezer.com/artist/1381295'
      }
    },
    {
      name: 'Anyango Nyar Siaya',
      realName: 'Eriko Mukoyama',
      origin: 'Tokyo, Japan / Siaya County, Kenya',
      genres: ['Nyatiti Fusion', 'Luo Folk', 'Afro-Japanese Fusion', 'World Music'],
      instruments: ['Nyatiti (8-string lyre)', 'Vocals', 'Percussion'],
      image: '/artists/anyango.jpg',
      slug: 'anyango-nyar-siaya',
      tagline: 'The world’s first female Nyatiti player — bridging Japanese roots and traditional Luo heritage through the sacred 8-string lyre.',
      bioSections: [
        {
          title: 'Breaking Tradition & Cultural Apprenticeship',
          content: `Born Eriko Mukoyama in Tokyo, Japan, Anyango made history by becoming the first woman ever permitted to learn and master the Nyatiti—an 8-stringed sacred lyre traditionally reserved exclusively for Luo men. Drawn to Kenyan traditional music, she traveled to Siaya County, where she studied under legendary master Okumu K'Odero, adopting the Luo name "Anyango Nyar Siaya" ("Anyango, Daughter of Siaya").`
        },
        {
          title: 'Global Performance & Musical Style',
          content: `Anyango's music fuses traditional Luo praise singing, fluent Dholuo poetry, and intricate Nyatiti plucking with global jazz, acoustic pop, and Japanese folk sensibilities. Over three decades of artistic activity, she has performed at major international festivals, cultural centers, and cross-cultural showcases across East Africa, Japan, and Europe.`
        },
        {
          title: 'Author & Cultural Ambassador',
          content: `Beyond her musical career, Anyango is an author and cultural bridge-builder. Her autobiography, "Anyango Nyar Siaya," documents her journey breaking gender and cultural barriers to preserve and elevate the Nyatiti globally, fulfilling her master's wish to share the instrument's voice with the world.`
        }
      ],
      albumsAndEPs: [
        { title: 'AOKO', year: '2022', type: 'Album' },
        { title: 'KANKI', year: '2021', type: 'Album' },
        { title: 'The Safari of Eriko Mukoyama', year: '2016', type: 'Album' },
        { title: 'Savanna', year: '2015', type: 'Album' },
        { title: 'Kilimanjaro', year: '2014', type: 'Album' },
        { title: 'ALEGO', year: '2013', type: 'Album' },
        { title: 'Tei molo', year: '2011', type: 'Album' },
        { title: 'HORIZON', year: '2010', type: 'Album' },
        { title: 'Nyatiti Diva', year: '2009', type: 'Album' }
      ],
      singles: [
        { title: 'Nyatiti Ondo (World Version)', year: '2026', type: 'Single' },
        { title: 'NYATITI ONDO', year: '2026', type: 'Single' },
        { title: 'Opogore (Anyango Remix)', year: '2026', type: 'Single' },
        { title: 'To Be Free', year: '2025', type: 'Single' },
        { title: 'DUNIA (feat. Aska Maret)', year: '2024', type: 'Single' }
      ],
      streamingLinks: {
        spotify: 'https://open.spotify.com/artist/5pzp6HBJUejn9tYecSr2cm',
        appleMusic: 'https://music.apple.com/us/artist/anyango/365376738',
        youtube: 'https://www.youtube.com/channel/UC9PSo55ahuY1rSIFHSVTMIg',
        deezer: 'https://www.deezer.com/artist/Anyango'
      }
    }
];

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = artists.find(a => a.slug === slug);

  if (!artist) return notFound();

  return <ArtistProfile artist={artist} />;
}