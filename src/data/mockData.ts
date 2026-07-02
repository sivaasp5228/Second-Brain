import {
  Brain, FileText, Lightbulb, CheckSquare, MessageSquare,
  Upload, BarChart3, GitBranch, Zap, BookOpen,
  Link2, Image, FileType, Music
} from 'lucide-react';

// Dashboard Stats
export const dashboardStats = [
  {
    id: 1,
    title: 'Knowledge Stored',
    value: 1247,
    change: '+12%',
    changeType: 'positive' as const,
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    id: 2,
    title: 'Documents',
    value: 384,
    change: '+8%',
    changeType: 'positive' as const,
    icon: FileText,
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    id: 3,
    title: 'AI Insights',
    value: 89,
    change: '+24%',
    changeType: 'positive' as const,
    icon: Lightbulb,
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    id: 4,
    title: 'Tasks Generated',
    value: 156,
    change: '+18%',
    changeType: 'positive' as const,
    icon: CheckSquare,
    gradient: 'from-emerald-500 to-green-400',
  },
];

// Recent Activity
export const recentActivity = [
  {
    id: 1,
    type: 'upload',
    title: 'Meeting Notes.pdf uploaded',
    description: 'AI extracted 12 key insights and 5 action items',
    time: '2 min ago',
    icon: Upload,
  },
  {
    id: 2,
    type: 'insight',
    title: 'New pattern detected',
    description: 'Recurring theme about "scalable architecture" across 3 documents',
    time: '15 min ago',
    icon: Lightbulb,
  },
  {
    id: 3,
    type: 'chat',
    title: 'AI Chat session completed',
    description: 'Generated comprehensive project roadmap from knowledge base',
    time: '1 hr ago',
    icon: MessageSquare,
  },
  {
    id: 4,
    type: 'task',
    title: '3 new tasks generated',
    description: 'Based on your latest meeting notes and project goals',
    time: '2 hrs ago',
    icon: CheckSquare,
  },
  {
    id: 5,
    type: 'graph',
    title: 'Knowledge Graph updated',
    description: '7 new connections discovered between your ideas',
    time: '4 hrs ago',
    icon: GitBranch,
  },
];

// Quick Actions
export const quickActions = [
  { id: 1, title: 'Upload Knowledge', icon: Upload, color: 'from-blue-500 to-blue-600', path: '/upload' },
  { id: 2, title: 'Ask AI', icon: MessageSquare, color: 'from-violet-500 to-purple-600', path: '/chat' },
  { id: 3, title: 'View Insights', icon: BarChart3, color: 'from-amber-500 to-orange-600', path: '/insights' },
  { id: 4, title: 'Knowledge Graph', icon: GitBranch, color: 'from-emerald-500 to-green-600', path: '/graph' },
  { id: 5, title: 'Generate Tasks', icon: CheckSquare, color: 'from-pink-500 to-rose-600', path: '/tasks' },
  { id: 6, title: 'Decision Help', icon: Zap, color: 'from-cyan-500 to-teal-600', path: '/decisions' },
];

// Upload file types
export const supportedFileTypes = [
  { type: 'PDF', icon: FileText, color: 'text-red-400', accept: '.pdf' },
  { type: 'DOCX', icon: FileType, color: 'text-blue-400', accept: '.docx' },
  { type: 'TXT', icon: BookOpen, color: 'text-green-400', accept: '.txt' },
  { type: 'Images', icon: Image, color: 'text-yellow-400', accept: '.png,.jpg,.jpeg,.webp' },
  { type: 'Audio', icon: Music, color: 'text-purple-400', accept: '.mp3,.wav,.m4a' },
  { type: 'Links', icon: Link2, color: 'text-cyan-400', accept: '' },
];

