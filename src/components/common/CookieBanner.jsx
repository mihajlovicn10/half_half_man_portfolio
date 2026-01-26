import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ensureAdSenseLoaded,
  ensureGtmLoaded,
  getConsent,
  onConsentChange,
  setConsent,
} from '../../utils/consent';
import { initGA } from '../../utils/analytics';

const ADSENSE_CLIENT_ID = 'ca-pub-1380111364110876';
const GTM_CONTAINER_ID = 'GTM-MSWNC7DL';

const CookieBanner = () => {
  const [consent, setConsentState] = useState(() => getConsent());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => onConsentChange(setConsentState), []);

  // Side effects after consent.
  useEffect(() => {
    if (!consent?.decided) return;
    if (consent.analytics) {
      initGA();
      ensureGtmLoaded(GTM_CONTAINER_ID);
    }
    if (consent.ads) {
      ensureAdSenseLoaded(ADSENSE_CLIENT_ID);
    }
  }, [consent?.decided, consent?.analytics, consent?.ads]);

  const model = useMemo(
    () => ({
      analytics: Boolean(consent?.analytics),
      ads: Boolean(consent?.ads),
    }),
    [consent?.analytics, consent?.ads]
  );

  const [draft, setDraft] = useState(model);
  useEffect(() => setDraft(model), [model]);

  if (consent?.decided) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60]">
      <div className="mx-auto max-w-4xl px-4 pb-4">
        <div className="rounded-2xl border border-white/10 bg-slate-950 text-white shadow-2xl">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-base font-semibold">Cookies & privacy</h2>
                <p className="mt-1 text-sm text-white/80">
                  We use necessary cookies for site functionality. With your consent, we also use cookies for
                  analytics (GA4) and ads (AdSense).
                </p>
                <p className="mt-2 text-xs text-white/70">
                  Read more in the <Link to="/privacy-policy" className="underline hover:text-white">Privacy Policy</Link>.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                  onClick={() => setIsExpanded((v) => !v)}
                >
                  {isExpanded ? 'Hide options' : 'Customize'}
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                  onClick={() => setConsent({ analytics: false, ads: false })}
                >
                  Reject non‑essential
                </button>
                <button
                  type="button"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
                  onClick={() => setConsent({ analytics: true, ads: true })}
                >
                  Accept all
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <p className="text-sm font-semibold">Necessary</p>
                    <p className="text-xs text-white/70">Always on. Required for core functionality.</p>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-3">
                    <label className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-black/20 p-3">
                      <div>
                        <div className="text-sm font-semibold">Analytics</div>
                        <div className="text-xs text-white/70">Helps us understand usage and improve the site.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={draft.analytics}
                        onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
                        className="mt-1 h-4 w-4 accent-primary"
                        aria-label="Enable analytics cookies"
                      />
                    </label>

                    <label className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-black/20 p-3">
                      <div>
                        <div className="text-sm font-semibold">Ads</div>
                        <div className="text-xs text-white/70">Enables Google AdSense scripts and ad personalization.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={draft.ads}
                        onChange={(e) => setDraft((d) => ({ ...d, ads: e.target.checked }))}
                        className="mt-1 h-4 w-4 accent-primary"
                        aria-label="Enable advertising cookies"
                      />
                    </label>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white/90"
                        onClick={() => setConsent({ analytics: draft.analytics, ads: draft.ads })}
                      >
                        Save preferences
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

