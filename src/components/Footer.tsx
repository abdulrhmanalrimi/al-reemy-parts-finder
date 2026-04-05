import { Phone, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-10">
    <div className="container">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-bold text-primary">مستودع الريمي</h3>
          <p className="text-sm text-muted-foreground">
            لبيع قطع غيار السيارات الأصلية والبديلة – تويوتا وهيونداي
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-bold text-foreground">روابط سريعة</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#hero" className="hover:text-primary">الرئيسية</a></li>
            <li><a href="#products" className="hover:text-primary">المنتجات</a></li>
            <li><a href="#inquiry" className="hover:text-primary">استعلام عن قطعة</a></li>
            <li><a href="#about" className="hover:text-primary">من نحن</a></li>
            <li><a href="#contact" className="hover:text-primary">تواصل معنا</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-bold text-foreground">تواصل معنا</h3>
          <div className="flex gap-3">
            <a
              href="https://wa.me/967774151541"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="tel:+967774151541"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} مستودع الريمي – جميع الحقوق محفوظة</p>
        <p className="mt-1">برمجة المهندس / عبد الرحمن محمد الريمي | <a href="tel:+967776020184" className="hover:text-primary">+967776020184</a></p>
      </div>
    </div>
  </footer>
);

export default Footer;
