import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://chngatcsmtsiaxkyrclp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNobmdhdGNzbXRzaWF4a3lyY2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDg3MTQsImV4cCI6MjA2MTA4NDcxNH0.jXgnZkBwJ570LPBXMDgnJTgOlLzUwdhuPPUeiHp9y6g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
}) 