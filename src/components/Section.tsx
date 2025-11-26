import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className,
  fullWidth = false,
}) => {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-32 relative',
        className
      )}
    >
      <div className={cn('container mx-auto px-6', fullWidth ? 'max-w-none px-0' : '')}>
        {(title || subtitle) && (
          <div className="mb-16 md:mb-24">
            {subtitle && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary font-mono text-sm tracking-wider uppercase block mb-2"
              >
                {subtitle}
              </motion.span>
            )}
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold tracking-tight"
              >
                {title}
              </motion.h2>
            )}
            <div className="h-1 w-20 bg-primary mt-6 rounded-full opacity-50" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
