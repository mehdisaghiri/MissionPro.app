"use client";
import { useJobsContext } from "@/context/jobsContext";
import { location } from "@/utils/Icons";
import { Search } from "lucide-react";
import React from "react";

function SearchForm() {
  const { searchJobs, handleSearchChange, searchQuery } = useJobsContext();
  return (
    <form
      className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0"
      onSubmit={(e) => {
        e.preventDefault();
        searchJobs(searchQuery.tags, searchQuery.location, searchQuery.title);
      }}
    >
      {/* Mobile: Stacked layout, Desktop: Side by side */}
      <div className="flex-1 relative">
        <input
          type="text"
          id="job-title"
          name="title"
          value={searchQuery.title}
          onChange={(e) => handleSearchChange("title", e.target.value)}
          placeholder="Titre d'Emploi ou Mots-clés"
          className="w-full py-4 sm:py-7 text-base sm:text-2xl text-black pl-12 sm:pl-[5rem] rounded-full sm:rounded-tl-full sm:rounded-bl-full sm:rounded-tr-none sm:rounded-br-none"
        />
        <span>
          <Search
            size={20}
            className="text-gray-400 absolute left-4 sm:left-8 top-[50%] translate-y-[-50%] sm:text-2xl"
          />
        </span>
      </div>

      {/* Separator - only visible on desktop */}
      <div className="hidden sm:block absolute top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-11 bg-gray-300"></div>

      <div className="flex-1 relative">
        <input
          type="text"
          id="location"
          name="location"
          value={searchQuery.location}
          onChange={(e) => handleSearchChange("location", e.target.value)}
          placeholder="Entrez la Localisation"
          className="w-full py-4 sm:py-7 text-base sm:text-2xl text-black pl-12 sm:pl-[4rem] rounded-full sm:rounded-tr-full sm:rounded-br-full sm:rounded-tl-none sm:rounded-bl-none"
        />
        <span className="text-gray-400 text-xl sm:text-3xl absolute left-4 sm:left-6 top-[50%] translate-y-[-50%]">
          {location}
        </span>
      </div>

      <button
        type="submit"
        className="bg-[#7263F3] hover:bg-[#7263F3]/90 text-white text-base sm:text-2xl px-8 sm:px-14 py-4 sm:py-2 rounded-full sm:absolute sm:right-2 sm:top-[50%] sm:transform sm:translate-y-[-50%] sm:h-[calc(100%-1rem)] mt-2 sm:mt-0"
      >
        Rechercher
      </button>
    </form>
  );
}

export default SearchForm;
