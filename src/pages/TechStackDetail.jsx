import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FaArrowLeft, FaPython, FaServer } from 'react-icons/fa';
import { SiDjango } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

const TechStackDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // This will be replaced with actual data fetching
  const categoryData = {
    'backend-development': {
      title: 'Backend Development',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      description: 'Robust server-side solutions with Python, Node.js, and modern frameworks',
      tools: [
        {
          name: 'Python',
          description: 'High-level programming language for general-purpose programming',
          icon: <FaPython />
        },
        {
          name: 'Django',
          description: 'High-level Python web framework that enables rapid development',
          icon: <SiDjango className="w-10 h-10 text-primary" />
        },
        {
          name: 'REST API',
          description: 'Architectural style for designing networked applications',
          icon: <TbApi className="w-10 h-10 text-primary" />
        },
        {
          name: 'Node.js',
          description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        },
        {
          name: 'Express',
          description: 'Fast, unopinionated, minimalist web framework for Node.js',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        },
        {
          name: 'PostgreSQL',
          description: 'Advanced open source relational database',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        }
      ]
    },
    'frontend-development': {
      title: 'Frontend Development',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
      description: 'Modern, responsive interfaces built with React and cutting-edge tools',
      tools: [
        {
          name: 'React',
          description: 'JavaScript library for building user interfaces',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        },
        {
          name: 'Next.js',
          description: 'React framework for production-grade applications',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        },
        {
          name: 'Tailwind CSS',
          description: 'Utility-first CSS framework for rapid UI development',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        }
      ]
    },
    'cybersecurity': {
      title: 'Cybersecurity',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
      description: 'Comprehensive security solutions and penetration testing',
      tools: [
        {
          name: 'Burp Suite',
          description: 'Advanced platform for web application security testing',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        },
        {
          name: 'Metasploit',
          description: 'Penetration testing framework for security assessment',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        },
        {
          name: 'Nmap',
          description: 'Network discovery and security auditing tool',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        }
      ]
    },
    'maintenance-and-optimization': {
      title: 'Maintenance and Optimization',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />,
      description: 'Performance optimization, monitoring, and continuous improvement',
      tools: [
        {
          name: 'Docker',
          description: 'Platform for developing, shipping, and running applications',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        },
        {
          name: 'Kubernetes',
          description: 'Container orchestration platform for automated deployment',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        },
        {
          name: 'Git',
          description: 'Distributed version control system',
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        }
      ]
    }
  };

  const currentCategory = categoryData[category];

  if (!currentCategory) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa] flex items-center justify-center">
        <Card variant="primary" padding="large" className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Category not found</h2>
          <Button variant="primary" onClick={() => navigate('/tech-stack')}>
            <FaArrowLeft className="mr-2" />
            Back to Tech Stack
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${currentCategory.title} | Half Half Man - Tech Stack`}</title>
        <meta name="description" content={`Explore ${currentCategory.title.toLowerCase()} tools and technologies used by Half Half Man`} />
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-7xl mx-auto px-4 pt-48">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <Button
              variant="primary"
              onClick={() => navigate('/tech-stack')}
              className="mb-8 inline-flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Back to Tech Stack
            </Button>
            <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center mb-6 mx-auto">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {currentCategory.icon}
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {currentCategory.title}
            </h1>
            <p className="text-xl text-primary/70">
              {currentCategory.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCategory.tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  variant="primary"
                  padding="large"
                  className="h-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6"
                  >
                    {React.isValidElement(tool.icon) && tool.icon.type === FaPython ? (
                      <FaPython className="w-10 h-10 text-primary" />
                    ) : React.isValidElement(tool.icon) && tool.icon.type === SiDjango ? (
                      tool.icon
                    ) : React.isValidElement(tool.icon) && tool.icon.type === TbApi ? (
                      tool.icon
                    ) : (
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {tool.icon}
                      </svg>
                    )}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-primary/70">
                    {tool.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TechStackDetail;
