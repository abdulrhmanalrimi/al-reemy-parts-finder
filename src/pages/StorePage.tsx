import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const categories = [
  "الكل",
  "قطع تويوتا",
  "قطع هيونداي",
  "قطع ميكانيكية",
  "قطع كهربائية",
  "زيوت وسوائل",
  "ملحقات وكماليات",
];

const StorePage = () => {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const { addItem } = useCart();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = products.filter((p: any) => {
    const matchCat = activeCategory === "الكل" || p.category === activeCategory;
    const matchSearch = !search || p.name.includes(search) || p.description?.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <CartDrawer />

      <section className="bg-muted py-10">
        <div className="container">
          <h2 className="mb-6 text-center text-3xl font-black text-foreground">المتجر</h2>

          {/* Search */}
          <div className="mx-auto mb-6 max-w-md relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث عن قطعة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border bg-background py-3 pr-10 pl-4 text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Categories */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {isLoading ? (
            <div className="text-center text-muted-foreground py-20">جاري التحميل...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">لا توجد منتجات</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product: any) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-xl bg-card shadow-md transition-shadow hover:shadow-xl"
                >
                  <div className="relative h-40 overflow-hidden bg-muted flex items-center justify-center">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
                    )}
                    <span className="absolute top-2 left-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 font-bold text-foreground">{product.name}</h3>
                    {product.description && (
                      <p className="mb-3 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-primary">{Number(product.price).toLocaleString()} ريال</span>
                      <button
                        onClick={() =>
                          addItem({
                            id: product.id,
                            name: product.name,
                            price: Number(product.price),
                            image_url: product.image_url,
                          })
                        }
                        className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-transform hover:scale-105"
                      >
                        <Plus className="h-4 w-4" />
                        أضف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StorePage;
