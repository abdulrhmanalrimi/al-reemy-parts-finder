import { Star } from "lucide-react";

const reviews = [
  { name: "أحمد العبدلي", text: "قطع أصلية وأسعار ممتازة، تعامل راقي وسرعة في التوصيل. أنصح بالتعامل معهم.", rating: 5 },
  { name: "محمد الشرعبي", text: "وفّروا لي قطعة نادرة لسيارتي خلال يوم واحد فقط. شكراً مستودع الريمي!", rating: 5 },
  { name: "علي الحداد", text: "أفضل مستودع قطع غيار في الحديدة. جودة عالية وخدمة ممتازة.", rating: 5 },
];

const ReviewsSection = () => (
  <section className="bg-muted py-16">
    <div className="container">
      <h2 className="mb-8 text-center text-3xl font-black text-foreground">آراء العملاء</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.name} className="rounded-xl bg-card p-6 shadow-md">
            <div className="mb-3 flex gap-1">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{r.text}"</p>
            <p className="font-bold text-foreground">– {r.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
