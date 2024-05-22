import NavSide from "../components/NavSide";
import Header from "../components/Header";
import Certificate from "../components/Certificate";
import main_styles from "../components/main.module.css";
import styles from "../components/AchievementPage.module.css";
function AchievementPage() {
  return (
    <div className={main_styles.main}>
      <NavSide />
      <Header />
      <div className={styles.achievement}>
        <div className={styles.achievement_container}>
          <div className={styles.header}>
            <span>Acheivements</span>
          </div>
          <Certificate />
        </div>
      </div>
    </div>
  );
}

export default AchievementPage;
