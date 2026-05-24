import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/signup", async (c) => {
  try {
    const { email, password, name, farmName } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, farmName },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Sign up error for ${email}: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    console.log(`User created successfully: ${email}`);
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log(`Sign up exception: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// Verify session endpoint
app.get("/verify-session", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    );

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: "Invalid session" }, 401);
    }

    return c.json({ user });
  } catch (error) {
    console.log(`Session verification error: ${error.message}`);
    return c.json({ error: error.message }, 500);
  }
});

// SMS send endpoint (Africa's Talking integration)
app.post("/hyper-handler/sms/send", async (c) => {
  try {
    const { phoneNumber, message, type } = await c.req.json();

    console.log("=== SMS SEND REQUEST ===");
    console.log("Phone:", phoneNumber);
    console.log("Message:", message);
    console.log("Type:", type);

    if (!phoneNumber || !message) {
      return c.json({ error: "Phone number and message are required" }, 400);
    }

    const apiKey = Deno.env.get('AFRICAS_TALKING_API_KEY');
    const username = Deno.env.get('AFRICAS_TALKING_USERNAME');
    const senderId = Deno.env.get('AFRICAS_TALKING_SENDER_ID') || 'EvieFarm';

    console.log("Username:", username);
    console.log("API Key exists:", !!apiKey);
    console.log("API Key length:", apiKey?.length || 0);
    console.log("Sender ID:", senderId);

    if (!apiKey || !username) {
      console.log('SMS service not configured - Africa\'s Talking credentials missing');
      return c.json({
        error: "SMS service not configured. Please add AFRICAS_TALKING_API_KEY and AFRICAS_TALKING_USERNAME environment variables."
      }, 503);
    }

    const requestBody = new URLSearchParams({
      'username': username,
      'to': phoneNumber,
      'message': message,
      'from': senderId
    });

    console.log("Request body:", requestBody.toString());

    // Send SMS via Africa's Talking API
    const response = await fetch('https://api.africastalking.com/version1/messaging', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'apiKey': apiKey,
        'Accept': 'application/json'
      },
      body: requestBody
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", JSON.stringify(Object.fromEntries(response.headers)));

    const responseText = await response.text();
    console.log("Response text:", responseText);

    let result;
    try {
      result = JSON.parse(responseText);
      console.log("Parsed result:", JSON.stringify(result, null, 2));
    } catch (e) {
      console.log("Failed to parse response as JSON:", e.message);
      return c.json({
        success: false,
        error: `Invalid API response: ${responseText}`
      }, 500);
    }

    if (result.SMSMessageData && result.SMSMessageData.Recipients && result.SMSMessageData.Recipients.length > 0) {
      const recipient = result.SMSMessageData.Recipients[0];
      console.log("Recipient status code:", recipient.statusCode);
      console.log("Recipient status:", recipient.status);

      if (recipient.statusCode === 101) {
        console.log(`SMS sent successfully to ${phoneNumber}`);
        return c.json({
          success: true,
          messageId: recipient.messageId,
          cost: recipient.cost
        });
      } else {
        console.log(`SMS failed for ${phoneNumber}: ${recipient.status}`);
        return c.json({
          success: false,
          error: recipient.status
        }, 400);
      }
    } else {
      console.log(`SMS API error - no recipients in response`);
      return c.json({
        success: false,
        error: result.message || "Failed to send SMS"
      }, 500);
    }
  } catch (error) {
    console.log(`SMS send exception: ${error.message}`);
    console.log("Stack trace:", error.stack);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);