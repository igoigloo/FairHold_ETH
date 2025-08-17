# FairHold Testing Suite

This directory contains all testing files for the FairHold platform. Tests are organized by service and functionality.

## 🧪 Available Tests

### Individual Service Tests

1. **`test-cdp.js`** - Coinbase CDP Configuration & Connection
   - Tests API key configuration
   - Validates private key format
   - Tests SDK initialization
   - Simulates yield calculations

2. **`test-database.js`** - Supabase Database Connection
   - Validates environment variables
   - Tests database connectivity
   - Checks schema status

3. **`test-cloudinary.js`** - Cloudinary File Storage
   - Tests API credentials
   - Validates connection
   - Checks upload configuration

4. **`test-yield-simulation.js`** - Yield Calculation System
   - Tests yield calculation scenarios
   - Validates compound interest
   - Simulates various time periods

### Comprehensive Test Suite

5. **`run-all-tests.js`** - Complete Integration Test
   - Runs all individual tests
   - Provides comprehensive summary
   - Validates entire platform readiness

## 🚀 Running Tests

### Run Individual Tests
```bash
# Test CDP configuration
node tests/test-cdp.js

# Test database connection
node tests/test-database.js

# Test file storage
node tests/test-cloudinary.js

# Test yield simulation
node tests/test-yield-simulation.js
```

### Run All Tests
```bash
# Complete platform test
node tests/run-all-tests.js
```

### Add to package.json Scripts
```json
{
  "scripts": {
    "test": "node tests/run-all-tests.js",
    "test:cdp": "node tests/test-cdp.js",
    "test:db": "node tests/test-database.js",
    "test:storage": "node tests/test-cloudinary.js",
    "test:yield": "node tests/test-yield-simulation.js"
  }
}
```

## 📋 Test Categories

### Critical Tests (Must Pass)
- ✅ Coinbase CDP Configuration
- ✅ Database Connection
- ✅ Yield Simulation

### Optional Tests (Can Fail)
- ⚠️ Cloudinary File Storage (can be configured later)

## 🎯 Test Results Interpretation

### ✅ All Tests Pass
- Platform is fully ready for production
- All services configured and working
- Ready for deployment

### ✅ Critical Tests Pass
- Core platform functionality working
- Ready for hackathon demo
- Optional services can be configured later

### ❌ Critical Tests Fail
- Platform not ready for use
- Fix failing services before proceeding
- Check environment variables and service configuration

## 🔧 Troubleshooting

### Common Issues

1. **Environment Variables Missing**
   - Check `.env.local` file exists
   - Verify all required variables are set
   - Ensure no placeholder values remain

2. **CDP Configuration Fails**
   - Verify API key name matches downloaded credentials
   - Check private key format (Base64 vs PEM)
   - Ensure project ID is correct

3. **Database Connection Fails**
   - Verify Supabase project is running
   - Check database URL format
   - Ensure API keys are correct

4. **Cloudinary Not Configured**
   - Complete Step 4 of setup guide
   - Get credentials from Cloudinary dashboard
   - Update environment variables

## 📁 File Organization

```
tests/
├── README.md              # This file
├── run-all-tests.js       # Main test suite
├── test-cdp.js           # CDP tests
├── test-database.js      # Database tests
├── test-cloudinary.js    # File storage tests
└── test-yield-simulation.js # Yield calculation tests
```

## 🎯 Next Steps

After all tests pass:
1. Move to frontend development
2. Implement API endpoints
3. Deploy to Vercel
4. Configure production environment
