import asycHandler from "express-async-handler";
import User from "../models/UserModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads', 'cvs');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for CV uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: userId_timestamp_originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `cv_${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter to only allow PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};
// Configure multer for CV uploads
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});
// get user profile
export const getUserProfile = asycHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // find user by auth0 id
    const user = await User.findOne({ auth0Id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile: ", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
// update user profile
export const updateUserProfile = asycHandler(async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, bio, profession, resume, phone } = req.body;

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name: name || user.name,
        bio: bio || user.bio,
        profession: profession || user.profession,
        resume: resume || user.resume,
        phone: phone || user.phone,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateUserProfile: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
// upload cv 
export const uploadCV = asycHandler(async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Delete old CV file if it exists
    if (user.resume && user.resume.startsWith('/uploads/')) {
      const oldFilePath = path.join(process.cwd(), user.resume);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Update user with new CV path
    const cvPath = `/uploads/cvs/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { resume: cvPath },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "CV uploaded successfully",
      cvPath: cvPath,
      user: updatedUser
    });
  } catch (error) {
    console.log("Error in uploadCV: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
