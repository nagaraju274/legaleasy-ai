'use client';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  FileText,
  ChevronsLeft,
  Folder,
  UploadCloud,
  FileCode,
  Settings,
} from 'lucide-react';
import { UserNav } from './user-nav';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Link from 'next/link';

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
              asChild
              isActive={pathname.startsWith('/dashboard/contracts')}
              tooltip="My Contracts"
            >
              <Link href="/dashboard/contracts">
                <Folder />
                <span className="truncate">My Contracts</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/dashboard/upload"
              isActive={pathname.startsWith('/dashboard/upload')}
              tooltip="Upload"
            >
              <UploadCloud />
              <span className="truncate">Upload</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/dashboard/templates"
              isActive={pathname.startsWith('/dashboard/templates')}
              tooltip="Templates"
            >
              <FileCode />
              <span className="truncate">Templates</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/dashboard/settings"
              isActive={pathname.startsWith('/dashboard/settings')}
              tooltip="Settings"
            >
              <Settings />
              <span className="truncate">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>{user && <UserNav user={user} />}</SidebarFooter>
    </>
  );
}
