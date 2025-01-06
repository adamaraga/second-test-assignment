import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

const MainLayout = () => {
  return (
    <div style={{ marginTop: 110 }}>
      <TopBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
