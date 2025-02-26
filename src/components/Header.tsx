import { NavLink } from "react-router-dom" // Importera navlink för navigering
import { useAuth } from "../context/AuthContext" // Importera context

const Header = () => {

  const {user, logout} = useAuth();

  return (
   <header>
    <ul>
        <li><NavLink to="/">Startsida</NavLink></li>
        <li>
          {
            user && <NavLink to="/products">Lager</NavLink>
          }
          </li>
        <li>
          {
            !user ? <NavLink to="/login">Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
          }
          </li>
    </ul>
   </header>
  )
}

export default Header