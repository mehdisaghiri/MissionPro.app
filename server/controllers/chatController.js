// MissionPro Platform Guide (100% FREE, NO API NEEDED)
// This chatbot helps users navigate and use the MissionPro job platform
// Supports English and French

const missionProResponses = {
  // Account creation and getting started
  account: [
    "🚀 Creating your MissionPro account is easy! 1) Click the purple 'Login' button in the top navigation 2) You'll be redirected to our secure login page 3) Choose 'Sign up' if you're new 4) Use your Google account or email to register 5) Complete your profile with your name, profession, and bio. Your account will be ready immediately!",
    "📝 Getting started on MissionPro: 1) Visit our homepage 2) Click 'Login' in the header 3) Sign up with Google (recommended) or email 4) Fill out your profile information 5) Upload your resume and profile picture 6) You can now browse jobs or post your own! Need help with any specific step?",
    "✅ MissionPro registration steps: 1) Click the 'Login' button 2) Choose your preferred sign-up method 3) Complete the verification process 4) Set up your professional profile (name, profession, bio) 5) Upload a profile picture 6) Start exploring! What would you like to do first?"
  ],

  // Finding and applying for jobs
  jobs: [
    "🔍 To find jobs on MissionPro: 1) Click 'Find Work' in the navigation menu or **[Go to Find Work](/findwork)** 2) Browse through available job listings 3) Use the search bar to find specific roles 4) Click on any job card to see full details 5) Hit the 'Apply' button to submit your application. You can also like jobs to save them for later!",
    "💼 Job searching made easy: 1) Go to the **[Find Work page](/findwork)** from the main menu 2) Scroll through job listings or use search 3) Each job shows title, company, location, and salary 4) Click 'View Details' to see full requirements 5) Apply directly with one click using your MissionPro profile. Track all applications in **[My Jobs](/myjobs)**!",
    "🎯 Finding your perfect job: 1) Navigate to **[Find Work](/findwork)** in the top menu 2) Browse available positions 3) Read job descriptions carefully 4) Check if you meet the requirements 5) Click 'Apply' to submit your application 6) View your applications anytime in **[My Jobs](/myjobs)**. All your applications are saved automatically!"
  ],

  // Posting jobs (for recruiters)
  post: [
    "📋 To post a job on MissionPro: 1) Click 'Post Job' in the navigation menu or **[Go to Post Job](/post)** 2) Fill in the job title and description 3) Add company details and location 4) Set the salary range 5) Choose job types (full-time, part-time, etc.) 6) Add required skills 7) Click 'Post Job' to publish. Your job will be visible to all job seekers immediately!",
    "🏢 Creating a job posting: 1) Go to **[Post Job](/post)** from the main menu 2) Enter job title and detailed description 3) Specify location and salary 4) Select job types and required skills 5) Review your posting 6) Submit to make it live. You can manage all your job posts and see applicants in your dashboard!",
    "✨ Job posting steps: 1) Navigate to **[Post Job](/post)** 2) Complete all required fields (title, description, location, salary) 3) Add job types and skills 4) Preview your posting 5) Publish to reach thousands of job seekers. You'll receive notifications when candidates apply!"
  ],

  // Managing applications and profile
  profile: [
    "👤 Managing your MissionPro profile: 1) Click on your profile picture in the top right 2) Select 'Profile' to edit your information or **[Go to Profile](/profile)** 3) Update your bio, profession, and contact details 4) Upload a new profile picture 5) Add or update your resume 6) Save changes. A complete profile gets more job opportunities!",
    "📄 Updating your profile: 1) Access your **[Profile page](/profile)** from the user menu 2) Edit your professional information 3) Upload your latest resume 4) Add a professional bio 5) Update your contact information 6) Save all changes. Recruiters can see your profile when you apply for jobs!",
    "🔧 Profile management: 1) Click your avatar in the top navigation 2) Go to **[Profile settings](/profile)** 3) Update your personal and professional details 4) Upload documents (resume, portfolio) 5) Write a compelling bio 6) Keep your information current for better job matches!"
  ],

  // Tracking applications
  applications: [
    "📊 Tracking your applications: 1) Click 'My Jobs' in the navigation or **[Go to My Jobs](/myjobs)** 2) See all jobs you've applied to 3) View application status and dates 4) Check jobs you've liked/saved 5) Follow up on pending applications. Stay organized and never miss an opportunity!",
    "📈 Managing job applications: 1) Go to **[My Jobs](/myjobs)** from the main menu 2) View your application history 3) See which jobs you've applied to and when 4) Track your saved/liked jobs 5) Monitor your job search progress. Keep applying and stay motivated!",
    "🎯 Application tracking: 1) Navigate to **[My Jobs](/myjobs)** 2) Review all your submitted applications 3) See application dates and job details 4) Access your saved jobs list 5) Plan your next applications. Consistent applying leads to success!"
  ],

  // General platform help
  help: [
    "🆘 MissionPro platform help: I can assist you with: 1) Creating and managing your account 2) Finding and applying for jobs 3) Posting job openings 4) Managing your profile and resume 5) Tracking applications 6) Using all platform features. What specific area do you need help with?",
    "💡 How can I help you with MissionPro? I can guide you through: 1) Account setup and login 2) Job searching and applications 3) Profile management 4) Job posting (for recruiters) 5) Application tracking 6) Platform navigation. What would you like to learn about?",
    "🌟 Welcome to MissionPro! I'm here to help you navigate our platform. I can assist with: 1) Getting started and creating your account 2) Finding the perfect job 3) Applying to positions 4) Managing your profile 5) Posting jobs 6) Tracking your progress. What can I help you with today?"
  ],

  // Navigation and features
  navigation: [
    "🧭 MissionPro navigation guide: 1) **[Find Work](/findwork)** - Browse and apply for jobs 2) **[My Jobs](/myjobs)** - Track your applications and saved jobs 3) **[Post Job](/post)** - Create job listings (for recruiters) 4) **[Profile](/profile)** - Manage your account and resume 5) **[Home](/)** - Return to homepage. The main menu is always at the top of the page!",
    "📱 Getting around MissionPro: 1) Use the top navigation bar for main features 2) **[Find Work](/findwork)** for job searching 3) **[My Jobs](/myjobs)** for application tracking 4) **[Post Job](/post)** for hiring 5) Click your profile picture for account settings. Everything is designed to be intuitive and easy to find!",
    "🗺️ Platform navigation: 1) Main menu at the top has all key features 2) **[Find Work](/findwork)** takes you to job listings 3) **[My Jobs](/myjobs)** shows your activity 4) **[Post Job](/post)** for creating listings 5) Profile menu for account management. Need help finding something specific?"
  ],

  // Resume generation and career advice
  resume: [
    "📄 I can help you create a professional resume! Please tell me: 1) Your name and contact info 2) Your work experience (jobs, years, responsibilities) 3) Your education 4) Your skills 5) Any certifications or achievements. I'll generate a structured resume for you!",
    "✨ Let's build your resume together! Share with me: 1) Personal details (name, email, phone) 2) Work history (company, position, duration, key achievements) 3) Education background 4) Technical and soft skills 5) Any projects or certifications. I'll format it professionally!",
    "🎯 Resume creation service! Provide me with: 1) Contact information 2) Professional summary/objective 3) Work experience with specific achievements 4) Education details 5) Relevant skills and certifications. I'll create a compelling resume that stands out!"
  ],

  // Job matching based on user profile
  jobMatch: [
    "🔍 I can find the best job opportunities for you! Tell me about: 1) Your skills and expertise 2) Years of experience 3) Preferred job type (full-time, remote, etc.) 4) Desired salary range 5) Location preferences 6) Industry interests. I'll search MissionPro for matching positions!",
    "🎯 Let me match you with perfect jobs! Share: 1) Your professional background 2) Key skills and technologies you know 3) Career level (entry, mid, senior) 4) Work preferences (remote, office, hybrid) 5) Salary expectations. I'll find relevant opportunities on our platform!",
    "💼 Job matching service! Describe: 1) Your current role and experience 2) Skills you want to use 3) Industries you're interested in 4) Job types you prefer 5) Location and salary requirements. I'll identify the best matches from our job listings!"
  ],

  // Career guidance and suggestions
  career: [
    "🚀 Career guidance available! Tell me: 1) Your current situation (student, employed, career change) 2) Your interests and passions 3) Skills you have or want to develop 4) Long-term career goals 5) Any constraints (location, salary needs). I'll suggest career paths and next steps!",
    "🌟 Let me help plan your career! Share: 1) Your background and experience 2) What you enjoy doing 3) Your strengths and skills 4) Career aspirations 5) Timeline for change. I'll recommend career directions and development strategies!",
    "📈 Career development support! Describe: 1) Your current role and satisfaction level 2) Skills you want to build 3) Industries that interest you 4) Career goals (promotion, change, growth) 5) Available time for development. I'll create a personalized career plan!"
  ],

  // Default responses
  default: [
    "👋 Hi! I'm your MissionPro Assistant! I can help you with: 1) Creating and managing your account 2) Finding and applying for jobs 3) Posting job openings 4) Managing your profile 5) Tracking applications 6) Navigating the platform 7) **Resume generation** 8) **Job matching** 9) **Career guidance**. What would you like to know about?",
    "🎉 Welcome to MissionPro! I'm here to guide you through our job platform. I can assist with account setup, job searching, applications, profile management, **resume creation**, **job matching based on your skills**, and **career advice**. What specific area would you like help with?",
    "✨ Hello! I'm the MissionPro platform assistant. I specialize in helping users navigate our job search platform, **create professional resumes**, **find matching job opportunities**, and **plan career development**. Whether you're looking for work, posting jobs, or managing your profile, I'm here to help. What can I assist you with today?"
  ]
};

