import { useState, useEffect } from "react"
import { ProductInterface } from "../types/ProductInterface"
import { useNavigate } from "react-router-dom";
import ProductSearch from "../components/ProductSearch"; // Importera sök-komponent
import "./css/HomePage.css";
import banner from "../assets/banner.jpg";

const HomePage = () => {

    // States 
    const [products, setProducts] = useState<ProductInterface[] | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>([]);
    const [resetProduct, setResetProduct] = useState(false);

    // Gå till specifik produkt
    const navigate = useNavigate();

    // useEffect för hämtning av produkter 
    useEffect(() => {
        getProducts();
    }, []);

    // Hämta alla produkter 
    const getProducts = async () => {
        try {
            setLoading(true);

            const res = await fetch("https://dt210g-m3-backend.onrender.com/products");

            // Vid fel 
            if (!res.ok) {
                throw new Error("Något gick fel vid hämtning av produkter");
            } else {
                const data = await res.json();
                setProducts(data);
                setFilteredProducts(data);
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

    // Återställ produkt-söknig 
    const resetProductSearch = () => {
        setResetProduct(true);
        setTimeout(() => setResetProduct(false), 0);
    };

    return (
        <div>
            <h1>Våra produkter</h1>
            <p>Vi erbjuder en rad olika skidor från flera olika tillverkare. Vare sig du är ny i skidbacken eller gedigen skidåkare har vi något för dig!<br />
            Du kan också använda sökrutan här nedan för att söka efter en specifik skida. </p>


             {/* Banner-bild */}
      <div style={{ width: "100%" }}>
        <img
          src={banner}
          alt="Närbild på skidåkare som åker skidor i massa pudersnö"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            maxHeight: "500px",
            objectFit: "cover"
          }}
        />
      </div>

            {/* Sökruta och rensa-knapp */}

            <ProductSearch products={products} onSearchResults={setFilteredProducts} resetProduct={resetProduct} />
            <button className="clearBtn" onClick={resetProductSearch}>Rensa sökning <i className="fa-solid fa-xmark"></i></button>

            {/* Felmeddelande */}
            {error && <p className="error-msg">{error}</p>}

             {/* I väntan på api */}
             {loading && (
                <div className="waiting">
                    <p><em>Skidorna hämtas..</em></p>
                </div>
            )}

            {/* Container för varje produkt */}
            <div className="product-container">
                {
                    filteredProducts.map((product) => (
                        <section className="product" key={product._id}>
                            <h3>{product.model}</h3>
                            <p>Längd: {product.skilength}</p>
                            <p>Pris: {product.price}</p>
                            <button className="moreInfo-btn" onClick={() => navigate(`/products/${product._id}`)}><i className="fa-solid fa-angles-right"></i> Läs mer</button>
                        </section>
                    ))
                }
            </div>

        </div>
    )
}

export default HomePage