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

      <div className="w-[95%] sm:w-[90%] mx-auto mb-14 px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black py-4 sm:py-8">Emplois Récents</h2>

          <button
            onClick={toggleGridColumns}
            className="flex items-center gap-2 sm:gap-4 border border-gray-400 px-4 sm:px-8 py-2 rounded-full font-medium text-sm sm:text-base"
          >
            <span className="hidden sm:inline">
              {columns === 3
                ? "Vue Grille"
                : columns === 2
                ? "Vue Tableau"
                : "Vue Liste"}
            </span>
            <span className="text-lg">{getIcon()}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile filters will be handled by Filters component */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <Filters />
          </div>

          <div
            className={`flex-1 grid gap-4 sm:gap-6 lg:gap-8 ${
              columns === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : columns === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {jobs.length > 0 ? (
              filetredJobs.map((job: Job) => (
                <JobCard key={job._id} job={job} />
              ))
            ) : (
              <div className="mt-1 flex items-center">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">Aucun Emploi Trouvé !</p>
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
