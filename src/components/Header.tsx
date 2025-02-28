import { NavLink } from "react-router-dom" // Importera navlink för navigering
import { useAuth } from "../context/AuthContext" // Importera context
import "../components/Header.css";

const Header = () => {

  const { user, logout } = useAuth();

  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to="/">Skidfabriken</NavLink></li>
          <li>
            {
              user && <NavLink to="/products">Lager</NavLink>
            }
          </li>
          <li>
            {
              !user ? <NavLink to="/login">Logga in <i className="fa-solid fa-lock"></i></NavLink> : <button onClick={logout}><i className="fa-solid fa-arrow-left"></i> Logga ut</button>
            }
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header