import styles from "./Certificate.module.css";
import download_sign from "../assets/icons/download_sign.png";
function certificate() {
  return (
    <div className={styles.certificate}>
      <div className={styles.certificate_banner}></div>
      <div className={styles.certificate_info}>
        <p className={styles.certificate_topic}>Study name</p>
        <time>1/10/2024</time>
        <img />
      </div>
      {/* This button will download the certificate to the users device */}
      <button className={styles.download_btn}>
        <img src={download_sign} />
      </button>
    </div>
  );
}

export default certificate;
