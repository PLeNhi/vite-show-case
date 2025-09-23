import {
  selectCartCount,
  selectCartTotal,
  useCart,
  useCartDispatch,
} from '../context/cart-provider';

export default function CartPage() {
  const { cart } = useCart();
  const dispatch = useCartDispatch();
  const count = selectCartCount(cart);
  const total = selectCartTotal(cart);

  if (cart.length === 0) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>
      <p>
        <strong>Items:</strong> {count} | <strong>Total:</strong> ${total.toFixed(2)}
      </p>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear cart</button>
      <ul style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {cart.map((i) => (
          <li
            key={i.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr auto',
              gap: 12,
              alignItems: 'center',
              border: '1px solid #eee',
              borderRadius: 8,
              padding: 8,
            }}
          >
            <img
              src={i.image}
              alt={i.title}
              style={{ width: 72, height: 72, objectFit: 'contain' }}
            />
            <div>
              <div style={{ fontWeight: 600 }}>{i.title}</div>
              <div>
                ${i.price} × {i.quantity} = ${(i.price * i.quantity).toFixed(2)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: i.id })}>
                -
              </button>
              <button onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: i.id })}>
                +
              </button>
              <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: i.id })}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
