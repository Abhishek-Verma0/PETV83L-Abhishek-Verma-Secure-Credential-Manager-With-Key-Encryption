import React from "react";

const Button = ({
  children,
    type = "button",
    onClick,
  variant="primary",
  size = "medium",
  fullwidth = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${
        fullwidth ? "btn-full" : ""
      } ${className}`}
      >
          {children}  {/* this render children inside button can be text passed whatver */ }
    </button>
  );
};

export default Button;
