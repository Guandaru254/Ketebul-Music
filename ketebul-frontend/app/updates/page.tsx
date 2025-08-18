// app/updates/page.tsx

import Image from 'next/image';

// Define the structure for an Update item
interface Update {
  date: string;
  monthYear: string;
  title: string;
  content: string;
  imageUrl?: string; // Optional image URL
  imageAlt?: string; // Optional image alt text
}

// Hardcoded data for the updates page
// This will ensure content displays reliably for your presentation
const updates: Update[] = [
  {
    date: '08',
    monthYear: 'AUG\n2025',
    title: 'Book Launch - ANYANGO NYAR SIAYA (Nyatiti Queen)',
    content: `This September Anyango Nyar Siaya from Japan returns to Kenya to launch her book 'ANYANGO NYAR SIAYA (Nyatiti Queen)' and perform in Nairobi and Kisumu.

Wednesday, 17 Sept - Book launch at Alliance Française Nairobi
Thursday, 18 Sept - Gojo Cafe (backed by Makadem)
Saturday, 20 Sept - Dunga Hill Camp, Kisumu (backed by Sangau Soul)

The book will be available from Nuria Bookstore and Ketebul Music. All shows are free. Come and experience the nyatiti with the first woman from outside the Luo community to play it professionally.`,
    imageUrl: '/anyango-nyar-siaya.jpg', // Using a specific name for clarity
    imageAlt: 'Anyango Nyar Siaya (Nyatiti Queen) book launch'
  },
  {
    date: '23',
    monthYear: 'SEP\n2020',
    title: 'Shades of Benga Online - Episode 2: The Congo Connection & Nairobi Social Halls',
    content: `We're back again this Wednesday 23 September @ 8:00PM EAT (+3GMT) with #shadesofbenga online episode 2! We travel back in time and see how a couple of Congolese guitarists influenced Kenyan popular music in the 1960s. Join us on our YouTube channel KETEBULMUSIC and Facebook page: ketebulmusic to watch this episode. CLICK HERE to schedule and to view the episode!`,
    imageUrl: '/shades-of-benga.jpg', // Using a specific name for clarity
    imageAlt: 'Shades of Benga Online Episode 2'
  },
  // Add more updates here if needed
];

// Main Updates Page component
export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
        {/* News Header */}
        <div className="relative bg-red-600 text-white text-center py-4 rounded-t-lg mb-8 shadow-md">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">News</h1>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-red-700"></div> {/* Bottom border effect */}
        </div>

        {/* Updates Grid */}
        <div className="space-y-10">
          {updates.map((update, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {/* Date Section */}
              <div className="flex-shrink-0 w-full sm:w-36 bg-red-500 text-white flex flex-col items-center justify-center p-4 text-center">
                <span className="text-5xl font-extrabold leading-none">{update.date}</span>
                <span className="text-lg font-semibold whitespace-pre-line">{update.monthYear}</span>
              </div>

              {/* Content Section */}
              <div className="flex-grow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{update.title}</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{update.content}</p>
                </div>
                {update.imageUrl && (
                  <div className="mt-6 w-full sm:w-64 h-auto self-center sm:self-end rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={update.imageUrl}
                      alt={update.imageAlt || 'Update image'}
                      width={600} // Adjust width as needed for better quality in a hardcoded scenario
                      height={400} // Adjust height as needed
                      layout="responsive" // Make image responsive
                      objectFit="cover"
                      className="rounded-lg"
                      onError={(e) => {
                        console.error("Error loading image:", e.currentTarget.src);
                        // Optional: Replace with a generic fallback image if original fails
                        e.currentTarget.src = 'https://placehold.co/600x400/CCCCCC/000000?text=Image+Missing';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

