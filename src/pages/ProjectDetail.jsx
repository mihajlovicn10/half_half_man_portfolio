import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import ecommerceImage1 from '../assets/images/Projects/Detail/ecommerce_1.webp';
import ecommerceImage2 from '../assets/images/Projects/Detail/ecommerce_2.webp';
import ecommerceImage3 from '../assets/images/Projects/Detail/ecommerce_3.webp';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // This would typically come from an API or database
  // For now, we'll use static data
  const projectsData = {
    'secure-ecommerce': {
      title: "Secure E-commerce Platform",
      description: "A comprehensive e-commerce solution built with security at its core. This platform demonstrates the implementation of industry-standard security practices while maintaining excellent user experience.",
      technologies: ["Django", "React", "PostgreSQL", "Redis", "Docker"],
      features: [
        "Real-time inventory management",
        "Secure payment processing",
        "Advanced user authentication",
        "Automated security testing",
        "Performance optimization"
      ],
      challenges: [
        "Implementing real-time inventory updates across multiple servers",
        "Ensuring PCI compliance for payment processing",
        "Optimizing database queries for large-scale operations"
      ],
      solutions: [
        "Utilized WebSocket for real-time communication",
        "Implemented tokenization for sensitive data",
        "Developed custom caching solutions"
      ],
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
            <h2 className="text-2xl font-bold text-primary">Project not found</h2>
            <Link to="/projects" className="text-primary hover:text-primary-dark underline mt-4 inline-block">
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
      <div className="max-w-6xl mx-auto px-4 pt-48 pb-12">
        {/* Navigation */}
        <Link 
          to="/projects"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-16"
        >
          <svg className="w-5 h-5 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">{project.title}</h1>
          <p className="text-xl text-primary/80">{project.description}</p>
        </div>

        {/* Technologies */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-primary/80">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Challenges & Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Challenges</h2>
            <ul className="list-disc list-inside space-y-2 text-primary/80">
              {project.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Solutions</h2>
            <ul className="list-disc list-inside space-y-2 text-primary/80">
              {project.solutions.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Project Images */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <div 
                key={index} 
                className="rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-transform hover:scale-[1.02]"
                onClick={() => handleImageClick(index)}
              >
                <img 
                  src={image} 
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImageIndex !== null && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={handleCloseModal}
          >
            <div className="relative max-w-7xl mx-auto px-4 w-full">
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
                onClick={handleCloseModal}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image */}
              <img
                src={project.images[selectedImageIndex]}
                alt={`${project.title} screenshot ${selectedImageIndex + 1}`}
                className="max-h-[90vh] mx-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80">
                {selectedImageIndex + 1} / {project.images.length}
              </div>
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex justify-center space-x-6">
          <a 
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300"
          >
            View on GitHub
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
          </a>
          <a 
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300"
          >
            View Live Demo
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 