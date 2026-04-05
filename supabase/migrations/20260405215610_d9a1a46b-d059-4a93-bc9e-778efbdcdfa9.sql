-- Products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  image_url TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'jaib',
  status TEXT NOT NULL DEFAULT 'pending',
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view orders"
  ON public.orders FOR SELECT
  TO anon, authenticated
  USING (true);

-- Order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price NUMERIC(10,2) NOT NULL
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create order items"
  ON public.order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON public.order_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin role setup
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admin policies for products
CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for orders
CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete orders"
  ON public.orders FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed products
INSERT INTO public.products (name, description, price, category) VALUES
  ('فلتر زيت تويوتا', 'فلتر زيت أصلي لجميع موديلات تويوتا', 3500, 'قطع تويوتا'),
  ('فلتر هواء تويوتا', 'فلتر هواء أصلي', 2500, 'قطع تويوتا'),
  ('طقم فرامل أمامي تويوتا', 'بريكات أمامية أصلية', 8000, 'قطع تويوتا'),
  ('رديتر تويوتا هايلكس', 'رديتر ماء أصلي', 25000, 'قطع تويوتا'),
  ('دينمو تويوتا', 'دينمو شحن أصلي', 35000, 'قطع تويوتا'),
  ('فلتر زيت هيونداي', 'فلتر زيت أصلي لموديلات هيونداي', 3000, 'قطع هيونداي'),
  ('طقم فرامل هيونداي', 'بريكات أمامية أصلية هيونداي', 7500, 'قطع هيونداي'),
  ('سلف هيونداي أكسنت', 'سلف أصلي', 20000, 'قطع هيونداي'),
  ('مقصات أمامية', 'مقصات أمامية عالية الجودة', 12000, 'قطع ميكانيكية'),
  ('عكوس مقود', 'عكوس مقود - متوفر لعدة موديلات', 15000, 'قطع ميكانيكية'),
  ('طقم فرامل عام', 'بريكات فرامل بديلة عالية الجودة', 5000, 'قطع ميكانيكية'),
  ('سنسور أكسجين', 'سنسور أكسجين لجميع الأنواع', 8000, 'قطع كهربائية'),
  ('طقم إضاءة LED', 'لمبات LED أمامية', 6000, 'قطع كهربائية'),
  ('دينمو سلف عام', 'دينمو سلف بديل', 18000, 'قطع كهربائية'),
  ('زيت محرك 5W-30', 'زيت محرك صناعي 4 لتر', 7000, 'زيوت وسوائل'),
  ('سائل فرامل', 'سائل فرامل DOT4', 2000, 'زيوت وسوائل'),
  ('ماء رديتر', 'سائل تبريد مركز', 3000, 'زيوت وسوائل'),
  ('مساحات زجاج', 'مساحات أمامية عالية الجودة', 3500, 'ملحقات وكماليات'),
  ('مرايا جانبية', 'مرايا جانبية بديلة', 5000, 'ملحقات وكماليات'),
  ('فرشات مقاعد', 'طقم فرشات كامل', 15000, 'ملحقات وكماليات');