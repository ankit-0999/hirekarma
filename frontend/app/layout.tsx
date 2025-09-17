import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { EventProvider } from '@/contexts/EventContext';
import { Toaster } from '@/components/ui/toast';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EventHub - Event Management System',
  description: 'Modern event management system for creating and managing events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <AuthProvider>
          <EventProvider>
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Toaster />
          </EventProvider>
        </AuthProvider>
      </body>
    </html>
  );
}