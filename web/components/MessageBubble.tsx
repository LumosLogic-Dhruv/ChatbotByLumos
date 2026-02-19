'use client';

import { Message } from '@/types/message';
import { User, Bot } from 'lucide-react';
import clsx from 'clsx';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={clsx('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <img src="/ic_logo.svg" alt="InteliQ" className="w-8 h-8 flex-shrink-0" />
      )}

      <div
        className={clsx(
          'max-w-[70%] rounded-2xl px-4 py-2 break-words',
          isUser
            ? 'bg-[#A7F515] text-[#211951] font-medium'
            : 'bg-[#1a1340] text-gray-100 border border-[#A7F515]/20'
        )}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#A7F515] flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-[#211951]" />
        </div>
      )}
    </div>
  );
}
