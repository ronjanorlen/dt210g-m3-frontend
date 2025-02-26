import { useState, useEffect } from "react";
import { ProductInterface } from "../types/ProductInterface"; // Importera interface för produkter 
import { ErrorInterface } from "../types/ErrorInterface"; // Importera interface for fel 
import * as Yup from "yup"; // Importera yup för validering 

// Interface med props för vald produkt 
interface ProductFormProps {
    selectedProduct: ProductInterface | null; // Om ingen produkt är vald är det null
    updateList: () => void; // För att uppdatera produkt-lista (funktion)
    clearProduct: () => void; // Rensa vald produkt vid klar med hantering (funktion)
}


const ProductForm = ({ selectedProduct, updateList, clearProduct }: ProductFormProps) => {

    // States 
    const [errors, setErrors] = useState<ErrorInterface>({}); // Felmeddelanden 
    const [product, setProduct] = useState<ProductInterface>({ // Objekt med data för produkten 
        factory: "",
        model: "",
        skilength: 0,
        price: 0,
        quantity: 0
    });

    // useEffect för att hämta data från vald produkt 
    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        }
    }, [selectedProduct]);

    // Schema för validering med Yup 
    const validationSchema = Yup.object({
        factory: Yup.string().trim().required().min(2, "Tillverkare måste anges med minst 2 tecken"),
        model: Yup.string().required("Ange skidmodell").max(200, "Max 200 tecken"),
        skilength: Yup.number().required("Skidlängd är obligatoriskt").min(100, "Längd måste vara minst 100cm").max(999, "Längd kan vara max 999cm"),
        price: Yup.number().required("Ange priset för skidan").min(1, "Priset måste vara minst 1kr"),
        quantity: Yup.number().required("Ange antal i lager").min(0, "Minsta antal är 0")
    });

    // Hantera uppdatering av staten för produkten 
    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value // Uppdatera baserat på fält 
        });
    };

    // Submit av formuläret 
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault(); // Förhindra sidomladdning 

        try {
            // Använd valideringsschema
            await validationSchema.validate(product, { abortEarly: false });
            setErrors({}); // Tomt objekt om ok 

            // Sätt url och metod(anrop) baserat på om det är uppdatering av befintlig eller tillägg av produkt 
            const url = selectedProduct ? `http://localhost:5000/products/${selectedProduct._id}` : "http://localhost:5000/products";
            const method = selectedProduct ? "PUT" : "POST";

            // Ta bort id och v om det är tillägg av produkt för att undvika konflikter med backend 
            const productData = selectedProduct ? { ...product, _id: undefined, __v: undefined } : product;

            // Anropa metod baserat på vad som ska göras 
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData),
                credentials: "include"
            });

            // Vid fel 
            if (!res.ok) {
                throw new Error("Något blev fel vid tillägg av ny produkt");
            }

            // Uppdatera listan och nollställ produkt samt rensa formuläret 
            updateList();
            clearProduct();
            setProduct({
                factory: "",
                model: "",
                skilength: 0,
                price: 0,
                quantity: 0
            });

            // Fånga fel 
        } catch (error) {
            const validationErrors: ErrorInterface = {}; // Tomt objekt för felmeddelanden 

            // Kontrollera om det är valideringsfel från yup
            if (error instanceof Yup.ValidationError) {
                // Loopa igenom fel och ta ut dessa 
                error.inner.forEach((error) => {
                    const prop = error.path as keyof ErrorInterface;
                    validationErrors[prop] = error.message; // Sätt felmeddelanden 
                });

                setErrors(validationErrors); // Uppdatera staten med felmeddelanden 
            }

        }
    };

    // Abryt uppdatering av produkt 
    const cancelUpdate = () => {
        clearProduct();
        setProduct({
            factory: "",
            model: "",
            skilength: 0,
            price: 0,
            quantity: 0
        });
    };


    return (
        <form id="product-form" className="productForm" onSubmit={submitForm}>
            <label htmlFor="factory">Tillverkare:</label>
            <input
                type="text"
                id="factory"
                name="factory"
                value={product.factory}
                onChange={handleUpdate}
            />
            {errors.factory && <p className="error">{errors.factory}</p>}

            <label htmlFor="model">Skidmodell:</label>
            <input
                type="text"
                id="model"
                name="model"
                value={product.model}
                onChange={handleUpdate}
            />
            {errors.model && <p className="error">{errors.model}</p>}

            <label htmlFor="skilength">Skidlängd (cm):</label>
            <input
                type="number"
                id="skilength"
                name="skilength"
                value={product.skilength}
                onChange={handleUpdate}
            />
            {errors.skilength && <p className="error">{errors.skilength}</p>}

            <label htmlFor="price">Pris (kr):</label>
            <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleUpdate}
            />
            {errors.price && <p className="error">{errors.price}</p>}

            <label htmlFor="quantity">Antal i lager:</label>
            <input
                type="number"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleUpdate}
            />
            {errors.quantity && <p className="error">{errors.quantity}</p>}

            {/* Ändra text i knapp om produkt är vald för uppdatering */}
            <button type="submit">
                {selectedProduct ? "Spara" : "Lägg till produkt"}
            </button>

            {/* Knapp för att avbryta uppdatering */}
            {selectedProduct && (
                <button type="button" onClick={cancelUpdate}>Avbryt</button>
            )}
        </form>
    )
}

export default ProductForm

