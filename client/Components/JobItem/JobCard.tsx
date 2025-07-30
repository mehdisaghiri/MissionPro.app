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
      className={`p-4 sm:p-6 lg:p-8 rounded-xl flex flex-col gap-3 sm:gap-4 lg:gap-5
    ${
      activeJob
        ? "bg-gray-50 shadow-md border-b-2 border-[#7263f3]"
        : "bg-white shadow-sm border border-gray-100"
    }`}
    >
      <div className="flex justify-between items-start">
        <div
          className="group flex gap-2 sm:gap-3 items-start cursor-pointer flex-1 min-w-0"
          onClick={() => router.push(`/job/${job._id}`)}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
            <Image
              src={profilePicture || "/user.png"}
              alt={name || "User"}
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <h4 className="group-hover:underline font-bold text-sm sm:text-base line-clamp-2">{title}</h4>
            <p className="text-xs text-gray-600 truncate">
              {name}: {applicants.length}{" "}
              {applicants.length > 1 ? "Candidats" : "Candidat"}
            </p>
          </div>
        </div>

        <button
          className={`text-lg sm:text-xl lg:text-2xl flex-shrink-0 ${
            isLiked ? "text-[#7263f3]" : "text-gray-400"
          } `}
          onClick={() => {
            isAuthenticated
              ? handleLike(job._id)
              : router.push("https://missionpro-app-4qaf.onrender.com/login");
          }}
        >
          {isLiked ? bookmark : bookmarkEmpty}
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
        {jobType.map((type, index) => (
          <span
            key={index}
            className={`py-1 px-2 sm:px-3 text-xs font-medium rounded-md border ${jobTypeBg(
              type
            )}`}
          >
            {type}
          </span>
        ))}
      </div>

      <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
        {companyDescription.length > 80
          ? `${companyDescription.substring(0, 80)}...`
          : companyDescription}
      </p>

      <Separator />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-6">
        <p className="flex-shrink-0">
          <span className="font-bold text-sm sm:text-base">{formatMoney(salary, "GBP")}</span>
          <span className="font-medium text-gray-400 text-sm sm:text-base">
            /
            {salaryType === "Yearly"
              ? "pa"
              : salaryType === "Monthly"
              ? "pcm"
              : salaryType === "Weekly"
              ? "pw"
              : "ph"}
          </span>
        </p>

        <p className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400">
          <span className="text-sm sm:text-base">
            <Calendar size={14} className="sm:w-4 sm:h-4" />
          </span>
          <span className="truncate">Publié: {formatDates(createdAt)}</span>
        </p>
      </div>
    </div>
  );
}

export default JobCard;
