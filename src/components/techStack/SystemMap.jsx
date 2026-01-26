import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../common/Card';
import { TECH_STACK_SYSTEM_MAP } from '../../data/techStackMeta';

const groupOrder = ['frontend', 'backend', 'security', 'ops'];

const NodeButton = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-primary/15 bg-white/70 px-3 py-2 text-left text-sm font-semibold text-primary transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
    >
      {label}
    </button>
  );
};

const SystemMap = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const groups = useMemo(() => {
    const map = new Map();
    TECH_STACK_SYSTEM_MAP.groups.forEach((g) => map.set(g.id, { ...g, nodes: [] }));
    TECH_STACK_SYSTEM_MAP.nodes.forEach((n) => {
      const g = map.get(n.group);
      if (!g) return;
      g.nodes.push(n);
    });
    return groupOrder.map((id) => map.get(id)).filter(Boolean);
  }, []);

  const handleNodeClick = (node) => {
    const anchor = node?.to?.anchor ? `#${node.to.anchor}` : '';
    navigate(`/tech-stack/${node.to.category}${anchor}`);
  };

  return (
    <Card
      variant="primary"
      padding="large"
      className="relative overflow-hidden bg-white/60 backdrop-blur-sm border border-primary/10"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-primary">{t('techStack.systemMap.title')}</h2>
        <p className="text-primary/70">{t('techStack.systemMap.subtitle')}</p>
      </div>

      {/* Desktop map */}
      <div className="relative mt-6 hidden md:block">
        <div className="grid grid-cols-4 gap-4">
          {groups.map((g) => (
            <div key={g.id} className="relative">
              <div className="mb-3 rounded-xl bg-primary/10 px-3 py-2 text-sm font-bold text-primary">
                {t(g.labelKey)}
              </div>
              <div className="space-y-2">
                {g.nodes.map((node) => (
                  <NodeButton
                    key={node.id}
                    label={t(node.labelKey)}
                    onClick={() => handleNodeClick(node)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Simple connector overlay (group-to-group) */}
        <svg
          className="pointer-events-none absolute inset-0"
          viewBox="0 0 1000 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Frontend -> Backend */}
          <path d="M125 40 C 250 40, 250 40, 375 40" fill="none" stroke="rgba(2, 44, 90, 0.35)" strokeWidth="2" />
          {/* Frontend -> Ops */}
          <path d="M125 55 C 300 120, 650 120, 875 55" fill="none" stroke="rgba(2, 44, 90, 0.25)" strokeWidth="2" />
          {/* Backend -> Security */}
          <path d="M375 40 C 500 40, 500 40, 625 40" fill="none" stroke="rgba(2, 44, 90, 0.35)" strokeWidth="2" />
          {/* Backend -> Ops */}
          <path d="M375 55 C 520 120, 720 120, 875 55" fill="none" stroke="rgba(2, 44, 90, 0.25)" strokeWidth="2" />
          {/* Security -> Ops */}
          <path d="M625 40 C 750 40, 750 40, 875 40" fill="none" stroke="rgba(2, 44, 90, 0.35)" strokeWidth="2" />
        </svg>
      </div>

      {/* Mobile map (stacked) */}
      <div className="mt-6 md:hidden">
        <div className="space-y-4">
          {groups.map((g, idx) => (
            <div key={g.id}>
              <div className="rounded-xl bg-primary/10 px-3 py-2 text-sm font-bold text-primary">
                {t(g.labelKey)}
              </div>
              <div className="mt-2 space-y-2">
                {g.nodes.map((node) => (
                  <NodeButton
                    key={node.id}
                    label={t(node.labelKey)}
                    onClick={() => handleNodeClick(node)}
                  />
                ))}
              </div>
              {idx < groups.length - 1 && (
                <div className="mt-3 flex justify-center text-primary/40" aria-hidden="true">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SystemMap;

