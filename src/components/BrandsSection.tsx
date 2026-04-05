const brands = [
  { name: "TOYOTA", color: "hsl(0 80% 45%)" },
  { name: "HYUNDAI", color: "hsl(220 60% 35%)" },
  { name: "LEXUS", color: "hsl(0 0% 20%)" },
  { name: "KIA", color: "hsl(0 80% 45%)" },
];

const BrandsSection = () => (
  <section className="bg-muted py-12">
    <div className="container">
      <h2 className="mb-8 text-center text-2xl font-black text-foreground">الماركات المدعومة</h2>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {brands.map((b) => (
          <div
            key={b.name}
            className="flex h-24 w-40 items-center justify-center rounded-xl bg-card shadow-md transition-transform hover:scale-105"
          >
            <span className="text-2xl font-black" style={{ color: b.color }}>
              {b.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BrandsSection;
