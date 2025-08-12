import mongoose from "mongoose";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const makeUserAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Replace this with your actual email address
    const userEmail = "saghirimehdi12@gmail.com"; // CHANGE THIS TO YOUR EMAIL

    // Find user by email
    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      console.log("❌ User not found with email:", userEmail);
      console.log("Available users:");
      const allUsers = await User.find({}, "email name role");
      allUsers.forEach(u => {
        console.log(`  - ${u.email} (${u.name}) - Role: ${u.role}`);
      });
      process.exit(1);
    }

    // Update user role to admin
    user.role = "admin";
    await user.save();

    console.log("✅ User successfully promoted to admin!");
    console.log("Email:", user.email);
    console.log("Name:", user.name);
    console.log("Role:", user.role);
    console.log("\n🎉 You can now access the admin dashboard at /admin");
    
  } catch (error) {
    console.error("❌ Error updating user role:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
};

makeUserAdmin();
