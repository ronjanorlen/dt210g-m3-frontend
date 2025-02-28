import { useState, useEffect } from "react"
import { ProductInterface } from "../types/ProductInterface" // Importera interface för produkter 
import { Link } from "react-router-dom" // Importera link för navigering mellan sidor 
import { useParams } from "react-router-dom" // Importera useparams för parametrar i url:en 
import "./css/ProductInfo.css";

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

      const res = await fetch(`https://dt210g-m3-backend.onrender.com/products/${productId}`); // Hämta produkt med id 

      // om inte ok 
      if (!res.ok) {
        throw new Error("Kunde inte hämta produkten");
      }

      // om ok, hämta produkt 
      const data = await res.json();
      setProduct(data);

      // Fånga fel 
    } catch (error) {
      console.log(error);
      setError("Något gick fel vid hämtning av produkt");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div>
      <h1>Produktdetaljer</h1>

      <div>

        {/* I väntan på api */}
        {loading && (
          <div className="waiting">
            <p><em>Hämtar skida..</em></p>
          </div>
        )}

        {/* Felmeddelande */}
        {error && <p className="error-msg">{error}</p>}

        {/* Container med produkt */}
        {product && (
          <div className="singleProduct">
            <h3>Tillverkare: {product.factory}</h3>
            <h4>Modell: {product.model}</h4>
            <p>Längd: {product.skilength} cm</p>
            <p>Pris: {product.price} kr</p>
            <p style={{
              color: product.quantity === 0 ? "red" : product.quantity < 5 ? "orange" : "green"
            }}>
              Antal: {product.quantity} st kvar</p>

            <Link to="/"><i className="fa-solid fa-arrow-left"></i> Tillbaka</Link>
          </div>
        )}

      </div>
    </div>

  )
}

export default ProductInfo