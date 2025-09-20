'use client';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { FileText, LayoutDashboard, ChevronsLeft } from 'lucide-react';
import { UserNav } from './user-nav';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export function MainSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold tracking-tighter">
              LegalEase AI
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={toggleSidebar}
          >
            <ChevronsLeft className="h-5 w-5" />
          </Button>
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
