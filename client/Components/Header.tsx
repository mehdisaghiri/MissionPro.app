"use client";
import { useGlobalContext } from "@/context/globalContext";
import { useLanguage } from "@/context/languageContext";
import { LogIn, UserPlus, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Profile from "./Profile";
import LanguageSwitcher from "./LanguageSwitcher";

function Header() {
  const { isAuthenticated } = useGlobalContext();
  const { t, isRTL } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`relative px-4 sm:px-6 lg:px-10 py-4 sm:py-6 bg-[#D7DEDC] text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className="flex justify-between items-center">{/* Desktop and mobile container */}
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={36} height={36} className="sm:w-[45px] sm:h-[45px]" />
          <h1 className="font-extrabold text-xl sm:text-2xl text-[#7263f3]">MissionPro</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href={"/findwork"}
            className={`py-2 px-4 rounded-md text-sm ${
              pathname === "/findwork"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : "hover:text-[#7263F3] transition-colors"
            }`}
          >
            {t('nav.findWork')}
          </Link>
          <Link
            href={"/myjobs"}
            className={`py-2 px-4 rounded-md text-sm ${
              pathname === "/myjobs"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : "hover:text-[#7263F3] transition-colors"
            }`}
          >
            {t('nav.myJobs')}
          </Link>
          <Link
            href={"/post"}
            className={`py-2 px-4 rounded-md text-sm ${
              pathname === "/post"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : "hover:text-[#7263F3] transition-colors"
            }`}
          >
            {t('nav.postJob')}
          </Link>
        </nav>

        {/* Desktop Auth & Language */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          {isAuthenticated ? (
            <Profile />
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href={"https://missionpro-app-4qaf.onrender.com/login"}
                className="py-2 px-4 rounded-md border flex items-center gap-2 bg-[#7263F3] text-white border-[#7263F3] hover:bg-[#7263F3]/90 transition-all duration-200 ease-in-out text-sm"
              >
                <LogIn className="w-4 h-4" />
                {t('nav.login')}
              </Link>
              <Link
                href={"https://missionpro-app-4qaf.onrender.com/login"}
                className="py-2 px-4 rounded-md border flex items-center gap-2 border-[#7263F3] text-[#7263F3] hover:bg-[#7263F3]/10 transition-all duration-200 ease-in-out text-sm"
              >
                <UserPlus className="w-4 h-4" />
                {t('nav.register')}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#D7DEDC] border-t border-gray-300 shadow-lg z-50">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                href={"/findwork"}
                className={`block py-3 px-4 rounded-md text-sm ${
                  pathname === "/findwork"
                    ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                    : "hover:text-[#7263F3] hover:bg-gray-100 transition-colors"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.findWork')}
              </Link>
              <Link
                href={"/myjobs"}
                className={`block py-3 px-4 rounded-md text-sm ${
                  pathname === "/myjobs"
                    ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                    : "hover:text-[#7263F3] hover:bg-gray-100 transition-colors"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.myJobs')}
              </Link>
              <Link
                href={"/post"}
                className={`block py-3 px-4 rounded-md text-sm ${
                  pathname === "/post"
                    ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                    : "hover:text-[#7263F3] hover:bg-gray-100 transition-colors"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.postJob')}
              </Link>
            </div>

            {/* Mobile Language Switcher */}
            <div className="pt-4 border-t border-gray-300">
              <LanguageSwitcher />
            </div>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-300">
              {isAuthenticated ? (
                <Profile />
              ) : (
                <div className="space-y-3">
                  <Link
                    href={"https://missionpro-app-4qaf.onrender.com/login"}
                    className="w-full py-3 px-4 rounded-md border flex items-center justify-center gap-2 bg-[#7263F3] text-white border-[#7263F3] hover:bg-[#7263F3]/90 transition-all duration-200 ease-in-out text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    {t('nav.login')}
                  </Link>
                  <Link
                    href={"https://missionpro-app-4qaf.onrender.com/login"}
                    className="w-full py-3 px-4 rounded-md border flex items-center justify-center gap-2 border-[#7263F3] text-[#7263F3] hover:bg-[#7263F3]/10 transition-all duration-200 ease-in-out text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus className="w-4 h-4" />
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
