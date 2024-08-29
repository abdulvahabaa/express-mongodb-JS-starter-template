import { test, expect, request } from "@playwright/test";

const signupUserModel = {
  name: "Test User",
  email: "testuser@example.com",
  password: "password123",
};

test("Should add new user data", async ({ request }) => {
 
  const response = await request.post("http://localhost:9002/auth/signup", {
    data: signupUserModel,
  });
    
  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  console.log(responseBody);

});
