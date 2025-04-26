import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname + window.location.search);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen">
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