export const mockUploads = [
  { id: 1, name: 'Q3 Strategy Document.pdf', type: 'PDF', size: '2.4 MB', progress: 100, status: 'complete' as const },
  { id: 2, name: 'Team Standup Notes.docx', type: 'DOCX', size: '856 KB', progress: 100, status: 'complete' as const },
  { id: 3, name: 'Product Roadmap.pdf', type: 'PDF', size: '5.1 MB', progress: 72, status: 'uploading' as const },
  { id: 4, name: 'Voice Memo - Ideas.m4a', type: 'Audio', size: '12.3 MB', progress: 45, status: 'uploading' as const },
];

// Chat Messages
export const chatMessages = [
  {
    id: 1,
    role: 'user' as const,
    content: 'What did I discuss about my hackathon project?',
    timestamp: '10:24 AM',
  },
  {
    id: 2,
    role: 'assistant' as const,
    content: `Based on your stored knowledge, here's what I found about your hackathon project:\n\nYou discussed building an **AI-powered knowledge management system** during the TechVenture Hackathon. The core idea was to create a "Second Brain" that could:\n\n1. **Automatically organize** uploaded documents using NLP\n2. **Generate insights** by cross-referencing multiple knowledge sources\n3. **Create actionable tasks** from meeting notes and brainstorming sessions\n\nYour team decided to use **React + TypeScript** for the frontend and explored vector databases for semantic search capabilities.`,
    timestamp: '10:24 AM',
    sources: [
      { name: 'Meeting Notes.pdf', type: 'PDF', relevance: 94 },
      { name: 'Hackathon Ideas.docx', type: 'DOCX', relevance: 87 },
      { name: 'Tech Stack Research.txt', type: 'TXT', relevance: 76 },
    ],
    insights: [
      'Your team has a strong preference for TypeScript-based solutions',
      'Knowledge management is a recurring theme across 12 of your documents',
      'You mentioned vector databases 8 times in the past month',
    ],
    actionItems: [
      'Finalize the tech stack decision (React vs Next.js)',
      'Create a prototype for the knowledge graph visualization',
      'Schedule a follow-up meeting with the team',
      'Research vector database providers (Pinecone, Weaviate, Qdrant)',
    ],
  },
  {
    id: 3,
    role: 'user' as const,
    content: 'Can you summarize the key decisions we made?',
    timestamp: '10:26 AM',
  },
  {
    id: 4,
    role: 'assistant' as const,
    content: `Here are the **key decisions** from your hackathon discussions:\n\n### Architecture\n- **Frontend**: React + TypeScript with Vite\n- **Styling**: Tailwind CSS with custom design system\n- **Backend**: Serverless architecture with edge functions\n\n### Features Prioritized\n1. 🧠 Smart document parsing and categorization\n2. 💬 AI-powered Q&A over personal knowledge base\n3. 📊 Automated insight generation and trend detection\n4. ✅ Task extraction from unstructured content\n\n### Timeline\n- **Week 1**: Core upload and parsing pipeline\n- **Week 2**: AI chat and knowledge retrieval\n- **Week 3**: Dashboard and visualization\n- **Week 4**: Polish, testing, and demo prep`,
    timestamp: '10:26 AM',
    sources: [
      { name: 'Decision Log.pdf', type: 'PDF', relevance: 98 },
      { name: 'Sprint Planning.docx', type: 'DOCX', relevance: 91 },
    ],
    insights: [
      'All major decisions were aligned with industry best practices',
      'The timeline is aggressive but feasible based on team velocity',
    ],
    actionItems: [
      'Document final architecture decisions in Confluence',
      'Set up the CI/CD pipeline this week',
    ],
  },
];

