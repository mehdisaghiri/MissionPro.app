"use client";
import Header from "@/Components/Header";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { ArrowLeft, Mail, User, Calendar, FileText, X } from "lucide-react";
import { formatDates } from "@/utils/fotmatDates";

interface ApplicantPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Applicant {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  bio: string;
  profession: string;
  resume?: string;
  createdAt: string;
}

interface ApplicantsData {
  jobTitle: string;
  applicants: Applicant[];
}

function ApplicantsPage({ params }: ApplicantPageProps) {
  const { isAuthenticated, loading } = useGlobalContext();
  const router = useRouter();
  const resolvedParams = React.use(params);
  const [applicantsData, setApplicantsData] = useState<ApplicantsData | null>(null);
  const [loadingApplicants, setLoadingApplicants] = useState(true);
  const [removingApplicant, setRemovingApplicant] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("https://missionpro-app-4qaf.onrender.com/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoadingApplicants(true);
        const response = await axios.get(`/api/v1/jobs/${resolvedParams.id}/applicants`);
        setApplicantsData(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        toast.error("Failed to load applicants");
        router.push("/myjobs");
      } finally {
        setLoadingApplicants(false);
      }
    };

    if (isAuthenticated && resolvedParams.id) {
      fetchApplicants();
    }
  }, [isAuthenticated, resolvedParams.id, router]);

  const handleRemoveApplicant = async (applicantId: string, applicantName: string) => {
    if (!confirm(`Are you sure you want to remove ${applicantName} from this job application?`)) {
      return;
    }

    try {
      setRemovingApplicant(applicantId);
      await axios.delete(`/api/v1/jobs/${resolvedParams.id}/applicants/${applicantId}`);

      // Update the local state to remove the applicant
      setApplicantsData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          applicants: prev.applicants.filter(applicant => applicant._id !== applicantId)
        };
      });

      toast.success(`${applicantName} has been removed from the applicants list`);
    } catch (error) {
      console.error("Error removing applicant:", error);
      toast.error("Failed to remove applicant");
    } finally {
      setRemovingApplicant(null);
    }
  };

  if (loading || loadingApplicants) {
    return (
      <div className="flex flex-col">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Chargement des candidats...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!applicantsData) {
    return (
      <div className="flex flex-col">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Aucune donnée disponible</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1 pt-8 w-[90%] mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/myjobs")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Retour à Mes Emplois
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Candidats pour "{applicantsData.jobTitle}"
          </h1>
          <p className="text-gray-600">
            {applicantsData.applicants.length} {applicantsData.applicants.length === 1 ? 'candidat' : 'candidats'} au total
          </p>
        </div>

        {/* Applicants List */}
        {applicantsData.applicants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun candidat pour le moment</h3>
            <p className="text-gray-600">Lorsque des personnes postulent à cet emploi, elles apparaîtront ici.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applicantsData.applicants.map((applicant) => (
              <div key={applicant._id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={applicant.profilePicture || "/user.png"}
                      alt={applicant.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {applicant.name}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">
                        {applicant.profession}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {applicant.bio}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail size={14} />
                          <span>{applicant.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Postulé {formatDates(applicant.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(`mailto:${applicant.email}`, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <Mail size={14} />
                      Contacter
                    </Button>

                    {applicant.resume && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!applicant.resume) return;
                          const resumeUrl = applicant.resume.startsWith('http')
                            ? applicant.resume
                            : `https://missionpro-app-4qaf.onrender.com${applicant.resume}`;
                          window.open(resumeUrl, '_blank');
                        }}
                        className="flex items-center gap-2"
                      >
                        <FileText size={14} />
                        CV
                      </Button>
                    )}

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveApplicant(applicant._id, applicant.name)}
                      disabled={removingApplicant === applicant._id}
                      className="flex items-center gap-2"
                    >
                      <X size={14} />
                      {removingApplicant === applicant._id ? 'Removing...' : 'Remove'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicantsPage;
