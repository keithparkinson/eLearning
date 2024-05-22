import main_styles from "../components/main.module.css";
import NavSide from "../components/NavSide";
import Header from "../components/Header";
import styles from "../components/ContentPage.module.css";
import achievement from "../assets/icons/achievement_small.png";
import down_arrow from "../assets/icons/down_arrow.png";

function ContentPage() {
  return (
    <div className={main_styles.main}>
      <NavSide />
      <Header />
      <div className={styles.content}>
        <div className={styles.course_header}>
          <div className={styles.header_left}>
            <span className={styles.header_topic}>
              Course Name Course Overview
            </span>
            <button className={styles.header_btn}>Start Course</button>
          </div>

          <div className={styles.progress_gauge}>
            <div className={styles.progress_bar}>
              <img src={achievement} />
            </div>
          </div>
        </div>

        <div className={styles.course_container}>
          <div className={styles.conatiner_header}>
            <span>Course Content</span>
          </div>
          <div className={styles.course_content}>
            <nav className={styles.content_nav}>
              <ul className={styles.course_content_list}>
                <li>
                  <button className={styles.content_list_btn}>
                    Section 1. Study Overview <img src={down_arrow} />
                  </button>
                  <ul className={styles.content_list_btn_list}>
                    <li className={styles.btn_list}>
                      <div className={styles.btn_list_gauge}>
                        <div className={styles.btn_list_progress_bar}></div>
                      </div>
                      Place
                    </li>

                    <li className={styles.btn_list}>
                      <div className={styles.btn_list_gauge}>
                        {/* <div className={styles.btn_list_progress_bar}></div> */}
                      </div>
                      Place
                    </li>
                  </ul>
                </li>
                <li>
                  <button className={styles.content_list_btn}>
                    Section 2. Study Setup <img src={down_arrow} />
                  </button>
                </li>
              </ul>
            </nav>
            <video className={styles.content_video} controls></video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentPage;
