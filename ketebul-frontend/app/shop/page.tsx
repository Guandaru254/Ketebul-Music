'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// ─── Config — update these when ready ────────────────────────────────────────
const TILL_NUMBER   = 'XXXXXXX';      // ← replace with Ketebul M-Pesa till
const WHATSAPP_NUM  = '254700000000'; // ← replace with accounts WhatsApp number
const SHOP_EMAIL    = 'info@ketebulmusic.org';

const GOLDEN = '#FFD700';

const products = [
  {
    id: 'shades-of-benga',
    title: 'Shades of Benga',
    subtitle: 'The Story of Popular Music in Kenya: 1946–2016',
    price: 5000,
    currency: 'KES',
    image: '/projects/benga1.jpg',
    description:
      'The definitive history of Benga — Kenya\'s most beloved popular music genre. A landmark publication tracing its roots from the Luo lakeside communities of the 1940s through six decades of evolution. Hardcover, 320 pages, richly illustrated with archive photographs and accompanied by a curated audio compilation.',
    details: [
      'Hardcover · 320 pages',
      'Illustrated with rare archival photographs',
      'Includes curated audio compilation',
      'Available for pickup at GoDown Arts Centre or delivery within Nairobi',
    ],
    available: true,
  },
];

type Step = 'browse' | 'instructions' | 'confirm';

