import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { fetchProduct, productQueryKey, type Product } from '../apis/api';

export default function ProductDetailPage() {
  const { id } = useParams({ from: '/products/$id' });

  const { data, isLoading, isError, error } = useQuery<Product>({
    queryKey: productQueryKey(id),
    queryFn: () => fetchProduct(id),
    staleTime: 30_000,
  });

  if (isLoading) return <div>Loading…</div>;
  if (isError) return <div>Failed to load: {(error as Error).message}</div>;

  return (
    <article style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
      <img
        src={data!.image}
        alt={data!.title}
        style={{ width: 280, height: 280, objectFit: 'contain' }}
      />
      <div>
        <h1 style={{ marginTop: 0 }}>{data!.title}</h1>
        <p>
          <strong>Category:</strong> {data!.category}
        </p>
        <p>
          <strong>Price:</strong> ${data!.price}
        </p>
        <p style={{ marginTop: 16 }}>{data!.description}</p>
      </div>
      <button onClick={() => alert('Đã mua thành công, chờ ship đi cu')}> Mua </button>
    </article>
  );
}
