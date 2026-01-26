import { hasAnalyticsConsent } from './consent';
import { initGA } from './analytics';
import ReactGA from 'react-ga4';

const SESSION_KEY_PREFIX = 'hhm_evt_';

const safeStringify = (value) => {
  try {
    return JSON.stringify(value);
  } catch {
    return undefined;
  }
};

const getPage = () => {
  if (typeof window === 'undefined') return undefined;
  return window.location.pathname;
};

export const track = (eventName, params = {}, options = {}) => {
  if (!hasAnalyticsConsent()) return;
  if (!eventName) return;

  const page = params.page || getPage();
  const payload = { ...params, ...(page ? { page } : {}) };

  // Dedupe helper (once per session).
  if (options.oncePerSession) {
    try {
      const key = `${SESSION_KEY_PREFIX}${eventName}_${safeStringify(payload)}`;
      if (window.sessionStorage.getItem(key) === '1') return;
      window.sessionStorage.setItem(key, '1');
    } catch {
      // ignore storage errors
    }
  }

  initGA(); // guarded internally

  // Prefer GA4-style eventName + params
  try {
    ReactGA.event(eventName, payload);
  } catch {
    // fallback to legacy signature if needed
    ReactGA.event({
      category: 'event',
      action: eventName,
      label: safeStringify(payload) || String(page || ''),
    });
  }
};

