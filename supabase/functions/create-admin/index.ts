import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Check if admin user already exists
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const adminExists = existingUser?.users?.some(user => user.email === 'admin@admin.com');

    if (adminExists) {
      return new Response(
        JSON.stringify({ message: 'Admin user already exists' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    // Create admin user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: 'admin@admin.com',
      password: 'Admin@123!',
      email_confirm: true,
      user_metadata: {
        full_name: 'System Administrator'
      }
    });

    if (createError) {
      console.error('Error creating admin user:', createError);
      return new Response(
        JSON.stringify({ error: 'Failed to create admin user', details: createError.message }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    console.log('Admin user created successfully:', newUser.user?.id);

    return new Response(
      JSON.stringify({ 
        message: 'Admin user created successfully',
        userId: newUser.user?.id,
        email: 'admin@admin.com'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});