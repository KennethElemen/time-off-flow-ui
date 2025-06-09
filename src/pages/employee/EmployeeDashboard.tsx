
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { useLeave } from '@/contexts/LeaveContext';
import { Link } from 'react-router-dom';
import { StatsCard } from '@/components/common/StatsCard';
import { LeaveBalanceCard } from '@/components/common/LeaveBalanceCard';
import { LeaveRequestCard } from '@/components/common/LeaveRequestCard';

const EmployeeDashboard = () => {
  const { currentUser, leaveRequests } = useLeave();

  const userRequests = leaveRequests.filter(req => req.userId === currentUser.id);
  const pendingRequests = userRequests.filter(req => req.status === 'pending').length;
  const approvedRequests = userRequests.filter(req => req.status === 'approved').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's an overview of your leave status</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pending Requests"
          value={pendingRequests}
          description={`${pendingRequests === 1 ? 'request' : 'requests'} awaiting approval`}
          icon={Clock}
        />
        <StatsCard
          title="Approved Leaves"
          value={approvedRequests}
          description={`out of ${userRequests.length} total requests`}
          icon={Calendar}
        />
        <StatsCard
          title="Annual Leave"
          value={currentUser.leaveBalance.annual}
          description="days remaining"
          icon={User}
        />
        <StatsCard
          title="Sick Leave"
          value={currentUser.leaveBalance.sick}
          description="days remaining"
          icon={User}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <LeaveBalanceCard leaveBalance={currentUser.leaveBalance} />

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
                <LeaveRequestCard key={request.id} request={request} />
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

export default EmployeeDashboard;
