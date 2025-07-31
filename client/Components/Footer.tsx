import React from "react";
import { useLanguage } from "@/context/languageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="mx-auto px-4 text-center text-black dark:text-white">
        <p>&copy; {new Date().getFullYear()} MissionPro. {t('footer.rights')}.</p>
      </div>
    </footer>
  );
}

export default Footer;
