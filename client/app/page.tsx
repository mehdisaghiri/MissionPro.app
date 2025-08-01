"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { useGlobalContext } from "@/context/globalContext";
import { useLanguage } from "@/context/languageContext";
import {
  Briefcase,
  Building,
  CheckCircleIcon,
  SearchIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { title } from "process";

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#7263f3]" />,
      title: t('features.diverse.title'),
      description: t('features.diverse.description'),
      benefits: [
        "100 000+ offres d'emploi actives",
        "50+ catégories d'emploi",
        "Options à distance et sur site",
      ],
      cta: t('features.diverse.cta'),
      ctaLink: "/findwork",
    },
    {
      icon: <Building className="w-6 h-6 text-[#7263f3]" />,
      title: t('features.companies.title'),
      description: t('features.companies.description'),
      benefits: [
        "500+ employeurs vérifiés",
        "Partenariats exclusifs",
        "Processus de candidature direct",
      ],
      cta: t('features.companies.cta'),
      ctaLink: "/findwork",
    },
    {
      icon: <Users className="w-6 h-6 text-[#7263f3]" />,
      title: t('features.talent.title'),
      description: t('features.talent.description'),
      benefits: [
        "1M+ chercheurs d'emploi inscrits",
        "Filtres de recherche avancés",
        "Correspondance alimentée par IA",
      ],
      cta: t('features.talent.cta'),
      ctaLink: "/post",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />

      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#d7dedc] dark:from-gray-800 to-[#7263f3]/5 dark:to-[#7263f3]/10 text-primary-foreground">
        <div className="container mx-auto px-4 text-center text-black dark:text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#7263f3] font-bold mb-4 sm:mb-6 leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Input
              type="text"
              placeholder={t('home.search.placeholder')}
              className="flex-grow bg-white dark:bg-gray-800 text-black dark:text-white h-12 text-base border-gray-300 dark:border-gray-600"
            />
            <Button className="bg-[#7263f3] text-white h-12 px-6 whitespace-nowrap">
              <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              <span className="text-sm sm:text-base">{t('home.search.button')}</span>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f0f5fa] dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t('home.whyChoose')}{" "}
            <span className="text-[#7263f3] font-extrabold">MissionPro</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col h-full rounded-xl border-none"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />

                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={feature.ctaLink}>{feature.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Badge
              variant={"outline"}
              className="text-sm font-medium border-gray-400"
            >
              {t('home.trusted')}
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-[7rem] bg-[#d7dedc]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">{t('home.readyToStart')}</h2>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size={"lg"} asChild>
              <Link href={"/findwork"}>{t('home.findWork')}</Link>
            </Button>
            <Button size={"lg"} variant={"outline"} asChild>
              <Link href={"/post"}>{t('home.postJob')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
