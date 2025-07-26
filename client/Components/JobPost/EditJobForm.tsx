"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import React, { useEffect, useState } from "react";
import JobTitle from "./JobTitle";
import JobDetails from "./JobDetails";
import JobSkills from "./JobSkills ";
import JobLocation from "./JobLocation";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditJobFormProps {
  jobId: string;
}

function EditJobForm({ jobId }: EditJobFormProps) {
  const {
    jobTitle,
    jobDescription,
    salaryType,
    activeEmploymentTypes,
    salary,
    location,
    skills,
    negotiable,
    tags,
    resetJobForm,
    setJobTitle,
    setJobDescription,
    setSalaryType,
    setActiveEmploymentTypes,
    setSalary,
    setLocation,
    setSkills,
    setNegotiable,
    setTags,
  } = useGlobalContext();

  const { jobs, updateJob } = useJobsContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);

  const sections = ["About", "Job Details", "Skills", "Location", "Summary"];
  const [currentSection, setCurrentSection] = React.useState(sections[0]);

  // Load existing job data from context
  useEffect(() => {
    const jobData = jobs.find((job: Job) => job._id === jobId);

    if (jobData) {
      setJob(jobData);

      // Pre-fill the form with existing job data
      setJobTitle(jobData.title);
      setJobDescription(jobData.description);
      setSalaryType(jobData.salaryType);
      setActiveEmploymentTypes(jobData.jobType);
      setSalary(jobData.salary);
      setSkills(jobData.skills);
      setNegotiable(jobData.negotiable);
      setTags(jobData.tags);

      // Parse location string back to object
      const locationParts = jobData.location.split(", ");
      const locationObj = {
        address: "",
        city: "",
        country: "",
      };

      if (locationParts.length === 3) {
        locationObj.address = locationParts[0];
        locationObj.city = locationParts[1];
        locationObj.country = locationParts[2];
      } else if (locationParts.length === 2) {
        locationObj.city = locationParts[0];
        locationObj.country = locationParts[1];
      } else if (locationParts.length === 1) {
        locationObj.country = locationParts[0];
      }

      setLocation(locationObj);
      setLoading(false);
    } else if (jobs.length > 0) {
      // Job not found in context
      toast.error("Job not found");
      router.push("/myjobs");
    }
    // If jobs.length === 0, we're still loading jobs from context
  }, [jobId, jobs]);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const renderStages = () => {
    switch (currentSection) {
      case "About":
        return <JobTitle />;
      case "Job Details":
        return <JobDetails />;
      case "Skills":
        return <JobSkills />;
      case "Location":
        return <JobLocation />;
    }
  };

  const getCompletedColor = (section: string) => {
    switch (section) {
      case "About":
        return jobTitle && activeEmploymentTypes.length > 0
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      case "Job Details":
        return jobDescription && salary > 0
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      case "Skills":
        return skills.length && tags.length > 0
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      case "Location":
        return location.address || location.city || location.country
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateData = {
        title: jobTitle,
        description: jobDescription,
        salaryType,
        jobType: activeEmploymentTypes,
        salary,
        location: `${location.address ? location.address + ", " : ""}${
          location.city ? location.city + ", " : ""
        }${location.country}`,
        skills,
        negotiable,
        tags,
      };

      await updateJob(jobId, updateData);
      router.push(`/job/${jobId}`);
    } catch (error) {
      console.error("Error updating job:", error);
      // Error toast is already handled in the updateJob function
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading job data...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex gap-6">
      <div className="self-start w-[10rem] flex flex-col bg-white rounded-md shadow-sm overflow-hidden">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`pl-4 py-3 relative flex self-start items-center gap-2 font-medium 
                ${
                  currentSection === section
                    ? "text-[#7263F3]"
                    : "text-gray-500"
                }
                `}
            onClick={() => handleSectionChange(section)}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center border border-gray-400/60 justify-center text-gray-500
                ${
                  currentSection === section ? " text-white" : ""
                } ${getCompletedColor(section)}`}
            >
              {index + 1}
            </span>
            {section}
            {currentSection === section && (
              <span className="w-1 h-full absolute left-0 top-0 bg-[#7263F3] rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      <form
        action=""
        className="p-6 flex-1 bg-white rounded-lg self-start"
        onSubmit={handleSubmit}
      >
        {renderStages()}

        <div className="flex justify-end gap-4 mt-4">
          {currentSection !== "Summary" && (
            <button
              type="button"
              className="px-6 py-2 bg-[#7263F3] text-white rounded-md"
              onClick={() => {
                const currentIndex = sections.indexOf(currentSection);
                setCurrentSection(sections[currentIndex + 1]);
              }}
            >
              Next
            </button>
          )}

          {currentSection === "Summary" && (
            <button
              type="submit"
              className="self-end px-6 py-2 bg-[#7263F3] text-white rounded-md"
            >
              Update Job
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditJobForm;
