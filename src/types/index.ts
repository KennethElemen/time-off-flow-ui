
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  leaveBalance: {
    annual: number;
    sick: number;
    personal: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  type: 'annual' | 'sick' | 'personal';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  comments?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}
