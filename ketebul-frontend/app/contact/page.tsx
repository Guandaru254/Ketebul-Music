'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';

// --- Framer Motion Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const inputVariants: Variants = {
  focused: {
    scale: 1.02,
    boxShadow: "0 0 0 3px rgba(245, 158, 11, 0.5)",
    transition: { duration: 0.2 },
  },
};

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission with a simulated success state
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white font-inter py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1 
          className="text-4xl sm:text-5xl font-extrabold mb-6 font-josefin-sans"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Contact Information Section */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl flex flex-col justify-between">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold font-josefin-sans mb-6 text-yellow-500">
              Our Contact Details
            </h2>
            <div className="space-y-6 text-gray-300">
              <p>
                <strong>Email:</strong> <br/>
                <a href="mailto:info@ketebulmusic.org" className="hover:text-yellow-400 transition-colors">
                  info@ketebulmusic.org
                </a>
              </p>
              <p>
                <strong>Phone:</strong> <br/>
                <a href="tel:+254734585519" className="hover:text-yellow-400 transition-colors">
                  +254 734 585 519
                </a>
              </p>
              <p>
                <strong>Address:</strong> <br/>
                Ketebul Music Studios, GoDown Arts Centre, <br/>
                Dunga Road, Industrial Area, Nairobi, Kenya
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-8">
            <div className="rounded-xl overflow-hidden shadow-lg h-64 w-full">
              <iframe
                title="Ketebul Music Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7525368325776!2d36.82885997455806!3d-1.3175841355415846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11818302062f%3A0x6a21804f515e0242!2sKetebul%20Music%20Studios!5e0!3m2!1sen!2ske!4v1718817650534!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <motion.form 
          onSubmit={handleFormSubmit}
          className="bg-gray-800 p-8 rounded-xl shadow-2xl"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold font-josefin-sans mb-6 text-yellow-500">
            Send us a Message
          </h2>
          <div className="space-y-6">
            <motion.input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none"
              whileFocus="focused"
              variants={inputVariants}
            />
            <motion.input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none"
              whileFocus="focused"
              variants={inputVariants}
            />
            <motion.textarea 
              name="message" 
              placeholder="Your Message" 
              rows={5} 
              required 
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none resize-none"
              whileFocus="focused"
              variants={inputVariants}
            />
          </div>
          <motion.button 
            type="submit" 
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 text-black font-bold py-3 mt-8 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
          {isSubmitted && (
            <motion.p
              className="mt-4 text-green-400 font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Thank you! Your message has been sent.
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </main>
  );
}
