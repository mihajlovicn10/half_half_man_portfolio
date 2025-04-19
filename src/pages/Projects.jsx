import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import ecommerceThumb from '../assets/images/Projects/List/ecommerce.webp';

const Projects = () => {
  const [expanded, setExpanded] = useState(null);

  const projects = [
    {
      title: "Secure E-commerce Platform",
      slug: "secure-ecommerce",
      summary: "A full-stack e-commerce solution with advanced security features. Built with Django REST Framework and React, featuring real-time inventory management and secure payment processing.",
      thumbnail: ecommerceThumb
    }
  ];

  const toggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Projects | Half Half Man - Portfolio of Web Development & Security Solutions</title>
        <meta name="description" content="Explore my portfolio of web development and cybersecurity projects. From secure e-commerce platforms to custom business solutions." />
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <section className="w-full py-16">
          <div className="max-w-6xl mx-auto px-4 pt-48">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-primary mb-12"
            >
              Featured Projects — Where Code Meets Purpose
            </motion.h1>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 transition-all duration-300 hover:bg-[#f1f5f9]/90 border border-[#e2e8f0] cursor-pointer"
                  onClick={() => toggle(index)}
                  layout
                >
                  <motion.div layout className="flex flex-col items-center text-center">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-24 h-24 rounded-xl overflow-hidden shadow-md ring-2 ring-primary/20 mb-4"
                    >
                      <img 
                        src={project.thumbnail} 
                        alt={`${project.title} - Project thumbnail`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-primary mb-2">{project.title}</h3>
                    <p className="text-[17px] text-primary/80">{project.summary}</p>
                    <div className="text-sm text-primary/60 mt-2">Featured Project</div>
                  </motion.div>
                  <AnimatePresence>
                    {expanded === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="mt-6 relative lg:max-w-3xl mx-auto bg-gradient-to-br from-[#f8fafc]/50 to-white/30 backdrop-blur-sm rounded-xl p-8"
                        >
                          <span className="absolute -left-4 -top-4 text-6xl text-primary/10 font-serif">"</span>
                          <div className="text-[17px] text-primary/80 leading-relaxed relative z-10">
                            <Link 
                              to={`/projects/${project.slug}`}
                              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300 group"
                            >
                              View Project Details
                              <svg 
                                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </div>
                          <span className="absolute -bottom-8 right-0 text-6xl text-primary/10 font-serif">"</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
