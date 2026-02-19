export const faqCache = {
  // Company Info
  "what is lumos logic": "Lumos Logic is a technology solutions company specializing in web development, mobile apps, AI solutions, cloud services, and digital marketing.",
  "who are you": "I'm InteliQ, the AI assistant for Lumos Logic. I can help you with information about our services, pricing, and how we can help your business.",
  "what do you do": "Lumos Logic provides custom web development, mobile apps, AI/ML solutions, cloud infrastructure, digital marketing, UI/UX design, and enterprise software development.",
  "what services do you offer": "We offer: Web Development (React, Next.js, Node.js), Mobile Apps (iOS & Android), AI & Machine Learning, Cloud Infrastructure, Digital Marketing & SEO, UI/UX Design, E-commerce Solutions, and Enterprise Software.",
  
  // Contact
  "how can i contact you": "You can reach us at info@lumoslogic.com or support@lumoslogic.com. Visit www.lumoslogic.com for more details.",
  "what is your email": "Our email addresses are info@lumoslogic.com for general inquiries and support@lumoslogic.com for technical support.",
  "what is your website": "Our website is www.lumoslogic.com",
  "how do i reach support": "Contact our support team at support@lumoslogic.com",
  
  // Pricing
  "how much does it cost": "Our pricing varies based on project scope and requirements. Contact us at info@lumoslogic.com for a custom quote tailored to your needs.",
  "what are your prices": "We offer competitive pricing based on project complexity. Reach out to info@lumoslogic.com for a detailed quote.",
  "do you have pricing plans": "Yes, we create custom pricing plans based on your specific requirements. Contact info@lumoslogic.com to discuss your project.",
  
  // Technologies
  "what technologies do you use": "We work with React, Next.js, Node.js, TypeScript, Python, AWS, Google Cloud, MongoDB, PostgreSQL, and modern AI/ML frameworks.",
  "do you use react": "Yes, we specialize in React and Next.js for modern web applications.",
  "do you work with ai": "Yes, we provide AI & Machine Learning solutions including chatbots, automation, and intelligent systems.",
  
  // Process
  "how does your process work": "Our process includes: 1) Discovery & Planning, 2) Design & Prototyping, 3) Development & Testing, 4) Deployment, 5) Ongoing Support & Maintenance.",
  "how long does a project take": "Project timelines vary from 2-12 weeks depending on complexity. Contact us to discuss your specific timeline needs.",
  
  // Location & Hours
  "where are you located": "We operate globally with remote teams. Contact info@lumoslogic.com for specific location details.",
  "what are your hours": "We're available Monday-Friday, 9 AM - 6 PM. For urgent support, email support@lumoslogic.com anytime.",
};

export const faqPatterns = [
  { pattern: /what (is|are) (your )?price|how much|cost|pricing/i, key: "how much does it cost" },
  { pattern: /contact|reach|email|phone/i, key: "how can i contact you" },
  { pattern: /what (do you|does lumos|services)/i, key: "what services do you offer" },
  { pattern: /technologies|tech stack|tools/i, key: "what technologies do you use" },
  { pattern: /process|how (do|does) (it|you) work/i, key: "how does your process work" },
  { pattern: /who (are you|is this)/i, key: "who are you" },
  { pattern: /website|site|url/i, key: "what is your website" },
  { pattern: /support|help desk/i, key: "how do i reach support" },
];
