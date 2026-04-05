import { MessageCircle, Phone } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  const whatsappUrl =
    "https://wa.me/967774151541?text=" +
    encodeURIComponent("احتاج ان استفسر عن ……");

  return (
    <section id="hero" className="relative min-h-[70vh] overflow-hidden">
      <img
        src={heroBanner}
        alt="مستودع الريمي - قطع غيار سيارات"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={800}
      />
      <div className="hero-gradient absolute inset-0 opacity-80" />

      <div className="container relative z-10 flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <h2 className="mb-4 text-3xl font-black leading-tight text-primary-foreground md:text-5xl">
          مستودع الريمي
        </h2>
        <p className="mb-2 text-xl font-bold text-primary-foreground/90 md:text-2xl">
          لبيع قطع غيار السيارات
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
          متخصصون في قطع تويوتا وهيونداي الأصلية والبديلة عالية الجودة
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-whatsapp px-8 py-3 text-lg font-bold text-whatsapp-foreground shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            تواصل عبر واتساب
          </a>
          <a
            href="tel:+967774151541"
            className="flex items-center gap-2 rounded-xl border-2 border-primary-foreground/30 bg-primary-foreground/10 px-8 py-3 text-lg font-bold text-primary-foreground backdrop-blur transition-transform hover:scale-105"
          >
            <Phone className="h-5 w-5" />
            اتصل الآن
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
