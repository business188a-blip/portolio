import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Arslan Akif — AI Systems Developer',
  description: 'Python & AI developer. Building intelligent systems, automation workflows, and SaaS products. Founder of Zaiham IT Agency.',
  keywords: ['AI developer', 'Python developer', 'LangChain', 'FastAPI', 'Faisalabad', 'Zaiham'],
  authors: [{ name: 'Arslan Akif' }],
  openGraph: {
    title: 'Arslan Akif — AI Systems Developer',
    description: 'Building intelligent systems that think, automate, and scale.',
    type: 'website',
    url: 'https://zaiham.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arslan Akif — AI Systems Developer',
    description: 'Building intelligent systems that think, automate, and scale.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
