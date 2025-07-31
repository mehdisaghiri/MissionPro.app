"use client";
import React, { useEffect } from "react";
import { Job } from "@/types/types";
import { useJobsContext } from "@/context/jobsContext";
import Image from "next/image";
import { CardTitle } from "../ui/card";
import { formatDates } from "@/utils/fotmatDates";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";

interface JobProps {
  job: Job;
}

function MyJob({ job }: JobProps) {
  const { deleteJob, likeJob } = useJobsContext();
  const { userProfile, isAuthenticated, getUserProfile } = useGlobalContext();
  const [isLiked, setIsLiked] = React.useState(false);

  const router = useRouter();

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  useEffect(() => {
    if (isAuthenticated && job.createdBy._id) {
      getUserProfile(job.createdBy._id);
    }
  }, [isAuthenticated, job.createdBy._id]);

  useEffect(() => {
    if (userProfile?._id) {
      setIsLiked(job.likes.includes(userProfile?._id));
    }
  }, [job.likes, userProfile._id]);

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-xl flex flex-col gap-5 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between">
        <div
          className="flex items-center space-x-4 mb-2 cursor-pointer"
          onClick={() => router.push(`/job/${job._id}`)}
        >
          <Image
            alt={`logo`}
            src={job.createdBy.profilePicture || "/user.png"}
            width={48}
            height={48}
            className="rounded-full shadow-sm"
          />

          <div>
            <CardTitle className="text-xl font-bold truncate">
              {job.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {job.createdBy.name}
            </p>
          </div>
        </div>
        <button
          className={`text-2xl ${
            isLiked ? "text-[#7263f3]" : "text-gray-400"
          } `}
          onClick={() => {
            isAuthenticated
              ? handleLike(job._id)
              : router.push("https://missionpro-app-4qaf.onrender.com/login");
          }}
        >
          {isLiked ? bookmark : bookmarkEmpty}
        </button>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
        <p className="text-sm text-muted-foreground mb-4">
          Posted {formatDates(job.createdAt)}
        </p>

        <div className="flex justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Applicants count */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users size={16} />
              <span>
                {job.applicants.length} {job.applicants.length === 1 ? 'Candidat' : 'Candidats'}
              </span>
            </div>
          </div>
          {job.createdBy._id === userProfile?._id && (
            <div className="self-end flex flex-col gap-2">
              {/* View Applicants Button */}
              <Button
                variant="outline"
                size="sm"
                className={`${
                  job.applicants.length > 0
                    ? "text-blue-600 border-blue-600 hover:bg-blue-50"
                    : "text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => router.push(`/job/${job._id}/applicants`)}
              >
                <Users size={14} className="mr-1" />
                {job.applicants.length > 0 ? 'Voir les Candidats' : 'Aucun Candidat'}
              </Button>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-blue-500"
                  onClick={() => router.push(`/edit-job/${job._id}`)}
                >
                  <Pencil size={14} />
                  <span className="sr-only">Modifier l'emploi</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => deleteJob(job._id)}
                >
                  <Trash size={14} />
                  <span className="sr-only">Supprimer l'emploi</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyJob;
