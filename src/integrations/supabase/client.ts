
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bvfrkzdlklyvnhlpleck.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2ZnJremRsa2x5dm5obHBsZWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNDYyMzQsImV4cCI6MjA2MDgyMjIzNH0.RXlVKVPO4WTD6c4sA9fZIYAQe6zKPqoMoVE6Ilit9ls";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
