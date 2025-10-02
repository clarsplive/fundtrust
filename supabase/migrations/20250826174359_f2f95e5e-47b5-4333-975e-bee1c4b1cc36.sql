-- Update clarsp@live.se to Super Admin role
UPDATE public.profiles 
SET role = 'super_admin', updated_at = now()
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'clarsp@live.se'
);