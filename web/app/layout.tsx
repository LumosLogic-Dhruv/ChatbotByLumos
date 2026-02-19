import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ChatProvider } from '@/context/ChatContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InteliQ - AI Assistant by Lumos Logic',
  description: 'Official AI Assistant for Lumos Logic',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ic_logo.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  )
}
