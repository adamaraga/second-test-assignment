interface ButtonType {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  alt?: boolean;
}

const Button = ({ onClick, children, alt }: ButtonType) => {
  return (
    <button className={alt ? "btn-main alt" : "btn-main"} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
