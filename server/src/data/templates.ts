export const templates = {
  greetings: {
    morning: ["Good morning! I'm InteliQ from Lumos Logic. How can I help you today?"],
    afternoon: ["Good afternoon! I'm InteliQ from Lumos Logic. What can I assist you with?"],
    evening: ["Good evening! I'm InteliQ from Lumos Logic. How may I help you?"],
    default: ["Hello! I'm InteliQ, your Lumos Logic assistant. How can I help you today?"]
  },
  
  thanks: [
    "You're welcome! Feel free to ask if you need anything else about Lumos Logic.",
    "Happy to help! Let me know if you have more questions.",
    "My pleasure! Reach out anytime you need assistance."
  ],
  
  goodbye: [
    "Goodbye! Feel free to return anytime you have questions about Lumos Logic.",
    "Take care! We're here whenever you need us.",
    "See you later! Contact us at info@lumoslogic.com for further assistance."
  ]
};

export const intentPatterns = {
  greeting: /^(hi|hello|hey|good morning|good afternoon|good evening|greetings)/i,
  thanks: /(thank you|thanks|appreciate|grateful)/i,
  goodbye: /(bye|goodbye|see you|take care|farewell)/i,
};

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return templates.greetings.morning[0];
  if (hour < 18) return templates.greetings.afternoon[0];
  return templates.greetings.evening[0];
}

export function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}
