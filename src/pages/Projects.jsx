import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import portfolioThumb from '../assets/images/Projects/List/portfolio_screenshot.png';
import welearngreekThumb from '../assets/images/Projects/List/wlg_home.png';
import secureAccessThumb from '../assets/images/Projects/List/saf_login.png';
import bughuntersThumb from '../assets/images/Projects/List/bht_home.png';
import webflowThumb from '../assets/images/Projects/List/webflow_home.png';
import { useSEO } from '../hooks/useSEO';
import { buildBreadcrumbList } from '../utils/structuredData';

const Projects = () => {
  const { t } = useTranslation();
  
  // SEO meta tags for Projects page
  useSEO({
    title: 'Projects | Half Half Man - Web Development Portfolio',
    description: 'Explore my portfolio of web development and security projects. From modern web applications to cybersecurity solutions.',
    image: 'https://half-half-man.com/images/og-image.jpg',
    type: 'website'
  });


  const [expandedSlug, setExpandedSlug] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState(() => new Set());
  const [selectedTypes, setSelectedTypes] = useState(() => new Set());
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 3;
  const listTopRef = useRef(null);
  const didMountRef = useRef(false);

  const projects = [
    {
      title: t('projects.items.portfolio.title'),
      slug: "portfolio",
      summary: t('projects.items.portfolio.summary'),
      thumbnail: portfolioThumb,
      tech: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'Sanity', 'SEO', 'Security'],
      types: ['Portfolio'],
    },
    {
      title: t('projects.items.welearngreek.title'),
      slug: "welearngreek",
      summary: t('projects.items.welearngreek.summary'),
      thumbnail: welearngreekThumb,
      tech: ['React', 'Vite', 'Django', 'PostgreSQL', 'REST API', 'JWT'],
      types: ['Edu', 'SaaS'],
    },
    {
      title: t('projects.items.secureaccess.title'),
      slug: "secureaccess",
      summary: t('projects.items.secureaccess.summary'),
      thumbnail: secureAccessThumb,
      tech: ['Django', 'OAuth', 'Python', 'Railway'],
      types: ['Security tool'],
    }, 
    {
      title: t('projects.items.bughunters.title'),
      slug: "bughunters",
      summary: t('projects.items.bughunters.summary'),
      thumbnail: bughuntersThumb,
      tech: ['Python', 'Django', 'Requests', 'Nmap', 'Railway'],
      types: ['Security tool'],
    }, 
    {
      title: t('projects.items.webflow.title'),
      slug: "webflow",
      summary: t('projects.items.webflow.summary'),
      thumbnail: webflowThumb,
      tech: ['Webflow', 'Netlify', 'Design'],
      types: ['Marketing site'],
    }
  ];

  const toggle = (slug) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  const normalize = (s) => (s || '').toString().toLowerCase().trim();

  const allTech = Array.from(
    new Set(projects.flatMap((p) => (Array.isArray(p.tech) ? p.tech : [])).map(normalize))
  )
    .filter(Boolean)
    .sort()
    .map((k) => {
      // keep original casing from first match
      const first = projects.flatMap((p) => p.tech || []).find((x) => normalize(x) === k);
      return first || k;
    });

  const allTypes = Array.from(
    new Set(projects.flatMap((p) => (Array.isArray(p.types) ? p.types : [])).map(normalize))
  )
    .filter(Boolean)
    .sort()
    .map((k) => {
      const first = projects.flatMap((p) => p.types || []).find((x) => normalize(x) === k);
      return first || k;
    });

  const filteredProjects = projects.filter((p) => {
    const q = normalize(query);
    const inText = !q || normalize(p.title).includes(q) || normalize(p.summary).includes(q);
    if (!inText) return false;

    const pTech = new Set((p.tech || []).map(normalize));
    const pTypes = new Set((p.types || []).map(normalize));

    const techOk =
      selectedTech.size === 0 || Array.from(selectedTech).some((tKey) => pTech.has(tKey));
    const typeOk =
      selectedTypes.size === 0 || Array.from(selectedTypes).some((tKey) => pTypes.has(tKey));

    return techOk && typeOk;
  });

  // Pagination (over filtered results)
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIdx = (safePage - 1) * PAGE_SIZE;
  const pagedProjects = filteredProjects.slice(startIdx, startIdx + PAGE_SIZE);

  // When paginating, scroll back to the top of the list (skip initial mount).
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const el = listTopRef.current;
    if (!el) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const NAV_OFFSET_PX = 96; // fixed navbar + breathing room
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }, [safePage]);

  useEffect(() => {
    // Reset pagination when filters/search change
    setPage(1);
    // Collapse any expanded card to avoid "missing" expanded item across pages
    setExpandedSlug(null);
  }, [query, selectedTech, selectedTypes]);

  const toggleSetValue = (setState, value) => {
    const key = normalize(value);
    setState((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const clearAll = () => {
    setQuery('');
    setSelectedTech(new Set());
    setSelectedTypes(new Set());
    setExpandedSlug(null);
    setPage(1);
  };

  // Restore scroll position and expanded project when navigating back from detail
  useEffect(() => {
    const storedState = sessionStorage.getItem('hhm_projects_state');
    if (!storedState) return;

    try {
      const { scrollY, expandedIndex, expandedSlug: storedSlug } = JSON.parse(storedState);

      if (typeof storedSlug === 'string') {
        setExpandedSlug(storedSlug);
      } else if (typeof expandedIndex === 'number' && projects[expandedIndex]) {
        setExpandedSlug(projects[expandedIndex].slug);
      }

      // Defer scroll until after paint to avoid layout thrash
      requestAnimationFrame(() => {
        window.scrollTo({
          top: typeof scrollY === 'number' ? scrollY : 0,
          behavior: 'instant',
        });
      });
    } catch (e) {
      console.error('Failed to restore projects state:', e);
    } finally {
      // Clear state so fresh visits to /projects don't use stale data
      sessionStorage.removeItem('hhm_projects_state');
    }
  }, [projects]);

  const handleProjectNavigate = (slugToStore) => {
    const expandedIndex = projects.findIndex((p) => p.slug === slugToStore);
    const state = {
      scrollY: window.scrollY,
      expandedIndex,
      expandedSlug: slugToStore || null,
      timestamp: Date.now(),
    };
    try {
      sessionStorage.setItem('hhm_projects_state', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist projects state:', e);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('projects.meta.title')}</title>
        <meta name="description" content={t('projects.meta.description')} />
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbList([
              { name: 'Home', url: '/' },
              { name: 'Projects', url: '/projects' },
            ])
          )}
        </script>
      </Helmet>
      <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] -mt-[64px] bg-gradient-to-b from-white to-[#e2f0fa]">
        <section className="w-full py-16">
          <div ref={listTopRef} className="max-w-6xl mx-auto px-4 pt-48">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-primary mb-4"
            >
              {t('projects.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-center text-primary/70 mb-12"
            >
              {t('projects.subtitle')}
            </motion.p>

            {/* Filters */}
            <div className="mb-10 bg-white/70 backdrop-blur-sm border border-primary/10 rounded-2xl p-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <label className="sr-only" htmlFor="project-search">
                      {t('projects.list.searchLabel')}
                    </label>
                    <input
                      id="project-search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={t('projects.list.searchPlaceholder')}
                      className="w-full rounded-xl border border-primary/10 bg-white px-4 py-2.5 text-sm text-primary placeholder:text-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <div className="text-sm text-primary/70">
                      {filteredProjects.length} / {projects.length}
                    </div>
                    <button
                      type="button"
                      className="text-sm font-semibold text-primary hover:underline"
                      onClick={clearAll}
                      disabled={query === '' && selectedTech.size === 0 && selectedTypes.size === 0 && !expandedSlug}
                    >
                      {t('projects.list.clearAll')}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <div className="text-xs font-semibold text-primary/70 mb-2">{t('projects.list.filters.technology')}</div>
                    <div className="flex flex-wrap gap-2">
                      {allTech.map((tech) => {
                        const active = selectedTech.has(normalize(tech));
                        return (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => toggleSetValue(setSelectedTech, tech)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                              active
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-primary border-primary/15 hover:bg-primary/5'
                            }`}
                            aria-pressed={active}
                          >
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-primary/70 mb-2">{t('projects.list.filters.projectType')}</div>
                    <div className="flex flex-wrap gap-2">
                      {allTypes.map((type) => {
                        const active = selectedTypes.has(normalize(type));
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleSetValue(setSelectedTypes, type)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                              active
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-primary border-primary/15 hover:bg-primary/5'
                            }`}
                            aria-pressed={active}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {pagedProjects.map((project, index) => (
                <motion.div 
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-[#f8fafc]/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 transition-all duration-300 hover:bg-[#f1f5f9]/90 border border-[#e2e8f0] cursor-pointer"
                  onClick={() => toggle(project.slug)}
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
                        alt={t('projects.items.ecommerce.thumbnail.alt')}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-primary mb-2">{project.title}</h3>
                    <p className="text-[17px] text-primary/80">{project.summary}</p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      {(project.types || []).map((type) => (
                        <span key={type} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {type}
                        </span>
                      ))}
                      {(project.tech || []).slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-full bg-white text-primary/80 text-xs font-medium border border-primary/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-primary/60 mt-2">{t('projects.featured')}</div>
                  </motion.div>
                  <AnimatePresence>
                    {expandedSlug === project.slug && (
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
                          <div className="text-[17px] text-primary/80 leading-relaxed relative z-10 flex justify-center">
                            <Link 
                              to={`/projects/${project.slug}`}
                              onClick={() => handleProjectNavigate(project.slug)}
                              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300 group"
                            >
                              {t('projects.viewDetails')}
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

            {/* Pagination */}
            {filteredProjects.length > PAGE_SIZE && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <div className="text-sm text-primary/70">
                  {t('projects.list.pagination.pageOf', { page: safePage, total: totalPages })}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    className="px-3 py-2 rounded-lg border border-primary/15 bg-white text-primary text-sm font-semibold disabled:opacity-50"
                  >
                    {t('common.prev')}
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const n = i + 1;
                    const active = n === safePage;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setPage(n)}
                        className={`w-10 h-10 rounded-lg border text-sm font-semibold transition-colors ${
                          active
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-primary border-primary/15 hover:bg-primary/5'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {n}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage === totalPages}
                    className="px-3 py-2 rounded-lg border border-primary/15 bg-white text-primary text-sm font-semibold disabled:opacity-50"
                  >
                    {t('common.next')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
