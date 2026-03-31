import { useCart } from "../context/CartContext";

export default function ProductItem({ product }) {
  const { cart, addToCart, decrementQty } = useCart();

  const item = cart.find((item) => item.id === product.id);
  const qty = item ? item.qty : 0;

  return (
    <div style={styles.row}>
      <span>
        {product.name} - ${product.price}
      </span>

      {qty === 0 ? (
        <button style={styles.addBtn} onClick={() => addToCart(product)}>
          Add
        </button>
      ) : (
        <div style={styles.controls}>
          <button style={styles.qtyBtn} onClick={() => decrementQty(product.id)}>
            −
          </button>
          <span style={{ margin: "0 10px" }}>{qty}</span>
          <button style={styles.qtyBtn} onClick={() => addToCart(product)}>
            +
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  row: { display: "flex", justifyContent: "space-between", marginBottom: "10px" },
  addBtn: { padding: "5px 10px", background: "green", color: "white", border: "none" },
  controls: { display: "flex", alignItems: "center" },
  qtyBtn: { width: "30px" }
};