import express from "express";
import { auth } from "express-openid-connect";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./db/connect.js";
import asyncHandler from "express-async-handler";
import fs from "fs";
import User from "./models/UserModel.js";
import { log } from "console";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['SECRET', 'CLIENT_ID', 'ISSUER_BASE_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  console.error('Please set these environment variables in your Render service settings');
}

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET || 'fallback-secret-for-development',
  baseURL: process.env.BASE_URL || 'https://missionpro-app-4qaf.onrender.com',
  clientID: process.env.CLIENT_ID || '',
  issuerBaseURL: process.env.ISSUER_BASE_URL || '',
  routes: {
    postLogoutRedirect: process.env.CLIENT_URL,
    callback: "/callback",
    logout: "/logout",
    login: "/login",
  },

  session: {
    absoluteDuration: 30 * 24 * 60 * 60 * 1000, // 30 days
    cookie: {
      // Extract domain from BASE_URL if available, otherwise use undefined
      domain: process.env.NODE_ENV === "production" && process.env.BASE_URL
        ? new URL(process.env.BASE_URL).hostname
        : undefined,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    },
  },
};

app.use(
  cors({
    origin: process.env.CLIENT_URL ,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Only use auth if required environment variables are present
if (process.env.SECRET && process.env.CLIENT_ID && process.env.ISSUER_BASE_URL) {
  try {
    app.use(auth(config));
    console.log('✅ Auth0 authentication enabled');
  } catch (error) {
    console.error('❌ Failed to initialize Auth0:', error.message);
    console.warn('Authentication disabled due to configuration error');
  }
} else {
  console.warn('⚠️  Auth0 configuration incomplete. Authentication disabled.');
  console.warn('Missing environment variables:', {
    SECRET: !process.env.SECRET,
    CLIENT_ID: !process.env.CLIENT_ID,
    ISSUER_BASE_URL: !process.env.ISSUER_BASE_URL
  });
}

// function to check if user exists in the db
const enusureUserInDB = asyncHandler(async (user) => {
  try {
    const existingUser = await User.findOne({ auth0Id: user.sub });

    if (!existingUser) {
      // create a new user document
      const newUser = new User({
        auth0Id: user.sub,
        email: user.email,
        name: user.name,
        role: "jobseeker",
        profilePicture: user.picture,
      });

      await newUser.save();

      console.log("User added to db", user);
    } else {
      console.log("User already exists in db", existingUser);
    }
  } catch (error) {
    console.log("Error checking or adding user to db", error.message);
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3000
  });
});

app.get("/", async (req, res) => {
  try {
    if (req.oidc && req.oidc.isAuthenticated()) {
      // check if Auth0 user exists in the db
      await enusureUserInDB(req.oidc.user);

      // redirect to the frontend
      return res.redirect(process.env.CLIENT_URL);
    } else {
      return res.json({
        message: "MissionPro API Server",
        status: "running",
        auth: "not authenticated"
      });
    }
  } catch (error) {
    console.error("Error in root route:", error.message);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// routes
try {
  const routeFiles = fs.readdirSync("./routes");

  routeFiles.forEach((file) => {
    // import dynamic routes
    import(`./routes/${file}`)
      .then((route) => {
        app.use("/api/v1/", route.default);
        console.log(`Route loaded: ${file}`);
      })
      .catch((error) => {
        console.error(`Error importing route ${file}:`, error.message);
      });
  });
} catch (error) {
  console.error("Error reading routes directory:", error.message);
}

const server = async () => {
  try {
    // Try to connect to database
    if (process.env.MONGO_URI) {
      await connect();
    } else {
      console.warn('MONGO_URI not found. Database connection skipped.');
    }

    const PORT = process.env.PORT || 3000;

    const serverInstance = app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Server URL: http://localhost:${PORT}`);
    });

    // Handle server errors
    serverInstance.on('error', (error) => {
      console.error('Server error:', error.message);
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
      }
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
};

server();
