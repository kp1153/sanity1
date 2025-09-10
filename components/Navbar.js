"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "होम" },
  { href: "/desh-videsh", label: "देश-विदेश" },
  { href: "/jeevan-ke-rang", label: "जीवन के रंग" },
  { href: "/vividh", label: "विविध" },
  { href: "/pratirodh", label: "प्रतिरोध" },
  { href: "/team", label: "टीम" },
];

const Navbar = () => {
  const pathname = usePathname();
  const whatsappNumber = "919996865069";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <nav className="bg-white border-b-2 border-orange-200 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 relative">
        {/* ✅ Running Contact Banner (without WhatsApp number) */}
        <div className="mb-4 overflow-hidden bg-gradient-to-r from-green-50 to-blue-50 border-2 border-dashed border-emerald-400 rounded-lg p-3">
          <div className="whitespace-nowrap animate-marquee flex items-center">
            <span className="inline-flex items-center text-lg font-bold text-emerald-700 mx-8">
              वेबसाइट-मोबाइल ऐप बनवाने के लिए संपर्क करें
            </span>
            <span className="inline-flex items-center text-lg font-bold text-blue-700 mx-8">
              डोमेन-होस्टिंग दोनों बिल्कुल फ्री
            </span>
            <span className="inline-flex items-center text-lg font-bold text-purple-700 mx-8">
              Next.js और टेलविंड-सीएसएस पर कस्टम डिजाइन और फुल कंट्रोल
            </span>
          </div>
        </div>

        {/* ✅ Site Title */}
        <Link href="/" className="flex flex-col items-center mb-4 group">
          <h1 className="text-pink-700 text-4xl font-bold tracking-wide hover:text-red-600 transition-colors duration-300 text-center">
            हमारा मोर्चा
          </h1>
          <span className="text-green-700 text-base font-semibold mt-1">
            ہمارا مورچہ
          </span>
          <span className="text-gray-600 text-sm font-medium mt-1 text-center leading-relaxed">
            सच का साथ पर व्यावहारिकता का तकाजा पहले
          </span>
        </Link>

        {/* ✅ Navigation Links */}
        <div className="flex flex-wrap justify-center gap-3">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border-2 ${
                  isActive
                    ? "bg-blue-600 text-white border-purple-600 shadow-lg transform scale-105"
                    : "text-purple-700 border-orange-200 hover:bg-orange-50 hover:border-sky-400 hover:text-cyan-800 hover:shadow-md"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* ✅ Fixed WhatsApp Button (always visible) */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 absolute top-4 right-4"
        >
          💬 9996865069
        </a>
        {/* For mobile - floating bottom button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden fixed bottom-4 right-4 bg-green-600 text-white text-lg font-bold rounded-full shadow-lg px-4 py-3 hover:bg-green-700 transition-colors duration-300"
        >
          💬
        </a>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
