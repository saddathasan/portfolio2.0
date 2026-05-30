import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  delay?: number;
}

export function StatCard({ title, value, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="stat-card"
    >
      {icon && <div className="stat-icon">{icon}</div>}
      <motion.span
        className="stat-value"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        {typeof value === "number" ? value.toLocaleString() : value}
      </motion.span>
      <span className="stat-title">{title}</span>
    </motion.div>
  );
}
