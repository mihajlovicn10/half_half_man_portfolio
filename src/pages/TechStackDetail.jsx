import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { useSEO } from '../hooks/useSEO';
import { generateCanonicalUrl } from '../utils/seo';
import { buildBreadcrumbList } from '../utils/structuredData';
import { TECH_STACK_CATEGORY_META, TECH_STACK_TOOL_RELATED } from '../data/techStackMeta';

const TechStackDetail = () => {
  const { t, i18n } = useTranslation();
  const { category } = useParams();
  const navigate = useNavigate();
  const canonicalUrl = typeof window !== 'undefined'
    ? generateCanonicalUrl(window.location.pathname)
    : 'https://half-half-man.com/tech-stack';

  const backendTools = [
    {
      key: 'backendSystems',
      name: t('techStack.backendSystems.name'),
      description: t('techStack.backendSystems.description'),
    },
    {
      key: 'frontendEngineering',
      name: t('techStack.frontendEngineering.name'),
      description: t('techStack.frontendEngineering.description'),
    },
    {
      key: 'apiIntegration',
      name: t('techStack.apiIntegration.name'),
      description: t('techStack.apiIntegration.description'),
    },
    {
      key: 'databasesPersistence',
      name: t('techStack.databasesPersistence.name'),
      description: t('techStack.databasesPersistence.description'),
    },
    {
      key: 'deploymentArchitecture',
      name: t('techStack.deploymentArchitecture.name'),
      description: t('techStack.deploymentArchitecture.description'),
    },
    {
      key: 'architectureSystemsThinking',
      name: t('techStack.architectureSystemsThinking.name'),
      description: t('techStack.architectureSystemsThinking.description'),
    }
  ];

  const frontendTools = [
    {
      key: 'webflowMastery',
      name: t('techStack.webflowMastery.name'),
      description: t('techStack.webflowMastery.description'),
    },
    {
      key: 'xanoBackend',
      name: t('techStack.xanoBackend.name'),
      description: t('techStack.xanoBackend.description'),
    },
    {
      key: 'wizedIntegrations',
      name: t('techStack.wizedIntegrations.name'),
      description: t('techStack.wizedIntegrations.description'),
    },
  ];

  const securityTools = [
    {
      key: 'penetrationTesting',
      name: t('techStack.penetrationTesting.name'),
      description: t('techStack.penetrationTesting.description'),
    },
    {
      key: 'securityConsulting',
      name: t('techStack.securityConsulting.name'),
      description: t('techStack.securityConsulting.description'),
    },
    {
      key: 'secureCodingAudits',
      name: t('techStack.secureCodingAudits.name'),
      description: t('techStack.secureCodingAudits.description'),
    },
  ];

  const maintenanceTools = [
    {
      key: 'performanceOptimization',
      name: t('techStack.performanceOptimization.name'),
      description: t('techStack.performanceOptimization.description'),
    },
    {
      key: 'uptimeStability',
      name: t('techStack.uptimeStability.name'),
      description: t('techStack.uptimeStability.description'),
    },
    {
      key: 'technicalLongevity',
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
  const bestForKeys = TECH_STACK_CATEGORY_META[category]?.bestForKeys || [];
  const [highlightedId, setHighlightedId] = useState(null);
  const highlightTimerRef = useRef(null);

  const projectTitleForSlug = useMemo(() => {
    return (slug) => {
      const key = `projects.items.${slug}.title`;
      const v = t(key);
      return v && typeof v === 'string' && v !== key ? v : slug;
    };
  }, [t]);

  useEffect(() => {
    // Anchor navigation for deep links from the system map.
    if (typeof window === 'undefined') return;
    const hash = window.location.hash || '';
    const id = hash.startsWith('#') ? hash.slice(1) : '';
    if (!id) return;

    // Defer until after paint.
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const NAV_OFFSET_PX = 96;
      const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      setHighlightedId(id);
      clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = setTimeout(() => setHighlightedId(null), 1800);
    });

    return () => {
      clearTimeout(highlightTimerRef.current);
    };
  }, [category]);

  useSEO({
    title: currentCategory ? `${currentCategory.title} | ${t('techStack.title')}` : `${t('techStack.title')}`,
    description: currentCategory
      ? t('techStack.meta.categoryDescription', { category: currentCategory.title.toLowerCase() })
      : t('techStack.meta.description'),
    image: 'https://half-half-man.com/images/og-image.jpg',
    type: 'website',
  });

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
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbList([
              { name: 'Home', url: '/' },
              { name: 'Tech Stack', url: '/tech-stack' },
              { name: currentCategory.title, url: `/tech-stack/${category}` },
            ])
          )}
        </script>
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <div className="max-w-7xl mx-auto px-4 pt-48 pb-24">
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

            {/* Best for */}
            {bestForKeys.length > 0 && (
              <div className="mt-6">
                <div className="text-sm font-semibold text-primary/80">
                  {t('techStack.bestForLabel')}
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {bestForKeys.map((k) => (
                    <span
                      key={k}
                      className="px-2.5 py-1 rounded-full bg-white/70 text-primary text-xs font-semibold border border-primary/10"
                    >
                      {t(`techStack.bestFor.${k}`)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCategory.tools.map((tool, index) => {
              const related = TECH_STACK_TOOL_RELATED[tool.key] || { projects: [], posts: [] };
              const isHighlighted = highlightedId === tool.key;

              return (
              <motion.div
                key={tool.key || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div id={tool.key}>
                  <Card
                    variant="primary"
                    padding="large"
                    className={[
                      'h-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex flex-col items-center text-center',
                      isHighlighted ? 'ring-2 ring-primary/40' : '',
                    ].join(' ')}
                  >
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-primary/70">
                      {tool.description}
                    </p>

                    {/* Related links */}
                    <div className="mt-6 w-full border-t border-primary/10 pt-4 text-left">
                      <div className="text-xs font-semibold text-primary/70">
                        {t('techStack.related.projectsLabel')}
                      </div>
                      {Array.isArray(related.projects) && related.projects.length > 0 ? (
                        <ul className="mt-2 space-y-1">
                          {related.projects.map((slug) => (
                            <li key={slug}>
                              <Link
                                to={`/projects/${slug}`}
                                className="text-sm font-semibold text-primary hover:underline"
                              >
                                {projectTitleForSlug(slug)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="mt-2 text-sm text-primary/60">
                          {t('techStack.related.noneYet')}
                        </div>
                      )}

                      <div className="mt-4 text-xs font-semibold text-primary/70">
                        {t('techStack.related.postsLabel')}
                      </div>
                      {Array.isArray(related.posts) && related.posts.length > 0 ? (
                        <ul className="mt-2 space-y-1">
                          {related.posts.map((slug) => (
                            <li key={slug}>
                              <Link
                                to={`/blog/${slug}`}
                                className="text-sm font-semibold text-primary hover:underline"
                              >
                                {slug}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="mt-2 text-sm text-primary/60">
                          <Link to="/blog" className="font-semibold text-primary hover:underline">
                            {t('techStack.related.seeAllPosts')}
                          </Link>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TechStackDetail;
