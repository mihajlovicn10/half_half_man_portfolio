import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
      <section className="w-full pb-12">
        <div className="max-w-6xl mx-auto px-4 pt-48">
          <h2 className="text-4xl font-serif font-bold text-center text-primary mb-20">
            Featured Projects — Where Code Meets Purpose
          </h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:bg-tertiary/5 border border-primary/10 cursor-pointer"
                onClick={() => toggle(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-2xl font-semibold text-primary">{project.title}</h3>
                      </div>
                      <p className="text-base text-primary/80 mt-2">{project.summary}</p>
                    </div>
                  </div>
                  <span className="text-primary/60 text-3xl font-light">{expanded === index ? '−' : '+'}</span>
                </div>
                {expanded === index && (
                  <div className="mt-6 flex justify-center">
                    <Link 
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300"
                    >
                      View Project Details
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
