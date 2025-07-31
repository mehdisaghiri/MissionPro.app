"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Separator } from "../ui/separator";
import formatMoney from "@/utils/formatMoney";
import { formatDates } from "@/utils/fotmatDates";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";

interface JobProps {
  job: Job;
  activeJob?: boolean;
}

function JobCard({ job, activeJob }: JobProps) {
  const { likeJob } = useJobsContext();
  const { userProfile, isAuthenticated } = useGlobalContext();
  const [isLiked, setIsLiked] = React.useState(false);

  const {
    title,
    description,
    salaryType,
    salary,
    createdBy,
    applicants,
    jobType,
    createdAt,
  } = job;

  const { name, profilePicture } = createdBy;

  const router = useRouter();

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  useEffect(() => {
    setIsLiked(job.likes.includes(userProfile._id));
  }, [job.likes, userProfile._id]);

  // Clean the description by removing HTML tags
  const companyDescription = description ? description.replace(/<\/?[^>]+(>|$)/g, "") : "";

  const jobTypeBg = (type: string) => {
    switch (type) {
      case "Full Time":
        return "bg-green-500/20 text-green-600";
      case "Part Time":
        return "bg-purple-500/20 text-purple-600";
      case "Contract":
        return "bg-red-500/20 text-red-600";
      case "Internship":
        return "bg-indigo-500/20 text-indigo-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  return (
    <div
      className={`p-5 sm:p-6 rounded-xl flex flex-col gap-4 transition-all duration-200 hover:shadow-md cursor-pointer
    ${
      activeJob
        ? "bg-white shadow-lg border-l-4 border-[#7263f3]"
        : "bg-white shadow-sm border border-gray-100 hover:border-gray-200"
    }`}
      onClick={() => router.push(`/job/${job._id}`)}
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3 items-start flex-1 min-w-0">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image
              src={profilePicture || "/user.png"}
              alt={name || "User"}
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <h3 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-2 leading-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-600">
              {name}
            </p>
          </div>
        </div>

        <button
          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
            isLiked
              ? "text-[#7263f3] bg-[#7263f3]/10"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            isAuthenticated
              ? handleLike(job._id)
              : router.push("https://missionpro-app-4qaf.onrender.com/login");
          }}
        >
          {isLiked ? bookmark : bookmarkEmpty}
        </button>
      </div>

      {/* Job Type Tags */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        {jobType.map((type, index) => (
          <span
            key={index}
            className={`py-1.5 px-3 text-xs font-medium rounded-full ${jobTypeBg(type)}`}
          >
            {type}
          </span>
        ))}
      </div>

      {/* Job Description */}
      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
        {companyDescription.length > 100
          ? `${companyDescription.substring(0, 100)}...`
          : companyDescription}
      </p>

      {/* Applicants Info */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          {applicants.length} {applicants.length > 1 ? "Candidats" : "Candidat"}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Footer Section */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <p className="text-lg font-bold text-gray-900 truncate">
            {formatMoney(salary, "GBP")}
            <span className="text-sm font-normal text-gray-500 ml-1">
              /
              {salaryType === "Yearly"
                ? "an"
                : salaryType === "Monthly"
                ? "mois"
                : salaryType === "Weekly"
                ? "semaine"
                : "heure"}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
          <Calendar size={12} />
          <span className="whitespace-nowrap">{formatDates(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
