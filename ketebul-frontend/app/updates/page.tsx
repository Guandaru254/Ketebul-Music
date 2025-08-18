// app/updates/page.tsx (Server Component)
// This file can now be much simpler as the interactivity moves to the client.
import Image from 'next/image'; // Make sure to import Image
import React from 'react'; // Import React for JSX

export default function UpdatesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 font-inter">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Latest Updates</h1>
        
        {/* Update Item 1: Anyango Nyar Siaya */}
        <div className="flex flex-col md:flex-row items-center bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8 shadow-md">
          <div className="md:w-1/3 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <Image
              src="/anyango-nyar-siaya.jpg"
              alt="Anyango Nyar Siaya"
              width={300} // Specify width
              height={300} // Specify height
              layout="responsive" // Make image responsive
              className="rounded-lg object-cover shadow-lg"
              // Corrected onError handler with type casting
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/300x300/e0e0e0/ffffff?text=Image+Error';
              }}
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Anyango Nyar Siaya Concert</h2>
            <p className="text-gray-700 leading-relaxed">
              We are thrilled to announce the upcoming concert featuring the legendary Anyango Nyar Siaya!
              Known for her enchanting voice and captivating performances, Anyango brings the rich musical traditions
              of Siaya to life. Join us for an unforgettable evening of soulful melodies and vibrant rhythms.
            </p>
            <p className="text-sm text-gray-500 mt-2">Date: October 26, 2024 | Venue: National Theatre, Nairobi</p>
            <button
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
              onClick={() => alert("Details for Anyango Nyar Siaya concert are coming soon!")} // Example of client-side interaction
            >
              Get Tickets
            </button>
          </div>
        </div>

        {/* Update Item 2: Shades of Benga Album Release */}
        <div className="flex flex-col md:flex-row items-center bg-green-50 border-l-4 border-green-500 rounded-lg p-6 shadow-md">
          <div className="md:w-1/3 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <Image
              src="/shades-of-benga.jpg"
              alt="Shades of Benga Album"
              width={300} // Specify width
              height={300} // Specify height
              layout="responsive" // Make image responsive
              className="rounded-lg object-cover shadow-lg"
              // Corrected onError handler with type casting
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/300x300/e0e0e0/ffffff?text=Image+Error';
              }}
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">New Album Release: Shades of Benga</h2>
            <p className="text-gray-700 leading-relaxed">
              Ketebul Music is proud to present "Shades of Benga," a groundbreaking album that explores
              the diverse facets of Benga music. Featuring collaborations with both veteran artists and
              rising stars, this album is a tribute to the timeless genre that defines Kenyan sound.
            </p>
            <p className="text-sm text-gray-500 mt-2">Release Date: September 15, 2024 | Available on: All major streaming platforms</p>
            <button
              className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
              onClick={() => alert("Pre-order for 'Shades of Benga' is now open!")} // Example of client-side interaction
            >
              Pre-order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
