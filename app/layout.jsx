import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Saathi - Your Companion for Meaningful Living',
  description: 'AI-powered companion app to combat senior loneliness with health tracking, medicine reminders, and voice assistance',
  keywords: 'senior care, loneliness, AI companion, medicine reminder, health tracking, elderly care',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#f0701f',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ fontSize: '1.125rem' }}
        />
      </body>
    </html>
  )
}
