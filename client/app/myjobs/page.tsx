"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import MyJob from "@/Components/JobItem/MyJob";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { userJobs, jobs } = useJobsContext();
  const { isAuthenticated, loading, userProfile } = useGlobalContext();

  const [activeTab, setActiveTab] = React.useState("posts");

  const userId = userProfile?._id;

  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("https://missionpro-app-4qaf.onrender.com/login");
    }
  }, [isAuthenticated]);

  const likedJobs = jobs.filter((job: Job) => {
    return job.likes.includes(userId);
  });

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-6xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Mes Emplois</h1>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              className={`px-6 py-3 rounded-xl font-medium transition-colors text-sm sm:text-base ${
                activeTab === "posts"
                  ? "bg-[#7263F3] text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              📝 Mes Offres d'Emploi
            </button>
            <button
              className={`px-6 py-3 rounded-xl font-medium transition-colors text-sm sm:text-base ${
                activeTab === "likes"
                  ? "bg-[#7263F3] text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("likes")}
            >
              ❤️ Emplois Aimés
            </button>
          </div>
        </div>

        {/* Empty States */}
        {activeTab === "posts" && userJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-sm max-w-md mx-auto">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune offre d'emploi trouvée
              </h3>
              <p className="text-gray-600 mb-4">
                Vous n'avez pas encore publié d'offres d'emploi.
              </p>
              <button
                onClick={() => window.location.href = '/post'}
                className="bg-[#7263F3] text-white px-6 py-2 rounded-lg hover:bg-[#6152e2] transition-colors"
              >
                Publier une offre
              </button>
            </div>
          </div>
        )}

        {activeTab === "likes" && likedJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-sm max-w-md mx-auto">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun emploi aimé trouvé
              </h3>
              <p className="text-gray-600 mb-4">
                Vous n'avez pas encore sauvegardé d'emplois.
              </p>
              <button
                onClick={() => window.location.href = '/findwork'}
                className="bg-[#7263F3] text-white px-6 py-2 rounded-lg hover:bg-[#6152e2] transition-colors"
              >
                Chercher des emplois
              </button>
            </div>
          </div>
        )}

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {activeTab === "posts" &&
            userJobs.map((job: Job) => <MyJob key={job._id} job={job} />)}

          {activeTab === "likes" &&
            likedJobs.map((job: Job) => <MyJob key={job._id} job={job} />)}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default page;
