"use client";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";
import JobTitle from "./JobTitle";
import JobDetails from "./JobDetails";
import JobSkills from "./JobSkills ";
import JobLocation from "./JobLocation";
import { useJobsContext } from "@/context/jobsContext";

function JobForm() {
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
  } = useGlobalContext();
  const { createJob } = useJobsContext();

  const sections = ["À Propos", "Détails de l'Emploi", "Compétences", "Localisation", "Résumé"];
  const [currentSection, setCurrentSection] = React.useState(sections[0]);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const renderStages = () => {
    switch (currentSection) {
      case "À Propos":
        return <JobTitle />;
      case "Détails de l'Emploi":
        return <JobDetails />;
      case "Compétences":
        return <JobSkills />;
      case "Localisation":
        return <JobLocation />;
    }
  };

  const getCompletedColor = (section: string) => {
    switch (section) {
      case "À Propos":
        return jobTitle && activeEmploymentTypes.length > 0
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      case "Détails de l'Emploi":
        return jobDescription && salary > 0
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      case "Compétences":
        return skills.length && tags.length > 0
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      case "Localisation":
        return location.address || location.city || location.country
          ? "bg-[#7263F3] text-white"
          : "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJob({
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
    });

    resetJobForm();
  };

  return (
    <div className="w-full">

      {/* Mobile Progress Steps */}
      <div className="lg:hidden mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Étape {sections.indexOf(currentSection) + 1} sur {sections.length}</h3>
          <span className="text-sm text-gray-600">{currentSection}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#7263F3] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((sections.indexOf(currentSection) + 1) / sections.length) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-3">
          {sections.map((section, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                index <= sections.indexOf(currentSection)
                  ? "bg-[#7263F3] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
              onClick={() => handleSectionChange(section)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            {sections.map((section, index) => (
              <button
                key={index}
                className={`w-full p-3 rounded-lg flex items-center gap-3 font-medium transition-colors text-left ${
                  currentSection === section
                    ? "bg-[#7263F3] text-white shadow-md"
                    : "text-gray-700 hover:bg-white hover:shadow-sm"
                }`}
                onClick={() => handleSectionChange(section)}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentSection === section
                      ? "bg-white text-[#7263F3]"
                      : getCompletedColor(section) === "bg-[#7263F3] text-white"
                      ? "bg-[#7263F3] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-sm">{section}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form
          className="flex-1 space-y-6"
          onSubmit={handleSubmit}
        >
          {renderStages()}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                sections.indexOf(currentSection) === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => {
                const currentIndex = sections.indexOf(currentSection);
                if (currentIndex > 0) {
                  setCurrentSection(sections[currentIndex - 1]);
                }
              }}
              disabled={sections.indexOf(currentSection) === 0}
            >
              Précédent
            </button>

            {currentSection !== "Résumé" ? (
              <button
                type="button"
                className="px-6 py-3 bg-[#7263F3] text-white rounded-lg font-medium hover:bg-[#6152e2] transition-colors"
                onClick={() => {
                  const currentIndex = sections.indexOf(currentSection);
                  setCurrentSection(sections[currentIndex + 1]);
                }}
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                🚀 Publier l'Emploi
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
