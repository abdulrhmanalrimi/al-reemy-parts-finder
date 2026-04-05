import storeImg from "@/assets/store-1.jpg";

const AboutSection = () => (
  <section id="about" className="section-dark py-16">
    <div className="container grid items-center gap-10 md:grid-cols-2">
      <div>
        <h2 className="mb-4 text-3xl font-black">من نحن</h2>
        <p className="mb-4 leading-relaxed text-section-dark-foreground/80">
          نحن مستودع محلي متخصص في توفير قطع الغيار الأصلية والبديلة بجودة موثوقة
          وتوفير سريع داخل المنطقة. نخدم العملاء والورش بأسعار مناسبة وخدمة مميزة.
        </p>
        <p className="leading-relaxed text-section-dark-foreground/80">
          هدفنا هو تسهيل حصول العملاء والورش على القطع المناسبة بجودة عالية ودعم
          مستمر، مع إمكانية الاستعلام والتواصل المباشر عبر الهاتف لتجربة سلسة وسريعة.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl shadow-xl">
        <img src={storeImg} alt="داخل مستودع الريمي" loading="lazy" width={640} height={480} className="h-full w-full object-cover" />
      </div>
    </div>
  </section>
);

export default AboutSection;
