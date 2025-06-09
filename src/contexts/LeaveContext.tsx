
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'admin';
  avatar?: string;
  leaveBalance: {
    annual: number;
    sick: number;
    personal: number;
  };
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  type: 'annual' | 'sick' | 'personal';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

interface LeaveContextType {
  currentUser: User;
  leaveRequests: LeaveRequest[];
  users: User[];
  submitLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>) => void;
  updateLeaveRequest: (id: string, status: 'approved' | 'rejected', reviewedBy: string) => void;
  updateUserProfile: (updates: Partial<User>) => void;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export const useLeave = () => {
  const context = useContext(LeaveContext);
  if (!context) {
    throw new Error('useLeave must be used within a LeaveProvider');
  }
  return context;
};

export const LeaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    leaveBalance: {
      annual: 20,
      sick: 10,
      personal: 5
    }
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'admin',
      leaveBalance: { annual: 20, sick: 10, personal: 5 }
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'employee',
      leaveBalance: { annual: 18, sick: 8, personal: 3 }
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'employee',
      leaveBalance: { annual: 15, sick: 12, personal: 2 }
    }
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Jane Smith',
      type: 'annual',
      startDate: '2024-07-15',
      endDate: '2024-07-19',
      reason: 'Family vacation',
      status: 'pending',
      submittedAt: '2024-06-10T10:00:00Z'
    },
    {
      id: '2',
      userId: '3',
      userName: 'Mike Johnson',
      type: 'sick',
      startDate: '2024-06-20',
      endDate: '2024-06-21',
      reason: 'Medical appointment',
      status: 'approved',
      submittedAt: '2024-06-15T14:30:00Z',
      reviewedBy: 'John Doe',
      reviewedAt: '2024-06-16T09:00:00Z'
    }
  ]);

  const submitLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setLeaveRequests(prev => [newRequest, ...prev]);
  };

  const updateLeaveRequest = (id: string, status: 'approved' | 'rejected', reviewedBy: string) => {
    setLeaveRequests(prev => prev.map(request => 
      request.id === id 
        ? { 
            ...request, 
            status, 
            reviewedBy, 
            reviewedAt: new Date().toISOString() 
          }
        : request
    ));
  };

  const updateUserProfile = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
    setUsers(prev => prev.map(user => 
      user.id === currentUser.id 
        ? { ...user, ...updates }
        : user
    ));
  };

  return (
    <LeaveContext.Provider value={{
      currentUser,
      leaveRequests,
      users,
      submitLeaveRequest,
      updateLeaveRequest,
      updateUserProfile
    }}>
      {children}
    </LeaveContext.Provider>
  );
};
