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
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 w-full p-4 bg-white rounded-lg border border-gray-200 mb-4"
      >
        <Filter size={20} />
        <span>Filtres</span>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Filtres</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
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
      <div className="hidden lg:block w-[22rem] pr-4 space-y-6">
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
    <>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-4">Type d'Emploi</h2>

          <Button
            variant={"ghost"}
            className="h-auto p-0 text-red-500 hover:text-red-700"
            onClick={() => {
              clearAllFilters();
              searchJobs();
            }}
          >
            Tout Effacer
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fullTime"
              checked={filters.fullTime}
              onCheckedChange={() => handleFilterChange("fullTime")}
            />
            <Label htmlFor="fullTime">Temps Plein</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="partTime"
              checked={filters.partTime}
              onCheckedChange={() => handleFilterChange("partTime")}
            />
            <Label htmlFor="partTime">Temps Partiel</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contract"
              checked={filters.contract}
              onCheckedChange={() => handleFilterChange("contract")}
            />
            <Label htmlFor="contract">Contrat</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="internship"
              checked={filters.internship}
              onCheckedChange={() => handleFilterChange("internship")}
            />
            <Label htmlFor="internship">Stage</Label>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Étiquettes</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fullStack"
              checked={filters.fullStack}
              onCheckedChange={() => handleFilterChange("fullStack")}
            />
            <Label htmlFor="fullStack">FullStack</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="backend"
              checked={filters.backend}
              onCheckedChange={() => handleFilterChange("backend")}
            />
            <Label htmlFor="backend">Backend</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="devOps"
              checked={filters.devOps}
              onCheckedChange={() => handleFilterChange("devOps")}
            />
            <Label htmlFor="devOps">DevOps</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="uiUx"
              checked={filters.uiUx}
              onCheckedChange={() => handleFilterChange("uiUx")}
            />
            <Label htmlFor="uiUx">UI/UX</Label>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Fourchette de Salaire</h2>
        <div className="flex flex-col gap-4">
          <Label htmlFor="minSalary">Salaire Minimum</Label>
          <Slider
            id="minSalary"
            min={0}
            max={200000}
            step={50}
            value={[minSalary]}
            onValueChange={handleMinSalaryChange}
            className="w-full"
          />
          <span className="text-sm text-gray-500">
            {formatMoney(minSalary, "GBP")}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="maxSalary">Salaire Maximum</Label>
        <Slider
          id="maxSalary"
          min={0}
          max={200000}
          step={50}
          value={[maxSalary]}
          onValueChange={handleMaxSalaryChange}
          className="w-full"
        />
        <span className="text-sm text-gray-500">
          {formatMoney(maxSalary, "GBP")}
        </span>
      </div>
    </>
  );
}

export default Filters;
