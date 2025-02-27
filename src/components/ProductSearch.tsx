import { useState, useEffect } from "react"
import { ProductInterface } from "../types/ProductInterface"
import "../components/ProductSearch.css";


// Interface med props 
interface ProductSearchProps {
  products: ProductInterface[]; // Lista med produkter 
  onSearchResults: (filtered: ProductInterface[]) => void; // Filtrerade produkter
  resetProduct: boolean; // Återställ produkt-sökning 
}

const ProductSearch: React.FC<ProductSearchProps> = ({ products, onSearchResults, resetProduct }) => {
  // States 
  const [search, setSearch] = useState("");

  // useEffect för filtrering av produkter 
  useEffect(() => {
    if (resetProduct) {
      setSearch(""); // Rensa sökrutan 
      onSearchResults(products); // Återställ
    } else {
      const filtered = products.filter(product =>
        product.model.toLowerCase().includes(search.toLowerCase())
      );
      onSearchResults(filtered);
    }
  }, [search, products, onSearchResults, resetProduct]);



  return (
    <div>
      <h2>Sök skidor</h2>
      {/* Sökformulär */}
      <form className="search-form">
        <label htmlFor="search"></label>
        <input type="text" id="search" placeholder="Ange skidmodell" value={search} onChange={(e) => setSearch(e.target.value)} />
      </form>
    </div>
  )
}

export default ProductSearch