import styles from "./CautionCard.module.css";
/* eslint-disable react/prop-types */
function CautionCard({ children, type }) {
  return (
    <div className={`${styles.container} ${styles[type]}`}>{children}</div>
  );
}

export default CautionCard;
/* eslint-disable react/prop-types */
