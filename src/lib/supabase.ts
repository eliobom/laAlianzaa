import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pxjurdwivghjahsqvsww.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4anVyZHdpdmdoamFoc3F2c3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MjE2MzgsImV4cCI6MjA5MDQ5NzYzOH0.ROniYhWrvLVYuNjcmv7oZd5nzsJ0t1SlcJFrgMzT2g0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