export default function ShopPage() {
  const [selected, setSelected] = useState<typeof products[0] | null>(null);
  const [step, setStep] = useState<Step>('browse');
  const [name, setName]     = useState('');
  const [phone, setPhone]   = useState('');
  const [mpesaRef, setMpesaRef] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const ref = selected ? `BENGA-${phone.slice(-4) || '0000'}` : '';

  function openWhatsApp() {
    const msg = encodeURIComponent(
      `Hi! I've paid for *${selected?.title}* (KES ${selected?.price.toLocaleString()}).\n\nM-Pesa ref: ${mpesaRef}\nName: ${name}\nPhone: ${phone}\n\nPlease confirm my order. Thank you!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank');
    setSubmitted(true);
  }

  function reset() {
    setSelected(null);
    setStep('browse');
    setName('');
    setPhone('');
    setMpesaRef('');
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 px-4 py-12 sm:px-8 font-inter">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            The <span style={{ color: GOLDEN }}>Shop</span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
            Books, compilations and research publications from Ketebul Music. Pay via M-Pesa · Instant confirmation via WhatsApp.
          </p>
        </motion.div>

        {/* ── BROWSE ───────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {step === 'browse' && (
            <motion.div
              key="browse"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -6, boxShadow: `0 12px 32px rgba(0,0,0,0.5), 0 0 0 2px ${GOLDEN}` }}
                    className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
                    onClick={() => { setSelected(product); setStep('instructions'); }}
                  >
                    {/* Book image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                      {!product.available && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-gray-300 font-semibold tracking-widest uppercase text-sm">Coming Soon</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5 flex flex-col flex-grow">
                      <p className="text-xs text-yellow-500 uppercase tracking-widest mb-1">Book</p>
                      <h2 className="text-xl font-bold text-white mb-1">{product.title}</h2>
                      <p className="text-gray-400 text-xs mb-3 leading-snug">{product.subtitle}</p>
                      <p className="text-gray-300 text-sm leading-relaxed flex-grow line-clamp-3">{product.description}</p>

                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-700">
                        <span className="text-2xl font-extrabold" style={{ color: GOLDEN }}>
                          KES {product.price.toLocaleString()}
                        </span>
                        {product.available && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2 text-sm font-bold text-gray-900 rounded-lg"
                            style={{ backgroundColor: GOLDEN }}
                          >
                            Buy Now
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PAYMENT INSTRUCTIONS ────────────────────────────────────────── */}
          {step === 'instructions' && selected && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              {/* Back */}
              <button onClick={reset} className="text-gray-400 hover:text-yellow-400 text-sm mb-6 flex items-center gap-2 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to shop
              </button>

              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">

                {/* Product summary */}
                <div className="flex gap-4 p-6 border-b border-gray-700">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-600">
                    <Image src={selected.image} alt={selected.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-lg">{selected.title}</h2>
                    <p className="text-gray-400 text-xs">{selected.subtitle}</p>
                    <p className="text-yellow-400 font-extrabold text-xl mt-1">
                      KES {selected.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* What's included */}
                <div className="p-6 border-b border-gray-700">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">What's included</p>
                  <ul className="space-y-1.5">
                    {selected.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span style={{ color: GOLDEN }} className="mt-0.5 flex-shrink-0">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Your details */}
                <div className="p-6 border-b border-gray-700 space-y-4">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Your details</p>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <input
                    type="tel"
                    placeholder="Your phone number (e.g. 0712 345 678)"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* M-Pesa instructions */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">How to pay via M-Pesa</p>

                  <ol className="space-y-3">
                    {[
                      'Open M-Pesa on your phone',
                      'Select Lipa na M-Pesa → Buy Goods & Services',
                      <span key="till">Enter till number: <strong className="text-white font-mono text-base">{TILL_NUMBER}</strong></span>,
                      <span key="amount">Enter amount: <strong className="text-yellow-400 font-bold">KES {selected.price.toLocaleString()}</strong></span>,
                      <span key="ref">Use reference: <strong className="text-white font-mono">{name ? `BENGA-${phone.slice(-4) || '0000'}` : 'BENGA-[last 4 digits of your number]'}</strong></span>,
                      'Confirm and complete payment',
                      'Copy your M-Pesa confirmation message reference number',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3 items-start text-sm text-gray-300">
                        <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-900 mt-0.5" style={{ backgroundColor: GOLDEN }}>
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setStep('confirm')}
                    disabled={!name.trim() || !phone.trim()}
                    className="w-full py-3 mt-2 font-bold text-gray-900 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: GOLDEN }}
                  >
                    I've paid — enter M-Pesa reference →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── CONFIRM REFERENCE ───────────────────────────────────────────── */}
          {step === 'confirm' && selected && !submitted && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto"
            >
              <button onClick={() => setStep('instructions')} className="text-gray-400 hover:text-yellow-400 text-sm mb-6 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: GOLDEN + '22', border: `2px solid ${GOLDEN}` }}>
                    <span className="text-2xl">📱</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">Confirm your payment</h2>
                  <p className="text-gray-400 text-sm mt-1">Enter the reference from your M-Pesa SMS</p>
                </div>

                <input
                  type="text"
                  placeholder="M-Pesa reference e.g. RCK1ABC2DE"
                  value={mpesaRef}
                  onChange={e => setMpesaRef(e.target.value.toUpperCase())}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 tracking-wider"
                />

                {/* Summary */}
                <div className="bg-gray-900/60 rounded-xl p-4 text-sm space-y-2 border border-gray-700">
                  <div className="flex justify-between"><span className="text-gray-400">Book</span><span className="text-white font-medium">{selected.title}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Amount</span><span className="text-yellow-400 font-bold">KES {selected.price.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Name</span><span className="text-white">{name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Phone</span><span className="text-white">{phone}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Till</span><span className="text-white font-mono">{TILL_NUMBER}</span></div>
                  {mpesaRef && <div className="flex justify-between"><span className="text-gray-400">M-Pesa ref</span><span className="text-green-400 font-mono">{mpesaRef}</span></div>}
                </div>

                {/* WhatsApp button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={openWhatsApp}
                  disabled={!mpesaRef.trim()}
                  className="w-full py-3 font-bold text-white rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Confirm via WhatsApp
                </motion.button>

                <p className="text-center text-xs text-gray-500">
                  This opens WhatsApp with your order details pre-filled. We'll confirm and arrange delivery within 24 hours.
                </p>
              </div>
            </motion.div>
          )}

          {/* ── SUCCESS ──────────────────────────────────────────────────────── */}
          {submitted && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="max-w-md mx-auto text-center py-16"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: GOLDEN + '22', border: `2px solid ${GOLDEN}` }}>
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Order received!</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Thank you, <strong className="text-white">{name}</strong>. We've received your WhatsApp message and will confirm your order within 24 hours.
                For queries email <a href={`mailto:${SHOP_EMAIL}`} className="text-yellow-400 hover:underline">{SHOP_EMAIL}</a>
              </p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={reset}
                className="px-8 py-3 font-bold text-gray-900 rounded-xl text-sm"
                style={{ backgroundColor: GOLDEN }}
              >
                Back to shop
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <div className="mt-16 text-center text-xs text-gray-600 space-y-1">
          <p>Payments processed via M-Pesa · Orders fulfilled by Ketebul Music, GoDown Arts Centre, Nairobi</p>
          <p>Questions? Email <a href={`mailto:${SHOP_EMAIL}`} className="text-gray-500 hover:text-yellow-400">{SHOP_EMAIL}</a></p>
        </div>
      </div>
    </div>
  );
}