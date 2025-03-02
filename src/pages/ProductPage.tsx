import { useEffect, useState } from "react";
import { ProductInterface } from "../types/ProductInterface";
import ProductForm from "../components/ProductForm"; // Importera formulär 
import ProductTable from "../components/ProductTable"; // Importera tabell
import ProductSearch from "../components/ProductSearch"; // Importera sökruta 

const ProductPage = () => {

  // States 
  const [products, setProducts] = useState<ProductInterface[] | []>([]); // Alla produkter 
  const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null); // För vald produkt, null vid start
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>([]);
  const [resetProduct, setResetProduct] = useState(false);
  const [error, setError] = useState(""); // Ev felmeddelanden 


  // useEffect för att hämta produkter 
  useEffect(() => {
    getProducts();
  }, []);

  // Hämta alla produkter 
  const getProducts = async () => {
    try {
      const res = await fetch("https://dt210g-m3-backend.onrender.com/products");

      // Om ej ok 
      if (!res.ok) {
        throw new Error("Något gick fel vid hämtning av produkter");
      } else {
        // Om ok, hämta in produkter 
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      }

      // Fånga fel 
    } catch (error) {
      console.log(error);
      setError("Något gick fel vid hämtning av produkter")
    }
  };


  // Välj produkt att uppdatera 
  const handleUpdate = (product: ProductInterface) => {
    setSelectedProduct(product);
  };

  // Rensa produkt 
  const clearProduct = () => {
    setSelectedProduct(null);
    setResetProduct(true);
    setTimeout(() => setResetProduct(false), 0);
    getProducts();
  };

  return (
    <div>
      <h1>Lagerhantering</h1>


      {/* Felmeddelande */}
      {error && <p className="error-msg">{error}</p>}

      <div>
        {/* Visa rubrik baserat på om produkt läggs till/uppdateras */}
        <h2>{selectedProduct ? `Redigerar: ${selectedProduct.model}` : "Lägg till skidor"}</h2>

        {/* Formulär */}
        <ProductForm selectedProduct={selectedProduct} updateList={getProducts} clearProduct={clearProduct} />

        {/* Sökruta och rensa-knapp */}
        <ProductSearch products={products} onSearchResults={setFilteredProducts} resetProduct={resetProduct} />
        <button className="clearBtn" onClick={clearProduct}>Rensa sökning <i className="fa-solid fa-xmark"></i></button>

        {/* Tabell med alla produkter */}
        <h2>Alla skidor</h2>
        <ProductTable products={filteredProducts} updateProduct={handleUpdate} updateList={getProducts} />

      </div>
    </div>
  )
}

export default ProductPage