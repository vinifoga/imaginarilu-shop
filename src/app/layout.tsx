'use client';
import "./globals.css";
import { Suspense } from 'react';
import { LoadingProvider } from "@/components/LoadingContext";
import Loading from "@/components/Loading";
import { NavigationEvents } from "@/components/NavigationEvents";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <LoadingProvider>
          <Loading />
          <Suspense fallback={<Loading />}>
            {children}
            <NavigationEvents />
          </Suspense>
        </LoadingProvider>
      </body>
    </html>
  );
}