// French responses for MissionPro platform
const missionProResponsesFR = {
  // Création de compte et démarrage
  account: [
    "🚀 Créer votre compte MissionPro est facile ! 1) Cliquez sur le bouton violet 'Login' dans la navigation 2) Vous serez redirigé vers notre page de connexion sécurisée 3) Choisissez 'Sign up' si vous êtes nouveau 4) Utilisez votre compte Google ou email pour vous inscrire 5) Complétez votre profil avec votre nom, profession et bio. Votre compte sera prêt immédiatement !",
    "📝 Commencer sur MissionPro : 1) Visitez notre page d'accueil 2) Cliquez sur 'Login' dans l'en-tête 3) Inscrivez-vous avec Google (recommandé) ou email 4) Remplissez vos informations de profil 5) Téléchargez votre CV et photo de profil 6) Vous pouvez maintenant parcourir les emplois ou publier le vôtre ! Besoin d'aide avec une étape spécifique ?",
    "✅ Étapes d'inscription MissionPro : 1) Cliquez sur le bouton 'Login' 2) Choisissez votre méthode d'inscription préférée 3) Complétez le processus de vérification 4) Configurez votre profil professionnel 5) Téléchargez une photo de profil 6) Commencez à explorer ! Que souhaitez-vous faire en premier ?"
  ],

  // Recherche et candidature d'emplois
  jobs: [
    "🔍 Pour trouver des emplois sur MissionPro : 1) Cliquez sur 'Find Work' dans le menu de navigation ou **[Aller à Find Work](/findwork)** 2) Parcourez les offres d'emploi disponibles 3) Utilisez la barre de recherche pour trouver des postes spécifiques 4) Cliquez sur n'importe quelle carte d'emploi pour voir tous les détails 5) Appuyez sur le bouton 'Apply' pour soumettre votre candidature. Vous pouvez aussi aimer les emplois pour les sauvegarder !",
    "💼 Recherche d'emploi simplifiée : 1) Allez à la **[page Find Work](/findwork)** depuis le menu principal 2) Faites défiler les offres d'emploi ou utilisez la recherche 3) Chaque emploi montre le titre, l'entreprise, le lieu et le salaire 4) Cliquez sur 'View Details' pour voir toutes les exigences 5) Postulez directement en un clic avec votre profil MissionPro. Suivez toutes vos candidatures dans **[My Jobs](/myjobs)** !",
    "🎯 Trouver votre emploi parfait : 1) Naviguez vers **[Find Work](/findwork)** dans le menu du haut 2) Parcourez les postes disponibles 3) Lisez attentivement les descriptions d'emploi 4) Vérifiez si vous répondez aux exigences 5) Cliquez sur 'Apply' pour soumettre votre candidature 6) Consultez vos candidatures à tout moment dans **[My Jobs](/myjobs)**. Toutes vos candidatures sont sauvegardées automatiquement !"
  ],

  // Publication d'emplois (pour les recruteurs)
  post: [
    "📋 Pour publier un emploi sur MissionPro : 1) Cliquez sur 'Post Job' dans le menu de navigation ou **[Aller à Post Job](/post)** 2) Remplissez le titre et la description du poste 3) Ajoutez les détails de l'entreprise et le lieu 4) Fixez la fourchette salariale 5) Choisissez les types d'emploi (temps plein, temps partiel, etc.) 6) Ajoutez les compétences requises 7) Cliquez sur 'Post Job' pour publier. Votre emploi sera visible à tous les chercheurs d'emploi immédiatement !",
    "🏢 Créer une offre d'emploi : 1) Allez à **[Post Job](/post)** depuis le menu principal 2) Entrez le titre du poste et une description détaillée 3) Spécifiez le lieu et le salaire 4) Sélectionnez les types d'emploi et compétences requises 5) Révisez votre publication 6) Soumettez pour la rendre active. Vous pouvez gérer toutes vos offres d'emploi et voir les candidats dans votre tableau de bord !",
    "✨ Étapes de publication d'emploi : 1) Naviguez vers **[Post Job](/post)** 2) Complétez tous les champs requis (titre, description, lieu, salaire) 3) Ajoutez les types d'emploi et compétences 4) Prévisualisez votre publication 5) Publiez pour atteindre des milliers de chercheurs d'emploi. Vous recevrez des notifications quand les candidats postulent !"
  ],

  // Gestion des candidatures et profil
  profile: [
    "👤 Gérer votre profil MissionPro : 1) Cliquez sur votre photo de profil en haut à droite 2) Sélectionnez 'Profile' pour modifier vos informations ou **[Aller au Profil](/profile)** 3) Mettez à jour votre bio, profession et coordonnées 4) Téléchargez une nouvelle photo de profil 5) Ajoutez ou mettez à jour votre CV 6) Sauvegardez les modifications. Un profil complet obtient plus d'opportunités d'emploi !",
    "📄 Mettre à jour votre profil : 1) Accédez à votre **[page Profil](/profile)** depuis le menu utilisateur 2) Modifiez vos informations professionnelles 3) Téléchargez votre CV le plus récent 4) Ajoutez une bio professionnelle 5) Mettez à jour vos coordonnées 6) Sauvegardez tous les changements. Les recruteurs peuvent voir votre profil quand vous postulez !",
    "🔧 Gestion du profil : 1) Cliquez sur votre avatar dans la navigation du haut 2) Allez aux **[paramètres Profil](/profile)** 3) Mettez à jour vos détails personnels et professionnels 4) Téléchargez des documents (CV, portfolio) 5) Rédigez une bio convaincante 6) Gardez vos informations à jour pour de meilleurs matches d'emploi !"
  ],

  // Suivi des candidatures
  applications: [
    "📊 Suivre vos candidatures : 1) Cliquez sur 'My Jobs' dans la navigation ou **[Aller à My Jobs](/myjobs)** 2) Voyez tous les emplois auxquels vous avez postulé 3) Consultez le statut et les dates de candidature 4) Vérifiez les emplois que vous avez aimés/sauvegardés 5) Suivez vos candidatures en attente. Restez organisé et ne manquez jamais une opportunité !",
    "📈 Gérer les candidatures d'emploi : 1) Allez à **[My Jobs](/myjobs)** depuis le menu principal 2) Consultez votre historique de candidatures 3) Voyez à quels emplois vous avez postulé et quand 4) Suivez vos emplois sauvegardés/aimés 5) Surveillez votre progression de recherche d'emploi. Continuez à postuler et restez motivé !",
    "🎯 Suivi des candidatures : 1) Naviguez vers **[My Jobs](/myjobs)** 2) Révisez toutes vos candidatures soumises 3) Voyez les dates de candidature et détails d'emploi 4) Accédez à votre liste d'emplois sauvegardés 5) Planifiez vos prochaines candidatures. Postuler régulièrement mène au succès !"
  ],

  // Aide générale de la plateforme
  help: [
    "🆘 Aide plateforme MissionPro : Je peux vous aider avec : 1) Créer et gérer votre compte 2) Trouver et postuler pour des emplois 3) Publier des offres d'emploi 4) Gérer votre profil et CV 5) Suivre les candidatures 6) Utiliser toutes les fonctionnalités de la plateforme. Dans quel domaine spécifique avez-vous besoin d'aide ?",
    "💡 Comment puis-je vous aider avec MissionPro ? Je peux vous guider à travers : 1) Configuration et connexion du compte 2) Recherche d'emploi et candidatures 3) Gestion du profil 4) Publication d'emploi (pour les recruteurs) 5) Suivi des candidatures 6) Navigation de la plateforme. Que souhaitez-vous apprendre ?",
    "🌟 Bienvenue sur MissionPro ! Je suis là pour vous aider à naviguer sur notre plateforme. Je peux vous aider avec : 1) Commencer et créer votre compte 2) Trouver l'emploi parfait 3) Postuler à des postes 4) Gérer votre profil 5) Publier des emplois 6) Suivre votre progression. Que puis-je faire pour vous aujourd'hui ?"
  ],

  // Navigation et fonctionnalités
  navigation: [
    "🧭 Guide de navigation MissionPro : 1) **[Find Work](/findwork)** - Parcourir et postuler pour des emplois 2) **[My Jobs](/myjobs)** - Suivre vos candidatures et emplois sauvegardés 3) **[Post Job](/post)** - Créer des offres d'emploi (pour les recruteurs) 4) **[Profile](/profile)** - Gérer votre compte et CV 5) **[Accueil](/)** - Retour à la page d'accueil. Le menu principal est toujours en haut de la page !",
    "📱 Se déplacer dans MissionPro : 1) Utilisez la barre de navigation du haut pour les fonctionnalités principales 2) **[Find Work](/findwork)** pour la recherche d'emploi 3) **[My Jobs](/myjobs)** pour le suivi des candidatures 4) **[Post Job](/post)** pour l'embauche 5) Cliquez sur votre photo de profil pour les paramètres du compte. Tout est conçu pour être intuitif et facile à trouver !",
    "🗺️ Navigation de la plateforme : 1) Le menu principal en haut a toutes les fonctionnalités clés 2) **[Find Work](/findwork)** vous amène aux listes d'emplois 3) **[My Jobs](/myjobs)** montre votre activité 4) **[Post Job](/post)** pour créer des listes 5) Menu profil pour la gestion du compte. Besoin d'aide pour trouver quelque chose de spécifique ?"
  ],

  // Génération de CV et conseils carrière
  resume: [
    "📄 Je peux vous aider à créer un CV professionnel ! Dites-moi : 1) Votre nom et coordonnées 2) Votre expérience professionnelle (emplois, années, responsabilités) 3) Votre formation 4) Vos compétences 5) Certifications ou réalisations. Je vais générer un CV structuré pour vous !",
    "✨ Construisons votre CV ensemble ! Partagez avec moi : 1) Détails personnels (nom, email, téléphone) 2) Historique professionnel (entreprise, poste, durée, réalisations clés) 3) Formation 4) Compétences techniques et relationnelles 5) Projets ou certifications. Je le formaterai professionnellement !",
    "🎯 Service de création de CV ! Fournissez-moi : 1) Informations de contact 2) Résumé/objectif professionnel 3) Expérience avec réalisations spécifiques 4) Détails de formation 5) Compétences et certifications pertinentes. Je créerai un CV convaincant qui se démarque !"
  ],

  // Correspondance d'emplois basée sur le profil utilisateur
  jobMatch: [
    "🔍 Je peux trouver les meilleures opportunités d'emploi pour vous ! Parlez-moi de : 1) Vos compétences et expertise 2) Années d'expérience 3) Type d'emploi préféré (temps plein, télétravail, etc.) 4) Fourchette salariale désirée 5) Préférences de localisation 6) Intérêts sectoriels. Je chercherai sur MissionPro les postes correspondants !",
    "🎯 Laissez-moi vous associer aux emplois parfaits ! Partagez : 1) Votre background professionnel 2) Compétences clés et technologies que vous connaissez 3) Niveau de carrière (débutant, intermédiaire, senior) 4) Préférences de travail (télétravail, bureau, hybride) 5) Attentes salariales. Je trouverai les opportunités pertinentes sur notre plateforme !",
    "💼 Service de correspondance d'emplois ! Décrivez : 1) Votre rôle actuel et expérience 2) Compétences que vous voulez utiliser 3) Secteurs qui vous intéressent 4) Types d'emplois que vous préférez 5) Exigences de localisation et salaire. J'identifierai les meilleures correspondances de nos offres d'emploi !"
  ],

  // Orientation et suggestions de carrière
  career: [
    "🚀 Orientation de carrière disponible ! Dites-moi : 1) Votre situation actuelle (étudiant, employé, changement de carrière) 2) Vos intérêts et passions 3) Compétences que vous avez ou voulez développer 4) Objectifs de carrière à long terme 5) Contraintes (localisation, besoins salariaux). Je suggérerai des parcours de carrière et prochaines étapes !",
    "🌟 Laissez-moi vous aider à planifier votre carrière ! Partagez : 1) Votre background et expérience 2) Ce que vous aimez faire 3) Vos forces et compétences 4) Aspirations de carrière 5) Délai pour le changement. Je recommanderai des directions de carrière et stratégies de développement !",
    "📈 Support de développement de carrière ! Décrivez : 1) Votre rôle actuel et niveau de satisfaction 2) Compétences que vous voulez développer 3) Secteurs qui vous intéressent 4) Objectifs de carrière (promotion, changement, croissance) 5) Temps disponible pour le développement. Je créerai un plan de carrière personnalisé !"
  ],

  // Réponses par défaut
  default: [
    "👋 Salut ! Je suis votre Assistant MissionPro ! Je peux vous aider avec : 1) Créer et gérer votre compte 2) Trouver et postuler pour des emplois 3) Publier des offres d'emploi 4) Gérer votre profil 5) Suivre les candidatures 6) Naviguer sur la plateforme 7) **Génération de CV** 8) **Correspondance d'emplois** 9) **Orientation de carrière**. Que souhaitez-vous savoir ?",
    "🎉 Bienvenue sur MissionPro ! Je suis là pour vous guider à travers notre plateforme d'emploi. Je peux vous aider avec la configuration du compte, la recherche d'emploi, les candidatures, la gestion du profil, **la création de CV**, **la correspondance d'emplois basée sur vos compétences**, et **les conseils de carrière**. Dans quel domaine spécifique souhaitez-vous de l'aide ?",
    "✨ Bonjour ! Je suis l'assistant de la plateforme MissionPro. Je me spécialise dans l'aide aux utilisateurs pour naviguer sur notre plateforme de recherche d'emploi, **créer des CV professionnels**, **trouver des opportunités d'emploi correspondantes**, et **planifier le développement de carrière**. Que vous cherchiez du travail, publiiez des emplois ou gériez votre profil, je suis là pour vous aider. Que puis-je faire pour vous aujourd'hui ?"
  ]
};

