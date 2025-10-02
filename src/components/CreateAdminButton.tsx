import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const CreateAdminButton = () => {
  const [loading, setLoading] = useState(false);

  const createAdmin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-admin', {
        method: 'POST'
      });

      if (error) {
        console.error('Error calling create-admin function:', error);
        toast.error('Failed to create admin user');
        return;
      }

      console.log('Admin creation response:', data);
      toast.success(data?.message || 'Admin user created successfully');
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error('Failed to create admin user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={createAdmin} disabled={loading} variant="outline">
      {loading ? 'Creating Admin...' : 'Create Default Admin'}
    </Button>
  );
};