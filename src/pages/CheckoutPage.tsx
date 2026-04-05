import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Wallet, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const JAIB_NUMBER = "773186426";

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "payment" | "done">("form");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [orderId, setOrderId] = useState("");

  const handleSubmitOrder = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "يرجى ملء جميع الحقول", variant: "destructive" });
      return;
    }
    if (items.length === 0) {
      toast({ title: "السلة فارغة", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.name.trim(),
          customer_phone: form.phone.trim(),
          payment_method: "jaib",
          total,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      setOrderId(order.id);
      setStep("payment");
    } catch (err) {
      console.error(err);
      toast({ title: "حدث خطأ أثناء إنشاء الطلب", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmPayment = () => {
    // Send WhatsApp message with order details
    const msg = `✅ تأكيد طلب جديد\n\n📋 رقم الطلب: ${orderId.slice(0, 8)}\n👤 الاسم: ${form.name}\n📱 الجوال: ${form.phone}\n\n🛒 المنتجات:\n${items.map((i) => `- ${i.name} × ${i.quantity} = ${(i.price * i.quantity).toLocaleString()} ريال`).join("\n")}\n\n💰 الإجمالي: ${total.toLocaleString()} ريال\n💳 الدفع عبر: محفظة جيب - ${JAIB_NUMBER}`;

    window.open(
      "https://wa.me/967774151541?text=" + encodeURIComponent(msg),
      "_blank"
    );

    clearCart();
    setStep("done");
  };

  if (items.length === 0 && step === "form") {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-20 text-center">
          <p className="text-xl text-muted-foreground mb-4">السلة فارغة</p>
          <button
            onClick={() => navigate("/store")}
            className="rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground"
          >
            تصفح المتجر
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container max-w-2xl py-10">
        {/* Steps indicator */}
        <div className="mb-8 flex items-center justify-center gap-4">
          {["بيانات الطلب", "الدفع", "تم"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  i <= ["form", "payment", "done"].indexOf(step)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span className="text-sm font-semibold text-foreground hidden sm:block">{label}</span>
              {i < 2 && <ArrowRight className="h-4 w-4 text-muted-foreground rotate-180" />}
            </div>
          ))}
        </div>

        {step === "form" && (
          <div className="rounded-2xl bg-card p-6 shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-foreground">بيانات الطلب</h2>

            {/* Order summary */}
            <div className="rounded-xl bg-muted p-4 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-bold text-primary">
                    {(item.price * item.quantity).toLocaleString()} ريال
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold text-foreground">
                <span>الإجمالي</span>
                <span className="text-primary">{total.toLocaleString()} ريال</span>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-foreground">الاسم الكامل</label>
              <input
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-foreground">رقم الجوال</label>
              <input
                type="tel"
                required
                maxLength={20}
                placeholder="مثال: 773186426"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              onClick={handleSubmitOrder}
              disabled={submitting}
              className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50"
            >
              {submitting ? "جاري الإرسال..." : "متابعة للدفع"}
            </button>
          </div>
        )}

        {step === "payment" && (
          <div className="rounded-2xl bg-card p-6 shadow-lg space-y-6 text-center">
            <Wallet className="mx-auto h-16 w-16 text-primary" />
            <h2 className="text-xl font-bold text-foreground">الدفع عبر محفظة جيب</h2>
            <p className="text-muted-foreground">
              قم بتحويل المبلغ إلى رقم محفظة جيب التالي ثم اضغط "تأكيد الدفع"
            </p>

            <div className="rounded-xl bg-muted p-6 space-y-3">
              <p className="text-sm text-muted-foreground">رقم المحفظة</p>
              <p className="text-3xl font-black text-primary tracking-wider">{JAIB_NUMBER}</p>
              <p className="text-sm text-muted-foreground">باسم: مستودع الريمي</p>
            </div>

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <p className="text-sm text-foreground">المبلغ المطلوب تحويله</p>
              <p className="text-2xl font-black text-primary">{total.toLocaleString()} ريال</p>
            </div>

            <div className="text-sm text-muted-foreground bg-muted rounded-lg p-3">
              <p className="font-bold text-foreground mb-1">خطوات الدفع:</p>
              <ol className="space-y-1 text-right list-decimal list-inside">
                <li>افتح تطبيق محفظة جيب</li>
                <li>اختر تحويل أموال</li>
                <li>أدخل الرقم: {JAIB_NUMBER}</li>
                <li>أدخل المبلغ: {total.toLocaleString()} ريال</li>
                <li>أكد التحويل واضغط الزر أدناه</li>
              </ol>
            </div>

            <button
              onClick={handleConfirmPayment}
              className="w-full rounded-xl bg-whatsapp py-3 font-bold text-whatsapp-foreground transition-transform hover:scale-[1.02]"
            >
              ✅ تأكيد الدفع وإرسال الطلب عبر واتساب
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="rounded-2xl bg-card p-8 shadow-lg text-center space-y-4">
            <CheckCircle className="mx-auto h-20 w-20 text-whatsapp" />
            <h2 className="text-2xl font-bold text-foreground">تم إرسال طلبك بنجاح!</h2>
            <p className="text-muted-foreground">
              سيتم مراجعة طلبك والتواصل معك قريباً عبر واتساب
            </p>
            <p className="text-sm text-muted-foreground">
              رقم الطلب: <span className="font-bold text-primary">{orderId.slice(0, 8)}</span>
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground"
            >
              العودة للرئيسية
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
