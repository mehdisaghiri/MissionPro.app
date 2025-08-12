import User from "../models/UserModel.js";

// Check if user is authenticated and has admin role
const adminProtect = async (req, res, next) => {
  try {
    // First check if user is authenticated
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).json({ message: "Not Authorized - Please login" });
    }

    // Get user from database
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has admin role
    if (user.role !== "admin") {
      return res.status(403).json({ 
        message: "Access Denied - Admin privileges required" 
      });
    }

    // Add user to request object for use in controllers
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in adminProtect middleware:", error);
    return res.status(500).json({ 
      message: "Internal Server Error" 
    });
  }
};

export default adminProtect;
