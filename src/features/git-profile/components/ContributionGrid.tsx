import { motion } from "framer-motion";

interface ContributionGridProps {
  calendar: {
    weeks: {
      contributionDays: {
        contributionCount: number;
        date: string;
        color: string;
      }[];
    }[];
  };
  delay?: number;
}

export function ContributionGrid({ calendar, delay = 0 }: ContributionGridProps) {
  // Take last 20 weeks for display
  const recentWeeks = calendar.weeks.slice(-20);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="contribution-grid-container"
    >
      <h3 className="contribution-title">Contribution Activity</h3>
      <div className="contribution-grid">
        {recentWeeks.map((week, weekIndex) => (
          <div key={weekIndex} className="contribution-week">
            {week.contributionDays.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                className="contribution-day"
                style={{
                  backgroundColor: day.contributionCount > 0 ? day.color : "var(--contribution-empty)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: delay + weekIndex * 0.02 + dayIndex * 0.01,
                }}
                title={`${day.date}: ${day.contributionCount} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
