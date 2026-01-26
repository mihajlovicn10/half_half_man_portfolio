// Central metadata for Tech Stack UX enhancements:
// - System map nodes/edges (interactive)
// - "Best for" per category
// - Related project/blog links per tool card

export const TECH_STACK_CATEGORY_META = {
  'code-engineering': {
    // Matches route: /tech-stack/code-engineering
    bestForKeys: ['mvp', 'educational', 'internalTools'],
  },
  'nocode-solutions': {
    bestForKeys: ['mvp', 'marketingSite', 'internalTools'],
  },
  'cybersecurity-practices': {
    bestForKeys: ['securityAudits', 'securityAutomation'],
  },
  'optimization-maintenance': {
    bestForKeys: ['performance', 'stability', 'securityHardening'],
  },
};

// Tool keys must match translation keys used in TechStackDetail.jsx
export const TECH_STACK_TOOL_RELATED = {
  backendSystems: {
    projects: ['welearngreek', 'secureaccess', 'bughunters'],
    posts: [],
  },
  frontendEngineering: {
    projects: ['portfolio', 'welearngreek'],
    posts: [],
  },
  apiIntegration: {
    projects: ['welearngreek', 'secureaccess'],
    posts: [],
  },
  databasesPersistence: {
    projects: ['welearngreek'],
    posts: [],
  },
  deploymentArchitecture: {
    projects: ['portfolio', 'webflow'],
    posts: [],
  },
  architectureSystemsThinking: {
    projects: ['portfolio'],
    posts: [],
  },

  webflowMastery: {
    projects: ['webflow'],
    posts: [],
  },
  xanoBackend: {
    projects: [],
    posts: [],
  },
  wizedIntegrations: {
    projects: [],
    posts: [],
  },

  penetrationTesting: {
    projects: ['bughunters'],
    posts: [],
  },
  securityConsulting: {
    projects: ['secureaccess', 'bughunters'],
    posts: [],
  },
  secureCodingAudits: {
    projects: ['portfolio', 'secureaccess'],
    posts: [],
  },

  performanceOptimization: {
    projects: ['portfolio'],
    posts: [],
  },
  uptimeStability: {
    projects: ['portfolio'],
    posts: [],
  },
  technicalLongevity: {
    projects: ['portfolio'],
    posts: [],
  },
};

export const TECH_STACK_SYSTEM_MAP = {
  // Each node navigates to a Tech Stack category + anchor.
  // `category` here is the route param slug, NOT the translation "key".
  nodes: [
    {
      id: 'reactTailwindVite',
      group: 'frontend',
      labelKey: 'techStack.systemMap.nodes.reactTailwindVite',
      to: { category: 'code-engineering', anchor: 'frontendEngineering' },
    },
    {
      id: 'webflow',
      group: 'frontend',
      labelKey: 'techStack.systemMap.nodes.webflow',
      to: { category: 'nocode-solutions', anchor: 'webflowMastery' },
    },

    {
      id: 'djangoNode',
      group: 'backend',
      labelKey: 'techStack.systemMap.nodes.djangoNode',
      to: { category: 'code-engineering', anchor: 'backendSystems' },
    },
    {
      id: 'xano',
      group: 'backend',
      labelKey: 'techStack.systemMap.nodes.xano',
      to: { category: 'nocode-solutions', anchor: 'xanoBackend' },
    },

    {
      id: 'penTesting',
      group: 'security',
      labelKey: 'techStack.systemMap.nodes.penTesting',
      to: { category: 'cybersecurity-practices', anchor: 'penetrationTesting' },
    },
    {
      id: 'secureCoding',
      group: 'security',
      labelKey: 'techStack.systemMap.nodes.secureCoding',
      to: { category: 'cybersecurity-practices', anchor: 'secureCodingAudits' },
    },

    {
      id: 'deployment',
      group: 'ops',
      labelKey: 'techStack.systemMap.nodes.deployment',
      to: { category: 'code-engineering', anchor: 'deploymentArchitecture' },
    },
    {
      id: 'monitoring',
      group: 'ops',
      labelKey: 'techStack.systemMap.nodes.monitoring',
      to: { category: 'optimization-maintenance', anchor: 'uptimeStability' },
    },
  ],
  edges: [
    { fromGroup: 'frontend', toGroup: 'backend' },
    { fromGroup: 'frontend', toGroup: 'ops' },
    { fromGroup: 'backend', toGroup: 'security' },
    { fromGroup: 'backend', toGroup: 'ops' },
    { fromGroup: 'security', toGroup: 'ops' },
  ],
  groups: [
    { id: 'frontend', labelKey: 'techStack.systemMap.groups.frontend' },
    { id: 'backend', labelKey: 'techStack.systemMap.groups.backend' },
    { id: 'security', labelKey: 'techStack.systemMap.groups.security' },
    { id: 'ops', labelKey: 'techStack.systemMap.groups.ops' },
  ],
};