// Knowledge Library
export const knowledgeItems = [
  {
    id: 1,
    title: 'Q3 Product Strategy',
    category: 'Strategy',
    tags: ['product', 'roadmap', 'Q3'],
    createdAt: '2024-12-15',
    summary: 'Comprehensive product strategy outlining key initiatives, market analysis, and competitive positioning for Q3 2024.',
    type: 'PDF',
    connections: 8,
  },
  {
    id: 2,
    title: 'Machine Learning Architecture',
    category: 'Technical',
    tags: ['ML', 'architecture', 'AI'],
    createdAt: '2024-12-14',
    summary: 'Deep dive into transformer architectures, attention mechanisms, and production deployment strategies for ML models.',
    type: 'Document',
    connections: 12,
  },
  {
    id: 3,
    title: 'Customer Interview Notes',
    category: 'Research',
    tags: ['customer', 'feedback', 'UX'],
    createdAt: '2024-12-13',
    summary: 'Key findings from 15 customer interviews covering pain points, feature requests, and satisfaction metrics.',
    type: 'Notes',
    connections: 6,
  },
  {
    id: 4,
    title: 'Team Retrospective',
    category: 'Meeting',
    tags: ['team', 'retro', 'process'],
    createdAt: '2024-12-12',
    summary: 'Sprint retrospective highlights including velocity improvements, process bottlenecks, and action items.',
    type: 'Notes',
    connections: 4,
  },
  {
    id: 5,
    title: 'Market Analysis Report',
    category: 'Research',
    tags: ['market', 'analysis', 'competitors'],
    createdAt: '2024-12-11',
    summary: 'Detailed market size estimation, competitor analysis, and emerging trends in the AI productivity space.',
    type: 'PDF',
    connections: 9,
  },
  {
    id: 6,
    title: 'API Design Guidelines',
    category: 'Technical',
    tags: ['API', 'design', 'REST'],
    createdAt: '2024-12-10',
    summary: 'Best practices for RESTful API design, versioning strategies, error handling, and documentation standards.',
    type: 'Document',
    connections: 5,
  },
  {
    id: 7,
    title: 'Brainstorm: AI Features',
    category: 'Ideas',
    tags: ['AI', 'brainstorm', 'features'],
    createdAt: '2024-12-09',
    summary: 'Creative ideation session output covering 24 potential AI features ranked by impact and feasibility.',
    type: 'Notes',
    connections: 11,
  },
  {
    id: 8,
    title: 'Investor Pitch Deck',
    category: 'Strategy',
    tags: ['pitch', 'investors', 'funding'],
    createdAt: '2024-12-08',
    summary: 'Series A pitch materials including market opportunity, traction metrics, financial projections, and team bios.',
    type: 'PDF',
    connections: 7,
  },
];

// Insights Data
export const knowledgeGrowthData = [
  { month: 'Jul', items: 45 },
  { month: 'Aug', items: 78 },
  { month: 'Sep', items: 124 },
  { month: 'Oct', items: 189 },
  { month: 'Nov', items: 267 },
  { month: 'Dec', items: 384 },
];

export const topicsData = [
  { topic: 'AI & Machine Learning', count: 89, fill: '#3b82f6' },
  { topic: 'Product Strategy', count: 67, fill: '#8b5cf6' },
  { topic: 'Engineering', count: 54, fill: '#06b6d4' },
  { topic: 'Customer Research', count: 43, fill: '#10b981' },
  { topic: 'Team Management', count: 38, fill: '#f59e0b' },
  { topic: 'Market Analysis', count: 31, fill: '#ef4444' },
];

export const faqData = [
  { question: 'What is our product roadmap?', frequency: 24 },
  { question: 'How does the ML pipeline work?', frequency: 19 },
  { question: 'What are competitor strengths?', frequency: 16 },
  { question: 'Customer pain points?', frequency: 14 },
  { question: 'Sprint velocity trends?', frequency: 11 },
];

export const aiDiscoveries = [
  {
    id: 1,
    title: 'Pattern: Recurring Architecture Discussions',
    description: 'You\'ve mentioned "microservices" in 7 documents this month. Consider creating a dedicated architecture decision record.',
    type: 'pattern',
    confidence: 92,
    timestamp: '2 hrs ago',
  },
  {
    id: 2,
    title: 'Connection: Customer Feedback ↔ Product Roadmap',
    description: '3 customer-requested features align with items in your Q3 roadmap but have no assigned tasks yet.',
    type: 'connection',
    confidence: 87,
    timestamp: '5 hrs ago',
  },
  {
    id: 3,
    title: 'Insight: Team Velocity Trend',
    description: 'Your team\'s velocity has increased 23% over the last 3 sprints. This correlates with the new code review process.',
    type: 'insight',
    confidence: 94,
    timestamp: '1 day ago',
  },
  {
    id: 4,
    title: 'Gap: Missing Documentation',
    description: 'Your ML pipeline has no error handling documentation despite 4 incident reports referencing it.',
    type: 'gap',
    confidence: 89,
    timestamp: '1 day ago',
  },
];

