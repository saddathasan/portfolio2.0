-- Create admin user using Supabase Auth API compatible method
-- This migration creates an admin user properly for Supabase Auth

-- First, delete any existing user with this email to avoid conflicts
DELETE FROM auth.identities WHERE provider_id IN (
  SELECT id::text FROM auth.users WHERE email = 'saddathasan94@gmail.com'
);
DELETE FROM auth.users WHERE email = 'saddathasan94@gmail.com';

-- Insert admin user into auth.users table with proper Supabase Auth format
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
  email_change_token_current
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'saddathasan94@gmail.com',
  '$2a$10$' || encode(digest('admin123' || (SELECT id::text FROM (SELECT gen_random_uuid() as id) as temp), 'sha256'), 'hex'),
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
  ''
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
  (SELECT id FROM auth.users WHERE email = 'saddathasan94@gmail.com'),
  jsonb_build_object(
    'sub', (SELECT id FROM auth.users WHERE email = 'saddathasan94@gmail.com')::text,
    'email', 'saddathasan94@gmail.com',
    'email_verified', true
  ),
  'email',
  (SELECT id FROM auth.users WHERE email = 'saddathasan94@gmail.com')::text,
  now(),
  now()
);