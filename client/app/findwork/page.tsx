"use client";
import Filters from "@/Components/Filters";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import JobCard from "@/Components/JobItem/JobCard";
import SearchForm from "@/Components/SearchForm";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { grip, list, table } from "@/utils/Icons";
import Image from "next/image";
import React from "react";

function page() {
  const { jobs, filters } = useJobsContext();
  const [columns, setColumns] = React.useState(3);

  // cycle through 1, 2, 3 columns
  const toggleGridColumns = () => {
    setColumns((prev) => (prev === 3 ? 2 : prev === 2 ? 1 : 3));
  };

  const getIcon = () => {
    if (columns === 3) return grip;
    if (columns === 2) return table;
    return list;
  };

  const filetredJobs =
    filters.fullTime || filters.partTime || filters.contract || filters.internet
      ? jobs.filter((job: Job) => {
          if (filters.fullTime && job.jobType.includes("Full Time"))
            return true;
          if (filters.partTime && job.jobType.includes("Part Time"))
            return true;
          if (filters.contract && job.jobType.includes("Contract")) return true;
          if (filters.internship && job.jobType.includes("Internship"))
            return true;

          if (filters.fullStack && job.tags.includes("Full Stack")) return true;
          if (filters.backend && job.tags.includes("Backend")) return true;
          if (filters.devOps && job.tags.includes("DevOps")) return true;
          if (filters.uiUx && job.tags.includes("UI/UX")) return true;
        })
      : jobs;

  return (
    <main>
      <Header />

      <div className="relative px-4 sm:px-8 lg:px-16 bg-[#D7DEDC] overflow-hidden">
        <h1 className="py-6 sm:py-8 text-black font-bold text-xl sm:text-2xl lg:text-3xl">
          Trouvez Votre Prochain Emploi Ici
        </h1>

        <div className="pb-6 sm:pb-8 relative z-10">
          <SearchForm />
        </div>

        {/* Hide decorative images on mobile */}
        <Image
          src="/woman-on-phone.jpg"
          alt="hero"
          width={200}
          height={500}
          className="clip-path w-[15rem] absolute z-0 top-[0] right-[10rem] h-full object-cover hidden lg:block"
        />

        <Image
          src="/team.jpg"
          alt="hero"
          width={200}
          height={500}
          className="clip-path-2 rotate-6 w-[15rem] absolute z-0 top-[0] right-[32rem] h-full object-cover hidden xl:block"
        />
      </div>

      {/* Main Content Container */}
      <div className="bg-[#f0f5fa] min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">

          {/* Header Section */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Emplois Récents
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {filetredJobs.length} emploi{filetredJobs.length > 1 ? 's' : ''} trouvé{filetredJobs.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* View Toggle - Desktop Only */}
              <button
                onClick={toggleGridColumns}
                className="hidden sm:flex items-center gap-3 border border-gray-300 bg-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                <span>
                  {columns === 3
                    ? "Vue Grille"
                    : columns === 2
                    ? "Vue Tableau"
                    : "Vue Liste"}
                </span>
                <span className="text-lg">{getIcon()}</span>
              </button>
            </div>

            {/* Filters Section */}
            <div className="mb-6">
              <Filters />
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="space-y-4">
            {jobs.length > 0 ? (
              <div
                className={`grid gap-4 ${
                  columns === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : columns === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {filetredJobs.map((job: Job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Aucun Emploi Trouvé !
                  </h3>
                  <p className="text-gray-600">
                    Essayez d'ajuster vos filtres ou votre recherche
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default page;
