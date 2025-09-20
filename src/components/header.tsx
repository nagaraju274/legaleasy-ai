'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 md:hidden">
      <div className="flex flex-1 items-center justify-between">
        <SidebarTrigger />
        {/* Future mobile header items can go here */}
      </div>
    </header>
  );
}
