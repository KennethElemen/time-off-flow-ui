
import React from 'react';
import { Users, Clock, Calendar, CheckCircle } from 'lucide-react';
import { useLeave } from '@/contexts/LeaveContext';
import { StatsCard } from '@/components/common/StatsCard';

const AdminDashboard = () => {
  const { leaveRequests, users } = useLeave();

  const pendingRequestsCount = leaveRequests.filter(req => req.status === 'pending').length;
  const approvedRequestsCount = leaveRequests.filter(req => req.status === 'approved').length;
  const rejectedRequestsCount = leaveRequests.filter(req => req.status === 'rejected').length;
  const totalUsers = users.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of leave management system</p>
      </div>

      {/* Admin Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pending Requests"
          value={pendingRequestsCount}
          description={`${pendingRequestsCount === 1 ? 'request' : 'requests'} awaiting review`}
          icon={Clock}
        />
        <StatsCard
          title="Approved Requests"
          value={approvedRequestsCount}
          description="approved this month"
          icon={CheckCircle}
        />
        <StatsCard
          title="Rejected Requests"
          value={rejectedRequestsCount}
          description="rejected this month"
          icon={Calendar}
        />
        <StatsCard
          title="Total Employees"
          value={totalUsers}
          description="registered users"
          icon={Users}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
