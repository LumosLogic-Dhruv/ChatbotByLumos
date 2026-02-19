'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@/context/ChatContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import { Bot } from 'lucide-react';

export default function ChatWindow() {
  const { messages, isLoading, error } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-[#211951]">
      <header className="bg-[#1a1340] border-b border-[#A7F515]/20 p-4 flex items-center gap-3">
        <img src="/LUMOS LOGIC.gif" alt="InteliQ" className="h-12 object-contain" />
        <div>
          <h1 className="text-xl font-semibold text-[#A7F515]">InteliQ</h1>
          <p className="text-sm text-gray-300">by Lumos Logic</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <img src="/LUMOS LOGIC.gif" alt="InteliQ" className="h-32 mb-4 object-contain" />
            <p className="text-lg text-[#A7F515]">Welcome to InteliQ</p>
            <p className="text-sm text-gray-400 mt-2">Ask me anything about Lumos Logic!</p>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-300 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput />
    </div>
  );
}
