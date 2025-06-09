
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { LeaveRequest } from '@/contexts/LeaveContext';

interface LeaveRequestCardProps {
  request: LeaveRequest;
}

export const LeaveRequestCard: React.FC<LeaveRequestCardProps> = ({ request }) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
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
  );
};
