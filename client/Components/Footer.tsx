import React from "react";
import { useLanguage } from "@/context/languageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-white">
      <div className="mx-auto px-4 text-center text-black">
        <p>&copy; {new Date().getFullYear()} MissionPro. {t('footer.rights')}.</p>
      </div>
    </footer>
  );
}

export default Footer;
