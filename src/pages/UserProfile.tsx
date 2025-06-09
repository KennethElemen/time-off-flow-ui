
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { useLeave } from '@/contexts/LeaveContext';

const profileSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

const UserProfile = () => {
  const { currentUser, updateUserProfile } = useLeave();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    updateUserProfile(values);
    toast({
      title: 'Profile updated!',
      description: 'Your profile information has been successfully updated.',
    });
  }

  const totalAnnualLeave = 25;
  const totalSickLeave = 15;
  const totalPersonalLeave = 8;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Profile</h1>
        <p className="text-muted-foreground">Manage your profile information and view leave balances</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-lg">
                  {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                <Badge variant={currentUser.role === 'admin' ? 'default' : 'secondary'}>
                  {currentUser.role}
                </Badge>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Update Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Leave Balances */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Balances</CardTitle>
            <CardDescription>
              Your current leave entitlements and remaining balances
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Annual Leave */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Annual Leave</span>
                <span className="text-sm text-muted-foreground">
                  {currentUser.leaveBalance.annual} / {totalAnnualLeave} days
                </span>
              </div>
              <Progress 
                value={(currentUser.leaveBalance.annual / totalAnnualLeave) * 100} 
                className="h-3"
              />
              <p className="text-xs text-muted-foreground">
                {totalAnnualLeave - currentUser.leaveBalance.annual} days used
              </p>
            </div>

            {/* Sick Leave */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Sick Leave</span>
                <span className="text-sm text-muted-foreground">
                  {currentUser.leaveBalance.sick} / {totalSickLeave} days
                </span>
              </div>
              <Progress 
                value={(currentUser.leaveBalance.sick / totalSickLeave) * 100} 
                className="h-3"
              />
              <p className="text-xs text-muted-foreground">
                {totalSickLeave - currentUser.leaveBalance.sick} days used
              </p>
            </div>

            {/* Personal Leave */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Personal Leave</span>
                <span className="text-sm text-muted-foreground">
                  {currentUser.leaveBalance.personal} / {totalPersonalLeave} days
                </span>
              </div>
              <Progress 
                value={(currentUser.leaveBalance.personal / totalPersonalLeave) * 100} 
                className="h-3"
              />
              <p className="text-xs text-muted-foreground">
                {totalPersonalLeave - currentUser.leaveBalance.personal} days used
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Additional account preferences and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Employee ID</label>
              <Input value={currentUser.id} disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Role</label>
              <Input value={currentUser.role} disabled />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
