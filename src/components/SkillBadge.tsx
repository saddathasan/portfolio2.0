import React from 'react';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ name, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary/80 transition-colors cursor-default"
    >
      {icon && <span className="text-primary">{icon}</span>}
      <span className="font-medium text-sm">{name}</span>
    </motion.div>
  );
};
