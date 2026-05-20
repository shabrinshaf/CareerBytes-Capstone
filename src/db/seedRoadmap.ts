import db from '../config/db';
import { roadmapLevels, roles } from './schema';

// ─── Roles Data ───────────────────────────────────────────────────────────────

const rolesData = [
  {
    name: 'AI / Machine Learning Engineer',
    description:
      'Design, build, and deploy machine learning models and artificial intelligence systems to solve complex problems.',
    careerLevel: 'Senior',
    estimateYears: '4-5 Years',
    isPopular: true,
  },
  {
    name: 'Cloud Engineer',
    description:
      'Architect, migrate, and manage scalable and secure cloud infrastructure across public and private cloud providers.',
    careerLevel: 'Mid Career',
    estimateYears: '3-4 Years',
    isPopular: true,
  },
  {
    name: 'Cybersecurity Specialist',
    description:
      'Protect systems, networks, and data from cyber attacks, and ensure compliance with security standards.',
    careerLevel: 'Mid Career',
    estimateYears: '3-4 Years',
    isPopular: true,
  },
  {
    name: 'IT Auditor & Governance Specialist',
    description:
      'Evaluate IT infrastructure, ensure compliance with standards, and manage enterprise IT risks and governance.',
    careerLevel: 'Mid Career',
    estimateYears: '3-5 Years',
    isPopular: false,
  },
  {
    name: 'Data Analyst / Business Intelligence',
    description:
      'Analyze complex datasets and build interactive dashboards to extract meaningful insights that drive business decisions.',
    careerLevel: 'Entry Level',
    estimateYears: '1-2 Years',
    isPopular: true,
  },
  {
    name: 'DevOps Engineer',
    description:
      'Bridge development and operations by automating deployments, monitoring systems, and ensuring system reliability.',
    careerLevel: 'Mid Career',
    estimateYears: '3-4 Years',
    isPopular: false,
  },
  {
    name: 'UI/UX Designer',
    description:
      'Design intuitive and engaging digital experiences by understanding user needs and translating them into effective interfaces.',
    careerLevel: 'Mid Career',
    estimateYears: '3-4 Years',
    isPopular: true,
  },
  {
    name: 'Mobile Developer',
    description:
      'Build native or cross-platform mobile applications for iOS and Android platforms.',
    careerLevel: 'Mid Career',
    estimateYears: '2-3 Years',
    isPopular: false,
  },
  {
    name: 'Backend Engineer',
    description:
      'Design and implement server-side logic, databases, and APIs that power web applications.',
    careerLevel: 'Mid Career',
    estimateYears: '2-3 Years',
    isPopular: false,
  },
  {
    name: 'Frontend Developer',
    description:
      'Build responsive and interactive user interfaces using modern web technologies and frameworks.',
    careerLevel: 'Mid Career',
    estimateYears: '2-3 Years',
    isPopular: true,
  },
];

// ─── Roadmap Levels Data ──────────────────────────────────────────────────────

const roadmapData: Record<
  string,
  {
    level: string;
    levelLabel: string;
    description: string;
    skills: string[];
    tools: string[];
    order: number;
  }[]
