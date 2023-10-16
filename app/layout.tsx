import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'

import { MoadlProvider } from '@/components/providers/ModalProvider'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/providers/theme-provider"

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  title: 'ECarry Photography',
  description: 'ECarry Photography',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={ibmPlexMono.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
          >
            <MoadlProvider />
            <Toaster />
            {children}
            </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
