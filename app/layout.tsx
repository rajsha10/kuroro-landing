import type { Metadata } from 'next'
import './globals.css'
import OCConnectWrapper from '@/components/OCConnectWrapper'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const opts = {
    clientId: '<Does_Not_Matter_For_Sandbox_mode>',    
    redirectUri: 'https://kuroro.vercel.app/redirect', // Adjust this URL
    referralCode: 'EDUCHAIN', // Assign partner code
  };

  return (
    <html lang="en">
      <body>
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          {children}
        </OCConnectWrapper>
        </body>
    </html>
  )
}
