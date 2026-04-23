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
  const bannerRef  = useRef<HTMLDivElement>(null);
  const offlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .catch(err => console.warn('[PWA] SW failed:', err));
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      window.__pwaPrompt = e as BeforeInstallPromptEvent;
      if (!sessionStorage.getItem('pwa-dismissed')) {
        setTimeout(() => bannerRef.current?.classList.add('visible'), 5000);
      }
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      bannerRef.current?.classList.remove('visible');
    });

    const showOffline = () => offlineRef.current?.classList.add('visible');
    const hideOffline = () => offlineRef.current?.classList.remove('visible');
    if (!navigator.onLine) showOffline();
    window.addEventListener('online',  hideOffline);
    window.addEventListener('offline', showOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('online',  hideOffline);
      window.removeEventListener('offline', showOffline);
    };
  }, []);

  async function handleInstall() {
    if (!window.__pwaPrompt) return;
    await window.__pwaPrompt.prompt();
    const { outcome } = await window.__pwaPrompt.userChoice;
    if (outcome === 'accepted') {
      bannerRef.current?.classList.remove('visible');
      window.__pwaPrompt = undefined;
    }
  }

  function handleDismiss() {
    bannerRef.current?.classList.remove('visible');
    sessionStorage.setItem('pwa-dismissed', '1');
  }

  return (
    <>
      {/* Slim offline bar */}
      <div ref={offlineRef} id="pwa-offline-bar" role="status" aria-live="polite">
        You&apos;re offline
      </div>

      {/* Small subtle install chip — bottom right */}
      <div ref={bannerRef} id="pwa-install-banner" role="complementary">
        <div className="pwa-text">
          <strong>Install app</strong>
          <span>Add to home screen</span>
        </div>
        <button className="pwa-btn-install" onClick={handleInstall}>Add</button>
        <button className="pwa-btn-dismiss" onClick={handleDismiss} aria-label="Dismiss">✕</button>
      </div>
    </>
  );
}