/* eslint-disable react/prop-types */
function ActionButton({ children, onClick }) {
  const buttonstyle = {
    width: "14rem",
    height: "3rem",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ABCED3",
    border: "none",
    borderBottom: "solid 0.1rem #152D30",
    cursor: "pointer",
  };

  return (
    <button style={buttonstyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default ActionButton;
/* eslint-disable react/prop-types */
