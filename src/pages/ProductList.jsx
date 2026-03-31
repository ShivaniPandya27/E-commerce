import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";

const productsData = [
    { id: 1, name: "Laptop", price: 800 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Headphones", price: 100 },
];

export default function ProductList() {
    return (
        <div>
            <h2>Products</h2>
            <Link to="/cart">Go to Cart</Link>

            {productsData.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
}
