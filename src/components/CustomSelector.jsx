// import { Children } from "react";

/* eslint-disable react/prop-types */
export default function CustomSelector({ children, onHandleSelector }) {
  const selectorStyles = {
    backgroundColor: "#d1e2e4",
    border: "none",
    padding: "0.5rem",
    width: "9rem",
    fontSize: "16px",
    borderBottom: "solid 0.1rem #F1F1F1",
    zIndex: "99",
  };
  return (
    <button
      value={children}
      onClick={(e) => onHandleSelector(e.target.value)}
      style={selectorStyles}
    >
      {children}
    </button>
  );
}
/* eslint-disable react/prop-types */
