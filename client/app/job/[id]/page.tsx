"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import JobCard from "@/Components/JobItem/JobCard";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import formatMoney from "@/utils/formatMoney";
import { formatDates } from "@/utils/fotmatDates";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";

function page() {
  const { jobs, likeJob, applyToJob } = useJobsContext();
  const { userProfile, isAuthenticated } = useGlobalContext();
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [isLiked, setIsLiked] = React.useState(false);
  const [isApplied, setIsApplied] = React.useState(false);

  const job = jobs.find((job: Job) => job._id === id);
  const otherJobs = jobs.filter((job: Job) => job._id !== id);

  useEffect(() => {
    if (job) {
      setIsApplied(job.applicants.includes(userProfile._id));
    }
  }, [job, userProfile._id]);

  useEffect(() => {
    if (job) {
      setIsLiked(job.likes.includes(userProfile._id));
    }
  }, [job, userProfile._id]);

  if (!job) return null;

  const {
    title,
    location,
    description,
    salary,
    createdBy,
    applicants,
    jobType,
    createdAt,
    salaryType,
    negotiable,
  } = job;

  const { name, profilePicture } = createdBy;

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-7xl">

        {/* Mobile Apply Button - Fixed at top */}
        <div className="lg:hidden mb-4">
          <button
            className={`w-full text-white py-4 rounded-xl font-semibold text-lg transition-colors ${
              isApplied ? "bg-green-500" : "bg-[#7263f3] hover:bg-[#6152e2]"
            }`}
            onClick={() => {
              if (isAuthenticated) {
                if (!isApplied) {
                  applyToJob(job._id);
                  setIsApplied(true);
                } else {
                  toast.error("Vous avez déjà postulé à cet emploi");
                }
              } else {
                router.push("https://missionpro-app-4qaf.onrender.com/login");
              }
            }}
          >
            {isApplied ? "✓ Candidature Envoyée" : "Postuler Maintenant"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              <JobCard activeJob job={job} />

              {otherJobs.slice(0, 3).map((job: Job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">

            {/* Job Header Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4 items-start flex-1">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Image
                      src={profilePicture || "/user.png"}
                      alt={name || "User"}
                      width={50}
                      height={50}
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{title}</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-1">{name}</p>
                    <p className="text-gray-600 dark:text-gray-400">📍 {location}</p>
                  </div>
                </div>
                <button
                  className={`p-3 rounded-xl transition-colors flex-shrink-0 ${
                    isLiked
                      ? "text-[#7263f3] bg-[#7263f3]/10"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    isAuthenticated
                      ? handleLike(job._id)
                      : router.push("https://missionpro-app-4qaf.onrender.com/login");
                  }}
                >
                  {isLiked ? bookmark : bookmarkEmpty}
                </button>
              </div>

              {/* Job Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center">
                  <p className="text-xs text-green-700 dark:text-green-300 mb-1">Salaire</p>
                  <p className="font-bold text-green-900 dark:text-green-100 text-sm">
                    {formatMoney(salary, "GBP")}
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    /{salaryType === "Yearly" ? "an" : salaryType === "Monthly" ? "mois" : salaryType === "Weekly" ? "semaine" : "heure"}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-center">
                  <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">Candidats</p>
                  <p className="font-bold text-blue-900 dark:text-blue-100">{applicants.length}</p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 text-center">
                  <p className="text-xs text-purple-700 dark:text-purple-300 mb-1">Type</p>
                  <p className="font-bold text-purple-900 dark:text-purple-100 text-sm">{jobType[0]}</p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 text-center">
                  <p className="text-xs text-orange-700 dark:text-orange-300 mb-1">Publié</p>
                  <p className="font-bold text-orange-900 dark:text-orange-100 text-xs">{formatDates(createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description de l'Emploi</h2>
              <div
                className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>

            {/* Job Details Cards - Mobile */}
            <div className="space-y-4">

              {/* Job Information */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Autres Informations</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Publié:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatDates(createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Salaire négociable:</span>
                    <span className={`font-medium ${negotiable ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {negotiable ? "Oui" : "Non"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Localisation:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Type d'Emploi:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{jobType[0]}</span>
                  </div>
                </div>
              </div>

              {/* Skills & Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compétences Requises</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-[#7263f3]/10 text-[#7263f3] border border-[#7263f3]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Apply Button */}
            <div className="hidden lg:block">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-6">
                <button
                  className={`w-full text-white py-4 rounded-xl font-semibold text-lg transition-colors ${
                    isApplied ? "bg-green-500" : "bg-[#7263f3] hover:bg-[#6152e2]"
                  }`}
                  onClick={() => {
                    if (isAuthenticated) {
                      if (!isApplied) {
                        applyToJob(job._id);
                        setIsApplied(true);
                      } else {
                        toast.error("Vous avez déjà postulé à cet emploi");
                      }
                    } else {
                      router.push("https://missionpro-app-4qaf.onrender.com/login");
                    }
                  }}
                >
                  {isApplied ? "✓ Candidature Envoyée" : "Postuler Maintenant"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default page;
