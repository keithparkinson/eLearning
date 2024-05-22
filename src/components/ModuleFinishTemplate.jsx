import AddCoursesTab from "./AddCoursesTab";
import FinishModuleOne from "./FinishModuleOne";
import styles from "../components/ModuleFinishTemplate.module.css";
function ModuleFinishTemplate() {
  return (
    <div className={styles.container}>
      <div className={styles.addCourseSection}>
        <AddCoursesTab />
      </div>
      <div className={styles.previewSection}>
        <FinishModuleOne />
      </div>
    </div>
  );
}
export default ModuleFinishTemplate;
