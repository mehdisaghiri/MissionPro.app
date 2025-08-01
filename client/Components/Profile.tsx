"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Settings, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import { useLanguage } from "@/context/languageContext";
import { Badge } from "./ui/badge";
import ThemeSwitch from "./ThemeSwitch";

function Profile() {
  const { userProfile } = useGlobalContext();
  const { t } = useLanguage();

  const { profilePicture, name, profession, email } = userProfile;

  const router = useRouter();
  return (
    <DropdownMenu>
      <div className="flex items-center gap-4">
        <Badge>{profession}</Badge>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Image
            src={profilePicture ? profilePicture : "/user.png"}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-lg"
          />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Theme Switch */}
        <div className="px-2 py-1.5">
          <ThemeSwitch />
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>{t('nav.settings')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            router.push("https://missionpro-app-4qaf.onrender.com/logout");
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('nav.logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Profile;
