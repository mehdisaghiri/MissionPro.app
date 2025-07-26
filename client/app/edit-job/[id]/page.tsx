"use client";
import Header from "@/Components/Header";
import EditJobForm from "@/Components/JobPost/EditJobForm";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface EditJobPageProps {
  params: Promise<{
    id: string;
  }>;
}

function EditJobPage({ params }: EditJobPageProps) {
  const { isAuthenticated, loading } = useGlobalContext();
  const router = useRouter();
  const resolvedParams = React.use(params);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("https://missionpro-app-4qaf.onrender.com/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <Header />

      <h2 className="flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold text-black">
        Modifier l'Offre d'Emploi
      </h2>

      <div className="flex-1 pt-8 w-[90%] mx-auto flex justify-center items-center">
        <EditJobForm jobId={resolvedParams.id} />
      </div>
    </div>
  );
}

export default EditJobPage;
