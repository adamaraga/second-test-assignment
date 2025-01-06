import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from "../context/MainContext";

const AuthLayout = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
