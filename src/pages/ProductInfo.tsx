import { useState, useEffect } from "react" 
import { ProductInterface } from "../types/ProductInterface" // Importera interface för produkter 
import { Link } from "react-router-dom" // Importera link för navigering mellan sidor 
import { useParams } from "react-router-dom" // Importera useparams för parametrar i url:en 

const ProductInfo = () => {

  // Hämta id från urlen 
  const { id } = useParams<{ id: string }>();

  // States 
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect för hämtning av produkt 
  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

  // Hämta produkt baserat på id 
  const getProduct = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`http://localhost:5000/products/${productId}`); // Hämta produkt med id 

      // om inte ok 
      if (!res.ok) {
        throw new Error("Kunde inte hämta produkten");
      }

      const data = await res.json();
      setProduct(data);

      // Fånga fel 
    } catch (error) {
      console.log(error);
      setError("Något gick fel vid hämtning av produkt");
    } finally {
      setLoading(false);
    }
  }

  return (

    <div>
      <h1>Produktdetaljer</h1>

      <div>

        {/* I väntan på api */}
        {loading && (
          <div className="waiting">
            <p><em>Hämtar produkter..</em></p>
          </div>
        )}

        {/* Felmeddelande */}
        {error && <p className="error-msg">{error}</p>}

        {/* Container med varje produkt */}
        {product && (
          <div className="product-container">
            <h3>Tillverkare: {product.factory}</h3>
            <h4>Modell: {product.model}</h4>
            <p>Längd: {product.skilength} cm</p>
            <p>Antal: {product.quantity} st kvar</p>
            <p>Pris: {product.price} kr</p>

            <Link to="/">Tillbaka</Link>
          </div>
        )}

      </div>
    </div>

  )
}

export default ProductInfo