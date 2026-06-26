import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://clacqjcsdxkhgguwvtpv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsYWNxamNzZHhraGdndXd2dHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDk3MzEsImV4cCI6MjA5NzY4NTczMX0.xlfPV4WTEMPlxBQtmWgLa_vGLRvF0ndFYe-ei2_iwJE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
