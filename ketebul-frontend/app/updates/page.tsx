// app/updates/page.tsx (Server Component)
import UpdatesContent from './UpdatesContent'; // Import the new Client Component
import React from 'react'; // Import React for JSX

export default function UpdatesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 font-inter">
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Render the Client Component which contains all interactive elements */}
      <UpdatesContent />
    </div>
  );
}
