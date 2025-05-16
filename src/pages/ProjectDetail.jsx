import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
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

  const projectsData = {
    'portfolio': {
      title: t('projects.items.portfolio.title'),
      description: t('projects.items.portfolio.description'),
      technologies: ["ReactJS", "Vite", "TailwindCSS", "Framer Motion", "React Router", "react-helmet-async", "i18next", "Formspree", "Calendly(InlineWidget)", "Google Analytics", "Adjusted Virtual Assistant", "Google Analytics", "DOMPurify", "CSP Headers", "Rate limiting", "Heroku", "GitHub", "Sanity CMS"],
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

  return (
    <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
      <Helmet>
        <title>{`${project.title} | ${t('projects.meta.title')}`}</title>
        <meta name="description" content={project.description} />
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

        {/* Technologies */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 mb-8 border border-[#e2e8f0]"
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">{t('projects.detail.technologiesUsed')}</h2>
          <div className="flex flex-wrap gap-3">
            {Array.isArray(project.technologies) && project.technologies.map((tech, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 mb-8 border border-[#e2e8f0]"
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">{t('projects.detail.keyFeatures')}</h2>
          <ul className="space-y-2 text-[17px] text-primary/80">
            {Array.isArray(project.features) && project.features.map((feature, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center"
              >
                <span className="w-2 h-2 rounded-full bg-primary/60 mr-3"></span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Challenges & Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-[#e2e8f0]"
          >
            <h2 className="text-2xl font-semibold text-primary mb-4">{t('projects.detail.challenges')}</h2>
            <ul className="space-y-2 text-[17px] text-primary/80">
              {Array.isArray(project.challenges) && project.challenges.map((challenge, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <span className="w-2 h-2 rounded-full bg-primary/60 mr-3"></span>
                  {challenge}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-[#e2e8f0]"
          >
            <h2 className="text-2xl font-semibold text-primary mb-4">{t('projects.detail.solutions')}</h2>
            <ul className="space-y-2 text-[17px] text-primary/80">
              {Array.isArray(project.solutions) && project.solutions.map((solution, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <span className="w-2 h-2 rounded-full bg-primary/60 mr-3"></span>
                  {solution}
                </motion.li>
              ))}
            </ul>
          </motion.div>
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