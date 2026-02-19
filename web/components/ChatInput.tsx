'use client';

import { useState } from 'react';
import { useChat } from '@/context/ChatContext';
import { Send } from 'lucide-react';

export default function ChatInput() {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-[#A7F515]/20 p-4 bg-[#1a1340]">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask InteliQ about Lumos Logic..."
          disabled={isLoading}
          className="flex-1 bg-[#211951] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A7F515] disabled:opacity-50 border border-[#A7F515]/20"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-[#A7F515] hover:bg-[#8fd312] disabled:bg-gray-700 disabled:cursor-not-allowed text-[#211951] font-semibold rounded-lg px-4 py-3 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
