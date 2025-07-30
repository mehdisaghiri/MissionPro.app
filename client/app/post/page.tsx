"use client";
import Header from "@/Components/Header";
import JobForm from "@/Components/JobPost/JobForm";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { isAuthenticated, loading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("https://missionpro-app-4qaf.onrender.com/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-4xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Créer une Offre d'Emploi
          </h1>
          <p className="text-gray-600">
            Publiez votre offre d'emploi et trouvez les meilleurs candidats
          </p>
        </div>

        {/* Job Form Container */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <JobForm />
        </div>
      </div>
    </div>
  );
}

export default page;