export const knowledgeTimeline = [
  { date: 'Dec 15', event: 'Q3 Strategy Document uploaded', type: 'upload' },
  { date: 'Dec 14', event: 'AI discovered 3 new connections', type: 'insight' },
  { date: 'Dec 13', event: '15 customer interviews processed', type: 'processing' },
  { date: 'Dec 12', event: 'Knowledge Graph expanded by 12 nodes', type: 'graph' },
  { date: 'Dec 11', event: 'Market Analysis report analyzed', type: 'analysis' },
  { date: 'Dec 10', event: '8 tasks auto-generated from notes', type: 'task' },
];

// Decision Assistant
export const decisionExample = {
  question: 'Should I use React or Flutter for the mobile app?',
  recommendation: 'React Native',
  confidence: 87,
  reasoning: 'Based on your team\'s existing React expertise (referenced in 14 documents), project timeline constraints, and the web-first nature of your product, React Native provides the optimal balance of development speed and cross-platform capability.',
  options: [
    {
      name: 'React Native',
      score: 87,
      pros: [
        'Team already proficient in React (14 documents reference React experience)',
        'Code sharing with existing web app (~60% reusable)',
        'Large ecosystem and community support',
        'Faster development timeline (aligns with Q1 deadline)',
        'Hot reloading for rapid iteration',
      ],
      cons: [
        'Performance slightly lower than native for complex animations',
        'Bridge overhead for native module access',
        'Larger app bundle size',
      ],
    },
    {
      name: 'Flutter',
      score: 72,
      pros: [
        'Superior animation and UI performance',
        'Single codebase for iOS, Android, and Web',
        'Growing ecosystem with material design widgets',
        'Dart is easy to learn',
      ],
      cons: [
        'Team has no Dart experience (0 documents reference Flutter)',
        'Learning curve adds 3-4 weeks to timeline',
        'Smaller talent pool for future hiring',
        'No code reuse with existing React web app',
      ],
    },
  ],
  sources: [
    { name: 'Team Skills Assessment.pdf', relevance: 95 },
    { name: 'Project Timeline.docx', relevance: 91 },
    { name: 'Tech Stack Research.pdf', relevance: 88 },
    { name: 'Q1 Goals.pdf', relevance: 82 },
  ],
};

// Tasks Data
export const tasksData = {
  todo: [
    {
      id: 1,
      title: 'Research vector database providers',
      priority: 'high' as const,
      deadline: 'Dec 20',
      source: 'Meeting Notes.pdf',
      tags: ['research', 'database'],
    },
    {
      id: 2,
      title: 'Create API design document',
      priority: 'medium' as const,
      deadline: 'Dec 22',
      source: 'Sprint Planning.docx',
      tags: ['documentation', 'API'],
    },
    {
      id: 3,
      title: 'Review competitor analysis report',
      priority: 'low' as const,
      deadline: 'Dec 25',
      source: 'Market Analysis.pdf',
      tags: ['research', 'strategy'],
    },
  ],
  inProgress: [
    {
      id: 4,
      title: 'Implement knowledge graph visualization',
      priority: 'high' as const,
      deadline: 'Dec 18',
      source: 'Hackathon Ideas.docx',
      tags: ['frontend', 'visualization'],
      progress: 65,
    },
    {
      id: 5,
      title: 'Set up CI/CD pipeline',
      priority: 'medium' as const,
      deadline: 'Dec 19',
      source: 'Decision Log.pdf',
      tags: ['devops', 'infrastructure'],
      progress: 40,
    },
  ],
  done: [
    {
      id: 6,
      title: 'Finalize tech stack decision',
      priority: 'high' as const,
      deadline: 'Dec 15',
      source: 'Decision Log.pdf',
      tags: ['architecture', 'decision'],
      completedAt: 'Dec 14',
    },
    {
      id: 7,
      title: 'Document architecture decisions',
      priority: 'medium' as const,
      deadline: 'Dec 16',
      source: 'Team Retrospective.docx',
      tags: ['documentation'],
      completedAt: 'Dec 15',
    },
    {
      id: 8,
      title: 'Process customer interview recordings',
      priority: 'high' as const,
      deadline: 'Dec 14',
      source: 'Customer Interviews.m4a',
      tags: ['research', 'customer'],
      completedAt: 'Dec 13',
    },
  ],
};

