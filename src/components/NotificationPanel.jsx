import styles from "./NotificationPanel.module.css";
import SelectButton from "./SelectButton";
import close from "../assets/icons/close.png";
/* eslint-disable react/prop-types */

function NotificationPanel({ setNotificationIsVisible }) {
  console.log(setNotificationIsVisible);
  return (
    <div className={styles.notification_window}>
      <div className={styles.header}>
        <span>Notifications</span>
        <button
          className={styles.close_btn}
          onClick={() => setNotificationIsVisible(false)}
        >
          <img src={close} />
        </button>
      </div>
      <div className={styles.select_all_section}>
        <SelectButton />
        <span>Select All</span>
      </div>
      <div className={styles.content_section}>
        <SelectButton />
        <p className={styles.content}>
          Place holder text Place holder text Place holder text Place holder
          text Place holder text Place holder text
        </p>

        <time style={{ fontSize: "0.8rem" }}>11:30PM</time>
      </div>
    </div>
  );
}

export default NotificationPanel;
/* eslint-disable react/prop-types */
