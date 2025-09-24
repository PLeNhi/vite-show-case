import React from 'react';
import type { Product } from '../../apis/api';
import { Link } from '@tanstack/react-router';
import { useCartDispatch } from '../../context/cart-provider';

export interface ProductCardProps {
  className?: string;
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { className, product } = props;
  console.log('🚀 ~ ProductCard --- Render: ', product.id);

  const dispatch = useCartDispatch();

  const handleAddToCart = (p: Product) => {
    console.log('🚀 ~ handleAddToCart ~ handleAddToCart: --- RENDER');
    dispatch({ type: 'ADD_ITEM', payload: p });
  };

  return (
    <div className={className}>
      <li key={product.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: '100%', height: 160, objectFit: 'contain' }}
        />
        <h3 style={{ fontSize: 16, lineHeight: 1.2 }}>{product.title}</h3>
        <p>${product.price}</p>
        <Link to="/products/$id" params={{ id: String(product.id) }} preload="intent">
          View detail →
        </Link>
        <button
          className="w-full border cursor-pointer rounded-2xl bg-blue-500 text-white py-2 mt-2"
          onClick={() => handleAddToCart(product)}
        >
          Add to cart
        </button>
      </li>
    </div>
  );
};

export default React.memo(ProductCard);
