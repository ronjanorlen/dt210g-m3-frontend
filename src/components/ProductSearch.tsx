import { useState, useEffect } from "react"
import { ProductInterface } from "../types/ProductInterface"


// Interface med props 
interface ProductSearchProps {
    products: ProductInterface[]; // Lista med produkter 
    onSearchResults: (filtered: ProductInterface[]) => void; // Filtrerade produkter
    resetProduct: boolean; // Återställ produkt-sökning 
}

const ProductSearch: React.FC<ProductSearchProps> = ({ products, onSearchResults, resetProduct }) => {
    // States 
    const [search, setSearch] = useState("");
  //  const [reset, setReset] = useState(false);

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
             {/* Sökformulär */}
             <form className="search-form">
                <label htmlFor="search"></label>
                <input type="text" placeholder="Sök skidor" value={search} onChange={(e) => setSearch(e.target.value)} />
            </form>
        </div>
    )
}

export default ProductSearch