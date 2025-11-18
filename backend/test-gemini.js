require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log("=== Gemini API Test ===\n");
  console.log("API Key:", apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}` : "Missing ✗");
  console.log("API Key Length:", apiKey ? apiKey.length : 0);
  console.log("API Key Format:", apiKey ? (apiKey.startsWith("AIza") ? "✓ Correct" : "✗ Should start with 'AIza'") : "✗");
  
  if (!apiKey || !apiKey.startsWith("AIza")) {
    console.log("\n❌ Invalid API key format!");
    console.log("Get a valid key from: https://aistudio.google.com/app/apikey");
    return;
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const modelsToTry = [
    "gemini-pro",
    "gemini-2.5-flash",
    "gemini-1.5-pro"
  ];
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`\n[${modelName}] Testing...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Reply with just 'Hello'");
      const response = await result.response;
      const text = response.text();
      
      console.log(`✅ SUCCESS!`);
      console.log(`Response: ${text}`);
      console.log(`\n🎉 Working model found: ${modelName}`);
      console.log(`\nUpdate your .env file:`);
      console.log(`GEMINI_MODEL=${modelName}`);
      return;
    } catch (err) {
      const errorMsg = err.message || err.toString();
      console.log(`❌ Failed`);
      
      if (errorMsg.includes("API_KEY_INVALID") || errorMsg.includes("API key")) {
        console.log(`   Error: Invalid or restricted API key`);
        console.log(`   Solution: Generate a new API key at https://aistudio.google.com/app/apikey`);
        break;
      } else if (errorMsg.includes("404")) {
        console.log(`   Error: Model not found or not accessible`);
      } else if (errorMsg.includes("quota")) {
        console.log(`   Error: Quota exceeded`);
        break;
      } else {
        console.log(`   Error: ${errorMsg.substring(0, 100)}`);
      }
    }
  }
  
  console.log("\n❌ No working models found.");
  console.log("\nTroubleshooting:");
  console.log("1. Verify your API key at: https://aistudio.google.com/app/apikey");
  console.log("2. Check if API key has proper permissions");
  console.log("3. Ensure Generative Language API is enabled");
  console.log("4. Try generating a fresh API key");
}

testGemini();
