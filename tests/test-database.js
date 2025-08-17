// Test Supabase Database Connection
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

export async function testDatabase() {
  console.log("🧪 Testing Supabase Database Connection");
  console.log("=" .repeat(50));
  
  // Check environment variables
  console.log("\n📋 Checking Supabase Environment Variables:");
  const supabaseVars = [
    'DATABASE_URL',
    'SUPABASE_URL', 
    'SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_KEY'
  ];
  
  let allVarsPresent = true;
  supabaseVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      if (varName.includes('KEY')) {
        console.log(`✅ ${varName}: [REDACTED - ${value.length} characters]`);
      } else {
        console.log(`✅ ${varName}: ${value}`);
      }
    } else {
      console.log(`❌ ${varName}: Missing!`);
      allVarsPresent = false;
    }
  });
  
  if (!allVarsPresent) {
    console.log("❌ Some Supabase environment variables are missing.");
    return false;
  }
  
  // Try to import and test Supabase client
  try {
    console.log("\n🔄 Testing Supabase client connection...");
    
    // Simple test - try to create a basic connection
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    
    // Test with a simple query to check if tables exist
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error && !error.message.includes('relation "users" does not exist')) {
      console.log("❌ Supabase connection failed:", error.message);
      return false;
    }
    
    console.log("✅ Supabase connection successful!");
    
    if (error && error.message.includes('relation "users" does not exist')) {
      console.log("ℹ️ Database schema not yet created - run the SQL from setup guide");
    } else {
      console.log("✅ Database schema appears to be set up");
    }
    
  } catch (error) {
    console.log("⚠️ Supabase client test failed:", error.message);
    return false;
  }
  
  console.log("\n🎯 Supabase Setup Status:");
  console.log("✅ Environment variables configured");
  console.log("✅ Database connection working");
  console.log("✅ Ready for application use");
  
  return true;
}

// Auto-run the test
testDatabase();
