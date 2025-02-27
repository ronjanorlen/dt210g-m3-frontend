import Header from "./Header" // Importera header-komponent
import Footer from "./Footer"; // Importera footer-komponent
import { Outlet } from "react-router-dom"
import "../components/Layout.css";

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout