export interface KnowledgeChunk {
  id: string;
  content: string;
  category: string;
  tags: string[];
  priority: number;
}

export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "company_overview",
    content: "Lumos Logic is a leading technology solutions company specializing in custom software development. We deliver innovative web applications, mobile apps, AI-powered solutions, and cloud infrastructure. Our team of expert developers uses cutting-edge technologies like React, Next.js, Node.js, Python, and modern AI frameworks to build scalable, secure, and user-friendly solutions for businesses of all sizes.",
    category: "company",
    tags: ["company", "overview", "about", "who we are"],
    priority: 10
  },
  {
    id: "web_development",
    content: "Our web development services include custom web applications using React, Next.js, Vue.js, and Angular. We build responsive, fast, and SEO-optimized websites. Our expertise covers frontend development, backend APIs with Node.js and Python, database design with MongoDB and PostgreSQL, and full-stack solutions. We follow modern development practices including CI/CD, testing, and agile methodologies.",
    category: "services",
    tags: ["web", "development", "react", "nextjs", "frontend", "backend"],
    priority: 9
  },
  {
    id: "mobile_development",
    content: "We create native and cross-platform mobile applications for iOS and Android. Our mobile development services include React Native and Flutter for cross-platform apps, native iOS development with Swift, native Android development with Kotlin, mobile UI/UX design, app store deployment, and ongoing maintenance. We build apps that are fast, secure, and provide excellent user experiences.",
    category: "services",
    tags: ["mobile", "app", "ios", "android", "react native", "flutter"],
    priority: 8
  },
  {
    id: "ai_ml_solutions",
    content: "Lumos Logic provides AI and Machine Learning solutions including intelligent chatbots, natural language processing, computer vision, predictive analytics, recommendation systems, and automation. We use frameworks like TensorFlow, PyTorch, and integrate with APIs from OpenAI, Google Gemini, and AWS AI services. Our AI solutions help businesses automate processes and gain insights from data.",
    category: "services",
    tags: ["ai", "ml", "machine learning", "chatbot", "automation", "nlp"],
    priority: 9
  },
  {
    id: "cloud_devops",
    content: "Our cloud and DevOps services include AWS and Google Cloud infrastructure setup, containerization with Docker and Kubernetes, CI/CD pipeline implementation, serverless architecture, database management, monitoring and logging, security best practices, and cost optimization. We help businesses migrate to the cloud and maintain reliable, scalable infrastructure.",
    category: "services",
    tags: ["cloud", "aws", "devops", "infrastructure", "kubernetes", "docker"],
    priority: 7
  },
  {
    id: "pricing_model",
    content: "Lumos Logic offers flexible pricing models tailored to your needs. We provide fixed-price projects for well-defined scopes, time and material billing for evolving requirements, dedicated team arrangements for long-term partnerships, and retainer packages for ongoing support. Pricing depends on project complexity, timeline, and technology stack. Contact us at info@lumoslogic.com for a detailed quote.",
    category: "pricing",
    tags: ["pricing", "cost", "quote", "budget", "payment"],
    priority: 8
  },
  {
    id: "development_process",
    content: "Our development process follows agile methodology: 1) Discovery - We understand your requirements and goals, 2) Planning - We create detailed specifications and timelines, 3) Design - UI/UX design and prototyping, 4) Development - Iterative development with regular updates, 5) Testing - Comprehensive QA and user testing, 6) Deployment - Launch and production setup, 7) Support - Ongoing maintenance and updates. We maintain transparent communication throughout.",
    category: "process",
    tags: ["process", "methodology", "agile", "how we work", "timeline"],
    priority: 7
  },
  {
    id: "contact_support",
    content: "Contact Lumos Logic at info@lumoslogic.com for general inquiries and new projects. For technical support, email support@lumoslogic.com. Visit our website at www.lumoslogic.com. We're available Monday-Friday, 9 AM - 6 PM. For urgent matters, our support team responds within 24 hours. We're happy to schedule a consultation call to discuss your project needs.",
    category: "contact",
    tags: ["contact", "email", "support", "reach", "communication"],
    priority: 10
  }
];

export function findRelevantChunks(query: string, maxChunks: number = 2): KnowledgeChunk[] {
  const normalizedQuery = query.toLowerCase();
  const scored = knowledgeChunks.map(chunk => {
    let score = 0;
    
    // Tag matching
    chunk.tags.forEach(tag => {
      if (normalizedQuery.includes(tag)) score += 3;
    });
    
    // Category matching
    if (normalizedQuery.includes(chunk.category)) score += 2;
    
    // Content matching
    const words = normalizedQuery.split(/\s+/);
    words.forEach(word => {
      if (word.length > 3 && chunk.content.toLowerCase().includes(word)) {
        score += 1;
      }
    });
    
    // Priority boost
    score += chunk.priority * 0.5;
    
    return { chunk, score };
  });
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks)
    .map(item => item.chunk);
}
