// Script to create admin user using Supabase Auth API
// This ensures proper password hashing and user creation

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // We need service role key for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdminUser() {
  try {
    console.log('Creating admin user...')
    
    // First, try to delete existing user if any
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const existingUser = existingUsers?.users?.find(user => user.email === 'saddathasan94@gmail.com')
    
    if (existingUser) {
      console.log('Deleting existing user...')
      await supabase.auth.admin.deleteUser(existingUser.id)
    }
    
    // Create new admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'saddathasan94@gmail.com',
      password: 'admin123',
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    })

    if (error) {
      console.error('Error creating admin user:', error)
      return
    }

    console.log('Admin user created successfully:', data.user.email)
    console.log('User ID:', data.user.id)
    
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

createAdminUser()