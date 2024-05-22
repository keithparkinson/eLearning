import styles from "./NavSide.module.css";
import home from "../assets/icons/home.png";
import help from "../assets/icons/help.png";
import course from "../assets/icons/course.png";
import usersIcon from "../assets/icons/users_icon.png";
import rightArrow from "../assets/icons/rightArrow.png";
import viewIcon from "../assets/icons/viewIcon.png";
import createIcon from "../assets/icons/createIcon.png";
import achievement from "../assets/icons/achievement.png";
import notification from "../assets/icons/v.svg";
import NotificationPanel from "../components/NotificationPanel";
import profile from "../assets/icons/profile.png";
import logout from "../assets/icons/logout.png";
import moduleIcon from "../assets/icons/module_sign.png";
import siteIcon from "../assets/icons/site_sign.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../services/useLogin";

function NavSide() {
  const { data, isLoading } = useUser();
  const [notificationIsVisible, setNotificationIsVisible] = useState(false);
  const [isCourseOptionVisible, setIsCourseOptionVisible] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <span>loading..</span>;
  }

  function handleLogOut() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className={styles.nav}>
      <h1 className={styles.logo}>K Company</h1>
      <Link to="/home" className={styles.links}>
        <img src={home} className={styles.icon1} />
        <span>Home</span>
      </Link>
      <button
        className={styles.link_btn}
        onClick={() => setNotificationIsVisible(!notificationIsVisible)}
      >
        <img src={notification} className={styles.icon} />
        <span>Notification</span>
      </button>

      {/* This the Notification panel window, which will appear when notification is clicked */}
      {notificationIsVisible && (
        <NotificationPanel
          setNotificationIsVisible={setNotificationIsVisible}
        />
      )}

      {data.user.is_superuser ? (
        <div>
          <Link to="/learners" className={styles.links}>
            <img src={usersIcon} className={styles.icon} />
            <span>Learners</span>
          </Link>
          <div
            className={styles.links}
            onClick={() => setIsCourseOptionVisible(!isCourseOptionVisible)}
          >
            <img src={course} className={styles.icon} />
            <span>Courses</span>
          </div>

          {isCourseOptionVisible && (
            <ul className={styles.coursesDropList}>
              <li>
                <Link
                  to={`/user-courses/${data.user.id}`}
                  className={styles.links}
                  style={{ fontWeight: "400", paddingLeft: "2rem" }}
                >
                  <img src={rightArrow} className={styles.icon} />
                  <span>Your Courses</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className={styles.links}
                  style={{ fontWeight: "400", paddingLeft: "2rem" }}
                >
                  <img src={viewIcon} className={styles.icon} />
                  <span>View Courses</span>
                </Link>
              </li>
              <li>
                <Link
                  className={styles.links}
                  style={{ fontWeight: "400", paddingLeft: "2rem" }}
                >
                  <img src={createIcon} className={styles.icon} />
                  <span>Create Course</span>
                </Link>
              </li>
            </ul>
          )}
          <Link to="/modules" className={styles.links}>
            <img src={moduleIcon} />
            <span>Modules</span>
          </Link>

          <Link to="/sites" className={styles.links}>
            <img src={siteIcon} />
            <span>Sites</span>
          </Link>
        </div>
      ) : (
        <Link to="/courses" className={styles.links}>
          <img src={course} className={styles.icon} />
          <span>Courses</span>
        </Link>
      )}

      {/* // <Link to="/courses" className={styles.links}>
      //   <img src={course} className={styles.icon} />
      //   <span>Courses</span>
      // </Link> */}

      <Link to="/achievements" className={styles.links}>
        <img src={achievement} className={styles.icon} />
        <span>Achievements</span>
      </Link>
      <Link to="/profile" className={styles.links}>
        <img src={profile} className={styles.icon} />
        <span>Profile</span>
      </Link>
      <Link to="" className={styles.links}>
        <img src={help} className={styles.icon6} />
        <span>Help</span>
      </Link>
      <button className={styles.link_btn} onClick={() => handleLogOut()}>
        <img src={logout} className={styles.icon} />
        <span>LogOut</span>
      </button>
    </nav>
  );
}

export default NavSide;
