import { Link } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { Context } from "../context/MainContext";
import { userLogOut } from "../context/Action";

const TopBar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    sessionStorage.removeItem("lilyUser");
    dispatch(userLogOut());
  };

  return (
    <div className="topBar">
      <h1>Calculation Tree</h1>

      <div className="topBar__left">
        {!user?.id ? (
          <div className="topBar__left__authBtn">
            <Link to="/login">
              <Button alt={true}>Login</Button>
            </Link>

            <Link to="/signup">
              <Button>Signup</Button>
            </Link>
          </div>
        ) : (
          <div className="topBar__left__logout">
            <span>{user?.username}</span>
            <Button alt={true} onClick={handleLogout}>
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
