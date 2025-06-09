
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LeaveProvider } from "./contexts/LeaveContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Layout from "./components/Layout";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LeaveRequest from "./pages/LeaveRequest";
import UserProfile from "./pages/UserProfile";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LeaveProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen w-full">
              <Routes>
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                  <Route index element={<EmployeeDashboard />} />
                  <Route path="employee" element={<EmployeeDashboard />} />
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="admin-panel" element={<AdminPanel />} />
                  <Route path="leave-request" element={<LeaveRequest />} />
                  <Route path="profile" element={<UserProfile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LeaveProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
