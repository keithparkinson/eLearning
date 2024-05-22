/* eslint-disable react/prop-types */
import styles from "./ModalButton.module.css";
function ModalButton({ children, type, onClick }) {
  const cancelButtonStyle = {
    width: "10.3rem",
    padding: "0.5rem 0 0.5rem 0",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
  };

  return (
    <button
      className={styles[type]}
      style={cancelButtonStyle}
      onClick={onClick}
      type={`${type} button`}
    >
      {children}
    </button>
  );
}
export default ModalButton;
/* eslint-disable react/prop-types */
