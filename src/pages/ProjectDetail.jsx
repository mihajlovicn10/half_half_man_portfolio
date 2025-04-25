import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ecommerceImage1 from '../assets/images/Projects/Detail/ecommerce_1.webp';
import ecommerceImage2 from '../assets/images/Projects/Detail/ecommerce_2.webp';
import ecommerceImage3 from '../assets/images/Projects/Detail/ecommerce_3.webp';

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // This would typically come from an API or database
  // For now, we'll use static data
  const projectsData = {
    'secure-ecommerce': {
      title: t('projects.items.ecommerce.title'),
      description: t('projects.items.ecommerce.description'),
      technologies: ["Django", "React", "PostgreSQL", "Redis", "Docker"],
      features: t('projects.items.ecommerce.features', { returnObjects: true }),
      challenges: t('projects.items.ecommerce.challenges', { returnObjects: true }),
      solutions: t('projects.items.ecommerce.solutions', { returnObjects: true }),
      images: [
        ecommerceImage1,
        ecommerceImage2,
        ecommerceImage3
      ],
      githubLink: "https://github.com/yourusername/secure-ecommerce",
      liveDemo: "https://secure-ecommerce-demo.com"
    }
  };

  useEffect(() => {
    // Since projectsData is an object, we access it directly using the slug
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
            <svg className="w-5 h-5 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
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
            {project.technologies.map((tech, index) => (
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
            {project.features.map((feature, index) => (
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
              {project.challenges.map((challenge, index) => (
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
              {project.solutions.map((solution, index) => (
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
            {project.images.map((image, index) => (
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
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300"
          >
            {t('projects.detail.visitGithub')}
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