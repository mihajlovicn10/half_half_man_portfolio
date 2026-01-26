const CONSENT_STORAGE_KEY = 'hhm_cookie_consent_v1';

const defaultConsent = {
  decided: false,
  necessary: true,
  analytics: false,
  ads: false,
  updatedAt: null,
};

export const getConsent = () => {
  if (typeof window === 'undefined') return { ...defaultConsent };
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return { ...defaultConsent };
    const parsed = JSON.parse(raw);
    return { ...defaultConsent, ...parsed, necessary: true };
  } catch {
    return { ...defaultConsent };
  }
};

export const setConsent = (next) => {
  if (typeof window === 'undefined') return;
  const normalized = {
    ...defaultConsent,
    ...next,
    necessary: true,
    decided: true,
    updatedAt: Date.now(),
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent('hhm:consent-changed', { detail: normalized }));
};

export const onConsentChange = (handler) => {
  if (typeof window === 'undefined') return () => {};

  const onCustom = (e) => handler(e?.detail || getConsent());
  const onStorage = (e) => {
    if (e.key === CONSENT_STORAGE_KEY) handler(getConsent());
  };

  window.addEventListener('hhm:consent-changed', onCustom);
  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener('hhm:consent-changed', onCustom);
    window.removeEventListener('storage', onStorage);
  };
};

export const hasAnalyticsConsent = () => getConsent().analytics === true;
export const hasAdsConsent = () => getConsent().ads === true;

let gtmLoaded = false;
export const ensureGtmLoaded = (containerId) => {
  if (typeof window === 'undefined') return;
  if (!containerId) return;
  if (gtmLoaded) return;

  // Basic GTM bootstrap. (Noscript iframe is optional for SPAs.)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
  document.head.appendChild(script);

  gtmLoaded = true;
};

let adsenseLoaded = false;
export const ensureAdSenseLoaded = (clientId) => {
  if (typeof window === 'undefined') return;
  if (!clientId) return;
  if (adsenseLoaded) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);

  // AdSense expects this array to exist.
  window.adsbygoogle = window.adsbygoogle || [];

  adsenseLoaded = true;
};

