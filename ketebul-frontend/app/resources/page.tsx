import React from 'react';

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Main Title */}
        <div className="border-b border-gray-800 pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Program Resources & Applications
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Download official documentation, application guidelines, and materials for our active cohorts and training programs.
          </p>
        </div>

        {/* Featured Card: English Access Scholarship Program */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 md:p-8 hover:border-gray-700 transition-all duration-200 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            
            {/* Left Content Column */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">
                English Access Scholarship Program — Application Form
              </h2>
              
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Free, 9-month U.S. Embassy-funded program combining business English instruction, music entrepreneurship, intellectual property rights, and cultural exchange paths for individuals aged 19–24 in the Kisumu music sector.
              </p>

              {/* Crucial Metadata Timeline Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-800/60 text-xs text-gray-400">
                <div>
                  <span className="block font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Application Deadline:</span>
                  <span className="text-amber-400 font-medium">Wednesday, 29th July 2026</span>
                </div>
                <div>
                  <span className="block font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Classes Commence:</span>
                  <span className="text-emerald-400 font-medium">Monday, 10th August 2026</span>
                </div>
              </div>
            </div>

            {/* Right Interactive/CTA Column */}
            <div className="w-full md:w-auto flex flex-col justify-center">
              <a 
                href="/english-access-program-application-form.pdf" 
                download="english-access-program-application-form.pdf"
                className="w-full md:w-56 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#E5A93C] hover:bg-[#cb922e] text-black font-bold rounded-lg transition-colors duration-150 shadow-md text-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Form
              </a>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}