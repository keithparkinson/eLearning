import styles from "./CautionModal.module.css";
/* eslint-disable react/prop-types */
function CautionModal({ children, onHandleCancle, onHandleAdd, type }) {
  return (
    <div className={`${styles.container} ${styles[type]}`}>
      <p style={{ marginBottom: "1rem" }}>{children}</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          className={styles.button}
          type="button"
          onClick={() => onHandleCancle(false)}
        >
          No
        </button>
        <button className={styles.button} onClick={() => onHandleAdd()}>
          Yes
        </button>
      </div>
    </div>
  );
} /* eslint-disable react/prop-types */
export default CautionModal;
