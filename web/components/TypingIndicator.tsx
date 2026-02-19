'use client';

import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <img src="/ic_logo.svg" alt="InteliQ" className="w-8 h-8 flex-shrink-0" />
      <div className="bg-[#1a1340] border border-[#A7F515]/20 rounded-2xl px-4 py-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#A7F515] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#A7F515] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#A7F515] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
