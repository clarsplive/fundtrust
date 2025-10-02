import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Eye, UserX, Shield, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  role: 'donor' | 'contributor' | 'funds_admin' | 'super_admin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { profile, hasRole } = useAuth();

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserRole = async (userId: string, newRole: 'donor' | 'contributor' | 'funds_admin' | 'super_admin') => {
    setUpdating(userId);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) {
        console.error('Error updating user role:', error);
        toast.error('Failed to update user role');
        return;
      }

      toast.success('User role updated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    } finally {
      setUpdating(null);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    setUpdating(userId);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: !currentStatus })
        .eq('user_id', userId);

      if (error) {
        console.error('Error updating user status:', error);
        toast.error('Failed to update user status');
        return;
      }

      toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    } finally {
      setUpdating(null);
    }
  };

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

  const canModifyUser = (userRole: string) => {
    if (!profile) return false;
    
    // Super admin can modify anyone except other super admins
    if (hasRole('super_admin')) {
      return userRole !== 'super_admin' || profile.role === 'super_admin';
    }
    
    // Funds admin can only modify donors and contributors
    if (hasRole('funds_admin')) {
      return userRole === 'donor' || userRole === 'contributor';
    }
    
    return false;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Loading users...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage user roles and permissions across the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {user.full_name || 'Unnamed User'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.phone_number || 'No phone'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {canModifyUser(user.role) ? (
                      <Select
                        value={user.role}
                        onValueChange={(value) => updateUserRole(user.user_id, value as 'donor' | 'contributor' | 'funds_admin' | 'super_admin')}
                        disabled={updating === user.user_id}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="donor">Donor</SelectItem>
                          <SelectItem value="contributor">Contributor</SelectItem>
                          {hasRole('super_admin') && (
                            <>
                              <SelectItem value="funds_admin">Funds Admin</SelectItem>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.is_active ? 'default' : 'secondary'}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // View user details functionality can be added here
                          toast.info('User details view coming soon');
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {canModifyUser(user.role) && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleUserStatus(user.user_id, user.is_active)}
                            disabled={updating === user.user_id}
                          >
                            {user.is_active ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <Shield className="h-4 w-4" />
                            )}
                          </Button>
                          
                          {hasRole('super_admin') && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete User</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the user's account and all associated data.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      toast.info('User deletion functionality coming soon');
                                    }}
                                  >
                                    Delete User
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {users.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            No users found
          </div>
        )}
      </CardContent>
    </Card>
  );
};