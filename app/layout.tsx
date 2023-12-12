import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Titillium_Web } from "next/font/google";
import Navbar from "@/components/navbar";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

const titillium_web = Titillium_Web({
  weight: ["200", "300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-titillium-web",
});

export const metadata: Metadata = {
  title: "AndroidKits",
  description: "Elevate Your Android Development with Our Arsenal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${titillium_web.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
