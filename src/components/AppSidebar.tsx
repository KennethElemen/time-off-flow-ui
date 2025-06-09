
import { Link, useLocation } from 'react-router-dom';
import { Calendar, User, Clock, Settings, BarChart3 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { useLeave } from '@/contexts/LeaveContext';

const employeeItems = [
  {
    title: 'Dashboard',
    url: '/employee',
    icon: Calendar,
  },
  {
    title: 'Request Leave',
    url: '/leave-request',
    icon: Clock,
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: User,
  },
];

const adminItems = [
  {
    title: 'Admin Dashboard',
    url: '/admin',
    icon: BarChart3,
  },
  {
    title: 'Manage Requests',
    url: '/admin-panel',
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { currentUser } = useLeave();

  const isAdmin = currentUser.role === 'admin';

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">LeaveTracker</h2>
            <p className="text-xs text-muted-foreground">Leave Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {isAdmin ? 'Admin Menu' : 'Employee Menu'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {(isAdmin ? adminItems : employeeItems).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Employee Access</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {employeeItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
