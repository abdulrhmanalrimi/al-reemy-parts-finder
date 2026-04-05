import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logoBrand from "@/assets/logo-brand.jpg";

const navItems = [
  { label: "الرئيسية", href: "#hero" },
  { label: "المنتجات", href: "#products" },
  { label: "استعلام عن قطعة", href: "#inquiry" },
  { label: "من نحن", href: "#about" },
  { label: "تواصل معنا", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card shadow-md">
      <div className="container flex items-center justify-between py-3">
        <a href="#hero" className="flex items-center gap-3">
          <img src={logoBrand} alt="مستودع الريمي" className="h-14 w-14 rounded-lg object-cover" />
          <div>
            <h1 className="text-lg font-bold text-primary">مستودع الريمي</h1>
            <p className="text-xs text-muted-foreground">لقطع غيار السيارات</p>
          </div>
        </a>

        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+967774151541"
          className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 md:flex"
        >
          <Phone className="h-4 w-4" />
          اتصل بنا
        </a>

        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground md:hidden">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t bg-card px-4 pb-4 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a
            href="tel:+967774151541"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            <Phone className="h-4 w-4" />
            اتصل بنا
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
