import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
    const { addToCart, decrementQty } = useCart();

    return (
        <div style={styles.row}>
            <span>{item.name}</span>

            <div style={styles.controls}>
                <button onClick={() => decrementQty(item.id)}>−</button>
                <span style={{ margin: "0 10px" }}>{item.qty}</span>
                <button onClick={() => addToCart(item)}>+</button>
            </div>

            <span>${item.price * item.qty}</span>
        </div>
    );
}

const styles = {
    row: { display: "flex", justifyContent: "space-between", marginBottom: "10px" },
    controls: { display: "flex", alignItems: "center" }
};