import { MessageCircle } from "lucide-react";
import catToyota from "@/assets/cat-toyota.jpg";
import catHyundai from "@/assets/cat-hyundai.jpg";
import catMechanical from "@/assets/cat-mechanical.jpg";
import catElectrical from "@/assets/cat-electrical.jpg";
import catOils from "@/assets/cat-oils.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";

const categories = [
  { name: "قطع تويوتا", image: catToyota, desc: "قطع غيار أصلية وبديلة لجميع موديلات تويوتا" },
  { name: "قطع هيونداي", image: catHyundai, desc: "قطع غيار أصلية وبديلة لجميع موديلات هيونداي" },
  { name: "قطع ميكانيكية", image: catMechanical, desc: "فلاتر – فرامل – مقصات – عكوس – دينمو – رديتر" },
  { name: "قطع كهربائية", image: catElectrical, desc: "دينمو – سلف – سنسورات – إضاءة – أسلاك" },
  { name: "زيوت وسوائل", image: catOils, desc: "زيوت محرك – سوائل فرامل – مياه رديتر – جير" },
  { name: "ملحقات وكماليات", image: catAccessories, desc: "فرشات – مرايا – مساحات – إكسسوارات" },
];

const whatsappUrl = (cat: string) =>
  "https://wa.me/967774151541?text=" +
  encodeURIComponent(`احتاج ان استفسر عن ${cat}`);

const ProductsSection = () => (
  <section id="products" className="bg-muted py-16">
    <div className="container">
      <h2 className="mb-2 text-center text-3xl font-black text-foreground">منتجاتنا</h2>
      <p className="mb-10 text-center text-muted-foreground">اختر الفئة المناسبة واطلب القطعة التي تحتاجها</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="group overflow-hidden rounded-xl bg-card shadow-md transition-shadow hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                width={640}
                height={640}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <h3 className="absolute bottom-3 right-4 text-xl font-bold text-primary-foreground">{cat.name}</h3>
            </div>
            <div className="p-4">
              <p className="mb-4 text-sm text-muted-foreground">{cat.desc}</p>
              <a
                href={whatsappUrl(cat.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-4 py-2 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                اطلب عبر واتساب
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
