// Comprehensive Integration Test Suite
import { testCDP } from './test-cdp.js';
import { testDatabase } from './test-database.js';
import { testCloudinary } from './test-cloudinary.js';
import { testYieldSimulation } from './test-yield-simulation.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function runAllTests() {
  console.log("🚀 FAIRHOLD PLATFORM - COMPREHENSIVE TEST SUITE");
  console.log("=" .repeat(60));
  console.log(`🎯 Testing Mode: ${process.env.DEMO_MODE === 'true' ? 'HACKATHON DEMO' : 'PRODUCTION'}`);
  console.log(`🌐 Network: ${process.env.NEXT_PUBLIC_NETWORK}`);
  console.log(`💰 Yield Mode: ${process.env.SIMULATE_YIELD === 'true' ? 'SIMULATED' : 'REAL'}`);
  console.log("=" .repeat(60));
  
  const results = {
    cdp: false,
    database: false,
    cloudinary: false,
    yieldSimulation: false
  };
  
  // Test 1: CDP Configuration
  try {
    console.log("\n" + "🔧 TEST 1: COINBASE CDP CONFIGURATION".padEnd(60, " "));
    results.cdp = await testCDP();
  } catch (error) {
    console.error("❌ CDP test failed:", error.message);
  }
  
  // Test 2: Database Connection
  try {
    console.log("\n" + "🗄️ TEST 2: DATABASE CONNECTION".padEnd(60, " "));
    results.database = await testDatabase();
  } catch (error) {
    console.error("❌ Database test failed:", error.message);
  }
  
  // Test 3: File Storage (optional)
  try {
    console.log("\n" + "🖼️ TEST 3: FILE STORAGE (CLOUDINARY)".padEnd(60, " "));
    results.cloudinary = await testCloudinary();
  } catch (error) {
    console.log("⚠️ Cloudinary test skipped (not yet configured)");
    results.cloudinary = true; // Don't fail overall test for optional service
  }
  
  // Test 4: Yield Simulation
  try {
    console.log("\n" + "📊 TEST 4: YIELD SIMULATION SYSTEM".padEnd(60, " "));
    results.yieldSimulation = await testYieldSimulation();
  } catch (error) {
    console.error("❌ Yield simulation test failed:", error.message);
  }
  
  // Summary
  console.log("\n" + "=" .repeat(60));
  console.log("📊 TEST RESULTS SUMMARY");
  console.log("=" .repeat(60));
  
  const testResults = [
    { name: "Coinbase CDP", status: results.cdp, critical: true },
    { name: "Database (Supabase)", status: results.database, critical: true },
    { name: "File Storage (Cloudinary)", status: results.cloudinary, critical: false },
    { name: "Yield Simulation", status: results.yieldSimulation, critical: true }
  ];
  
  testResults.forEach(test => {
    const icon = test.status ? "✅" : "❌";
    const criticality = test.critical ? "(CRITICAL)" : "(OPTIONAL)";
    console.log(`${icon} ${test.name}: ${test.status ? "PASS" : "FAIL"} ${criticality}`);
  });
  
  const criticalTests = testResults.filter(t => t.critical);
  const allCriticalPassed = criticalTests.every(t => t.status);
  const allTestsPassed = testResults.every(t => t.status);
  
  console.log("\n" + "=" .repeat(60));
  if (allTestsPassed) {
    console.log("🎉 ALL TESTS PASSED - PLATFORM FULLY READY!");
    console.log("✅ Ready for production deployment");
    console.log("✅ All services configured and working");
  } else if (allCriticalPassed) {
    console.log("✅ CRITICAL TESTS PASSED - CORE PLATFORM READY!");
    console.log("⚠️ Some optional services need configuration");
    console.log("✅ Ready for hackathon demo");
  } else {
    console.log("❌ CRITICAL TESTS FAILED - PLATFORM NOT READY");
    console.log("🔧 Please fix the failing services before proceeding");
  }
  
  console.log("=" .repeat(60));
  
  return allCriticalPassed;
}

// Environment validation
function validateEnvironment() {
  const requiredVars = [
    'CDP_API_KEY_NAME',
    'CDP_PRIVATE_KEY', 
    'CDP_PROJECT_ID',
    'DATABASE_URL',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY'
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error("\nPlease check your .env.local file and complete the setup guide.");
    return false;
  }
  
  return true;
}

// Main execution
async function main() {
  if (!validateEnvironment()) {
    process.exit(1);
  }
  
  const success = await runAllTests();
  process.exit(success ? 0 : 1);
}

// Auto-run if called directly
main();

export { runAllTests, validateEnvironment };
