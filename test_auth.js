// Test authentication directly with Supabase client
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

// Create Supabase client with anon key (same as frontend)
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAuth() {
  try {
    console.log('Testing authentication with saddathasan94@gmail.com / admin123...')
    
    // Try to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'saddathasan94@gmail.com',
      password: 'admin123'
    })

    if (error) {
      console.error('Authentication failed:', error)
      return
    }

    console.log('Authentication successful!')
    console.log('User:', data.user?.email)
    console.log('Session:', data.session ? 'Valid session created' : 'No session')
    
    // Test getting user
    const { data: userData, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Error getting user:', userError)
    } else {
      console.log('Current user:', userData.user?.email)
    }
    
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

testAuth()