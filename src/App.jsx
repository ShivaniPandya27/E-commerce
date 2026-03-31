import { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

// ----- Product Data -----
const productsData = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Headphones", price: 100 },
];

// ----- Context Setup (optional but recommended) -----
const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const decrementQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0) // remove if qty becomes 0
    );
  };



  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decrementQty, totalPrice }}
    >

      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useContext(CartContext);

// ----- Product List Component -----
function ProductList() {
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      <h2>Products</h2>

      <Link to="/cart">Go to Cart</Link>

      {productsData.map((product) => (
        <div key={product.id} style={styles.row}>
          <span>
            {product.name} - ${product.price}
          </span>
          <button
            style={styles.addBtn}
            onClick={() => addToCart(product)}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
}

// ----- Cart Component -----
function Cart() {
  const { cart, addToCart, decrementQty, totalPrice } = useCart();

  return (
    <div style={styles.card}>
      <h2>Cart</h2>

      <Link to="/">← Back to Products</Link>

      {cart.length === 0 ? (
        <p style={{ color: "#777" }}>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={styles.row}>
              <span>{item.name}</span>

              <div style={styles.controls}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => decrementQty(item.id)}
                >
                  −
                </button>

                <span style={{ margin: "0 10px" }}>{item.qty}</span>

                <button
                  style={styles.qtyBtn}
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>

              <span style={{ fontWeight: "bold" }}>
                ${item.price * item.qty}
              </span>
            </div>
          ))}
          <h3>Total: ${totalPrice}</h3>
        </>
      )}
    </div>
  );
}

// ----- Styles -----
const styles = {
  card: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "250px",
    background: "#fff",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  addBtn: {
    padding: "5px 10px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },
  qtyBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "5px",
    border: "none",
    background: "#ddd",
    cursor: "pointer",
    fontSize: "16px",
  },
};
// ----- Main App -----
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}