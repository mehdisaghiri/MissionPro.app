import express from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllJobs,
  deleteJob,
  getUserStats,
  getJobStats
} from "../controllers/adminController.js";
import adminProtect from "../middleware/adminProtect.js";

const router = express.Router();

// User management routes (each route individually protected)
router.get("/admin/users", adminProtect, getAllUsers);
router.put("/admin/users/:id/role", adminProtect, updateUserRole);
router.delete("/admin/users/:id", adminProtect, deleteUser);

// Job management routes (each route individually protected)
router.get("/admin/jobs", adminProtect, getAllJobs);
router.delete("/admin/jobs/:id", adminProtect, deleteJob);

// Statistics routes (each route individually protected)
router.get("/admin/stats/users", adminProtect, getUserStats);
router.get("/admin/stats/jobs", adminProtect, getJobStats);

export default router;
