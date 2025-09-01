export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const BASE = 'https://fakestoreapi.com';

export const productsQueryKey = ['products'] as const;
export const productQueryKey = (id: string | number) => ['product', String(id)] as const;

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProduct(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}
