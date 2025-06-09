
# .NET Backend Integration

This folder is reserved for your .NET backend integration.

## Expected API Endpoints

Your .NET backend should provide the following endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)

### Leave Requests
- `GET /api/leave-requests` - Get leave requests (filtered by user role)
- `POST /api/leave-requests` - Create new leave request
- `PUT /api/leave-requests/{id}` - Update leave request
- `DELETE /api/leave-requests/{id}` - Delete leave request
- `PUT /api/leave-requests/{id}/approve` - Approve leave request (admin only)
- `PUT /api/leave-requests/{id}/reject` - Reject leave request (admin only)

## Environment Variables

Create a `.env` file in the root directory with:

```
VITE_API_BASE_URL=https://your-backend-url/api
```

## CORS Configuration

Make sure your .NET backend allows CORS for your frontend domain.
