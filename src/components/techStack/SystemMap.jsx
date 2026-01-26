import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';
import Card from '../common/Card';
import { TECH_STACK_SYSTEM_MAP } from '../../data/techStackMeta';

const groupOrder = ['frontend', 'backend', 'security', 'ops'];

const NodeButton = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-primary/15 bg-white/70 px-3 py-2 text-left text-sm font-semibold text-primary transition-all duration-200 hover:bg-white hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
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
      className="relative overflow-hidden bg-gradient-to-br from-white/80 via-white/60 to-[#e2f0fa]/70 backdrop-blur-sm border border-primary/10"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-primary">{t('techStack.systemMap.title')}</h2>
        <p className="text-primary/70">{t('techStack.systemMap.subtitle')}</p>
      </div>

      {/* High-level flow (layers) */}
      <div className="mt-6 hidden md:flex items-center justify-center gap-3 text-sm font-medium text-primary/80">
        {groups.map((g, idx) => (
          <React.Fragment key={g.id}>
            <div className="rounded-full bg-white/90 px-4 py-1.5 shadow-sm border border-primary/10">
              {t(g.labelKey)}
            </div>
            {idx < groups.length - 1 && (
              <FaArrowRight className="text-primary/40" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Desktop map */}
      <div className="relative mt-8 hidden md:block">
        <div className="grid grid-cols-4 gap-6">
          {groups.map((g) => (
            <div key={g.id} className="relative group">
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

