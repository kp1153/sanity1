import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "हुजूर यह रही आपकी खबर, क्लिक कीजिए।",
  description:
    "नेक्स्ट.जेएस पर हमने खुद बनाई है यह वेबसाइट और अब मैं बन गया हूँ वेब डेवलपर।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
     
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
