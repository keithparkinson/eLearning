import NavSide from "../components/NavSide";
import Header from "../components/Header";
import EditLearnerModal from "../components/EditLearnerModal";
import AddLearnerSite from "../components/AddLearnerSite";
import CautionModal from "../components/CautionModal";
import { useAllUser } from "../services/useAllUser";
import { useAllSite } from "../services/useSite";
import { useStudy } from "../services/useStudy";
import { useGetProgress } from "../services/useProgress";
import { useUpdateProgress } from "../services/useProgress";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SmallCertificate from "../components/SmallCertificate";
import mainStyles from "../components/main.module.css";
import styles from "../components/ViewLearnerPage.module.css";
import achievementIcon from "../assets/icons/achievement_icon.png";
import downArrow from "../assets/icons/down_arrow.png";
import addIcon from "../assets/icons/buttons/add_icon.png";
import { Toaster } from "react-hot-toast";

export default function ViewLearnerPage() {
  const { data: users, isLoading } = useAllUser();
  const { data: sites, isLoading: loadingSites } = useAllSite();
  const { data: courses, isLoading: loadingCourses } = useStudy();
  const { data: progress, isLoading: loadingProgress } = useGetProgress();
  const { updateProg } = useUpdateProgress();
  const { id } = useParams();
  const [selectedLearner, setSelectedLearner] = useState({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCourseListVisible, setIsCourseListVisible] = useState(false);
  const [isSiteListVisible, setIsSiteListVisible] = useState(false);
  const [isAddSiteModalVisible, setIsAddSiteModalVisible] = useState(false);
  const [learnerSites, setLearnerSites] = useState([]);
  const [learnerCourses, setLearnerCourses] = useState([]);
  const [userCourseProgress, setUserCourseProgress] = useState([]);
  const [isCautionModalVisble, setIsCoutionModalVisible] = useState(false);

  //   const keyframes = `@keyframes bar{
  //     from {
  //       width: 0
  //     },
  // to{
  //   width: 1rem
  // }
  //   }`;

  useEffect(() => {
    if (isLoading) {
      return () => {
        <span>loading..</span>;
      };
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        setSelectedLearner(users[i]);
      }
    }
  }, [id, users, isLoading]);

  useEffect(() => {
    let filter = [];
    if (!loadingSites) {
      for (let x = 0; x < sites.length; x++) {
        for (let y = 0; y < sites[x].user.length; y++) {
          if (sites[x].user[y] === id) {
            filter.push(sites[x]);
          }
          // console.log(sites[x].user[y]);
        }
      }
      setLearnerSites(filter);
    }
  }, [loadingSites, id, sites]);

  useEffect(() => {
    if (!loadingCourses) {
      setLearnerCourses(
        courses.filter((study) => {
          return learnerSites.find((site) => site.Study === study.id);
        })
      );
    }
  }, [loadingCourses, learnerSites, courses]);

  useEffect(() => {
    if (!loadingProgress || !loadingCourses) {
      setUserCourseProgress([]);

      if (progress !== undefined) {
        for (let i = 0; i < progress.length; i++) {
          for (let y = 0; y < learnerCourses.length; y++) {
            if (
              progress[i].Study === learnerCourses[y].id &&
              progress[i].user === id
            ) {
              setUserCourseProgress((p) => [...p, progress[i]]);
            }
          }
        }
      }
    }
  }, [loadingProgress, id, progress, learnerCourses, loadingCourses]);

  const arrowStyle = {
    marginLeft: "2rem",
  };

  function handleCloseEditLearnerModal() {
    setIsEditModalVisible(false);
  }

  function handleCloseAddSiteModal() {
    setIsAddSiteModalVisible(false);
  }

  // function handleSetComplete(){

  // }

  function handleCompleteProgress(courseId) {
    let prog = {};
    if (userCourseProgress !== undefined) {
      for (let x = 0; x < userCourseProgress.length; x++) {
        if (userCourseProgress[x].Study === courseId) {
          prog = userCourseProgress[x];
        }
      }
      prog = { ...prog, status: "CM" };
      updateProg(prog);
    }
  }

  function handleCloseCaution() {
    setIsCoutionModalVisible(false);
  }

  console.log(userCourseProgress);

  if (isLoading || loadingCourses || loadingProgress) {
    return <span>loaing....</span>;
  }

  return (
    <div className={mainStyles.main}>
      <NavSide />
      <Header />
      <div className={styles.container}>
        <div
          className={styles.header}
          style={isAddSiteModalVisible ? { opacity: "0.3" } : {}}
        >
          <div className={styles.side}>
            <label className={styles.profileImg}>
              <img
                src={selectedLearner.profile_image}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  marginLeft: "0.15rem",
                  marginTop: "0.4rem",
                }}
              />
              <input type="file" style={{ visibility: "hidden" }} />
            </label>
            <span>
              {selectedLearner.first_name === "" &&
              selectedLearner.last_name === ""
                ? selectedLearner.email
                : `${selectedLearner.first_name} ${selectedLearner.last_name}`}
            </span>
          </div>
          <div>
            <div className={styles.buttonSection}>
              <button
                className={styles.siteListButton}
                onClick={() => setIsSiteListVisible(!isSiteListVisible)}
              >
                Sites <img src={downArrow} style={arrowStyle} />
              </button>
              {isSiteListVisible && (
                <ul className={styles.siteList}>
                  {learnerSites.length === 0 && (
                    <li className={styles.listItem}>No Sites</li>
                  )}
                  {learnerSites.map((site) => (
                    <li className={styles.listItem} key={site.id}>
                      {site.title}
                    </li>
                  ))}
                </ul>
              )}
              <button
                className={styles.addButton}
                onClick={() => setIsAddSiteModalVisible(!isAddSiteModalVisible)}
              >
                <img src={addIcon} />
                Add Site
              </button>
            </div>
          </div>
        </div>

        <main className={styles.mainContainer}>
          <div className={styles.achievementContainer}>
            <div
              className={styles.achievementHeader}
              style={isAddSiteModalVisible ? { opacity: "0.3" } : {}}
            >
              <img src={achievementIcon} />
              <span>Achievements</span>
            </div>

            <ul className={styles.certificateList}>
              {userCourseProgress.map((achievement) => {
                if (achievement.status === "CM") {
                  return (
                    <li style={{ padding: "1rem" }} key={achievement.id}>
                      {learnerCourses.map((course) => {
                        if (course.id === achievement.Study) {
                          return (
                            <SmallCertificate key={course.id} course={course} />
                          );
                        }
                      })}
                    </li>
                  );
                }
              })}
            </ul>

            {isAddSiteModalVisible && (
              <AddLearnerSite
                type="viewLearner-page"
                learnerId={id}
                onClick={handleCloseAddSiteModal}
              ></AddLearnerSite>
            )}
          </div>

          <div
            className={styles.controlContainer}
            style={isAddSiteModalVisible ? { opacity: "0.3" } : {}}
          >
            <button
              className={styles.listButton}
              onClick={() => setIsCourseListVisible(!isCourseListVisible)}
              style={{ backgroundColor: "#ABCED3" }}
            >
              Courses <img src={downArrow} style={arrowStyle} />
            </button>
            {isCourseListVisible && (
              <ul className={styles.courseList}>
                {learnerCourses.length === 0 && (
                  <li className={styles.listItem}>No Courses</li>
                )}
                {learnerCourses.map((course) => (
                  <li
                    className={`${styles.listItem} ${styles.courseItem}`}
                    key={course.id}
                  >
                    <span style={{ fontWeight: "500" }}>{course.title}</span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div className={styles.progressContainer}>
                        <div className={styles.progressBar}></div>
                      </div>
                      {userCourseProgress.map((progress) => {
                        if (
                          progress.status !== "CM" &&
                          course.id === progress.Study
                        ) {
                          return (
                            <button
                              className={styles.courseCompleteButton}
                              onClick={() => handleCompleteProgress(course.id)}
                              key={progress.id}
                            >
                              set to Complete
                            </button>
                          );
                        }
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <button
              className={styles.button}
              style={{ backgroundColor: "#CF4343" }}
              onClick={() => setIsCoutionModalVisible(true)}
            >
              Remove Leaner
            </button>
            <button className={styles.button}>Reset Password</button>
            {!isEditModalVisible && (
              <div className={styles.informationSection}>
                <span style={{ marginBottom: "1rem", fontWeight: "500" }}>
                  Personal Information
                </span>
                <div>
                  <label>Name: </label>
                  <span>
                    {selectedLearner.first_name} {selectedLearner.last_name}
                  </span>
                </div>
                <div>
                  <label>Email: </label>
                  <span>{selectedLearner.email}</span>
                </div>
                <div>
                  <label>Username: </label>
                  <span>{selectedLearner.email}</span>
                </div>
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditModalVisible(!isEditModalVisible)}
                >
                  Edit Learner
                </button>
              </div>
            )}
            {isEditModalVisible && (
              <EditLearnerModal
                selectedLearner={selectedLearner}
                onHandleCloseEditLearnerModal={handleCloseEditLearnerModal}
              />
            )}
          </div>
        </main>
        {isCautionModalVisble && (
          <CautionModal type="learner-page" onHandleCancle={handleCloseCaution}>
            Are you sure you wish to remove this Learner ?
          </CautionModal>
        )}
      </div>
      <Toaster />
    </div>
  );
}
