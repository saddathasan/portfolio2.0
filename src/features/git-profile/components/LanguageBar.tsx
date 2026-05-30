import { motion } from "framer-motion";

interface LanguageBarProps {
  languages: { name: string; percentage: number; color: string }[];
  delay?: number;
}

export function LanguageBar({ languages, delay = 0 }: LanguageBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="language-bar-container"
    >
      <h3 className="language-title">Top Languages</h3>
      <div className="language-bar">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            className="language-segment"
            style={{ backgroundColor: lang.color }}
            initial={{ width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{ duration: 0.8, delay: delay + index * 0.1 }}
            title={`${lang.name}: ${lang.percentage}%`}
          />
        ))}
      </div>
      <div className="language-legend">
        {languages.map((lang) => (
          <div key={lang.name} className="language-item">
            <span
              className="language-dot"
              style={{ backgroundColor: lang.color }}
            />
            <span className="language-name">{lang.name}</span>
            <span className="language-percent">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
