const Button = ({ onClick, children }) => {
  return (
    <button className="btn-main" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
