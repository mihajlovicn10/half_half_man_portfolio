import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import TechStack from './pages/TechStack';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { initGA, trackPageView } from './utils/analytics';
import TechStackDetail from './pages/TechStackDetail';
import Chatbot from './components/Chatbot';
import './App.css'
import logoSpinner from './assets/logo/logo_cropped.png';

// Initialize GA4
initGA();

// ScrollToTop component to handle scroll behavior
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname + window.location.search);
  }, []);

  // Show loader only on first visit to home page
  useEffect(() => {
    const isHome =
      window.location.pathname === '/' || window.location.pathname === '';
    const hasSeenLoader = window.localStorage.getItem('hhm_has_seen_loader') === '1';

    if (isHome && !hasSeenLoader) {
      setIsAppLoading(true);
      window.localStorage.setItem('hhm_has_seen_loader', '1');
    }
  }, []);

  // Simple initial loading screen with logo and animated dots
  useEffect(() => {
    if (!isAppLoading) return;

    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isAppLoading]);

  useEffect(() => {
    if (!isAppLoading) return;

    const interval = setInterval(() => {
      setDotCount((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, [isAppLoading]);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen">
          {isAppLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90">
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.img
                  src={logoSpinner}
                  alt="Half Half Man loading"
                  className="w-[7.5rem] h-[7.5rem] rounded-full shadow-lg"
                  initial={{ opacity: 0.85, scale: 1 }}
                  animate={{ 
                    opacity: [0.85, 1, 0.85],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.p
                  className="text-tertiary text-sm tracking-wide font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Loading{'.'.repeat(dotCount)}
                </motion.p>
              </motion.div>
            </div>
          )}
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tech-stack" element={<TechStack />} />
              <Route path="/tech-stack/:category" element={<TechStackDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </Layout>
          <Chatbot />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
