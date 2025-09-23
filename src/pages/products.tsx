import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { fetchProducts, productsQueryKey, type Product } from '../apis/api';
import { useCartDispatch } from '../context/cart-provider';

export default function ProductsPage() {
  const { data, isLoading, isError, error, refetch } = useQuery<Product[]>({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
    staleTime: 30_000,
  });

  const dispatch = useCartDispatch();

  if (isLoading) return <div>Loading products…</div>;
  if (isError)
    return (
      <div>
        Failed to load products: {(error as Error).message}
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );

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
          <li key={p.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <img
              src={p.image}
              alt={p.title}
              style={{ width: '100%', height: 160, objectFit: 'contain' }}
            />
            <h3 style={{ fontSize: 16, lineHeight: 1.2 }}>{p.title}</h3>
            <p>${p.price}</p>
            <Link to="/products/$id" params={{ id: String(p.id) }} preload="intent">
              View detail →
            </Link>
            <button
              className="w-full border cursor-pointer rounded-2xl bg-blue-500 text-white py-2 mt-2"
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
