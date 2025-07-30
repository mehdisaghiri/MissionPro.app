import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";


// create Job 
export const createJob = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const {
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
    } = req.body;

    // titre 
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    //description 
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    //localisation 
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    // salaire 
    if (!salary) {
      return res.status(400).json({ message: "Salary is required" });
    }

    //Type d'Emploi
    if (!jobType) {
      return res.status(400).json({ message: "Job Type is required" });
    }

    // tags
    if (!tags) {
      return res.status(400).json({ message: "Tags are required" });
    }

    // skills
    if (!skills) {
      return res.status(400).json({ message: "Skills are required" });
    }

    const job = new Job({
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
      createdBy: user._id,
    });

    await job.save();

    return res.status(201).json(job);
  } catch (error) {
    console.log("Error in createJob: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get jobs
export const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate("createdBy", "name profilePicture")
      .sort({ createdAt: -1 }); // sort by latest job

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getJobs: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get jobs by user
export const getJobsByUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = await Job.find({ createdBy: user._id })
      .populate("createdBy", "name profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getJobsByUser: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// search jobs
export const searchJobs = asyncHandler(async (req, res) => {
  try {
    const { tags, location, title } = req.query;

    let query = {};

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const jobs = await Job.find(query).populate(
      "createdBy",
      "name profilePicture"
    );

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in searchJobs: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// apply for job
export const applyJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (job.applicants.includes(user._id)) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    job.applicants.push(user._id);

    await job.save();

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in applyJob: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// like and unlike job
export const likeJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isLiked = job.likes.includes(user._id);

    if (isLiked) {
      job.likes = job.likes.filter((like) => !like.equals(user._id));
    } else {
      job.likes.push(user._id);
    }

    await job.save();

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in likeJob: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get job by id
export const getJobById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate(
      "createdBy",
      "name profilePicture"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in getJobById: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// update job
export const updateJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is the owner of the job
    if (job.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this job" });
    }

    const {
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
    } = req.body;

    // Update job fields
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title: title || job.title,
        description: description || job.description,
        location: location || job.location,
        salary: salary || job.salary,
        jobType: jobType || job.jobType,
        tags: tags || job.tags,
        skills: skills || job.skills,
        salaryType: salaryType || job.salaryType,
        negotiable: negotiable !== undefined ? negotiable : job.negotiable,
      },
      { new: true, runValidators: true }
    ).populate("createdBy", "name profilePicture");

    return res.status(200).json(updatedJob);
  } catch (error) {
    console.log("Error in updateJob: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get job applicants
export const getJobApplicants = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const job = await Job.findById(id).populate(
      "applicants",
      "name email profilePicture bio profession resume createdAt"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is the owner of the job
    if (job.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view applicants for this job" });
    }

    return res.status(200).json({
      jobTitle: job.title,
      applicants: job.applicants,
    });
  } catch (error) {
    console.log("Error in getJobApplicants: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// remove applicant from job
export const removeApplicant = asyncHandler(async (req, res) => {
  try {
    const { jobId, applicantId } = req.params;
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the user is the owner of the job
    if (job.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to manage applicants for this job" });
    }

    // Check if the applicant is actually applied to this job
    if (!job.applicants.includes(applicantId)) {
      return res.status(400).json({ message: "User has not applied to this job" });
    }

    // Remove applicant from job
    await Job.findByIdAndUpdate(
      jobId,
      { $pull: { applicants: applicantId } },
      { new: true }
    );

    return res.status(200).json({ message: "Applicant removed successfully" });
  } catch (error) {
    console.log("Error in removeApplicant: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// delete job
export const deleteJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await job.deleteOne({
      _id: id,
    });

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log("Error in deleteJob: ", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});
