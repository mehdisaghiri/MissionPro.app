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
    <main>
      <Header />

      <div className="p-4 sm:p-6 lg:p-8 mb-8 mx-auto w-[95%] sm:w-[90%] rounded-md flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="lg:w-[26%] flex flex-col gap-4 lg:gap-8 order-2 lg:order-1">
          <div className="lg:block">
            <JobCard activeJob job={job} />
          </div>

          <div className="hidden lg:block">
            {otherJobs.map((job: Job) => (
              <div key={job._id} className="mb-4 lg:mb-8">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white p-4 sm:p-6 rounded-md order-1 lg:order-2">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex justify-between items-start sm:items-center">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 relative overflow-hidden rounded-md flex items-center justify-center bg-gray-200 flex-shrink-0">
                  <Image
                    src={profilePicture || "/user.png"}
                    alt={name || "User"}
                    width={45}
                    height={45}
                    className="rounded-md"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm sm:text-base truncate">{name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Recruiter</p>
                </div>
              </div>
              <button
                className={`text-xl sm:text-2xl flex-shrink-0 ml-2 ${
                  isLiked ? "text-[#7263f3]" : "text-gray-400"
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

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">{title}</h1>
            <div className="flex gap-4 items-center">
              <p className="text-gray-500 text-sm sm:text-base">{location}</p>
            </div>

            <div className="mt-2 flex gap-4 justify-between items-center">
              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-green-500/20 rounded-xl">
                <span className="text-sm">Salaire</span>

                <span>
                  <span className="font-bold">
                    {formatMoney(salary, "GBP")}
                  </span>
                  <span className="font-medium text-gray-500 text-lg">
                    /
                    {salaryType
                      ? `${
                          salaryType === "Yearly"
                            ? "pa"
                            : salaryType === "Monthly"
                            ? "pcm"
                            : salaryType === "Weekly"
                            ? "pw"
                            : "ph"
                        }`
                      : ""}
                  </span>
                </span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-purple-500/20 rounded-xl">
                <span className="text-sm">Publié</span>
                <span className="font-bold">{formatDates(createdAt)}</span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-blue-500/20 rounded-xl">
                <span className="text-sm">Candidats</span>
                <span className="font-bold">{applicants.length}</span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-yellow-500/20 rounded-xl">
                <span className="text-sm">Type d'Emploi</span>
                <span className="font-bold">{jobType[0]}</span>
              </p>
            </div>

            <h2 className="font-bold text-2xl mt-2">Description de l'Emploi</h2>
          </div>

          <div
            className="wysiwyg mt-2"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>

        <div className="w-[26%] flex flex-col gap-8">
          <button
            className={`text-white py-4 rounded-full hover:bg-[#7263f3]/90 hover:text-white ${
              isApplied ? "bg-green-500" : "bg-[#7263f3]"
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
            {isApplied ? "Candidature Envoyée" : "Postuler Maintenant"}
          </button>

          <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
            <h3 className="text-lg font-semibold">Autres Informations</h3>

            <div className="flex flex-col gap-2">
              <p>
                <span className="font-bold">Publié:</span>{" "}
                {formatDates(createdAt)}
              </p>

              <p>
                <span className="font-bold">Salaire négociable: </span>
                <span
                  className={`${
                    negotiable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {negotiable ? "Oui" : "Non"}
                </span>
              </p>

              <p>
                <span className="font-bold">Localisation:</span> {location}
              </p>

              <p>
                <span className="font-bold">Type d'Emploi:</span> {jobType[0]}
              </p>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
            <h3 className="text-lg font-semibold">Étiquettes</h3>
            <p>Autres étiquettes pertinentes pour le poste.</p>

            <div className="flex flex-wrap gap-4">
              {job.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-red-500/20 text-red-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
            <h3 className="text-lg font-semibold">Compétences</h3>
            <p>
              Il s'agit d'un poste à temps plein. Le candidat retenu sera
              responsable des éléments suivants:
            </p>

            <div className="flex flex-wrap gap-4">
              {job.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-indigo-500/20 text-[#7263f3]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default page;
