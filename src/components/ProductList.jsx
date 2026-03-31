import { Link } from "react-router-dom";

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