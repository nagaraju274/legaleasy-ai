'use client';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { FileText, LayoutDashboard } from 'lucide-react';
import { UserNav } from './user-nav';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';

export function MainSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2.5">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tighter">
            LegalEase AI
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/dashboard"
              isActive={pathname.startsWith('/dashboard')}
              tooltip="Dashboard"
            >
              <LayoutDashboard />
              <span className="truncate">Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {user && <UserNav user={user} />}
      </SidebarFooter>
    </>
  );
}
