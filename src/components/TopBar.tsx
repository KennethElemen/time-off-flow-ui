
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useLeave } from '@/contexts/LeaveContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export function TopBar() {
  const { currentUser } = useLeave();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="border-b bg-background px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Leave Management System</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Badge variant={currentUser.role === 'admin' ? 'default' : 'secondary'}>
          {currentUser.role}
        </Badge>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{currentUser.name}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
