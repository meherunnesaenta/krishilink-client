import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <div>
        <Navbar />

          <Outlet />
        <Footer></Footer>
      </div>

    </div>
  );
};

export default MainLayout;