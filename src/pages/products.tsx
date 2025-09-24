import { useQuery } from '@tanstack/react-query';
import { fetchProducts, productsQueryKey, type Product } from '../apis/api';
import ProductCard from '../features/products/product-card';

export default function ProductsPage() {
  const { data, isLoading, isError, error, refetch } = useQuery<Product[]>({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
    staleTime: 30_000,
  });

  if (isLoading) return <div>Loading products…</div>;
  if (isError)
    return (
      <div>
        Failed to load products: {(error as Error).message}
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );

  console.log('ProductsPage --- Render');

  return (
    <div>
      <div></div>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {data!.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ul>
    </div>
  );
}
