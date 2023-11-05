import { Outlet } from "react-router-dom";
import Header from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";
import "./root.css";

export const Root = () => {
        return (
                <>
                        <Header />
                        <Sidebar />
                        <div className="body">
                                <Outlet/>
                        </div>
                        <Footer /> 
                </>
          );
};