const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  'https://hnokrbxwycsndysszvxo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhub2tyYnh3eWNzbmR5c3N6dnhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTY0NDU1NSwiZXhwIjoyMDc1MjIwNTU1fQ.6aSJV2WuRHhLAD5TU-L4Xh4Dgua83IOSMJeZfSUMibM'
);

async function createAdminProfile() {
  try {
    console.log('Creating admin profile...');
    
    // First, get the admin user from auth.users
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching auth users:', authError);
      return;
    }
    
    console.log('Found auth users:', authUsers.users.length);
    
    // Find the admin user by email
    const adminUser = authUsers.users.find(user => user.email === 'saddathasan94@gmail.com');
    
    if (!adminUser) {
      console.error('Admin user not found in auth.users table');
      return;
    }
    
    console.log('Found admin user:', adminUser.id, adminUser.email);
    
    // Check if profile already exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', adminUser.id)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing profile:', checkError);
      return;
    }
    
    if (existingProfile) {
      console.log('Profile already exists:', existingProfile);
      
      // Update role to admin if not already
      if (existingProfile.role !== 'admin') {
        const { data: updatedProfile, error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', adminUser.id)
          .select()
          .single();
        
        if (updateError) {
          console.error('Error updating profile role:', updateError);
          return;
        }
        
        console.log('Updated profile role to admin:', updatedProfile);
      } else {
        console.log('Profile already has admin role');
      }
      return;
    }
    
    // Create new profile
    const profileData = {
      id: adminUser.id,
      full_name: adminUser.user_metadata?.full_name || 'Admin User',
      avatar_url: adminUser.user_metadata?.avatar_url || null,
      role: 'admin',
      bio: 'System Administrator',
      website: null,
      twitter: null,
      github: null,
      linkedin: null
    };
    
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single();
    
    if (insertError) {
      console.error('Error creating profile:', insertError);
      return;
    }
    
    console.log('Successfully created admin profile:', newProfile);
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the function
createAdminProfile();