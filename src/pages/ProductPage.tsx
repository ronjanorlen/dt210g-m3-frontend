import { useEffect, useState } from "react";
import { ProductInterface } from "../types/ProductInterface";
import ProductForm from "../components/ProductForm"; // Importera formulär 
import ProductTable from "../components/ProductTable"; // Importera tabell

const ProductPage = () => {

  // States 
  const [products, setProducts] = useState<ProductInterface[] | []>([]); // Alla produkter 
  const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null); // För vald produkt, null vid start
  const [error, setError] = useState(""); // Ev felmeddelanden 


  // useEffect för att hämta produkter 
  useEffect(() => {
    getProducts();
  }, []);

  // Hämta alla produkter 
  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");

      // Om ej ok 
      if (!res.ok) {
        throw new Error("Något gick fel vid hämtning av produkter");
      } else {
        // Om ok, hämta in produkter 
        const data = await res.json();
        setProducts(data);
      }

      // Fånga fel 
    } catch (error) {
      console.log(error);
      setError("Något gick fel vid hämtning av produkter")
    }
  }

  // Välj produkt att uppdatera 
  const handleUpdate = (product: ProductInterface) => {
    setSelectedProduct(product);
  }

  // Rensa produkt 
  const clearProduct = () => {
    setSelectedProduct(null);
  }


  return (
    <div>
      <h1>Lagerhantering</h1>


      {/* Felmeddelande */}
      {error && <p className="error-msg">{error}</p>}

      <div>
        {/* Visa rubrik baserat på om produkt läggs till/uppdateras */}
        <h2>{selectedProduct ? `Redigering av: ${selectedProduct.model}` : "Lägg till produkt"}</h2>

        {/* Formulär */}
        <ProductForm selectedProduct={selectedProduct} updateList={getProducts} clearProduct={clearProduct} />

        {/* Tabell med alla produkter */}
        <h2>Alla produkter</h2>
        <ProductTable products={products} updateProduct={handleUpdate} updateList={getProducts} />

      </div>
    </div>
  )
}

export default ProductPage