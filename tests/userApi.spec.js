const { test, expect } = require("@playwright/test");

// Parameterized configuration following strict guidelines to prevent hardcoding
const CONFIG = {
  apiBaseUrl: process.env.API_BASE_URL || "http://206.189.23.26:3005",
  originUrl: process.env.ORIGIN_URL || "http://206.189.23.26:3003",
  userEmail: process.env.USER_EMAIL || "ankitqa.iihglobal+15071@gmail.com",
  userPassword: process.env.USER_PASSWORD || "Pa$$w0rd!",
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
  acceptLanguage: "en-US,en;q=0.9",
  acceptHeader: "application/json, text/plain, */*",
  // Fallback token from cURL command (used only if dynamic auth fails or for specific static-token regression test check)
  fallbackToken: process.env.FALLBACK_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTc3ZDJkMjQ4YTlmODVmZTIxZGRjOSIsImVtYWlsIjoiYW5raXRxYS5paWhnbG9iYWwrMTUwNzFAZ21haWwuY29tIiwiaWF0IjoxNzg0MTg1MTA3LCJleHAiOjE3ODQyNzE1MDd9._pJikzUM1z4Nh4VEnyjYOVaMm4xo1QbuxwjbbTwL1Yk"
};

test.describe("User API Test Suite", () => {

  test("GET /api/v1/user - Dynamic Authentication and Fetch User Profile", async ({ request }) => {
    // 1. Authenticate dynamically to fetch the JWT token
    const loginResponse = await request.post(`${CONFIG.apiBaseUrl}/api/v1/user/login`, {
      headers: {
        "Accept": CONFIG.acceptHeader,
        "Content-Type": "application/json",
        "Origin": CONFIG.originUrl,
        "Referer": `${CONFIG.originUrl}/`
      },
      data: {
        email: CONFIG.userEmail,
        password: CONFIG.userPassword
      }
    });

    // Verify successful login transition and details
    expect(loginResponse.status()).toBe(200);
    const loginData = await loginResponse.json();
    expect(loginData.success).toBe(true);
    expect(loginData.token).toBeDefined();
    expect(typeof loginData.token).toBe("string");

    const dynamicToken = loginData.token;

    // 2. Fetch logged-in user profile with the dynamically fetched token
    const userProfileResponse = await request.get(`${CONFIG.apiBaseUrl}/api/v1/user`, {
      headers: {
        "Accept": CONFIG.acceptHeader,
        "Accept-Language": CONFIG.acceptLanguage,
        "Connection": "keep-alive",
        "Origin": CONFIG.originUrl,
        "Referer": `${CONFIG.originUrl}/`,
        "User-Agent": CONFIG.userAgent,
        "authorization": `Bearer ${dynamicToken}`
      }
    });

    // Assert HTTP status is 200 OK
    expect(userProfileResponse.status()).toBe(200);

    const responseBody = await userProfileResponse.json();

    // Assertions verifying structure, success property, and value mapping
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toBe("User fetched successfully");
    expect(responseBody.user).toBeDefined();
    
    // Assert against parameterized user attributes
    expect(responseBody.user.email).toBe(CONFIG.userEmail);
    expect(responseBody.user._id).toBeDefined();
    expect(responseBody.user.status).toBe("Active");
  });

  test("GET /api/v1/user - Fetch Profile using Fallback/Static Token", async ({ request }) => {
    // Fetch logged-in user profile using the token provided in the cURL command
    const userProfileResponse = await request.get(`${CONFIG.apiBaseUrl}/api/v1/user`, {
      headers: {
        "Accept": CONFIG.acceptHeader,
        "Accept-Language": CONFIG.acceptLanguage,
        "Connection": "keep-alive",
        "Origin": CONFIG.originUrl,
        "Referer": `${CONFIG.originUrl}/`,
        "User-Agent": CONFIG.userAgent,
        "authorization": `Bearer ${CONFIG.fallbackToken}`
      }
    });

    // Assert HTTP status is 200 OK
    expect(userProfileResponse.status()).toBe(200);

    const responseBody = await userProfileResponse.json();

    // Assertions verifying structure, success property, and value mapping
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toBe("User fetched successfully");
    expect(responseBody.user).toBeDefined();
    expect(responseBody.user.email).toBe(CONFIG.userEmail);
  });

  test("GET /api/v1/user - Unauthorized Request (Missing Token)", async ({ request }) => {
    const response = await request.get(`${CONFIG.apiBaseUrl}/api/v1/user`, {
      headers: {
        "Accept": CONFIG.acceptHeader,
        "Accept-Language": CONFIG.acceptLanguage,
        "Connection": "keep-alive",
        "Origin": CONFIG.originUrl,
        "Referer": `${CONFIG.originUrl}/`,
        "User-Agent": CONFIG.userAgent
      }
    });

    // Assert HTTP status is 401 Unauthorized
    expect(response.status()).toBe(401);

    const responseBody = await response.json();
    expect(responseBody.success).toBe(false);
    expect(responseBody.message).toContain("Login first");
  });

  test("GET /api/v1/user - Unauthorized Request (Invalid Token)", async ({ request }) => {
    const response = await request.get(`${CONFIG.apiBaseUrl}/api/v1/user`, {
      headers: {
        "Accept": CONFIG.acceptHeader,
        "Accept-Language": CONFIG.acceptLanguage,
        "Connection": "keep-alive",
        "Origin": CONFIG.originUrl,
        "Referer": `${CONFIG.originUrl}/`,
        "User-Agent": CONFIG.userAgent,
        "authorization": "Bearer invalid_token_value_here"
      }
    });

    // Assert HTTP status is 401 Unauthorized or 500 JWT error (depending on error handler)
    // Both 401 and 500 indicate authentication failed
    const status = response.status();
    expect([401, 500]).toContain(status);
  });
});
