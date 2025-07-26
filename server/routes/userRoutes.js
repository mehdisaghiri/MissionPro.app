import express from "express";
import { getUserProfile, updateUserProfile, uploadCV, upload } from "../controllers/userController.js";
import protect from "../middleware/protect.js";

const router = express.Router();
// User Auth
router.get("/check-auth", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // return auth status
    return res.status(200).json({
      isAuthenticated: true,
      user: req.oidc.user,
    });
  } else {
    return res.status(200).json(false);
  }
});
// getUserById
router.get("/user/:id", getUserProfile);
//getUserProfile
router.put("/user/profile", protect, updateUserProfile);
//setUserCv
router.post("/user/upload-cv", protect, upload.single('cv'), uploadCV);

export default router;
