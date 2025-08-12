import "./globals.css";
import ContextProvider from "@/providers/ContextProvider";
import { LanguageProvider } from "@/context/languageContext";
import { ThemeProvider } from "@/context/themeContext";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ChatWidget from "@/Components/ChatWidget";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${roboto.className} antialiased bg-background text-foreground`}>
        <Toaster position="top-center" />
        <ThemeProvider>
          <LanguageProvider>
            <ContextProvider>
              {children}
              <ChatWidget />
            </ContextProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
