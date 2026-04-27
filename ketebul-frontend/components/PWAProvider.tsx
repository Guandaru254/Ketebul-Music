'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window { __pwaPrompt?: BeforeInstallPromptEvent; }
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAProvider() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const offlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ─── Service Worker Registration ─────────────────────────────────────────
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(() => console.log('[PWA] Service Worker Active'))
        .catch(err => console.warn('[PWA] SW Registration Failed:', err));
    }

    // ─── Install Prompt Logic ────────────────────────────────────────────────
    const handleBeforeInstall = (e: Event) => {
      // Prevent automatic prompt so we can show our custom chip
      e.preventDefault();
      window.__pwaPrompt = e as BeforeInstallPromptEvent;
      
      console.log('[PWA] Install available');

      // Show banner after 4 seconds if not previously dismissed in this session
      if (!sessionStorage.getItem('pwa-dismissed')) {
        setTimeout(() => {
          if (bannerRef.current) {
            bannerRef.current.classList.add('visible');
          }
        }, 4000);
      }
    };

    const handleAppInstalled = () => {
      console.log('[PWA] App successfully installed');
      bannerRef.current?.classList.remove('visible');
      window.__pwaPrompt = undefined;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    // ─── Offline Connectivity Logic ──────────────────────────────────────────
    const showOffline = () => offlineRef.current?.classList.add('visible');
    const hideOffline = () => offlineRef.current?.classList.remove('visible');

    if (!navigator.onLine) showOffline();

    window.addEventListener('online',  hideOffline);
    window.addEventListener('offline', showOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online',  hideOffline);
      window.removeEventListener('offline', showOffline);
    };
  }, []);

  async function handleInstall() {
    const promptEvent = window.__pwaPrompt;
    if (!promptEvent) return;

    // Show the native browser install dialog
    await promptEvent.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await promptEvent.userChoice;
    console.log(`[PWA] User response: ${outcome}`);

    if (outcome === 'accepted') {
      bannerRef.current?.classList.remove('visible');
      window.__pwaPrompt = undefined;
    }
    // Note: If dismissed, we keep the prompt saved so they can click 'Add' again later
  }

  function handleDismiss() {
    bannerRef.current?.classList.remove('visible');
    // Prevent the banner from showing again for the duration of this session
    sessionStorage.setItem('pwa-dismissed', '1');
  }

  return (
    <>
      {/* Offline Notification Bar */}
      <div 
        ref={offlineRef} 
        id="pwa-offline-bar" 
        role="status" 
        aria-live="polite"
        className="fixed top-0 left-0 w-full bg-red-600 text-white text-[10px] uppercase tracking-widest py-1 text-center z-[100] translate-y-[-100%] transition-transform duration-300 [&.visible]:translate-y-0"
      >
        You are currently offline. Some features may be limited.
      </div>

      {/* Floating Install Chip */}
      <div 
        ref={bannerRef} 
        id="pwa-install-banner" 
        role="complementary"
        className="fixed bottom-6 right-6 z-[999] flex items-center gap-3 bg-gray-900 border border-white/10 p-3 rounded-2xl shadow-2xl opacity-0 translate-y-10 pointer-events-none transition-all duration-500 ease-out [&.visible]:opacity-100 [&.visible]:translate-y-0 [&.visible]:pointer-events-auto"
      >
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white leading-none"></span>
          <span className="text-[10px] text-gray-400"></span>
        </div>
        
        <div className="flex items-center gap-2 ml-2">
          <button 
            className="bg-yellow-500 hover:bg-yellow-400 text-black text-[11px] font-bold py-1.5 px-4 rounded-lg transition-colors uppercase tracking-tight"
            onClick={handleInstall}
          >
            Install
          </button>
          <button 
            className="text-gray-500 hover:text-white p-1 transition-colors" 
            onClick={handleDismiss} 
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}