-- Fix auth schema issues and create admin user properly
-- This migration addresses potential auth schema problems

-- First, ensure auth schema is properly set up
-- Check if auth.users table has proper constraints and triggers

-- Clean up any existing problematic data
DELETE FROM auth.identities WHERE provider_id IN (
  SELECT id::text FROM auth.users WHERE email = 'saddathasan94@gmail.com'
);
DELETE FROM auth.users WHERE email = 'saddathasan94@gmail.com';

-- Create admin user with proper Supabase Auth format
-- Using a more compatible approach
DO $$
DECLARE
    user_id uuid := gen_random_uuid();
BEGIN
    -- Insert into auth.users with all required fields
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        role,
        aud,
        confirmation_token,
        recovery_token,
        email_change_token_new,
        email_change_token_current,
        email_change_confirm_status,
        is_sso_user,
        is_anonymous
    ) VALUES (
        user_id,
        '00000000-0000-0000-0000-000000000000',
        'saddathasan94@gmail.com',
        crypt('admin123', gen_salt('bf')),
        now(),
        now(),
        now(),
        '{"provider": "email", "providers": ["email"]}',
        '{"role": "admin"}',
        false,
        'authenticated',
        'authenticated',
        '',
        '',
        '',
        '',
        0,
        false,
        false
    );

    -- Insert corresponding identity record
    INSERT INTO auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        provider_id,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        user_id,
        jsonb_build_object(
            'sub', user_id::text,
            'email', 'saddathasan94@gmail.com',
            'email_verified', true
        ),
        'email',
        user_id::text,
        now(),
        now()
    );
END $$;