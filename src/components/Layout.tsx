import Header from "./Header" // Importera header-komponent
import { Outlet } from "react-router-dom"
import "../components/Layout.css"; 

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout