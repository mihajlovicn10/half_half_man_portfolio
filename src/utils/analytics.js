import ReactGA from 'react-ga4';
import { hasAnalyticsConsent } from './consent';

// Initialize GA4 with your measurement ID
export const initGA = () => {
  if (!hasAnalyticsConsent()) return;
  if (initGA._initialized) return;
  ReactGA.initialize('G-1DX2KEDDFY');
  initGA._initialized = true;
};

// Track page views
export const trackPageView = (path) => {
  if (!hasAnalyticsConsent()) return;
  initGA();
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track custom events
export const trackEvent = (category, action, label, value) => {
  if (!hasAnalyticsConsent()) return;
  initGA();
  ReactGA.event({
    category,
    action,
    label,
    ...(typeof value !== 'undefined' ? { value } : {}),
  });
}; 

// Internal flag
initGA._initialized = false;