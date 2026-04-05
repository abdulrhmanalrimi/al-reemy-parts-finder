import { useState } from "react";
import { Send } from "lucide-react";

const InquirySection = () => {
  const [form, setForm] = useState({
    carType: "",
    model: "",
    chassis: "",
    partName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `استعلام عن قطعة غيار:\n- نوع السيارة: ${form.carType}\n- الموديل: ${form.model}\n- رقم الشاصي: ${form.chassis}\n- القطعة المطلوبة: ${form.partName}`;
    window.open(
      "https://wa.me/967774151541?text=" + encodeURIComponent(msg),
      "_blank"
    );
  };

  return (
    <section id="inquiry" className="py-16">
      <div className="container max-w-2xl">
        <h2 className="mb-2 text-center text-3xl font-black text-foreground">استعلام عن قطعة</h2>
        <p className="mb-8 text-center text-muted-foreground">
          أدخل بيانات سيارتك وسنساعدك في إيجاد القطعة المطلوبة
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-card p-6 shadow-lg">
          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground">نوع السيارة</label>
            <input
              type="text"
              required
              maxLength={100}
              placeholder="مثال: تويوتا هايلكس"
              value={form.carType}
              onChange={(e) => setForm({ ...form, carType: e.target.value })}
              className="w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground">الموديل</label>
            <input
              type="text"
              required
              maxLength={50}
              placeholder="مثال: 2020"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className="w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground">رقم الشاصي</label>
            <input
              type="text"
              maxLength={50}
              placeholder="اختياري"
              value={form.chassis}
              onChange={(e) => setForm({ ...form, chassis: e.target.value })}
              className="w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground">اسم القطعة المطلوبة</label>
            <input
              type="text"
              required
              maxLength={200}
              placeholder="مثال: فلتر زيت"
              value={form.partName}
              onChange={(e) => setForm({ ...form, partName: e.target.value })}
              className="w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-lg font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <Send className="h-5 w-5" />
            إرسال الطلب عبر واتساب
          </button>
        </form>
      </div>
    </section>
  );
};

export default InquirySection;
