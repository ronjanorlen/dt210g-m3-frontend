import { useState } from "react";
import { ProductInterface } from "../types/ProductInterface"; // Importera interface for produkter 


// Interface med prop för produkttabell 
interface ProductTableProps {
    products: ProductInterface[]; // Produkter i array 
    updateProduct: (product: ProductInterface) => void; // Uppdatera produkt-funktion
    updateList: () => void; // Uppdatera produkt-lista efter ändring-funktion
}



// Definiera komponent, ta emot produkter i lista samt metoder som props 
const ProductTable = ({ products, updateProduct, updateList }: ProductTableProps) => {

    const [error, setError] = useState(""); // Felmeddelanden 
    

    // Radera produkt 
    const deleteProduct = async (id: string) => {

        // Bekräfta borttagning, annars avbryt
        const confirmDelete = window.confirm("Vill du ta bort denna produkt?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            // Vid fel 
            if (!res.ok) {
                throw new Error("Något gick fel vid borttagning av produkt");
            }

            // Om ok, uppdatera produkt-lista 
            updateList();

            // Fånga fel 
        } catch (error) {
            console.error(error);
            setError("Borttagning misslyckades")

        }
    };
    

    // Uppdatera en produkt 
    const handleUpdate = (product: ProductInterface) => {
        updateProduct(product);
    };


    return (
        <>
            {/* Felmeddelande */}
            {error && <p className="error-msg">{error}</p>}


            <table className="productTable">
                <thead>
                    <tr>
                        <th>Tillverkare</th>
                        <th>Skidmodell</th>
                        <th>Skidlängd</th>
                        <th>Pris</th>
                        <th>Antal</th>
                    </tr>
                </thead>

                {/* Loopa igenom produkter */}
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.factory}</td>
                            <td>{product.model}</td>
                            <td>{product.skilength}</td>
                            <td>{product.price} kr</td>
                            <td>{product.quantity} st</td>
                            <td>
                                <button className="updateBtn" onClick={() => handleUpdate(product)}>Redigera</button>
                                <button className="deleteBtn" onClick={() => deleteProduct(product._id!)}>Radera</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default ProductTable

