
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useLeave } from '@/contexts/LeaveContext';
import { LeaveRequestsTable } from '@/components/admin/LeaveRequestsTable';

const AdminPanel = () => {
  const { users } = useLeave();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Leave Requests</h1>
        <p className="text-muted-foreground">Review and manage all employee leave requests</p>
      </div>

      {/* Leave Requests Management */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>
            Review and manage all employee leave requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeaveRequestsTable />
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Overview</CardTitle>
          <CardDescription>
            Overview of all registered employees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    <span>Annual: {user.leaveBalance.annual}d</span>
                    <span className="mx-2">•</span>
                    <span>Sick: {user.leaveBalance.sick}d</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
