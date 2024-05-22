import { useState } from "react";
import styles from "./CourseCardPanel.module.css";
/* eslint-disable react/prop-types */
function CourseCard({ study, studyLength }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={styles.course_container}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={studyLength > 3 ? { marginBottom: "1rem" } : {}}
    >
      <span className={styles.course_title}>{study.title}</span>
      <div
        className={styles.course_container_footer}
        style={
          isHover
            ? { transition: "300ms", height: "5rem" }
            : { transition: "300ms" }
        }
      >
        <div className={styles.course_progress_bar}></div>
      </div>
    </div>
  );
}

export default CourseCard;
/* eslint-disable react/prop-types */
