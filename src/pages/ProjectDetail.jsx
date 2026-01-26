import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { useSEO } from '../hooks/useSEO';
import { generateCanonicalUrl } from '../utils/seo';
import { buildCreativeWork, buildBreadcrumbList } from '../utils/structuredData';
import { track } from '../utils/events';
import portfolioImage1 from '../assets/images/Projects/List/portfolio_screenshot.png';
import portfolioAbout from '../assets/images/Projects/Detail/portfolio_about.png';
import portfolioStack from '../assets/images/Projects/Detail/portfolio_stack.png';
import portfolioVirtualAssistant from '../assets/images/Projects/Detail/portfolio_virtual_assistant.png';
import welearngreekImage1 from '../assets/images/Projects/Detail/wlg_conjugator.png';
import welearngreekLessons from '../assets/images/Projects/Detail/wlg_declinator.png';
import welearngreekProgress from '../assets/images/Projects/Detail/wlg_dictionary.png';
import welearngreekDashboard from '../assets/images/Projects/Detail/wlg_transparent.png';
import secureAccessImage1 from '../assets/images/Projects/Detail/saf_home.png';
import bughuntersImage1 from '../assets/images/Projects/Detail/bht_home.png';
import bughuntersImage2 from '../assets/images/Projects/Detail/bht_nmap.png';
import bughuntersImage3 from '../assets/images/Projects/Detail/bht_http.png';
import bughuntersImage4 from '../assets/images/Projects/Detail/bht_bruteforce.png';
import webflowImage1 from '../assets/images/Projects/List/webflow_home.png';
import webflowImage2 from '../assets/images/Projects/Detail/webflow_about.png';
import webflowImage3 from '../assets/images/Projects/Detail/webflow_services.png';
import webflowImage4 from '../assets/images/Projects/Detail/webflow_internship.png';

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [absoluteOgImage, setAbsoluteOgImage] = useState(null);
  const hasTrackedViewRef = useRef(false);

  const canonicalUrl = typeof window !== 'undefined'
    ? generateCanonicalUrl(window.location.pathname)
    : 'https://half-half-man.com/projects';

  const projectsData = {
    'portfolio': {
      title: t('projects.items.portfolio.title'),
      description: t('projects.items.portfolio.description'),
      technologies: ["ReactJS", "Vite", "TailwindCSS", "Framer Motion", "React Router", "react-helmet-async", "i18next", "Formspree", "Calendly(InlineWidget)", "Google Analytics", "Adjusted Virtual Assistant", "Google Analytics", "DOMPurify", "CSP Headers", "Rate limiting", "Heroku", "GitHub", "Sanity CMS"],
      types: ['Portfolio'],
      caseStudy: {
        context: t('projects.items.portfolio.description'),
        goals: t('projects.items.portfolio.features', { returnObjects: true }),
        constraints: t('projects.items.portfolio.challenges', { returnObjects: true }),
        approach: t('projects.items.portfolio.solutions', { returnObjects: true }),
        results: [
          'Improved resilience (Error Boundary + custom 404).',
          'SEO correctness + structured data.',
          'Accessibility improvements (modal focus, keyboard activation).',
        ],
        stack: {
          frontend: ['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'React Router'],
          backend: ['Sanity CMS', 'Formspree'],
          security: ['CSP headers', 'DOMPurify', 'Rate limiting'],
          ops: ['Heroku', 'GitHub'],
        },
        metrics: ['Faster perceived navigation via improved layouts and UX polish.'],
      },
      features: t('projects.items.portfolio.features', { returnObjects: true }),
      challenges: t('projects.items.portfolio.challenges', { returnObjects: true }),
      solutions: t('projects.items.portfolio.solutions', { returnObjects: true }),
      images: [
        portfolioImage1,
        portfolioAbout,
        portfolioStack,
        portfolioVirtualAssistant
      ],
      githubLink: "https://github.com/mihajlovicn10/half_half_man_portfolio/tree/master",
      liveDemo: "https://half-half-man.com"
    },
    'welearngreek': {
      title: t('projects.items.welearngreek.title'),
      description: t('projects.items.welearngreek.description'),
      technologies: ["React", "Vite" , "Tailwind CSS" , "Framer Motion" , "React Router DOM" , "Axios HTTP client " , "React icons" , "Formspree" , "ESLint" , "PostCSS Autoprefixer" , "Django", "Django REST Framework" , "django-cors-headers" , "djangorestframework-simplejwt" , "PostgreSQL", "guinicorn" , "django-heroku" , "python-dotenv"],
      types: ['Edu', 'SaaS'],
      caseStudy: {
        context: t('projects.items.welearngreek.description'),
        goals: t('projects.items.welearngreek.features', { returnObjects: true }),
        constraints: t('projects.items.welearngreek.challenges', { returnObjects: true }),
        approach: t('projects.items.welearngreek.solutions', { returnObjects: true }),
        results: ['Full-stack app with auth-ready backend and scalable data model.'],
        stack: {
          frontend: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router'],
          backend: ['Django', 'Django REST Framework', 'PostgreSQL', 'JWT (SimpleJWT)'],
          security: ['CORS controls', 'JWT auth'],
          ops: ['Heroku', 'Gunicorn'],
        },
        metrics: [],
      },
      features: t('projects.items.welearngreek.features', { returnObjects: true }),
      challenges: t('projects.items.welearngreek.challenges', { returnObjects: true }),
      solutions: t('projects.items.welearngreek.solutions', { returnObjects: true }),
      images: [
        welearngreekImage1,
        welearngreekLessons,
        welearngreekProgress,
        welearngreekDashboard
      ],
      githubLink: "https://github.com/mihajlovicn10/we_learn_greek_backend",
      liveDemo: "https://welearngreek-frontend-0fe4f172e34f.herokuapp.com"
    },
    'secureaccess': {
      title: t('projects.items.secureaccess.title'),
      description: t('projects.items.secureaccess.description'),
      technologies: ["Django 5.2", "Python 3.11", "social-auth-app-django", "Google OAuth 2.0", "Classic Django Templating(HTML/CSS) , Railway" , "WhiteNoise", "Git + Github" ], 
      types: ['Security tool'],
      caseStudy: {
        context: t('projects.items.secureaccess.description'),
        goals: t('projects.items.secureaccess.features', { returnObjects: true }),
        constraints: t('projects.items.secureaccess.challenges', { returnObjects: true }),
        approach: t('projects.items.secureaccess.solutions', { returnObjects: true }),
        results: ['Secure auth flow using OAuth 2.0 and hardened deployment setup.'],
        stack: {
          frontend: ['Django Templates', 'HTML/CSS'],
          backend: ['Django', 'Python'],
          security: ['Google OAuth 2.0', 'social-auth-app-django'],
          ops: ['Railway', 'WhiteNoise'],
        },
        metrics: [],
      },
      features: t('projects.items.secureaccess.features', { returnObjects: true }),
      challenges: t('projects.items.secureaccess.challenges', { returnObjects: true }),
      solutions: t('projects.items.secureaccess.solutions', { returnObjects: true }),
      images: [
        secureAccessImage1
      ],
      githubLink: "https://github.com/mihajlovicn10/secure_access_flow",
      liveDemo: "https://secureaccessflow-production.up.railway.app"
    }, 
    'bughunters': {
      title: t('projects.items.bughunters.title'),
      description: t('projects.items.bughunters.description'),
      technologies: ["Python 3.13", "Django", "HTML/CSS", "Gunicorn", "Railway", "Requests", "python-nmap"],
      types: ['Security tool'],
      caseStudy: {
        context: t('projects.items.bughunters.description'),
        goals: t('projects.items.bughunters.features', { returnObjects: true }),
        constraints: t('projects.items.bughunters.challenges', { returnObjects: true }),
        approach: t('projects.items.bughunters.solutions', { returnObjects: true }),
        results: ['Automated scanning workflows packaged behind a clean UI.'],
        stack: {
          frontend: ['HTML/CSS'],
          backend: ['Python', 'Django'],
          security: ['python-nmap', 'Requests'],
          ops: ['Railway', 'Gunicorn'],
        },
        metrics: [],
      },
      features: t('projects.items.bughunters.features', { returnObjects: true }),
      challenges: t('projects.items.bughunters.challenges', { returnObjects: true }),
      solutions: t('projects.items.bughunters.solutions', { returnObjects: true }),
      images: [
        bughuntersImage1, 
        bughuntersImage2, 
        bughuntersImage3, 
        bughuntersImage4, 
      ],
      githubLink: "https://github.com/mihajlovicn10/bughunters_toolkit",
      liveDemo: "https://bughunterstoolkit-production.up.railway.app"
    }, 
    'webflow': {
      title: t('projects.items.webflow.title'),
      description: t('projects.items.webflow.description'),
      technologies: ["Webflow", "Google Fonts", "SVG/PNG/JPG Images" , "Cursor IDE", "Python", "Git", "Netlify"],
      types: ['Marketing site'],
      caseStudy: {
        context: t('projects.items.webflow.description'),
        goals: t('projects.items.webflow.features', { returnObjects: true }),
        constraints: t('projects.items.webflow.challenges', { returnObjects: true }),
        approach: t('projects.items.webflow.solutions', { returnObjects: true }),
        results: ['Modern marketing site built fast with clean CMS-friendly structure.'],
        stack: {
          frontend: ['Webflow', 'Google Fonts'],
          backend: [],
          security: [],
          ops: ['Netlify', 'Git'],
        },
        metrics: [],
      },
      features: t('projects.items.webflow.features', { returnObjects: true }),
      challenges: t('projects.items.webflow.challenges', { returnObjects: true }),
      solutions: t('projects.items.webflow.solutions', { returnObjects: true }),
      images: [
        webflowImage1,
        webflowImage2,
        webflowImage3,
        webflowImage4
      ],
      githubLink: "https://github.com/mihajlovicn10/webflow_refactored",
      liveDemo: "https://webflowenhanced.netlify.app"
      
    }
  };


  useEffect(() => {
    const projectData = projectsData[slug];
    if (projectData) {
      setProject(projectData);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug || !project) return;
    if (hasTrackedViewRef.current) return;
    hasTrackedViewRef.current = true;
    track('project_detail_view', { slug });
  }, [slug, project]);

  useEffect(() => {
    if (!project?.images?.[0]) {
      setAbsoluteOgImage(null);
      return;
    }
    try {
      const abs = new URL(project.images[0], window.location.origin).toString();
      setAbsoluteOgImage(abs);
    } catch {
      setAbsoluteOgImage(null);
    }
  }, [project]);

  useSEO({
    title: project ? `${project.title} | ${t('projects.meta.title')}` : `Project | ${t('projects.meta.title')}`,
    description: project?.description,
    image: absoluteOgImage || 'https://half-half-man.com/images/og-image.jpg',
    type: 'website',
  });

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setSelectedImageIndex(null);
    } else if (e.key === 'ArrowLeft') {
      setSelectedImageIndex((prev) => 
        prev !== null ? Math.max(0, prev - 1) : null
      );
    } else if (e.key === 'ArrowRight') {
      setSelectedImageIndex((prev) => 
        prev !== null ? Math.min(project.images.length - 1, prev + 1) : null
      );
    }
  }, [project?.images?.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!project) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-6xl mx-auto px-4 pt-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary">{t('projects.projectNotFound')}</h2>
            <Link to="/projects" className="text-primary hover:text-primary-dark underline mt-4 inline-block">
              {t('projects.backToProjects')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allProjectsList = Object.entries(projectsData).map(([s, p]) => ({
    slug: s,
    title: p.title,
    description: p.description,
    types: p.types || [],
    tech: Array.isArray(p.technologies) ? p.technologies : [],
    image: Array.isArray(p.images) ? p.images[0] : null,
  }));

  const normalize = (v) => (v || '').toString().toLowerCase();
  const setFrom = (arr) => new Set((arr || []).map(normalize));

  const currentTech = setFrom(project?.technologies);
  const currentTypes = setFrom(project?.types);

  const relatedProjects = allProjectsList
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const tech = setFrom(p.tech);
      const types = setFrom(p.types);
      const techOverlap = Array.from(currentTech).filter((x) => tech.has(x)).length;
      const typeOverlap = Array.from(currentTypes).filter((x) => types.has(x)).length;
      const score = techOverlap * 2 + typeOverlap;
      return { ...p, score, techOverlap, typeOverlap };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const cs = project.caseStudy || {};

  return (
    <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
      <Helmet>
        <title>{`${project.title} | ${t('projects.meta.title')}`}</title>
        <meta name="description" content={project.description} />
        <script type="application/ld+json">
          {JSON.stringify([
            buildCreativeWork({
              name: project.title,
              description: project.description,
              imageUrl: absoluteOgImage || 'https://half-half-man.com/images/og-image.jpg',
              url: canonicalUrl,
              authorName: 'Half Half Man',
            }),
            buildBreadcrumbList([
              { name: 'Home', url: '/' },
              { name: 'Projects', url: '/projects' },
              { name: project.title, url: `/projects/${slug}` },
            ]),
          ])}
        </script>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 pt-48 pb-12">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/projects"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-16 transition-colors duration-300"
          >
            {t('projects.backToProjects')}
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 mb-8 border border-[#e2e8f0]"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">{project.title}</h1>
          <p className="text-[17px] text-primary/80">{project.description}</p>
        </motion.div>

        {/* Case study structure */}
        <div className="space-y-8 mb-8">
          <div className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-[#e2e8f0]">
            <h2 className="text-2xl font-semibold text-primary mb-3">Context</h2>
            <p className="text-[17px] text-primary/80">{cs.context || project.description}</p>
          </div>

          <div className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-[#e2e8f0]">
            <h2 className="text-2xl font-semibold text-primary mb-3">Goals</h2>
            <ul className="space-y-2 text-[17px] text-primary/80">
              {(cs.goals || project.features || []).map((x, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary/60 mr-3"></span>
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-[#e2e8f0]">
            <h2 className="text-2xl font-semibold text-primary mb-3">Constraints</h2>
            <ul className="space-y-2 text-[17px] text-primary/80">
              {(cs.constraints || project.challenges || []).map((x, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary/60 mr-3"></span>
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-[#e2e8f0]">
            <h2 className="text-2xl font-semibold text-primary mb-3">Approach</h2>
            <ul className="space-y-2 text-[17px] text-primary/80">
              {(cs.approach || project.solutions || []).map((x, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary/60 mr-3"></span>
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-[#e2e8f0]">
            <h2 className="text-2xl font-semibold text-primary mb-3">Results</h2>
            <ul className="space-y-2 text-[17px] text-primary/80">
              {(cs.results || []).length > 0 ? (
                cs.results.map((x, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary/60 mr-3"></span>
                    {x}
                  </li>
                ))
              ) : (
                <li className="text-primary/70">Delivered a production-ready solution aligned with the goals.</li>
              )}
            </ul>

            {Array.isArray(cs.metrics) && cs.metrics.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-semibold text-primary/70 mb-2">Approx. metrics</div>
                <div className="flex flex-wrap gap-2">
                  {cs.metrics.map((m, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-[#e2e8f0]">
            <h2 className="text-2xl font-semibold text-primary mb-3">Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['frontend', 'backend', 'security', 'ops'].map((group) => (
                <div key={group} className="rounded-xl border border-primary/10 bg-white/60 p-4">
                  <div className="text-sm font-semibold text-primary mb-2">
                    {group.charAt(0).toUpperCase() + group.slice(1)}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(cs.stack?.[group] || []).length > 0 ? (
                      cs.stack[group].map((item, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-primary/60">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Images */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 mb-8 border border-[#e2e8f0]"
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">{t('projects.detail.projectGallery')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(project.images) && project.images.map((image, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleImageClick(index)}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                role="button"
                aria-label={t('projects.detail.viewImage')}
              >
                <img 
                  src={image} 
                  alt={`${project.title} - ${index + 1}`}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a 
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300 group"
          >
            {t('projects.detail.visitGithub')}
            <FaGithub className="ml-2 w-5 h-5 transform group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300"
          >
            {t('projects.detail.visitDemo')}
          </a>
        </motion.div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
              Related projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rp) => (
                <Link
                  key={rp.slug}
                  to={`/projects/${rp.slug}`}
                  className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-[#e2e8f0] hover:bg-[#f1f5f9]/90 transition-colors"
                >
                  <div className="text-lg font-semibold text-primary">{rp.title}</div>
                  <div className="mt-2 text-sm text-primary/80 line-clamp-3">
                    {rp.description}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(rp.types || []).slice(0, 2).map((type) => (
                      <span key={type} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {type}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
                aria-label={t('projects.detail.closeImage')}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                aria-label={t('projects.detail.previousImage')}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                aria-label={t('projects.detail.nextImage')}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <img
                src={project.images[selectedImageIndex]}
                alt={`${project.title} - ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectDetail; 