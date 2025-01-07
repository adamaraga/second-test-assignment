import { useContext, useState } from "react";
import { ErrorMessage, Input } from "../components/styled-component/formInput";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/main";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Context } from "../context/MainContext";
import { userLoginSuccess } from "../context/Action";

interface InputErrorType {
  username?: string;
  password?: string;
}

const Login = () => {
  const { dispatch } = useContext(Context);
  const [inputError, setInputError] = useState<InputErrorType>({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    let usernameError = "";
    let passwordError = "";

    if (!username) {
      usernameError = "username is required";
    }
    if (password.length < 5) {
      passwordError = "password is required, minimum 5 characters";
    }

    if (passwordError || usernameError) {
      setInputError((curr) => {
        return {
          ...curr,
          password: passwordError,
          username: usernameError,
        };
      });
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkValidate = validate();

    if (checkValidate) {
      setInputError({});
      setLoading(true);

      try {
        const data = {
          username,
          password,
        };

        const res = await login(data);

        setLoading(false);
        toast.success("Login successfully");
        dispatch(userLoginSuccess(res.data));
        navigate("/");
      } catch (err: any) {
        setLoading(false);
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        toast.error(message);
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (inputError?.username) {
      setInputError((curr) => {
        return {
          ...curr,
          username: "",
        };
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (inputError?.password) {
      setInputError((curr) => {
        return {
          ...curr,
          password: "",
        };
      });
    }
  };

  return (
    <div className="signup">
      <div className="signup__main">
        <h2>Login</h2>

        <form className="signup__main__form" onSubmit={handleSignup}>
          <div className="signup__main__form__inputCon">
            <label htmlFor="username"> Username</label>
            <Input
              id="username"
              type="text"
              error={inputError.username ? true : false}
              onChange={handleUsernameChange}
            />
            <ErrorMessage>{inputError?.username}</ErrorMessage>
          </div>
          <div className="signup__main__form__inputCon">
            <label htmlFor="password"> Password</label>
            <Input
              id="password"
              type="password"
              error={inputError.password ? true : false}
              onChange={handlePasswordChange}
            />
            <ErrorMessage>{inputError?.password}</ErrorMessage>
          </div>

          <Button> {loading ? <Loading button={true} /> : "Login"}</Button>
        </form>
        <p className="signup__main__dont">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
