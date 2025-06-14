import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'

const experiences = [
  {
    id: 'talvette',
    company: 'Talvette Limited',
    role: 'Software Engineer',
    period: 'Oct 2023 – Present',
    type: 'Full-time',
    achievements: [
      'Built a recruiting platform (Next.js + NestJS + PostgreSQL) → +75% user engagement',
      'JWT authentication → 99.9% uptime',
      'REST API optimization → 40% load time reduction',
      'Agile project management'
    ],
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'JWT', 'REST API']
  },
  {
    id: 'drk-cbd',
    company: 'DRK-CBD',
    role: 'Software Engineer',
    period: 'Apr 2023 – Oct 2023',
    type: 'Freelance',
    achievements: [
      'Migrated site from Shopify to MERN stack',
      'Improved scalability and sprint efficiency',
      'QA-tested and resolved critical bugs'
    ],
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Shopify']
  },
  {
    id: 'wunderman',
    company: 'Wunderman Thompson Studios',
    role: 'Web Developer',
    period: 'Jan 2022 – Mar 2023',
    type: 'Contract',
    achievements: [
      'Contracted for Dell and Microsoft projects'
    ],
    technologies: ['Node.js', 'JavaScript', 'SQL', 'Azure'],
    subExperiences: [
      {
        company: 'Dell',
        period: 'Dec 2022 – Mar 2023',
        achievements: [
          'Converted legacy data into email templates using Node.js → -35% email creation time',
          'Bash & Node cron scripts for timezone-aware delivery → <1% bounce rate',
          'SQL validators → improved CPL'
        ],
        technologies: ['Node.js', 'Bash', 'SQL', 'Email Templates']
      },
      {
        company: 'Microsoft',
        period: 'Jan 2022 – Nov 2022',
        achievements: [
          'Built a data curator plugin → -60% dev time',
          'Automated email verification → -65% scheduling time',
          'Responsive pages using Azure stack',
          'Wrote custom SQL queries for campaign data integration'
        ],
        technologies: ['Azure', 'SQL', 'JavaScript', 'Email Automation']
      }
    ]
  },
  {
    id: 'upb8',
    company: 'Upb8',
    role: 'Software Engineer',
    period: 'Dec 2019 – Dec 2021',
    type: 'Full-time',
    achievements: [
      'Built frontend UI from wireframes using JSX',
      'Used Redux for global state management',
      'Created SPAs using Next.js + Tailwind'
    ],
    technologies: ['React', 'JSX', 'Redux', 'Next.js', 'Tailwind CSS']
  }
]

export const Route = createFileRoute('/experience')({
  component: () => (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Professional Experience</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            4+ years of building scalable systems and delivering results for enterprise clients
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={exp.id} className="border rounded-lg px-6">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full text-left">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.company}</h3>
                        <p className="text-primary font-medium">{exp.role}</p>
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right">
                        <p>{exp.period}</p>
                        <Badge variant="outline" className="mt-1">{exp.type}</Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1.5 text-xs">●</span>
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.subExperiences && (
                        <div className="space-y-4 border-l-2 border-border pl-4 ml-2">
                          {exp.subExperiences.map((subExp, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <h5 className="font-medium text-primary">{subExp.company}</h5>
                                <span className="text-sm text-muted-foreground">{subExp.period}</span>
                              </div>
                              <ul className="space-y-1">
                                {subExp.achievements.map((achievement, j) => (
                                  <li key={j} className="flex items-start gap-2">
                                    <span className="text-primary mt-1.5 text-xs">○</span>
                                    <span className="text-sm text-muted-foreground">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {subExp.technologies.map((tech) => (
                                  <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Interested in my work?</CardTitle>
              <CardDescription>
                Download my full resume or connect with me on LinkedIn to learn more about my experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Download Resume
                </a>
                <a 
                  href="https://linkedin.com/in/saddathasan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  LinkedIn Profile
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  ),
})