// Function to detect if message is in French
const isFrench = (message) => {
  const frenchWords = [
    'bonjour', 'salut', 'comment', 'aide', 'aider', 'créer', 'compte', 'emploi', 'travail',
    'candidature', 'profil', 'recherche', 'postuler', 'publier', 'gérer', 'navigation',
    'où', 'comment', 'que', 'quoi', 'pourquoi', 'français', 'france', 'merci', 'svp',
    's\'il vous plaît', 'pouvez-vous', 'puis-je', 'voulez-vous', 'souhaitez-vous'
  ];

  const lowerMessage = message.toLowerCase();
  return frenchWords.some(word => lowerMessage.includes(word));
};

// Function to generate resume from user information
const generateResume = (userInfo, isMessageInFrench) => {
  // Extract information using regex and keywords
  const nameMatch = userInfo.match(/(?:my name is|name is|i'm|je suis|je m'appelle)\s+([^,.\n]+)/i);
  const emailMatch = userInfo.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const phoneMatch = userInfo.match(/(?:phone|tel|téléphone)[:\s]*([+\d\s\-()]+)/i);

  const name = nameMatch ? nameMatch[1].trim() : (isMessageInFrench ? "Nom non fourni" : "Name not provided");
  const email = emailMatch ? emailMatch[1] : (isMessageInFrench ? "Email non fourni" : "Email not provided");
  const phone = phoneMatch ? phoneMatch[1].trim() : (isMessageInFrench ? "Téléphone non fourni" : "Phone not provided");

  // Extract work experience
  const workExperience = [];
  const workMatches = userInfo.match(/(?:worked as|work as|travaillé comme|travaille comme)\s+([^.]+)/gi);
  if (workMatches) {
    workMatches.forEach(match => {
      workExperience.push(match.replace(/(?:worked as|work as|travaillé comme|travaille comme)\s+/i, '').trim());
    });
  }

  // Extract education
  const educationMatch = userInfo.match(/(?:bachelor|master|degree|diplôme|formation)[^.]*(?:from|at|de|à)\s+([^.(]+)/i);
  const education = educationMatch ? educationMatch[0].trim() : null;

  // Extract skills
  const skillsMatch = userInfo.match(/(?:skills are|skills:|compétences sont|compétences:)\s*([^.]+)/i);
  const skills = skillsMatch ? skillsMatch[1].split(',').map(s => s.trim()) : [];

  // Extract certifications
  const certMatch = userInfo.match(/(?:certified in|certification|certifié en|certification)\s+([^.]+)/i);
  const certifications = certMatch ? [certMatch[1].trim()] : [];

  // Generate resume based on language
  if (isMessageInFrench) {
    return `✨ Voici votre CV professionnel :

**${name.toUpperCase()}**
📧 ${email} | 📱 ${phone}

**RÉSUMÉ PROFESSIONNEL**
${workExperience.length > 0 ? `Professionnel expérimenté avec une expertise en ${skills.slice(0, 3).join(', ')}.` : 'Professionnel motivé cherchant de nouvelles opportunités.'}

**EXPÉRIENCE PROFESSIONNELLE**
${workExperience.length > 0 ? workExperience.map(exp => `• ${exp}`).join('\n') : '• Expérience à ajouter'}

**FORMATION**
${education || '• Formation à ajouter'}

**COMPÉTENCES TECHNIQUES**
${skills.length > 0 ? skills.map(skill => `• ${skill}`).join('\n') : '• Compétences à ajouter'}

${certifications.length > 0 ? `**CERTIFICATIONS**\n${certifications.map(cert => `• ${cert}`).join('\n')}` : ''}

**RECOMMANDATIONS :**
1. Ajoutez des réalisations spécifiques avec des chiffres
2. Incluez des projets notables ou contributions
3. Adaptez ce CV pour chaque candidature
4. Ajoutez un lien LinkedIn si disponible

Souhaitez-vous que je vous aide à trouver des emplois correspondant à ce profil ?`;
  } else {
    return `✨ Here's your professional resume:

**${name.toUpperCase()}**
📧 ${email} | 📱 ${phone}

**PROFESSIONAL SUMMARY**
${workExperience.length > 0 ? `Experienced professional with expertise in ${skills.slice(0, 3).join(', ')}.` : 'Motivated professional seeking new opportunities.'}

**WORK EXPERIENCE**
${workExperience.length > 0 ? workExperience.map(exp => `• ${exp}`).join('\n') : '• Experience to be added'}

**EDUCATION**
${education || '• Education to be added'}

**TECHNICAL SKILLS**
${skills.length > 0 ? skills.map(skill => `• ${skill}`).join('\n') : '• Skills to be added'}

${certifications.length > 0 ? `**CERTIFICATIONS**\n${certifications.map(cert => `• ${cert}`).join('\n')}` : ''}

**RECOMMENDATIONS:**
1. Add specific achievements with numbers (e.g., 'Improved performance by 30%')
2. Include notable projects or contributions
3. Tailor this resume for each job application
4. Add LinkedIn profile link if available

Would you like me to help you find jobs that match this profile?`;
  }
};

// @desc    Send message to chatbot (100% FREE - NO API NEEDED)
// @route   POST /api/v1/chat
// @access  Public
export const sendMessage = async (req, res) => {
  try {
    const { message, language } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    const userMessage = message.toLowerCase();
    // Use page language if provided, otherwise detect from message
    const isMessageInFrench = language === 'fr' || (language !== 'en' && isFrench(message));
    const responses = isMessageInFrench ? missionProResponsesFR : missionProResponses;
    let botResponse;

    // Debug logging
    console.log('User message:', userMessage);
    console.log('Language:', language, 'Is French:', isMessageInFrench);

    // Check if user is providing detailed information for resume generation
    const hasDetailedInfo = (userMessage.includes('my name is') || userMessage.includes('je m\'appelle') || userMessage.includes('je suis')) &&
                           (userMessage.includes('@') || userMessage.includes('email')) &&
                           (userMessage.includes('worked') || userMessage.includes('travaillé') || userMessage.includes('experience'));

    console.log('Has detailed info for resume:', hasDetailedInfo);

    // Determine response category based on MissionPro-specific keywords (English & French)
    if (hasDetailedInfo) {
      // User is providing detailed info - generate actual resume
      botResponse = generateResume(message, isMessageInFrench);
    } else if ((userMessage.includes('create') && userMessage.includes('resume')) ||
        (userMessage.includes('build') && userMessage.includes('resume')) ||
        (userMessage.includes('generate') && userMessage.includes('resume')) ||
        (userMessage.includes('make') && userMessage.includes('resume')) ||
        userMessage.includes('create resume') || userMessage.includes('build resume') || userMessage.includes('generate resume') ||
        (userMessage.includes('créer') && userMessage.includes('cv')) ||
        (userMessage.includes('faire') && userMessage.includes('cv')) ||
        (userMessage.includes('générer') && userMessage.includes('cv')) ||
        userMessage.includes('créer cv') || userMessage.includes('faire cv') || userMessage.includes('générer cv')) {
      // User is asking to create resume - provide instructions
      botResponse = responses.resume[Math.floor(Math.random() * responses.resume.length)];
    } else if (userMessage.includes('job match') || userMessage.includes('find best job') || userMessage.includes('match job') || userMessage.includes('recommend job') || userMessage.includes('suggest job') ||
               userMessage.includes('correspondance emploi') || userMessage.includes('meilleur emploi') || userMessage.includes('recommander emploi') || userMessage.includes('suggérer emploi')) {
      botResponse = responses.jobMatch[Math.floor(Math.random() * responses.jobMatch.length)];
    } else if (userMessage.includes('career advice') || userMessage.includes('career guidance') || userMessage.includes('career path') || userMessage.includes('career plan') || userMessage.includes('career change') ||
               userMessage.includes('conseil carrière') || userMessage.includes('orientation carrière') || userMessage.includes('parcours carrière') || userMessage.includes('plan carrière') || userMessage.includes('changement carrière')) {
      botResponse = responses.career[Math.floor(Math.random() * responses.career.length)];
    } else if (userMessage.includes('account') || userMessage.includes('sign up') || userMessage.includes('register') || userMessage.includes('create account') || userMessage.includes('login') ||
        userMessage.includes('compte') || userMessage.includes('créer') || userMessage.includes('inscription') || userMessage.includes('connexion')) {
      botResponse = responses.account[Math.floor(Math.random() * responses.account.length)];
    } else if (userMessage.includes('find work') || userMessage.includes('find job') || userMessage.includes('search job') || userMessage.includes('apply') || userMessage.includes('job search') ||
               userMessage.includes('trouver travail') || userMessage.includes('chercher emploi') || userMessage.includes('postuler') || userMessage.includes('candidature') || userMessage.includes('emploi')) {
      botResponse = responses.jobs[Math.floor(Math.random() * responses.jobs.length)];
    } else if (userMessage.includes('post job') || userMessage.includes('create job') || userMessage.includes('hire') || userMessage.includes('recruiter') || userMessage.includes('posting') ||
               userMessage.includes('publier emploi') || userMessage.includes('créer emploi') || userMessage.includes('recruteur') || userMessage.includes('embaucher')) {
      botResponse = responses.post[Math.floor(Math.random() * responses.post.length)];
    } else if (userMessage.includes('profile') || userMessage.includes('update profile') || userMessage.includes('edit profile') ||
               userMessage.includes('resume') || userMessage.includes('cv') ||
               userMessage.includes('profil') || userMessage.includes('mettre à jour') || userMessage.includes('modifier profil')) {
      botResponse = responses.profile[Math.floor(Math.random() * responses.profile.length)];
    } else if (userMessage.includes('my jobs') || userMessage.includes('application') || userMessage.includes('track') || userMessage.includes('applied') || userMessage.includes('status') ||
               userMessage.includes('mes emplois') || userMessage.includes('candidatures') || userMessage.includes('suivre') || userMessage.includes('statut')) {
      botResponse = responses.applications[Math.floor(Math.random() * responses.applications.length)];
    } else if (userMessage.includes('navigation') || userMessage.includes('navigate') || userMessage.includes('menu') || userMessage.includes('where') || userMessage.includes('how to find') ||
               userMessage.includes('naviguer') || userMessage.includes('où') || userMessage.includes('comment trouver') ||
               userMessage.includes('where is') || userMessage.includes('find page') || userMessage.includes('go to') ||
               userMessage.includes('où est') || userMessage.includes('trouver page') || userMessage.includes('aller à')) {

      // Check for specific page requests
      if (userMessage.includes('find work') || userMessage.includes('job search') || userMessage.includes('chercher emploi')) {
        botResponse = isMessageInFrench
          ? "🔍 Pour aller à la page de recherche d'emploi : **[Cliquez ici pour Find Work](/findwork)** ou utilisez le menu de navigation en haut de la page."
          : "🔍 To go to the job search page: **[Click here for Find Work](/findwork)** or use the navigation menu at the top of the page.";
      } else if (userMessage.includes('my jobs') || userMessage.includes('applications') || userMessage.includes('mes emplois') || userMessage.includes('candidatures')) {
        botResponse = isMessageInFrench
          ? "📊 Pour voir vos candidatures : **[Cliquez ici pour My Jobs](/myjobs)** ou utilisez le menu de navigation."
          : "📊 To view your applications: **[Click here for My Jobs](/myjobs)** or use the navigation menu.";
      } else if (userMessage.includes('post job') || userMessage.includes('create job') || userMessage.includes('publier emploi') || userMessage.includes('créer emploi')) {
        botResponse = isMessageInFrench
          ? "📋 Pour publier un emploi : **[Cliquez ici pour Post Job](/post)** ou utilisez le menu de navigation."
          : "📋 To post a job: **[Click here for Post Job](/post)** or use the navigation menu.";
      } else if (userMessage.includes('profile') || userMessage.includes('account') || userMessage.includes('profil') || userMessage.includes('compte')) {
        botResponse = isMessageInFrench
          ? "👤 Pour gérer votre profil : **[Cliquez ici pour Profile](/profile)** ou cliquez sur votre photo de profil en haut à droite."
          : "👤 To manage your profile: **[Click here for Profile](/profile)** or click your profile picture in the top right.";
      } else if (userMessage.includes('home') || userMessage.includes('homepage') || userMessage.includes('accueil') || userMessage.includes('page d\'accueil')) {
        botResponse = isMessageInFrench
          ? "🏠 Pour retourner à l'accueil : **[Cliquez ici pour la page d'accueil](/)** ou cliquez sur le logo MissionPro."
          : "🏠 To go back to homepage: **[Click here for Homepage](/)** or click the MissionPro logo.";
      } else {
        botResponse = responses.navigation[Math.floor(Math.random() * responses.navigation.length)];
      }
    } else if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('help') || userMessage.includes('start') || userMessage.includes('guide') ||
               userMessage.includes('bonjour') || userMessage.includes('salut') || userMessage.includes('aide') || userMessage.includes('aider') || userMessage.includes('commencer')) {
      botResponse = responses.help[Math.floor(Math.random() * responses.help.length)];
    } else {
      // For unrecognized queries, provide general MissionPro help in appropriate language
      if (isMessageInFrench) {
        botResponse = "Je suis là pour vous aider à utiliser MissionPro ! Je peux vous guider pour créer un compte, trouver des emplois, postuler à des postes, publier des emplois, gérer votre profil, naviguer sur la plateforme, **créer des CV professionnels**, **trouver des emplois correspondants**, et **fournir des conseils de carrière**. Quelle fonctionnalité spécifique souhaitez-vous connaître ?";
      } else {
        botResponse = "I'm here to help you use MissionPro! I can guide you through creating an account, finding jobs, applying for positions, posting jobs, managing your profile, navigating the platform, **creating professional resumes**, **finding matching job opportunities**, and **providing career guidance**. What specific feature would you like help with?";
      }
    }

    // Return response
    res.status(200).json({
      success: true,
      data: {
        message: botResponse,
        model: `MissionPro Platform Assistant (${isMessageInFrench ? 'Français' : 'English'}) - 100% FREE`
      }
    });

  } catch (error) {
    console.error('Chat Error:', error);

    // Provide error message in appropriate language
    const errorMessage = isFrench(req.body?.message || '')
      ? "Je suis là pour vous aider à naviguer sur MissionPro ! Demandez-moi comment créer un compte, trouver des emplois, postuler à des postes, publier des emplois, gérer votre profil, ou toute fonctionnalité de la plateforme."
      : "I'm here to help you navigate MissionPro! Ask me about creating an account, finding jobs, applying for positions, posting jobs, managing your profile, or any platform features.";

    res.status(200).json({
      success: true,
      data: {
        message: errorMessage,
        model: "MissionPro Platform Assistant"
      }
    });
  }
};

// @desc    Get chatbot info
// @route   GET /api/v1/chat/info
// @access  Public
export const getChatInfo = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        name: 'MissionPro AI Assistant',
        description: 'Your intelligent guide to using MissionPro with AI-powered career services',
        capabilities: [
          'Account creation and management',
          'Job searching and applications',
          'Job posting for recruiters',
          'Profile and resume management',
          'Application tracking',
          'Platform navigation help',
          '🆕 AI Resume Generation',
          '🆕 Intelligent Job Matching',
          '🆕 Personalized Career Guidance',
          '🆕 Bilingual Support (English/French)'
        ],
        model: 'AI-Enhanced Platform Guide',
        version: '3.0.0'
      }
    });
  } catch (error) {
    console.error('Chat info error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to get chat information'
    });
  }
};
