
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { ProgressProvider } from '@/hooks/use-progress';
import { ThemeProvider } from '@/hooks/use-theme';
import { AuthProvider } from '@/hooks/use-auth';

export const metadata: Metadata = {
  title: 'InsightsLM',
  description: 'An AI-powered learning platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn("font-sans antialiased", "min-h-screen")}>
        <AuthProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
          >
            <ProgressProvider>
              {children}
            </ProgressProvider>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
