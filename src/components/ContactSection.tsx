import { Phone, MessageCircle } from "lucide-react";

const phones = [
  { number: "03/200471", tel: "+96703200471" },
  { number: "774151541", tel: "+967774151541" },
  { number: "773005453", tel: "+967773005453" },
  { number: "773186426", tel: "+967773186426" },
];

const ContactSection = () => (
  <section id="contact" className="section-dark py-16">
    <div className="container text-center">
      <h2 className="mb-2 text-3xl font-black">تواصل معنا</h2>
      <p className="mb-8 text-section-dark-foreground/70">نسعد بخدمتكم – اتصلوا أو راسلونا في أي وقت</p>

      <div className="mx-auto mb-8 grid max-w-xl gap-4 sm:grid-cols-2">
        {phones.map((p) => (
          <a
            key={p.number}
            href={`tel:${p.tel}`}
            className="flex items-center justify-center gap-3 rounded-xl border border-section-dark-foreground/20 px-6 py-4 text-lg font-bold text-section-dark-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Phone className="h-5 w-5" />
            {p.number}
          </a>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="https://wa.me/967774151541?text=%D8%A7%D8%AD%D8%AA%D8%A7%D8%AC%20%D8%A7%D9%86%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%E2%80%A6%E2%80%A6"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-whatsapp px-8 py-3 text-lg font-bold text-whatsapp-foreground shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
          واتساب
        </a>
        <a
          href="tel:+967774151541"
          className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          <Phone className="h-5 w-5" />
          اتصال مباشر
        </a>
      </div>
    </div>
  </section>
);

export default ContactSection;
