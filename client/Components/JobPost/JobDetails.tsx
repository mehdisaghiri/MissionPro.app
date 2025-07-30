"use client";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";
import { Label } from "../ui/label";
import "react-quill-new/dist/quill.snow.css";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

function MyEditor() {
  const { setJobDescription, jobDescription } = useGlobalContext();

  return (
    <ReactQuill
      value={jobDescription}
      onChange={setJobDescription}
      style={{
        minHeight: "400px",
        maxHeight: "900px",
      }}
      modules={{
        toolbar: true,
      }}
      className="custom-quill-editor"
    />
  );
}

function JobDetails() {
  const {
    handleSalaryChange,
    salary,
    salaryType,
    setSalaryType,
    setNegotiable,
    negotiable,
  } = useGlobalContext();
  return (
    <div className="space-y-8">

      {/* Job Description Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Description de l'Emploi</h3>
          <p className="text-gray-600 text-sm">
            Fournissez une description détaillée de l'emploi, des responsabilités et des exigences.
          </p>
        </div>
        <div className="min-h-[400px]">
          <MyEditor />
        </div>
      </div>

      {/* Salary Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Informations Salariales</h3>
          <p className="text-gray-600 text-sm">
            Définissez la rémunération et les conditions salariales.
          </p>
        </div>

        <div className="space-y-8">
          {/* Salary Input */}
          <div>
            <Label htmlFor="salary" className="text-sm font-medium text-gray-700 mb-2 block">
              Montant du Salaire
            </Label>
            <Input
              type="number"
              id="salary"
              placeholder="Ex: 25000"
              value={salary}
              onChange={handleSalaryChange}
              className="w-full"
            />
          </div>

          {/* Salary Type and Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Type de Salaire
              </Label>
              <Select onValueChange={setSalaryType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yearly">💰 Annuel</SelectItem>
                  <SelectItem value="Monthly">📅 Mensuel</SelectItem>
                  <SelectItem value="Weekly">📊 Hebdomadaire</SelectItem>
                  <SelectItem value="Hourly">⏰ Horaire</SelectItem>
                  <SelectItem value="Fixed">🎯 Fixe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                <Checkbox
                  id="negotiable"
                  checked={negotiable}
                  onCheckedChange={setNegotiable}
                />
                <Label htmlFor="negotiable" className="text-sm font-medium text-gray-700">
                  💬 Salaire négociable
                </Label>
              </div>
            </div>
          </div>

          {/* Salary Preview */}
          {salary > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Aperçu du Salaire</h4>
              <p className="text-blue-800">
                <span className="font-bold text-lg">{salary.toLocaleString()} DH</span>
                {salaryType && (
                  <span className="text-sm ml-2">
                    / {salaryType === "Yearly" ? "an" :
                        salaryType === "Monthly" ? "mois" :
                        salaryType === "Weekly" ? "semaine" :
                        salaryType === "Hourly" ? "heure" : "fixe"}
                  </span>
                )}
                {negotiable && <span className="text-sm text-blue-600 ml-2">(négociable)</span>}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
