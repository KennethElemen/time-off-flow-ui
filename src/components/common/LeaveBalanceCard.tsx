
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LeaveBalance {
  annual: number;
  sick: number;
  personal: number;
}

interface LeaveBalanceCardProps {
  leaveBalance: LeaveBalance;
}

export const LeaveBalanceCard: React.FC<LeaveBalanceCardProps> = ({ leaveBalance }) => {
  const leaveTypes = [
    { type: 'Annual Leave', current: leaveBalance.annual, total: 25 },
    { type: 'Sick Leave', current: leaveBalance.sick, total: 15 },
    { type: 'Personal Leave', current: leaveBalance.personal, total: 8 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Balance</CardTitle>
        <CardDescription>Your current leave allocations and usage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaveTypes.map(({ type, current, total }) => (
          <div key={type} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{type}</span>
              <span className="text-sm text-muted-foreground">
                {current}/{total} days
              </span>
            </div>
            <Progress value={(current / total) * 100} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
