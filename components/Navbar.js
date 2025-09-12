import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { label: "होम", href: "/" },
    { label: "देश-विदेश", href: "/desh-videsh" },
    { label: "जीवन के रंग", href: "/jeevan-ke-rang" },
    { label: "विविध", href: "/vividh" },
    { label: "प्रतिरोध", href: "/pratirodh" },
    { label: "कला-साहित्य", href: "/kala-sahitya" },
    { label: "कृषि-मवेशी", href: "/krishi-mveshi" },
    { label: "टीम", href: "/team" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-center">
        <Link href="/">
          <h1 className="text-4xl font-bold text-black">हमारा मोर्चा</h1>
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="grid grid-cols-4 md:flex md:justify-center gap-2 md:gap-8 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 px-2 md:px-3 py-2 rounded-md hover:bg-white text-center text-sm md:text-base"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
