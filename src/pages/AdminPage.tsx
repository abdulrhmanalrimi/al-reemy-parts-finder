import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2, Package, ClipboardList, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  "قطع تويوتا", "قطع هيونداي", "قطع ميكانيكية",
  "قطع كهربائية", "زيوت وسوائل", "ملحقات وكماليات",
];

const AdminPage = () => {
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Product form
  const [productForm, setProductForm] = useState({
    name: "", description: "", price: "", category: categories[0], image_url: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setLoading(false);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });
    if (error) {
      toast({ title: "خطأ في تسجيل الدخول", description: error.message, variant: "destructive" });
    } else {
      setAuthed(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
  };

  // Products query
  const { data: products = [] } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: authed,
  });

  // Orders query
  const { data: orders = [] } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: authed,
  });

  // Add product
  const addProduct = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("products").insert({
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        category: productForm.category,
        image_url: productForm.image_url || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setProductForm({ name: "", description: "", price: "", category: categories[0], image_url: "" });
      toast({ title: "تمت إضافة المنتج" });
    },
    onError: () => toast({ title: "خطأ في إضافة المنتج", variant: "destructive" }),
  });

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({ title: "تم حذف المنتج" });
    },
  });

  // Update order status
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({ title: "تم تحديث حالة الطلب" });
    },
  });

  if (loading) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">جاري التحميل...</div>;

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-center text-foreground">لوحة التحكم</h2>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            className="w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            className="w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
            required
          />
          <button type="submit" className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground">
            دخول
          </button>
          <button type="button" onClick={() => navigate("/")} className="w-full text-sm text-muted-foreground hover:text-primary">
            العودة للرئيسية
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Admin header */}
      <div className="bg-card shadow-md">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-xl font-bold text-primary">لوحة التحكم – مستودع الريمي</h1>
          <div className="flex gap-2">
            <button onClick={() => navigate("/")} className="rounded-lg border px-3 py-2 text-sm text-foreground hover:bg-muted">
              <Eye className="h-4 w-4 inline ml-1" /> الموقع
            </button>
            <button onClick={handleLogout} className="rounded-lg border px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4 inline ml-1" /> خروج
            </button>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab("products")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-bold transition-colors ${
              tab === "products" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
            }`}
          >
            <Package className="h-4 w-4" /> المنتجات ({products.length})
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-bold transition-colors ${
              tab === "orders" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
            }`}
          >
            <ClipboardList className="h-4 w-4" /> الطلبات ({orders.length})
          </button>
        </div>

        {/* Products tab */}
        {tab === "products" && (
          <div className="space-y-6">
            {/* Add product form */}
            <div className="rounded-2xl bg-card p-6 shadow-md">
              <h3 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
                <Plus className="h-5 w-5" /> إضافة منتج جديد
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="اسم المنتج"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  placeholder="السعر (ريال)"
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  className="rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input
                  placeholder="رابط الصورة (اختياري)"
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  className="rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  placeholder="الوصف"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="col-span-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                onClick={() => addProduct.mutate()}
                disabled={!productForm.name || !productForm.price}
                className="mt-4 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-50"
              >
                إضافة المنتج
              </button>
            </div>

            {/* Products list */}
            <div className="rounded-2xl bg-card shadow-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-right font-bold text-foreground">المنتج</th>
                    <th className="p-3 text-right font-bold text-foreground">الفئة</th>
                    <th className="p-3 text-right font-bold text-foreground">السعر</th>
                    <th className="p-3 text-right font-bold text-foreground">حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p: any) => (
                    <tr key={p.id} className="border-t">
                      <td className="p-3 text-foreground">{p.name}</td>
                      <td className="p-3 text-muted-foreground">{p.category}</td>
                      <td className="p-3 font-bold text-primary">{Number(p.price).toLocaleString()}</td>
                      <td className="p-3">
                        <button onClick={() => deleteProduct.mutate(p.id)} className="text-destructive hover:bg-destructive/10 rounded p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders tab */}
        {tab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="rounded-2xl bg-card p-10 text-center text-muted-foreground shadow-md">
                لا توجد طلبات بعد
              </div>
            ) : (
              orders.map((order: any) => (
                <div key={order.id} className="rounded-2xl bg-card p-5 shadow-md space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-muted-foreground">طلب #{order.id.slice(0, 8)}</span>
                      <p className="font-bold text-foreground">{order.customer_name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-black text-primary">{Number(order.total).toLocaleString()} ريال</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("ar")}
                      </p>
                    </div>
                  </div>

                  {/* Order items */}
                  {order.order_items && (
                    <div className="rounded-lg bg-muted p-3 space-y-1">
                      {order.order_items.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.product_name} × {item.quantity}</span>
                          <span className="font-bold">{(Number(item.price) * item.quantity).toLocaleString()} ريال</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">الحالة:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus.mutate({ id: order.id, status: e.target.value })}
                      className="rounded-lg border bg-background px-3 py-1 text-sm text-foreground"
                    >
                      <option value="pending">قيد الانتظار</option>
                      <option value="confirmed">تم التأكيد</option>
                      <option value="shipped">تم الشحن</option>
                      <option value="delivered">تم التوصيل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
