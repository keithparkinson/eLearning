import styles from "../components/SmallCertificate.module.css";
import downloadSign from "../assets/icons/download_sign.png";
/* eslint-disable react/prop-types */
function SmallCertificate({ course }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img />
      </div>
      <div className={styles.titleSection}>
        <span>{course.title}</span>
        <time>1/10/2024</time>
      </div>
      <div className={styles.buttonSection}>
        <button className={styles.downloadButton}>
          <img src={downloadSign} />
        </button>
      </div>
    </div>
  );
} /* eslint-disable react/prop-types */

export default SmallCertificate;
