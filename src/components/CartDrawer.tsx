import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { items, count, total, updateQuantity, removeItem } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Floating cart button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
      >
        <ShoppingCart className="h-6 w-6" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
            {count}
          </span>
        )}
      </button>

      {/* Drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <div className="relative mr-auto flex w-full max-w-md flex-col bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-bold text-foreground">سلة المشتريات</h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-muted-foreground">
                السلة فارغة
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-lg border p-3">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">{item.name}</p>
                        <p className="text-xs text-primary font-bold">{item.price.toLocaleString()} ريال</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t p-4 space-y-3">
                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>الإجمالي</span>
                    <span className="text-primary">{total.toLocaleString()} ريال</span>
                  </div>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/checkout");
                    }}
                    className="w-full rounded-xl bg-primary py-3 text-center font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    إتمام الطلب
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;
