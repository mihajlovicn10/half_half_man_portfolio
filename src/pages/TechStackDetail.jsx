import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FaArrowLeft, FaPython, FaServer, FaGlobe } from 'react-icons/fa';
import { SiDjango } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

const TechStackDetail = () => {
  const { t, i18n } = useTranslation();
  const { category } = useParams();
  const navigate = useNavigate();

  const backendTools = [
    {
      name: t('techStack.backendSystems.name'),
      description: t('techStack.backendSystems.description'),
    },
    {
      name: t('techStack.frontendEngineering.name'),
      description: t('techStack.frontendEngineering.description'),
    },
    {
      name: t('techStack.apiIntegration.name'),
      description: t('techStack.apiIntegration.description'),
    },
    {
      name: t('techStack.databasesPersistence.name'),
      description: t('techStack.databasesPersistence.description'),
    },
    {
      name: t('techStack.deploymentArchitecture.name'),
      description: t('techStack.deploymentArchitecture.description'),
    },
    {
      name: t('techStack.architectureSystemsThinking.name'),
      description: t('techStack.architectureSystemsThinking.description'),
    }
  ];

  const frontendTools = [
    {
      name: t('techStack.webflowMastery.name'),
      description: t('techStack.webflowMastery.description'),
    },
    {
      name: t('techStack.xanoBackend.name'),
      description: t('techStack.xanoBackend.description'),
    },
    {
      name: t('techStack.wizedIntegrations.name'),
      description: t('techStack.wizedIntegrations.description'),
    },
  ];

  const securityTools = [
    {
      name: t('techStack.penetrationTesting.name'),
      description: t('techStack.penetrationTesting.description'),
    },
    {
      name: t('techStack.securityConsulting.name'),
      description: t('techStack.securityConsulting.description'),
    },
    {
      name: t('techStack.secureCodingAudits.name'),
      description: t('techStack.secureCodingAudits.description'),
    },
  ];

  const maintenanceTools = [
    {
      name: t('techStack.performanceOptimization.name'),
      description: t('techStack.performanceOptimization.description'),
    },
    {
      name: t('techStack.uptimeStability.name'),
      description: t('techStack.uptimeStability.description'),
    },
    {
      name: t('techStack.technicalLongevity.name'),
      description: t('techStack.technicalLongevity.description'),
    },
  ];

  const getCategoryData = () => ({
    'code-engineering': {
      title: t('techStack.categories.code.title'),
      description: t('techStack.categories.code.description'),
      icon:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /> ,
      tools: backendTools
    },
    'nocode-solutions': {
      title: t('techStack.categories.nocode.title'),
      description: t('techStack.categories.nocode.description'),
      icon:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      tools: frontendTools
    },
    'cybersecurity-practices': {
      title: t('techStack.categories.security.title'),
      description: t('techStack.categories.security.description'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
      tools: securityTools
    },
    'optimization-maintenance': {
      title: t('techStack.categories.optimization.title'),
      description: t('techStack.categories.optimization.description'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />,
      tools: maintenanceTools
    }
  });

  const currentCategory = getCategoryData()[category];

  if (!currentCategory) {
    return (
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa] flex items-center justify-center">
        <Card variant="primary" padding="large" className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">{t('techStack.categoryNotFound')}</h2>
          <Button variant="primary" onClick={() => navigate('/tech-stack')}>
            <FaArrowLeft className="mr-2" />
            {t('techStack.backToTechStack')}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${currentCategory.title} | ${t('common.brand')} - ${t('techStack.title')}`}</title>
        <meta 
          name="description" 
          content={t('techStack.meta.categoryDescription', {
            category: currentCategory.title.toLowerCase()
          })} 
        />
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-7xl mx-auto px-4 pt-48">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <Link 
              to="/tech-stack"
              className="inline-block mb-8 text-primary font-semibold hover:underline"
            >
              &larr; {t('techStack.backToTechStack')}
            </Link>
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
