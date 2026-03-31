import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cart, totalPrice } = useCart();

    return (
        <div>
            <h2>Cart</h2>
            <Link to="/">Back</Link>

            {cart.length === 0 ? (
                <p>No items</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <h3>Total: ${totalPrice}</h3>
                </>
            )}
        </div>
    );
}