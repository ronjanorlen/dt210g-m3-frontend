import { useAuth } from "../context/AuthContext"

const ProductPage = () => {

  const {user} = useAuth();
  return (
    <div>
        <h1>Produktsida</h1>
        <p>Hej {user ? user.email : ""} </p>
    </div>
  )
}

export default ProductPage