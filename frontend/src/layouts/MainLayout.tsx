import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

const MainLayout = () => {
  return (
    <div className="mainLayout">
      <TopBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
