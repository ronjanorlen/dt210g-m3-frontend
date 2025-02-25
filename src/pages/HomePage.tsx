import { useState, useEffect } from "react"
import { ProductInterface } from "../types/ProductInterface"

const HomePage = () => {

    // States 
    const [products, setProducts] = useState<ProductInterface[] | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>([]);

    // useEffect för hämtning av produkter 
    useEffect(() => {
        getProducts();
    }, []);

    // Hämta alla produkter 
    const getProducts = async () => {
        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/products");

            // Vid fel 
            if (!res.ok) {
                throw new Error("Något gick fel vid hämtning av produkter");
            } else {
                const data = await res.json();

                setProducts(data);
                setError(null);
            }
            // Fånga fel 
        } catch (error) {
            console.log(error);
            setError("Något gick fel vid hämtning av produkter");
        } finally {
            setLoading(false);
        }
    };

    // Filtrera produkter med useEffect 
    useEffect(() => {
        const filtered = products.filter(product =>
            product.model.toLowerCase().includes(search.toLowerCase()) // Filtrera utifrån skidmodell 
        );
        setFilteredProducts(filtered);
    }, [search, products]);

    return (
        <div>
            <h1>Startsida - våra produkter</h1>

            {/* I väntan på api */}
            {loading && (
                <div className="waiting">
                    <p><em>Hämtar produkter..</em></p>
                </div>
            )}

            {/* Sökformulär */}
            <form className="search-form">
                <label htmlFor="search"></label>
                <input type="text" placeholder="Sök skidmodell" value={search} onChange={(e) => setSearch(e.target.value)} />
            </form>

            {/* Felmeddelande */}
            {error && <p className="error-msg">{error}</p>}

            <div className="product-container">
                {
                    filteredProducts.map((product) => (
                        <section className="product" key={product._id}>
                            <h3>{product.factory}</h3>
                            <h4>{product.model}</h4>
                            <p>{product.price}</p>
                            <p>{product.skilength}</p>
                        </section>
                    ))
                }
            </div>

        </div>
    )
}

export default HomePage