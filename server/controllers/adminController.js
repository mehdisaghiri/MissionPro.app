import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Admin
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const role = req.query.role || "";

    // Build search query
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { profession: { $regex: search, $options: "i" } }
      ];
    }
    
    if (role) {
      query.role = role;
    }

    const skip = (page - 1) * limit;
    
    const users = await User.find(query)
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Update user role
// @route   PUT /api/v1/admin/users/:id/role
// @access  Admin
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role
    if (!["jobseeker", "recruiter", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Prevent admin from removing their own admin role
    if (req.user._id.toString() === id && role !== "admin") {
      return res.status(400).json({ 
        message: "You cannot remove your own admin privileges" 
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User role updated successfully",
      user
    });
  } catch (error) {
    console.error("Error in updateUserRole:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/admin/users/:id
// @access  Admin
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.user._id.toString() === id) {
      return res.status(400).json({ 
        message: "You cannot delete your own account" 
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user's jobs
    await Job.deleteMany({ createdBy: id });

    // Remove user from job applicants and likes
    await Job.updateMany(
      { $or: [{ applicants: id }, { likes: id }] },
      { $pull: { applicants: id, likes: id } }
    );

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User and associated data deleted successfully"
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get all jobs
// @route   GET /api/v1/admin/jobs
// @access  Admin
export const getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const jobType = req.query.jobType || "";

    // Build search query
    let query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }
    
    if (jobType) {
      query.jobType = { $in: [jobType] };
    }

    const skip = (page - 1) * limit;
    
    const jobs = await Job.find(query)
      .populate("createdBy", "name email profilePicture")
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Job.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      jobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalJobs: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Delete job
// @route   DELETE /api/v1/admin/jobs/:id
// @access  Admin
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({
      message: "Job deleted successfully"
    });
  } catch (error) {
    console.error("Error in deleteJob:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get user statistics
// @route   GET /api/v1/admin/stats/users
// @access  Admin
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const jobseekers = await User.countDocuments({ role: "jobseeker" });
    const recruiters = await User.countDocuments({ role: "recruiter" });
    const admins = await User.countDocuments({ role: "admin" });
    
    // Get users registered in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsers = await User.countDocuments({ 
      createdAt: { $gte: thirtyDaysAgo } 
    });

    res.status(200).json({
      totalUsers,
      jobseekers,
      recruiters,
      admins,
      newUsers
    });
  } catch (error) {
    console.error("Error in getUserStats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get job statistics
// @route   GET /api/v1/admin/stats/jobs
// @access  Admin
export const getJobStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    
    // Get jobs posted in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newJobs = await Job.countDocuments({ 
      createdAt: { $gte: thirtyDaysAgo } 
    });

    // Get total applications
    const jobsWithApplicants = await Job.find({}, "applicants");
    const totalApplications = jobsWithApplicants.reduce(
      (total, job) => total + job.applicants.length, 
      0
    );

    // Get job type distribution
    const jobTypeStats = await Job.aggregate([
      { $unwind: "$jobType" },
      { $group: { _id: "$jobType", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      totalJobs,
      newJobs,
      totalApplications,
      jobTypeStats
    });
  } catch (error) {
    console.error("Error in getJobStats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