> = {
  'AI / Machine Learning Engineer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Building strong foundations in math, programming, and data cleaning.',
      skills: ['Python', 'Statistics', 'Data Cleaning', 'SQL Basics'],
      tools: ['Python', 'Jupyter Notebook', 'Pandas'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description: 'Building and evaluating core machine learning models.',
      skills: [
        'Machine Learning',
        'Feature Engineering',
        'Model Evaluation',
        'Data Visualization',
      ],
      tools: ['Scikit-learn', 'Matplotlib', 'Seaborn'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Deploying neural networks at scale and driving MLOps pipelines.',
      skills: ['Deep Learning', 'MLOps', 'NLP', 'Model Deployment'],
      tools: ['TensorFlow', 'PyTorch', 'MLflow'],
      order: 3,
    },
  ],

  'Cloud Engineer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Understanding cloud concepts, networking, and basic storage.',
      skills: [
        'Cloud Fundamentals',
        'Linux Basics',
        'Networking Concepts',
        'Identity Management',
      ],
      tools: ['AWS Free Tier', 'Linux Terminal', 'Git'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Deploying infrastructure as code and managing compute services.',
      skills: [
        'Infrastructure as Code',
        'Cloud Architecture',
        'Serverless Computing',
        'Container Basics',
      ],
      tools: ['Terraform', 'AWS EC2/S3', 'Docker'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Designing highly available, multi-cloud setups and governance.',
      skills: [
        'Multi-cloud Strategy',
        'Cost Optimization',
        'Cloud Security Engineering',
        'Disaster Recovery',
      ],
      tools: ['AWS Organizations', 'Kubernetes', 'CloudWatch'],
      order: 3,
    },
  ],

  'Cybersecurity Specialist': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Learning fundamentals of security, cryptography, and network defense.',
      skills: [
        'Network Security',
        'Cryptography Basics',
        'Linux & Windows Security',
        'Threat Basics',
      ],
      tools: ['Wireshark', 'Nmap', 'Linux OS'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Conducting vulnerability assessments and handling incidents.',
      skills: [
        'Vulnerability Management',
        'Incident Response',
        'Penetration Testing',
        'Identity Security',
      ],
      tools: ['Burp Suite', 'Metasploit', 'Kali Linux'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Designing security architecture and leading security compliance.',
      skills: [
        'Security Architecture',
        'Threat Hunting',
        'DevSecOps',
        'Compliance Frameworks',
      ],
      tools: ['Splunk', 'SIEM Tools', 'Defensive AI Tools'],
      order: 3,
    },
  ],

  'IT Auditor & Governance Specialist': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Understanding IT controls, business processes, and audit basics.',
      skills: [
        'IT General Controls (ITGC)',
        'Internal Audit Basics',
        'Risk Management',
        'Documentation',
      ],
      tools: ['MS Excel', 'Visio', 'Notion'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Implementing IT governance frameworks and performing specialized audits.',
      skills: [
        'COBIT Framework',
        'ISO 27001 Basics',
        'Compliance Auditing',
        'Data Analytics for Audit',
      ],
      tools: ['ACL Robotics', 'Power BI', 'Jira'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Leading strategic IT governance, enterprise risk management, and regulatory compliance.',
      skills: [
        'Enterprise IT Governance',
        'SOX Compliance',
        'Risk Strategy',
        'Executive Reporting',
      ],
      tools: ['ServiceNow Governance', 'AuditBoard', 'Tableau'],
      order: 3,
    },
  ],

  'Data Analyst / Business Intelligence': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Learning to collect, clean, and visualize data effectively.',
      skills: ['Excel', 'SQL Basics', 'Data Cleaning', 'Basic Statistics'],
      tools: ['Excel', 'Google Sheets', 'Tableau'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Extracting deeper insights and building impactful, interactive dashboards.',
      skills: [
        'Advanced SQL',
        'Python (Pandas)',
        'Data Visualization',
        'A/B Testing',
      ],
      tools: ['Python', 'Power BI', 'PostgreSQL'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Driving strategic business decisions through data storytelling and modeling.',
      skills: [
        'Business Acumen',
        'Statistical Modeling',
        'Storytelling with Data',
        'Data Warehouse Modeling',
      ],
      tools: ['Jupyter Notebook', 'Looker', 'dbt'],
      order: 3,
    },
  ],

  'DevOps Engineer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Learning Linux, networking, and version control essentials.',
      skills: [
        'Linux Basics',
        'Git',
        'Networking Fundamentals',
        'Scripting (Bash)',
      ],
      tools: ['Git', 'Linux', 'VS Code'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description: 'Containerizing applications and building CI/CD pipelines.',
      skills: ['Docker', 'CI/CD', 'Infrastructure as Code', 'Cloud Basics'],
      tools: ['Docker', 'GitHub Actions', 'Terraform'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description: 'Orchestrating at scale and ensuring system reliability.',
      skills: [
        'Kubernetes',
        'Monitoring & Alerting',
        'Security (DevSecOps)',
        'Multi-cloud',
      ],
      tools: ['Kubernetes', 'Prometheus', 'AWS'],
      order: 3,
    },
  ],

  'UI/UX Designer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Building the foundation of visual communication and user empathy.',
      skills: ['User Research', 'Wireframing', 'Typography', 'Color Theory'],
      tools: ['Figma', 'Notion'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Mastering interaction patterns and shipping complex design systems.',
      skills: ['Auto Layout', 'Prototyping', 'Visual Design', 'Design System'],
      tools: ['Figma', 'Adobe XD'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Leading design vision, mentoring teams, and driving business strategy through UX.',
      skills: [
        'Leadership',
        'UX Strategy',
        'Design Operations',
        'Stakeholder Management',
      ],
      tools: ['Notion'],
      order: 3,
    },
  ],

  'Mobile Developer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description: 'Getting started with mobile development fundamentals.',
      skills: [
        'Dart/Kotlin/Swift Basics',
        'UI Components',
        'Navigation',
        'State Basics',
      ],
      tools: ['VS Code', 'Android Studio', 'Xcode'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description: 'Building real-world apps with APIs and local storage.',
      skills: [
        'REST API Integration',
        'State Management',
        'Local Storage',
        'Push Notifications',
      ],
      tools: ['Flutter', 'Firebase', 'Postman'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description: 'Publishing production apps and optimizing performance.',
      skills: [
        'Performance Optimization',
        'App Store Deployment',
        'Testing',
        'Native Modules',
      ],
      tools: ['Google Play Console', 'App Store Connect', 'Fastlane'],
      order: 3,
    },
  ],

  'Backend Engineer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Understanding server-side fundamentals and database basics.',
      skills: ['Node.js Basics', 'REST API Design', 'SQL Fundamentals', 'Git'],
      tools: ['VS Code', 'Postman', 'PostgreSQL'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Building secure, scalable APIs and working with production databases.',
      skills: [
        'Authentication & Authorization',
        'Database Design',
        'TypeScript',
        'Error Handling',
      ],
      tools: ['Express', 'Drizzle ORM', 'Docker'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Architecting distributed systems and ensuring high availability.',
      skills: [
        'System Design',
        'Microservices',
        'Caching',
        'Security Best Practices',
      ],
      tools: ['Redis', 'Kubernetes', 'AWS'],
      order: 3,
    },
  ],

  'Frontend Developer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description: 'Mastering the building blocks of the web.',
      skills: ['HTML/CSS', 'JavaScript Basics', 'Responsive Design', 'Git'],
      tools: ['VS Code', 'Git', 'Chrome DevTools'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Building modern, interactive web applications with frameworks.',
      skills: [
        'React',
        'TypeScript',
        'State Management',
        'REST API Integration',
      ],
      tools: ['React', 'TypeScript', 'Vite'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Optimizing performance and leading frontend architecture decisions.',
      skills: [
        'Performance Optimization',
        'Testing',
        'Next.js',
        'Web Accessibility',
      ],
      tools: ['Next.js', 'Jest', 'Webpack'],
      order: 3,
    },
  ],
};

// ─── Seed Function ────────────────────────────────────────────────────────────

const seed = async () => {
  console.log('Seeding roles...');

  await db.insert(roles).values(rolesData).onConflictDoNothing();

  const existingRoles = await db.select().from(roles);
  const roleMap = existingRoles.reduce(
    (acc, role) => {
      acc[role.name] = role.id;
      return acc;
    },
    {} as Record<string, number>,
  );

  console.log(`${existingRoles.length} roles tersedia!`);

  console.log('Seeding roadmap levels...');

  const levelsToInsert = Object.entries(roadmapData).flatMap(
    ([roleName, levels]) => {
      const roleId = roleMap[roleName];
      if (!roleId) {
        console.warn(
          `Warning: Role dengan nama "${roleName}" tidak ditemukan di database map.`,
        );
        return [];
      }
      return levels.map((level) => ({
        roleId,
        ...level,
      }));
    },
  );

  if (levelsToInsert.length > 0) {
    await db.insert(roadmapLevels).values(levelsToInsert).onConflictDoNothing();
    console.log(`${levelsToInsert.length} roadmap levels berhasil di-seed!`);
  } else {
    console.log('Tidak ada roadmap levels yang dimasukkan.');
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed gagal:', err);
  process.exit(1);
});
