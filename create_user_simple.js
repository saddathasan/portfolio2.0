// Simple user creation using Supabase signup endpoint
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

// Create Supabase client with anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createUser() {
  try {
    console.log('Creating user via signup...')
    
    // Use signup to create the user
    const { data, error } = await supabase.auth.signUp({
      email: 'saddathasan94@gmail.com',
      password: 'admin123',
      options: {
        data: {
          role: 'admin'
        }
      }
    })

    if (error) {
      console.error('Signup failed:', error)
      return
    }

    console.log('User created successfully!')
    console.log('User:', data.user?.email)
    console.log('Confirmation required:', !data.user?.email_confirmed_at)
    
    // If email confirmation is required, we need to confirm it manually
    if (data.user && !data.user.email_confirmed_at) {
      console.log('User needs email confirmation. In a real app, check your email.')
      console.log('For testing, the user should still be able to login if email confirmation is disabled in Supabase settings.')
    }
    
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

createUser()