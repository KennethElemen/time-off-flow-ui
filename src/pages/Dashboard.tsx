
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { useLeave } from '@/contexts/LeaveContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, leaveRequests } = useLeave();

  const userRequests = leaveRequests.filter(req => req.userId === currentUser.id);
  const pendingRequests = userRequests.filter(req => req.status === 'pending').length;
  const approvedRequests = userRequests.filter(req => req.status === 'approved').length;
  const totalRequests = userRequests.length;

  const upcomingLeaves = leaveRequests
    .filter(req => req.status === 'approved' && new Date(req.startDate) > new Date())
    .slice(0, 3);

  const leaveUsage = {
    annual: Math.max(0, 25 - currentUser.leaveBalance.annual),
    sick: Math.max(0, 15 - currentUser.leaveBalance.sick),
    personal: Math.max(0, 8 - currentUser.leaveBalance.personal),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's an overview of your leave status</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              {pendingRequests === 1 ? 'request' : 'requests'} awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Leaves</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedRequests}</div>
            <p className="text-xs text-muted-foreground">
              out of {totalRequests} total requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Leave</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.leaveBalance.annual}</div>
            <p className="text-xs text-muted-foreground">days remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.leaveBalance.sick}</div>
            <p className="text-xs text-muted-foreground">days remaining</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Leave Balance */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Balance</CardTitle>
            <CardDescription>Your current leave allocations and usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Annual Leave</span>
                <span className="text-sm text-muted-foreground">
                  {currentUser.leaveBalance.annual}/25 days
                </span>
              </div>
              <Progress value={(currentUser.leaveBalance.annual / 25) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sick Leave</span>
                <span className="text-sm text-muted-foreground">
                  {currentUser.leaveBalance.sick}/15 days
                </span>
              </div>
              <Progress value={(currentUser.leaveBalance.sick / 15) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Personal Leave</span>
                <span className="text-sm text-muted-foreground">
                  {currentUser.leaveBalance.personal}/8 days
                </span>
              </div>
              <Progress value={(currentUser.leaveBalance.personal / 8) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-between">
              <Link to="/leave-request">
                Request New Leave
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-between">
              <Link to="/profile">
                View Profile
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>

            {currentUser.role === 'admin' && (
              <Button asChild variant="outline" className="w-full justify-between">
                <Link to="/admin">
                  Admin Panel
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leave Requests</CardTitle>
          <CardDescription>Your latest leave submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {userRequests.length > 0 ? (
            <div className="space-y-4">
              {userRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium capitalize">{request.type} Leave</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      request.status === 'approved' ? 'default' : 
                      request.status === 'rejected' ? 'destructive' : 
                      'secondary'
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No leave requests yet. <Link to="/leave-request" className="text-primary hover:underline">Submit your first request</Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
