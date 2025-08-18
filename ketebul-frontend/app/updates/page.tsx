// app/updates/page.tsx (Server Component)
import UpdatesContent from './UpdatesContent'; // Import the new Client Component
import React from 'react'; // Import React for JSX

export default function UpdatesPage() {
  return (
    // The main background is now handled entirely by UpdatesContent for consistency.
    // Removed redundant bg-gray-50 from here.
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-inter">
      {/* Render the Client Component which contains all interactive elements and styling */}
      <UpdatesContent />
    </div>
  );
}
