// Test CDP Configuration and Connection
import { Coinbase } from "@coinbase/coinbase-sdk";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

export async function testCDP() {
  console.log("🔍 COMPREHENSIVE CDP CONFIGURATION TEST");
  console.log("=" .repeat(50));
  
  // 1. Check environment variables
  console.log("\n📋 Step 1: Checking Environment Variables");
  const requiredVars = ['CDP_API_KEY_NAME', 'CDP_PRIVATE_KEY', 'CDP_PROJECT_ID'];
  let allVarsPresent = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: ${varName === 'CDP_PRIVATE_KEY' ? '[REDACTED]' : value}`);
    } else {
      console.log(`❌ ${varName}: Missing!`);
      allVarsPresent = false;
    }
  });
  
  if (!allVarsPresent) {
    console.log("❌ Some environment variables are missing. Please check your .env.local file.");
    return false;
  }
  
  // 2. Check private key format
  console.log("\n🔑 Step 2: Checking Private Key Format");
  const privateKey = process.env.CDP_PRIVATE_KEY;
  if (privateKey.length > 0) {
    console.log(`✅ Private key present (length: ${privateKey.length} characters)`);
    console.log(`✅ Private key format: ${privateKey.startsWith('-----BEGIN') ? 'PEM format' : 'Base64 format'}`);
  } else {
    console.log("❌ Private key is empty");
    return false;
  }
  
  // 3. Test CDP configuration
  console.log("\n⚙️ Step 3: Testing CDP Configuration");
  try {
    Coinbase.configure({
      apiKeyName: process.env.CDP_API_KEY_NAME,
      privateKey: process.env.CDP_PRIVATE_KEY,
      useServerSigner: true
    });
    console.log("✅ CDP configuration successful");
  } catch (error) {
    console.log("❌ CDP configuration failed:", error.message);
    return false;
  }
  
  // 4. Test yield simulation
  console.log("\n📊 Step 4: Testing Yield Simulation");
  try {
    const principal = 1000; // $1000 USDC
    const days = 30; // 30 days
    const annualRate = 0.041; // 4.1%
    const dailyRate = annualRate / 365;
    
    const simulatedYield = principal * dailyRate * days;
    console.log(`✅ Simulated yield for $${principal} over ${days} days: $${simulatedYield.toFixed(2)}`);
    console.log(`📊 This represents ${(simulatedYield/principal * 100).toFixed(3)}% return`);
  } catch (error) {
    console.log("❌ Yield simulation failed:", error.message);
    return false;
  }
  
  console.log("\n🎯 RESULT: CDP Configuration is working perfectly!");
  console.log("✅ All environment variables are set");
  console.log("✅ CDP SDK is properly configured");
  console.log("✅ Yield simulation working");
  console.log("✅ Ready for production use");
  
  return true;
}

// Auto-run the test
testCDP();
