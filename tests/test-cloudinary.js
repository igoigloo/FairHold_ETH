// Test Cloudinary File Storage
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

export async function testCloudinary() {
  console.log("🧪 Testing Cloudinary File Storage");
  console.log("=" .repeat(50));
  
  // Check environment variables
  console.log("\n📋 Checking Cloudinary Environment Variables:");
  const cloudinaryVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'CLOUDINARY_UPLOAD_PRESET'
  ];
  
  let allVarsPresent = true;
  cloudinaryVars.forEach(varName => {
    const value = process.env[varName];
    if (value && value !== 'your-cloudinary-cloud-name' && value !== 'your-api-key' && value !== 'your-api-secret') {
      if (varName.includes('SECRET')) {
        console.log(`✅ ${varName}: [REDACTED]`);
      } else {
        console.log(`✅ ${varName}: ${value}`);
      }
    } else {
      console.log(`❌ ${varName}: Missing or placeholder value!`);
      allVarsPresent = false;
    }
  });
  
  if (!allVarsPresent) {
    console.log("❌ Cloudinary not configured yet. Complete Step 4 of setup guide.");
    return false;
  }
  
  // Test Cloudinary connection
  try {
    console.log("\n🔄 Testing Cloudinary connection...");
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary connection successful!");
    console.log("✅ Cloud status:", result.status);
    
  } catch (error) {
    console.log("❌ Cloudinary connection failed:", error.message);
    return false;
  }
  
  console.log("\n🎯 Cloudinary Setup Status:");
  console.log("✅ Environment variables configured");
  console.log("✅ API connection working");
  console.log("✅ Ready for file uploads");
  
  return true;
}

// Auto-run the test
testCloudinary();
