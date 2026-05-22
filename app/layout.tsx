import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Saathi - Your AI Companion for Healthy Aging',
  description: 'AI-powered wellness companion for seniors with medicine reminders, social health tracking, and meaningful connections',
  keywords: 'senior care, elderly wellness, medicine reminder, AI companion, social health, aging',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Saathi - AI Companion for Seniors',
    description: 'Combat loneliness and stay healthy with AI-powered wellness tracking',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              fontSize: '1.125rem',
              padding: '16px 24px',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  )
}
