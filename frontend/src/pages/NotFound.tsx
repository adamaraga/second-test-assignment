import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="notFound">
      <h1>404</h1>
      <h2>Oops! You're Lost</h2>
      <p style={{ marginBottom: 20 }}>
        The page you are looking for was not found
      </p>

      <Link to="/">
        <Button>Back To Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
