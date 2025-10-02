import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserManagement } from '@/components/UserManagement';
import Navigation from '@/components/Navigation';
import { Users, Settings, BarChart3, Shield } from 'lucide-react';

const Dashboard = () => {
  const { user, profile, loading, isAdmin, hasRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'destructive';
      case 'funds_admin':
        return 'default';
      case 'contributor':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'funds_admin':
        return 'Funds Admin';
      case 'contributor':
        return 'Contributor';
      default:
        return 'Donor';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">
              Welcome back, {profile.full_name || user.email}
            </p>
            <Badge variant={getRoleBadgeVariant(profile.role)}>
              {getRoleLabel(profile.role)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Donations</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">UGX 0</div>
              <p className="text-xs text-muted-foreground">Total donated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campaigns</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                {profile.role === 'donor' ? 'Supported' : 'Created'}
              </p>
            </CardContent>
          </Card>

          {isAdmin() && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Registered users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">UGX 0</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {isAdmin() && (
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList>
              <TabsTrigger value="users">User Management</TabsTrigger>
              {hasRole('super_admin') && (
                <TabsTrigger value="settings">System Settings</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            {hasRole('super_admin') && (
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>
                      Configure platform-wide settings and system administration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      System settings panel coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        )}

        {!isAdmin() && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                What would you like to do today?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => navigate('/')} className="w-full">
                Browse Campaigns
              </Button>
              {(profile.role === 'contributor' || profile.role === 'funds_admin') && (
                <Button variant="outline" className="w-full">
                  Create Campaign
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;