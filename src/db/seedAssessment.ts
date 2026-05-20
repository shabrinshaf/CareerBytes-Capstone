import db from '../config/db';
import { roles, quizQuestions } from './schema';

const rolesData = [
  {
    name: 'UI/UX Designer',
    description: 'Design intuitive and engaging digital experiences',
  },
  {
    name: 'Frontend Developer',
    description: 'Membangun user interface dan pengalaman pengguna',
  },
  {
    name: 'Backend Engineer',
    description: 'Membangun dan maintain server-side applications',
  },
  {
    name: 'Data Analyst',
    description: 'Menganalisis data untuk menghasilkan insight bisnis',
  },
  {
    name: 'Product Manager',
    description: 'Mengelola produk dari ideasi hingga peluncuran',
  },
];

const questionsData = [
  {
    role: 'UI/UX Designer',
    questionType: 'rating',
    skillName: 'User Research',
    difficulty: 'intermediate',
    question: 'How familiar are you with User Research?',
    hint: 'Think about user interviews, surveys, and usability testing.',
    explanation:
      'User research helps understand user needs before designing solutions.',
  },

  {
    role: 'UI/UX Designer',
    questionType: 'rating',
    skillName: 'Wireframing',
    difficulty: 'basic',
    question: 'How familiar are you with Wireframing?',
    hint: 'Consider your experience with low-fidelity and high-fidelity wireframes.',
    explanation:
      'Wireframing is a core skill for structuring layouts before visual design.',
  },

  {
    role: 'UI/UX Designer',
    questionType: 'rating',
    skillName: 'Visual Design',
    difficulty: 'intermediate',
    question: 'How familiar are you with Visual Design principles?',
    hint: 'Think about color theory, typography, spacing, and visual hierarchy.',
    explanation:
      'Visual design creates aesthetically pleasing interfaces that guide users.',
  },

  {
    role: 'UI/UX Designer',
    questionType: 'rating',
    skillName: 'Typography',
    difficulty: 'basic',
    question: 'How familiar are you with Typography in UI design?',
    hint: 'Consider font pairing, hierarchy, readability, and type scale.',
    explanation:
      'Good typography improves readability and establishes visual hierarchy.',
  },

  {
    role: 'UI/UX Designer',
    questionType: 'rating',
    skillName: 'Prototyping',
    difficulty: 'intermediate',
    question: 'How familiar are you with Prototyping?',
    hint: 'Think about interactive prototypes in Figma or similar tools.',
    explanation: 'Prototyping allows testing interactions before development.',
  },

  {
    role: 'UI/UX Designer',
    questionType: 'rating',
    skillName: 'Design System',
    difficulty: 'advanced',
    question: 'How familiar are you with Design Systems?',
    hint: 'Consider component libraries, tokens, and documentation.',
    explanation:
      'Design systems ensure consistency across products and speed up design.',
  },

  {
    role: 'UI/UX Designer',
    questionType: 'rating',
    skillName: 'Auto Layout',
    difficulty: 'intermediate',
    question: 'How familiar are you with Auto Layout in Figma?',
    hint: 'Think about responsive components and flexible frames.',
    explanation:
      'Auto layout enables responsive and reusable component design.',
  },

  {
    role: 'UI/UX Designer',
    questionType: 'rating',
    skillName: 'UX Strategy',
    difficulty: 'advanced',
    question: 'How familiar are you with UX Strategy?',
    hint: 'Consider how UX connects to business goals and long-term product vision.',
    explanation:
      'UX Strategy aligns design decisions with business and user objectives.',
  },

  {
    role: 'UI/UX Designer',
    questionType: 'essay',
    skillName: 'Wireframing',
    difficulty: 'intermediate',
    question:
      'How would you approach designing wireframes for a task management mobile app feature?',
    scenario:
      'I would start by identifying the main user flow, such as creating, viewing, and completing tasks. Then I would sketch simple layouts for each screen before recreating them in Figma as low-fidelity wireframes. I would focus on clear navigation, consistent button placement, and simple layouts so users can easily understand the interface.',
    hint: 'Think about user flow mapping, low-fidelity sketching, and iterating based on feedback.',
    correctAnswer:
      'This approach focuses on user flow, layout hierarchy, and usability before moving into visual design. Low-fidelity wireframes help organize ideas and improve navigation structure early in the design process.',
    explanation: 'This approach focuses on user flow...',
  },

  {
    role: 'UI/UX Designer',
    questionType: 'essay',
    skillName: 'User Research',
    difficulty: 'advanced',
    question:
      'How would you improve the user experience for a learning platform where users feel overwhelmed and often stop learning midway?',
    scenario:
      'You are designing a mobile learning platform for beginner UI/UX students. After reviewing feedback from users, you discovered that many learners feel overwhelmed when trying to follow long lessons without clear progress tracking. Some users also forget to continue their learning after leaving the app.',
    hint: 'Consider progress tracking, reminders, simplified navigation, and motivational features.',
    correctAnswer:
      'Implement progress tracking, reminders, simple navigation, and motivational features like streaks or achievement badges to encourage users to continue learning consistently.',
    explanation:
      'Although visual design can improve attractiveness, the main problem is user engagement and learning consistency. Features such as progress indicators, reminders, and simplified navigation better support beginner users and reduce feelings of overwhelm.',
  },

  {
    role: 'Frontend Developer',
    questionType: 'rating',
    skillName: 'HTML/CSS',
    difficulty: 'basic',
    question: 'How familiar are you with HTML and CSS fundamentals?',
    hint: 'Think about semantic HTML, CSS specificity, and box model.',
    explanation: 'HTML and CSS are the foundation of all web interfaces.',
  },

  {
    role: 'Frontend Developer',
    questionType: 'rating',
    skillName: 'JavaScript',
    difficulty: 'intermediate',
    question: 'How familiar are you with JavaScript ES6+ features?',
    hint: 'Consider arrow functions, destructuring, async/await, and modules.',
    explanation:
      'Modern JavaScript is essential for building interactive web applications.',
  },

  {
    role: 'Frontend Developer',
    questionType: 'rating',
    skillName: 'React',
    difficulty: 'intermediate',
    question: 'How familiar are you with React and its core concepts?',
    hint: 'Think about components, hooks, props, and state management.',
    explanation:
      'React is the most popular library for building component-based UIs.',
  },

  {
    role: 'Frontend Developer',
    questionType: 'rating',
    skillName: 'TypeScript',
    difficulty: 'intermediate',
    question: 'How familiar are you with TypeScript in frontend development?',
    hint: 'Consider type annotations, interfaces, generics, and strict mode.',
    explanation:
      'TypeScript adds type safety to JavaScript, reducing runtime errors.',
  },

  {
    role: 'Frontend Developer',
    questionType: 'rating',
    skillName: 'Responsive Design',
    difficulty: 'basic',
    question: 'How comfortable are you with building responsive layouts?',
    hint: 'Think about media queries, Flexbox, Grid, and mobile-first approach.',
    explanation:
      'Responsive design ensures your app works across all screen sizes.',
  },

  {
    role: 'Frontend Developer',
    questionType: 'rating',
    skillName: 'Performance',
    difficulty: 'advanced',
    question: 'How familiar are you with web performance optimization?',
    hint: 'Consider lazy loading, code splitting, caching, and Core Web Vitals.',
    explanation:
      'Performance optimization directly impacts user experience and SEO.',
  },

  {
    role: 'Frontend Developer',
    questionType: 'rating',
    skillName: 'Testing',
    difficulty: 'intermediate',
    question: 'How familiar are you with frontend testing practices?',
    hint: 'Think about unit tests, integration tests, and testing libraries like Jest.',
    explanation:
      'Testing ensures your code works correctly and prevents regressions.',
  },

  {
    role: 'Frontend Developer',
    questionType: 'rating',
    skillName: 'Next.js',
    difficulty: 'advanced',
    question: 'How familiar are you with Next.js and server-side rendering?',
    hint: 'Consider SSR, SSG, ISR, and the App Router.',
    explanation:
      'Next.js extends React with powerful rendering strategies for production apps.',
  },

  {
    role: 'Frontend Developer',
    questionType: 'essay',
    skillName: 'React',
    difficulty: 'intermediate',
    question:
      'How would you optimize a React application that is re-rendering too frequently?',
    scenario:
      'You are working on a React dashboard that has performance issues. Users report that the app feels slow, especially when interacting with filters. After profiling, you notice many components are re-rendering unnecessarily.',
    hint: 'Think about React.memo, useMemo, useCallback, and component structure.',
    correctAnswer:
      'I would use React.memo to prevent unnecessary re-renders of child components, useMemo to memoize expensive calculations, and useCallback to stabilize function references. I would also review the component tree to lift state appropriately and avoid passing new object/array references on every render.',
    explanation:
      'Unnecessary re-renders are a common React performance issue. Memoization hooks and proper component structure help reduce the number of renders.',
  },

  {
    role: 'Frontend Developer',
    questionType: 'essay',
    skillName: 'Performance',
    difficulty: 'advanced',
    question:
      'How would you improve the initial load time of a web application?',
    scenario:
      'Your web application has a Time to Interactive (TTI) of over 8 seconds on mobile devices. Users are dropping off before the page fully loads.',
    hint: 'Consider code splitting, lazy loading, image optimization, and caching strategies.',
    correctAnswer:
      'I would implement code splitting with dynamic imports, lazy load images and non-critical components, optimize and compress assets, use a CDN, implement proper caching headers, and minimize third-party scripts.',
    explanation:
      'Initial load time is critical for user retention. Code splitting reduces the initial bundle size while lazy loading defers non-critical resources.',
  },

  {
    role: 'Backend Engineer',
    questionType: 'rating',
    skillName: 'Node.js',
    difficulty: 'intermediate',
    question: 'How familiar are you with Node.js and its event loop?',
    hint: 'Think about async/await, callbacks, and non-blocking I/O.',
    explanation:
      'Understanding Node.js event loop is crucial for writing efficient backend code.',
  },

  {
    role: 'Backend Engineer',
    questionType: 'rating',
    skillName: 'Database',
    difficulty: 'intermediate',
    question: 'How familiar are you with database design and SQL?',
    hint: 'Consider normalization, indexing, joins, and query optimization.',
    explanation:
      'Database design directly impacts application performance and data integrity.',
  },

  {
    role: 'Backend Engineer',
    questionType: 'rating',
    skillName: 'REST API',
    difficulty: 'basic',
    question: 'How familiar are you with designing RESTful APIs?',
    hint: 'Think about HTTP methods, status codes, and API versioning.',
    explanation:
      'RESTful APIs are the standard for client-server communication.',
  },

  {
    role: 'Backend Engineer',
    questionType: 'rating',
    skillName: 'Authentication',
    difficulty: 'intermediate',
    question: 'How familiar are you with authentication and authorization?',
    hint: 'Consider JWT, OAuth, session management, and role-based access control.',
    explanation:
      'Secure authentication is foundational to protecting user data.',
  },

  {
    role: 'Backend Engineer',
    questionType: 'rating',
    skillName: 'Docker',
    difficulty: 'intermediate',
    question: 'How comfortable are you with Docker and containerization?',
    hint: 'Think about Dockerfiles, docker-compose, and container networking.',
    explanation:
      'Docker enables consistent deployments across different environments.',
  },

  {
    role: 'Backend Engineer',
    questionType: 'rating',
    skillName: 'TypeScript',
    difficulty: 'intermediate',
    question: 'How familiar are you with TypeScript for backend development?',
    hint: 'Consider type safety, interfaces, and TypeScript-specific patterns.',
    explanation:
      'TypeScript improves code quality and developer experience in large codebases.',
  },

  {
    role: 'Backend Engineer',
    questionType: 'rating',
    skillName: 'Testing',
    difficulty: 'intermediate',
    question: 'How familiar are you with backend testing practices?',
    hint: 'Think about unit tests, integration tests, and test-driven development.',
    explanation:
      'Testing ensures your APIs work correctly and handle edge cases.',
  },

  {
    role: 'Backend Engineer',
    questionType: 'rating',
    skillName: 'Security',
    difficulty: 'advanced',
    question: 'How familiar are you with web application security?',
    hint: 'Consider SQL injection, XSS, CSRF, and OWASP top 10.',
    explanation:
      'Security knowledge protects applications from common vulnerabilities.',
  },

  {
    role: 'Backend Engineer',
    questionType: 'essay',
    skillName: 'System Design',
    difficulty: 'advanced',
    question:
      'How would you design a scalable authentication system for a growing platform?',
    scenario:
      'Your platform currently has 10,000 users but expects to grow to 1 million. The current authentication system uses basic session storage which is causing performance issues during peak hours.',
    hint: 'Consider JWT, Redis for session storage, rate limiting, and horizontal scaling.',
    correctAnswer:
      'I would migrate to JWT-based authentication for stateless requests, use Redis for session caching, implement rate limiting to prevent brute force attacks, add refresh token rotation, and ensure the system can horizontally scale by keeping authentication stateless.',
    explanation:
      'Stateless authentication with JWT allows horizontal scaling. Redis provides fast session lookups. Rate limiting and refresh tokens add security layers.',
  },

  {
    role: 'Backend Engineer',
    questionType: 'essay',
    skillName: 'Database',
    difficulty: 'intermediate',
    question:
      'How would you optimize a slow database query in a production application?',
    scenario:
      'A query that fetches user activity logs is taking 8+ seconds to run. The table has 50 million rows and the query runs frequently.',
    hint: 'Think about EXPLAIN ANALYZE, indexing, query restructuring, and caching.',
    correctAnswer:
      'I would first use EXPLAIN ANALYZE to understand the query execution plan. Then add appropriate indexes on frequently queried columns, consider partitioning the table by date, add a Redis cache for frequent queries, and potentially archive old data to reduce table size.',
    explanation:
      'Query optimization starts with understanding the execution plan. Proper indexing, caching, and data archiving are key strategies for handling large tables.',
  },

  {
    role: 'Data Analyst',
    questionType: 'rating',
    skillName: 'SQL',
    difficulty: 'intermediate',
    question: 'How familiar are you with advanced SQL queries?',
    hint: 'Think about CTEs, window functions, and complex joins.',
    explanation:
      'Advanced SQL skills are essential for data extraction and analysis.',
  },

  {
    role: 'Data Analyst',
    questionType: 'rating',
    skillName: 'Python',
    difficulty: 'intermediate',
    question: 'How familiar are you with Python for data analysis?',
    hint: 'Consider Pandas, NumPy, and data manipulation.',
    explanation:
      'Python is the most popular language for data analysis and automation.',
  },

  {
    role: 'Data Analyst',
    questionType: 'rating',
    skillName: 'Statistics',
    difficulty: 'advanced',
    question: 'How familiar are you with statistical analysis?',
    hint: 'Think about hypothesis testing, regression, and probability distributions.',
    explanation:
      'Statistical knowledge enables drawing valid conclusions from data.',
  },

  {
    role: 'Data Analyst',
    questionType: 'rating',
    skillName: 'Visualization',
    difficulty: 'basic',
    question: 'How familiar are you with data visualization tools?',
    hint: 'Consider Tableau, Power BI, or Python visualization libraries.',
    explanation:
      'Data visualization communicates insights effectively to stakeholders.',
  },

  {
    role: 'Data Analyst',
    questionType: 'rating',
    skillName: 'Data Cleaning',
    difficulty: 'intermediate',
    question: 'How comfortable are you with data cleaning and preprocessing?',
    hint: 'Think about handling missing values, outliers, and data normalization.',
    explanation: 'Clean data is the foundation of accurate analysis.',
  },

  {
    role: 'Data Analyst',
    questionType: 'rating',
    skillName: 'Machine Learning',
    difficulty: 'advanced',
    question: 'How familiar are you with machine learning concepts?',
    hint: 'Consider supervised learning, model evaluation, and feature engineering.',
    explanation:
      'ML knowledge extends analytical capabilities beyond traditional statistics.',
  },

  {
    role: 'Data Analyst',
    questionType: 'rating',
    skillName: 'Business Acumen',
    difficulty: 'advanced',
    question:
      'How well do you understand business context when analyzing data?',
    hint: 'Think about translating data insights into business recommendations.',
    explanation:
      'Business acumen ensures data analysis drives meaningful decisions.',
  },

  {
    role: 'Data Analyst',
    questionType: 'rating',
    skillName: 'Excel',
    difficulty: 'basic',
    question: 'How proficient are you with Excel for data analysis?',
    hint: 'Consider pivot tables, VLOOKUP, and advanced formulas.',
    explanation: 'Excel remains a fundamental tool in data analysis workflows.',
  },

  {
    role: 'Data Analyst',
    questionType: 'essay',
    skillName: 'Business Acumen',
    difficulty: 'advanced',
    question:
      'How would you approach analyzing and presenting a discrepancy between survey data and actual usage data?',
    scenario:
      'You are analyzing a food delivery app. User surveys show 60% of users are interested in a "schedule order" feature, but analytics data shows only 15% actually use it in competitor apps.',
    hint: 'Consider mixed-method research, behavioral analysis, and presenting recommendations.',
    correctAnswer:
      'I would conduct follow-up interviews to understand the gap between stated and actual behavior, analyze competitor UX to find friction points, run A/B tests with different implementations, and present findings with clear visualizations showing the discrepancy and proposed solutions.',
    explanation:
      'Discrepancies between stated preferences and behavior are common. Mixed-method research combining qualitative and quantitative approaches provides the most actionable insights.',
  },

  {
    role: 'Data Analyst',
    questionType: 'essay',
    skillName: 'SQL',
    difficulty: 'intermediate',
    question: 'How would you design a query to track user retention over time?',
    scenario:
      'Your company wants to understand how many users who signed up in a given month are still active 30, 60, and 90 days later.',
    hint: 'Think about cohort analysis, window functions, and self-joins.',
    correctAnswer:
      'I would create a cohort analysis query using the user signup date to group users into cohorts, then use window functions or self-joins to calculate activity at 30, 60, and 90 day intervals. The result would show retention rates per cohort over time.',
    explanation:
      'Cohort analysis is the standard approach for retention tracking. Window functions in SQL make this calculation efficient and maintainable.',
  },

  {
    role: 'Product Manager',
    questionType: 'rating',
    skillName: 'Product Strategy',
    difficulty: 'advanced',
    question: 'How familiar are you with product strategy and roadmapping?',
    hint: 'Think about OKRs, prioritization frameworks, and stakeholder alignment.',
    explanation:
      'Product strategy connects business goals with user needs and development capacity.',
  },

  {
    role: 'Product Manager',
    questionType: 'rating',
    skillName: 'User Research',
    difficulty: 'intermediate',
    question: 'How familiar are you with user research methodologies?',
    hint: 'Consider user interviews, surveys, and usability testing.',
    explanation:
      'User research ensures product decisions are grounded in real user needs.',
  },

  {
    role: 'Product Manager',
    questionType: 'rating',
    skillName: 'Data Analysis',
    difficulty: 'intermediate',
    question: 'How comfortable are you analyzing product metrics and data?',
    hint: 'Think about funnel analysis, A/B testing, and KPI tracking.',
    explanation:
      'Data-driven decision making is central to modern product management.',
  },

  {
    role: 'Product Manager',
    questionType: 'rating',
    skillName: 'Agile/Scrum',
    difficulty: 'basic',
    question: 'How familiar are you with Agile and Scrum methodologies?',
    hint: 'Consider sprint planning, backlog grooming, and retrospectives.',
    explanation:
      'Agile methodology enables iterative product development and rapid feedback.',
  },

  {
    role: 'Product Manager',
    questionType: 'rating',
    skillName: 'Stakeholder Management',
    difficulty: 'advanced',
    question: 'How comfortable are you managing stakeholder expectations?',
    hint: 'Think about communication strategies, conflict resolution, and alignment.',
    explanation:
      'Stakeholder management ensures cross-functional teams work toward shared goals.',
  },

  {
    role: 'Product Manager',
    questionType: 'rating',
    skillName: 'Technical Understanding',
    difficulty: 'intermediate',
    question:
      'How well do you understand technical constraints and development processes?',
    hint: 'Consider API concepts, system architecture, and technical debt.',
    explanation:
      'Technical understanding helps PMs make realistic decisions and communicate with engineers.',
  },

  {
    role: 'Product Manager',
    questionType: 'rating',
    skillName: 'Prioritization',
    difficulty: 'intermediate',
    question: 'How familiar are you with feature prioritization frameworks?',
    hint: 'Think about RICE, MoSCoW, and impact vs effort matrices.',
    explanation:
      'Prioritization frameworks help focus development on highest-impact features.',
  },

  {
    role: 'Product Manager',
    questionType: 'rating',
    skillName: 'Market Analysis',
    difficulty: 'advanced',
    question: 'How familiar are you with competitive and market analysis?',
    hint: 'Consider SWOT analysis, competitive benchmarking, and market sizing.',
    explanation:
      'Market analysis informs positioning and identifies opportunities.',
  },

  {
    role: 'Product Manager',
    questionType: 'essay',
    skillName: 'Product Strategy',
    difficulty: 'advanced',
    question:
      'How would you prioritize a backlog when engineering capacity is limited and multiple stakeholders have competing priorities?',
    scenario:
      'You are a PM at a growing startup. You have 30 feature requests from sales, marketing, and customer success teams. Your engineering team can only handle 5 features this quarter.',
    hint: 'Consider impact vs effort, business value, user impact, and stakeholder alignment.',
    correctAnswer:
      'I would use a scoring framework like RICE (Reach, Impact, Confidence, Effort) to evaluate all requests objectively. I would gather data on user impact, align with company OKRs, facilitate a stakeholder meeting to present the scoring, and communicate the rationale for final decisions clearly to all teams.',
    explanation:
      'Objective prioritization frameworks reduce bias and make decisions defensible. Transparent communication prevents stakeholder frustration and builds trust.',
  },

  {
    role: 'Product Manager',
    questionType: 'essay',
    skillName: 'User Research',
    difficulty: 'intermediate',
    question:
      'How would you validate a new product idea before committing to full development?',
    scenario:
      'Your team has an idea for a new premium feature that would require 3 months of development. You need to validate whether users actually want this before investing the resources.',
    hint: 'Think about MVP, fake door tests, user interviews, and prototype testing.',
    correctAnswer:
      'I would run a fake door test by adding the feature to the UI and measuring click-through rate, conduct user interviews to understand the underlying need, build a clickable prototype for usability testing, and analyze similar features in competitor products before committing to full development.',
    explanation:
      'Validation before building reduces wasted development effort. Multiple validation methods provide stronger evidence than any single approach.',
  },
];

const seed = async () => {
  console.log('Seeding roles...');

  // Ganti bagian ini ↓
  await db.insert(roles).values(rolesData).onConflictDoNothing();
  const existingRoles = await db.select().from(roles);
  console.log(`${existingRoles.length} roles tersedia!`);

  const roleMap = existingRoles.reduce(
    (acc, role) => {
      acc[role.name] = role.id;
      return acc;
    },
    {} as Record<string, number>,
  );

  const questionsWithRoleId = questionsData.map((q) => ({
    roleId: roleMap[q.role],
    question: q.question,
    skillName: q.skillName,
    difficulty: q.difficulty,
    questionType: q.questionType,
    scenario: q.scenario ?? null,
    hint: q.hint ?? null,
    correctAnswer: q.correctAnswer ?? null,
    explanation: q.explanation ?? null,
  }));

  const insertedQuestions = await db
    .insert(quizQuestions)
    .values(questionsWithRoleId)
    .returning();
  console.log(`${insertedQuestions.length} questions berhasil di-seed!`);

  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed gagal:', err);
  process.exit(1);
});