// Knowledge Graph Nodes and Edges
export const graphNodes = [
  { id: 'center', label: 'GAPPY AI', type: 'core', x: 50, y: 50, size: 28 },
  { id: 'n1', label: 'Product Strategy', type: 'project', x: 25, y: 25, size: 20 },
  { id: 'n2', label: 'ML Pipeline', type: 'project', x: 75, y: 20, size: 20 },
  { id: 'n3', label: 'Customer Research', type: 'idea', x: 20, y: 65, size: 18 },
  { id: 'n4', label: 'Team Retro', type: 'meeting', x: 80, y: 60, size: 16 },
  { id: 'n5', label: 'Q3 Roadmap', type: 'file', x: 35, y: 15, size: 16 },
  { id: 'n6', label: 'API Design', type: 'note', x: 65, y: 80, size: 16 },
  { id: 'n7', label: 'Hackathon', type: 'idea', x: 15, y: 45, size: 18 },
  { id: 'n8', label: 'Sprint Goals', type: 'task', x: 85, y: 40, size: 14 },
  { id: 'n9', label: 'Market Analysis', type: 'file', x: 40, y: 75, size: 16 },
  { id: 'n10', label: 'Architecture', type: 'decision', x: 60, y: 35, size: 18 },
  { id: 'n11', label: 'User Feedback', type: 'note', x: 30, y: 50, size: 14 },
  { id: 'n12', label: 'Pitch Deck', type: 'file', x: 70, y: 65, size: 16 },
  { id: 'n13', label: 'Competitors', type: 'idea', x: 50, y: 85, size: 14 },
  { id: 'n14', label: 'Tech Stack', type: 'decision', x: 45, y: 30, size: 16 },
  { id: 'n15', label: 'Investor Meeting', type: 'meeting', x: 55, y: 65, size: 14 },
];

export const graphEdges = [
  { from: 'center', to: 'n1' }, { from: 'center', to: 'n2' },
  { from: 'center', to: 'n3' }, { from: 'center', to: 'n4' },
  { from: 'center', to: 'n10' }, { from: 'center', to: 'n14' },
  { from: 'n1', to: 'n5' }, { from: 'n1', to: 'n9' },
  { from: 'n1', to: 'n12' }, { from: 'n2', to: 'n10' },
  { from: 'n2', to: 'n6' }, { from: 'n3', to: 'n11' },
  { from: 'n3', to: 'n9' }, { from: 'n4', to: 'n8' },
  { from: 'n5', to: 'n14' }, { from: 'n7', to: 'n3' },
  { from: 'n7', to: 'n14' }, { from: 'n10', to: 'n14' },
  { from: 'n10', to: 'n6' }, { from: 'n12', to: 'n15' },
  { from: 'n9', to: 'n13' }, { from: 'n11', to: 'n13' },
  { from: 'n15', to: 'n1' }, { from: 'n8', to: 'n4' },
];

export const nodeColors: Record<string, string> = {
  core: '#6366f1',
  project: '#3b82f6',
  idea: '#a855f7',
  meeting: '#06b6d4',
  file: '#10b981',
  note: '#f59e0b',
  task: '#ef4444',
  decision: '#ec4899',
};
