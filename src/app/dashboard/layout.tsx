'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { MainSidebar } from '@/components/main-sidebar';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Redirect from /dashboard to /dashboard/upload
  React.useEffect(() => {
    if (pathname === '/dashboard') {
      router.replace('/dashboard/upload');
    }
  }, [pathname, router]);

  // Do not render layout for /dashboard, wait for redirect
  if (pathname === '/dashboard') {
    return null;
  }
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <MainSidebar />
        </Sidebar>
        <SidebarInset>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
            <Footer />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
