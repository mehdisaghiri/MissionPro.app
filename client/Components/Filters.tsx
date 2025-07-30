"use client";
import React from "react";
import { Button } from "./ui/button";
import { useJobsContext } from "@/context/jobsContext";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import formatMoney from "@/utils/formatMoney";
import { Filter, X } from "lucide-react";

function Filters() {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    handleFilterChange,
    filters,
    setFilters,
    minSalary,
    maxSalary,
    setMinSalary,
    setMaxSalary,
    searchJobs,
    setSearchQuery,
  } = useJobsContext();

  const clearAllFilters = () => {
    setFilters({
      fullTime: false,
      partTime: false,
      contract: false,
      internship: false,
      fullStack: false,
      backend: false,
      devOps: false,
      uiUx: false,
    });

    setSearchQuery({ tags: "", location: "", title: "" });
  };

  const handleMinSalaryChange = (value: number[]) => {
    setMinSalary(value[0]);
    if (value[0] > maxSalary) {
      setMaxSalary(value[0]);
    }
  };

  const handleMaxSalaryChange = (value: number[]) => {
    setMaxSalary(value[0]);
    if (value[0] < minSalary) {
      setMinSalary(value[0]);
    }
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-2 w-full p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <Filter size={18} />
          <span className="font-medium">Filtres & Recherche</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-lg overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <FiltersContent
                filters={filters}
                handleFilterChange={handleFilterChange}
                clearAllFilters={clearAllFilters}
                searchJobs={searchJobs}
                minSalary={minSalary}
                maxSalary={maxSalary}
                handleMinSalaryChange={handleMinSalaryChange}
                handleMaxSalaryChange={handleMaxSalaryChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <FiltersContent
            filters={filters}
            handleFilterChange={handleFilterChange}
            clearAllFilters={clearAllFilters}
            searchJobs={searchJobs}
            minSalary={minSalary}
            maxSalary={maxSalary}
            handleMinSalaryChange={handleMinSalaryChange}
            handleMaxSalaryChange={handleMaxSalaryChange}
          />
        </div>
      </div>
    </>
  );
}

// Extract filters content to reuse in both mobile and desktop
function FiltersContent({
  filters,
  handleFilterChange,
  clearAllFilters,
  searchJobs,
  minSalary,
  maxSalary,
  handleMinSalaryChange,
  handleMaxSalaryChange
}: any) {
  return (
    <div className="space-y-6">
      {/* Clear All Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
        <Button
          variant={"ghost"}
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => {
            clearAllFilters();
            searchJobs();
          }}
        >
          Effacer tout
        </Button>
      </div>

      {/* Job Type Section */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Type d'Emploi</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fullTime"
              checked={filters.fullTime}
              onCheckedChange={() => handleFilterChange("fullTime")}
            />
            <Label htmlFor="fullTime" className="text-sm">Temps Plein</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="partTime"
              checked={filters.partTime}
              onCheckedChange={() => handleFilterChange("partTime")}
            />
            <Label htmlFor="partTime" className="text-sm">Temps Partiel</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contract"
              checked={filters.contract}
              onCheckedChange={() => handleFilterChange("contract")}
            />
            <Label htmlFor="contract" className="text-sm">Contrat</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="internship"
              checked={filters.internship}
              onCheckedChange={() => handleFilterChange("internship")}
            />
            <Label htmlFor="internship" className="text-sm">Stage</Label>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Compétences</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fullStack"
              checked={filters.fullStack}
              onCheckedChange={() => handleFilterChange("fullStack")}
            />
            <Label htmlFor="fullStack" className="text-sm">FullStack</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="backend"
              checked={filters.backend}
              onCheckedChange={() => handleFilterChange("backend")}
            />
            <Label htmlFor="backend" className="text-sm">Backend</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="devOps"
              checked={filters.devOps}
              onCheckedChange={() => handleFilterChange("devOps")}
            />
            <Label htmlFor="devOps" className="text-sm">DevOps</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uiUx"
              checked={filters.uiUx}
              onCheckedChange={() => handleFilterChange("uiUx")}
            />
            <Label htmlFor="uiUx" className="text-sm">UI/UX</Label>
          </div>
        </div>
      </div>

      {/* Salary Range Section */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Fourchette de Salaire</h4>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="minSalary" className="text-sm text-gray-600">
                Minimum
              </Label>
              <span className="text-sm font-medium">{formatMoney(minSalary, "GBP")}</span>
            </div>
            <Slider
              id="minSalary"
              min={0}
              max={200000}
              step={1000}
              value={[minSalary]}
              onValueChange={handleMinSalaryChange}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="maxSalary" className="text-sm text-gray-600">
                Maximum
              </Label>
              <span className="text-sm font-medium">{formatMoney(maxSalary, "GBP")}</span>
            </div>
            <Slider
              id="maxSalary"
              min={0}
              max={200000}
              step={1000}
              value={[maxSalary]}
              onValueChange={handleMaxSalaryChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <Button onClick={searchJobs} className="w-full bg-[#7263f3] hover:bg-[#6152e2]">
        Appliquer les filtres
      </Button>
    </div>
  );
}

export default Filters;
