"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useLanguage } from "@/context/languageContext";
import { LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Profile from "./Profile";
import LanguageSwitcher from "./LanguageSwitcher";

function Header() {
  const { isAuthenticated } = useGlobalContext();
  const { t, isRTL } = useLanguage();
  const pathname = usePathname();
  return (
    <header className={`px-10 py-6 bg-[#D7DEDC] text-gray-500 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={45} height={45} />
        <h1 className="font-extrabold text-2xl text-[#7263f3]">MissionPro</h1>
      </Link>

      <ul className="flex items-center gap-8">
        <li>
          <Link
            href={"/findwork"}
            className={`py-2 px-6 rounded-md ${
              pathname === "/findwork"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : ""
            }`}
          >
            {t('nav.findWork')}
          </Link>
          <Link
            href={"/myjobs"}
            className={`py-2 px-6 rounded-md ${
              pathname === "/myjobs"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : ""
            }`}
          >
            {t('nav.myJobs')}
          </Link>
          <Link
            href={"/post"}
            className={`py-2 px-6 rounded-md ${
              pathname === "/post"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : ""
            }`}
          >
            {t('nav.postJob')}
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {isAuthenticated ? (
          <Profile />
        ) : (
          <div className="flex items-center gap-6">
            <Link
              href={"http://localhost:8000/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 bg-[#7263F3] text-white border-[#7263F3] hover:bg-[#7263F3]/90 trasition-all duration-200 ease-in-out"
            >
              <LogIn className="w-4 h-4" />
              {t('nav.login')}
            </Link>
            <Link
              href={"http://localhost:8000/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 border-[#7263F3] text-[#7263F3] hover:bg-[#7263F3]/10 trasition-all duration-200 ease-in-out"
            >
              <UserPlus className="w-4 h-4" />
              {t('nav.register')}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
