"use client";
import Header from "@/Components/Header";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { ArrowLeft, Save, User, Mail, Briefcase, FileText, Phone, Upload } from "lucide-react";

function SettingsPage() {
  const { isAuthenticated, loading, userProfile, getUserProfile, updateUserProfile } = useGlobalContext();
  const router = useRouter();
  
  // Form state - ensure all values are always defined
  const [formData, setFormData] = useState({
    name: userProfile?.name || "",
    bio: userProfile?.bio || "",
    profession: userProfile?.profession || "",
    resume: userProfile?.resume || "",
    phone: userProfile?.phone || "",
  });

  const [saving, setSaving] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("https://missionpro-app-4qaf.onrender.com/login");
    }
  }, [isAuthenticated, loading, router]);

  // Pre-fill form with user data
  useEffect(() => {
    if (userProfile && Object.keys(userProfile).length > 0) {
      setFormData(prev => ({
        name: userProfile.name || "",
        bio: userProfile.bio || "",
        profession: userProfile.profession || "",
        resume: userProfile.resume || "",
        phone: userProfile.phone || "",
      }));
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleCVUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadingCV(true);
      const formData = new FormData();
      formData.append('cv', selectedFile);

      const response = await axios.post('/api/v1/user/upload-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the resume field with the new CV path
      setFormData(prev => ({
        ...prev,
        resume: response.data.cvPath
      }));

      // Update user profile in context
      if (userProfile.auth0Id) {
        await getUserProfile(userProfile.auth0Id);
      }

      toast.success('CV uploaded successfully!');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading CV:', error);
      toast.error('Failed to upload CV');
    } finally {
      setUploadingCV(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Use the updateUserProfile function from context
      await updateUserProfile(formData);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1 pt-8 w-[90%] max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Retour
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Overview Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Image
                  src={userProfile.profilePicture || "/user.png"}
                  alt={userProfile.name || "User"}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto"
                />
              </div>
              <CardTitle className="text-xl">{userProfile.name}</CardTitle>
              <CardDescription>{userProfile.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-gray-500" />
                  <span>{userProfile.profession || "Non spécifié"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-500" />
                  <span>{userProfile.email}</span>
                </div>
                {userProfile.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-500" />
                    <span>{userProfile.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-500" />
                  <span>Membre depuis {new Date(userProfile.createdAt).getFullYear()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Paramètres du Profil</CardTitle>
              <CardDescription>
                Mettez à jour vos informations de profil et préférences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nom Complet</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    placeholder="Entrez votre nom complet"
                    required
                  />
                </div>

                {/* Profession Field */}
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    name="profession"
                    type="text"
                    value={formData.profession || ""}
                    onChange={handleInputChange}
                    placeholder="ex: Développeur Logiciel, Designer, etc."
                  />
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Bio Field */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleInputChange}
                    placeholder="Parlez-nous de vous..."
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    Ceci sera visible aux employeurs lorsque vous postulez pour des emplois.
                  </p>
                </div>

                {/* CV Upload Section */}
                <div className="space-y-2">
                  <Label>CV/Resume</Label>

                  {/* Current CV Display */}
                  {formData.resume && (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                      <FileText size={16} className="text-blue-600" />
                      <span className="text-sm text-gray-700 flex-1">
                        {formData.resume.includes('/uploads/') ? 'CV Téléchargé' : 'Lien CV Externe'}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(
                          formData.resume.startsWith('http')
                            ? formData.resume
                            : `https://missionpro-app-4qaf.onrender.com${formData.resume}`,
                          '_blank'
                        )}
                      >
                        Voir
                      </Button>
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCVUpload}
                      disabled={!selectedFile || uploadingCV}
                      className="flex items-center gap-2"
                    >
                      <Upload size={14} />
                      {uploadingCV ? 'Téléchargement...' : 'Télécharger'}
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500">
                    Téléchargez un fichier PDF (max 5MB) ou gardez votre lien CV existant.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2"
                  >
                    <Save size={16} />
                    {saving ? "Sauvegarde..." : "Sauvegarder les Modifications"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
