import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Empowering Path | Virtual Relationship Coach for Women Nationwide | Should I Stay or Go?',
  description: 'Expert virtual relationship coaching for women across the US facing difficult marriage decisions. Online coaching sessions to help you decide if you should stay and rebuild your marriage or move forward independently.',
  keywords: [
    'virtual relationship coach',
    'online marriage coaching', 
    'should I stay or go coaching',
    'virtual life coach for women',
    'online relationship counseling',
    'marriage decision coaching',
    'virtual coaching sessions',
    'women empowerment coach'
  ],
  authors: [{ name: 'Blakely Patterson' }],
  creator: 'Blakely Patterson',
  publisher: 'The Empowering Path',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.theempoweringpath.com',
    siteName: 'The Empowering Path',
    title: 'Virtual Relationship Coach for Women Nationwide | Should I Stay or Go?',
    description: 'Expert virtual relationship coaching for women facing difficult marriage decisions. Online sessions available nationwide.',
    images: [
      {
        url: 'https://www.theempoweringpath.com/images/virtual-relationship-coach-consultation.jpg',
        width: 1200,
        height: 630,
        alt: 'Virtual relationship coaching consultation with Blakely Patterson',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Relationship Coach for Women Nationwide | Should I Stay or Go?',
    description: 'Expert virtual relationship coaching for women facing difficult marriage decisions.',
    images: ['https://www.theempoweringpath.com/images/virtual-relationship-coach-consultation.jpg'],
  },
  verification: {
    google: 'your-google-verification-code-here',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JXW8YVFMWD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JXW8YVFMWD');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}