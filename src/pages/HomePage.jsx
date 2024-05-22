import main_styles from "../components/main.module.css";
import styles from "../components/HomePage.module.css";
import Header from "../components/Header";
import NavSide from "../components/NavSide";
import activity_sign from "../assets/icons/activity_sign.png";
import control_button from "../assets/icons/skip_button.png";
import favourite from "../assets/icons/favourite.png";
import CourseCard from "../components/CourseCard";
import { Link, useNavigate } from "react-router-dom";
import { useStudy } from "../services/useStudy";
import { useGetProgress } from "../services/useProgress";
import { useSite } from "../services/useSite";
import { useUser } from "../services/useLogin";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function Homepage() {
  const { data: studies, isLoading } = useStudy();
  const { data: userSites, isLoading: sitesIsLoading } = useSite();
  const { data: progress, isLoading: loadingProgress } = useGetProgress();
  const { data: user, isLoading: loadingUser } = useUser();
  const [userStudies, setUserStudies] = useState([]);
  const [statusSort, setStatusSort] = useState([]);
  const [slideStep, setSlideStep] = useState(1);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // console.log(userSites);
  // console.log(statusSort);
  console.log(userSites);

  const activeSlideStyle = {
    backgroundColor: "#D94F91",
    width: "0.9rem",
    height: "0.9rem",
    transition: "300ms",
  };

  // this use Effect is used to sort the users coureses from the all the courses from the cache

  useEffect(() => {
    if (!isLoading || !sitesIsLoading || loadingUser) {
      if (studies !== undefined && userSites !== undefined) {
        setUserStudies(
          studies.filter((study) => {
            return userSites.find((site) => site.Study === study.id);
          })
        );
      }
    }
  }, [isLoading, studies, userSites, sitesIsLoading, loadingUser]);

  // this use Effect controls what is sorted for the users courses if they are completed, not started, in progrees or overdue
  useEffect(() => {
    if (!isLoading || !loadingProgress || !loadingUser || !sitesIsLoading) {
      if (
        userStudies !== undefined &&
        user !== undefined &&
        progress !== undefined
      ) {
        if (slideStep === 1) {
          // setStatusSort(
          //   userStudies.filter((study) => study.status === "Completed")
          // );
          setStatus("Completed");
          setStatusSort([]);
          let filt = [];
          filt = progress.filter((p) => p.status === "CM");
          console.log(filt);
          for (let i = 0; i < filt.length; i++) {
            for (let y = 0; y < userStudies.length; y++) {
              if (
                filt[i].Study === userStudies[y].id &&
                filt[i].user === user.user.id
              ) {
                console.log(filt[i]);
                setStatusSort((course) => [...course, userStudies[y]]);
              }
            }
          }
        }

        if (slideStep === 2) {
          setStatus("Not Started");
          setStatusSort([]);
          let filt = [];
          filt = progress.filter((p) => p.status === "Not Started");
          console.log(filt);
          for (let i = 0; i < filt.length; i++) {
            for (let y = 0; y < userStudies.length; y++) {
              if (
                filt[i].Study === userStudies[y].id &&
                filt[i].user === user.user.id
              ) {
                console.log(filt[i]);
                setStatusSort((course) => [...course, userStudies[y]]);
              }
            }
          }
        }
        if (slideStep === 3) {
          setStatus("In Progress");
          setStatusSort([]);
          let filt = [];
          filt = progress.filter((p) => p.status === "IP");
          console.log(filt);
          for (let i = 0; i < filt.length; i++) {
            for (let y = 0; y < userStudies.length; y++) {
              if (
                filt[i].Study === userStudies[y].id &&
                filt[i].user === user.user.id
              ) {
                console.log(filt[i]);
                setStatusSort((course) => [...course, userStudies[y]]);
              }
            }
          }
        }

        if (slideStep === 4) {
          setStatus("Over due");
          setStatusSort([]);
          let filt = [];
          filt = progress.filter((p) => p.status === "OD");
          console.log(filt);
          for (let i = 0; i < filt.length; i++) {
            for (let y = 0; y < userStudies.length; y++) {
              if (
                filt[i].Study === userStudies[y].id &&
                filt[i].user === user.user.id
              ) {
                console.log(filt[i]);
                setStatusSort((course) => [...course, userStudies[y]]);
              }
            }
          }
        }
      }
    }
  }, [
    slideStep,
    userStudies,
    loadingProgress,
    isLoading,
    loadingUser,
    progress,
    user,
    sitesIsLoading,
  ]);

  // this effect will help the slid control to bring it to 1 if the user goes beyond the 4th slide and alost if they go below 1st flid it will bring them to the 4th slid.
  useEffect(() => {
    if (slideStep < 1) {
      setSlideStep(4);
    }

    if (slideStep > 4) {
      setSlideStep(1);
    }
  }, [slideStep]);

  //  functions that controls the slide - from next to the previous slide

  function handleNext() {
    if (slideStep < 5) {
      setSlideStep((step) => step + 1);
    }
  }

  function handlePrevious() {
    if (slideStep > 0) {
      setSlideStep((step) => step - 1);
    }
  }

  function handleViewAllBtn() {
    navigate(`/user-courses/${user.user.id}?status=${status}`);
  }

  // page render
  if (isLoading || loadingProgress || loadingUser || sitesIsLoading) {
    return <span>...loading</span>;
  }
  return (
    <main className={main_styles.main}>
      <NavSide />
      <Header />

      <div className={styles.container}>
        <div className={styles.left_side}>
          {/* Circler charts that show the stats */}
          <div className={styles.study_states}>
            <div className={styles.status_progress_bar_container}>
              <p>Not Started</p>
              <div className={styles.contain}>
                <p className={styles.progress_bar_value}>1%</p>
                <div className={styles.progress_bar}>
                  <div className={styles.progress_bar_dile}></div>
                </div>
              </div>
            </div>

            <div className={styles.status_progress_bar_container}>
              <p>In Progress</p>
              <div className={styles.contain}>
                <p className={styles.progress_bar_value}>1%</p>
                <div
                  className={styles.progress_bar}
                  style={{ borderColor: "#D94F91" }}
                >
                  <div className={styles.progress_bar_dile}></div>
                </div>
              </div>
            </div>

            <div className={styles.status_progress_bar_container}>
              <p>Over Due</p>
              <div className={styles.contain}>
                <p className={styles.progress_bar_value}>1%</p>
                <div
                  className={styles.progress_bar}
                  style={{ borderColor: "red" }}
                >
                  <div className={styles.progress_bar_dile}></div>
                </div>
              </div>
            </div>

            <div className={styles.status_progress_bar_container}>
              <p>Completed</p>
              <div className={styles.contain}>
                <p className={styles.progress_bar_value}>1%</p>
                <div
                  className={styles.progress_bar}
                  style={{ borderColor: "#66C4AF" }}
                >
                  <div className={styles.progress_bar_dile}></div>
                </div>
              </div>
            </div>
          </div>

          {/* shows the user's  recente activity */}
          <div className={styles.activity}>
            <div className={styles.header}>
              <img src={activity_sign} />
              <span>Recent Activity</span>
            </div>
            <div className={styles.activity_list}>
              {/* This is a list of the course activity of the user / FYI this should change to a mapp funtion */}
              {isLoading ? (
                <span>loading...</span>
              ) : (
                userStudies.map((study) => (
                  <Link
                    to="/study"
                    style={{ textDecoration: "none" }}
                    key={study.id}
                  >
                    <CourseCard
                      study={study}
                      studyLength={userStudies.length}
                    />
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* A list of the courses that relates to the status */}
        <div className={styles.status_list}>
          <div className={styles.slide_control}>
            <button
              className={styles.slide_btn}
              onClick={() => handlePrevious()}
            >
              <img src={control_button} />
            </button>
            <div
              className={styles.slide_bubble}
              style={slideStep === 1 ? activeSlideStyle : {}}
            ></div>
            <div
              className={styles.slide_bubble}
              style={slideStep === 2 ? activeSlideStyle : {}}
            ></div>
            <div
              className={styles.slide_bubble}
              style={slideStep === 3 ? activeSlideStyle : {}}
            ></div>
            <div
              className={styles.slide_bubble}
              style={slideStep === 4 ? activeSlideStyle : {}}
            ></div>
            <button
              className={styles.slide_btn}
              style={{ rotate: "180deg" }}
              onClick={() => handleNext()}
            >
              <img src={control_button} />
            </button>
          </div>
          {slideStep === 1 ? (
            <p className={styles.current_state}>Completed</p>
          ) : slideStep === 2 ? (
            <p className={styles.current_state}>Not Started</p>
          ) : slideStep === 3 ? (
            <p className={styles.current_state}>In Progress</p>
          ) : slideStep === 4 ? (
            <p className={styles.current_state}>Over Due</p>
          ) : (
            <p></p>
          )}

          <div className={styles.status_slide}>
            {statusSort.map((study) => (
              <div className={styles.status_container} key={study.id}>
                <div className={styles.status_container_footer}>
                  <div className={styles.status_course_progress_bar}></div>
                  <img src={favourite} className={styles.favourite_heart} />
                </div>
              </div>
            ))}
          </div>
          <button
            className={styles.status_all_btn}
            style={statusSort.length < 1 ? { marginTop: "8rem" } : {}}
            onClick={() => handleViewAllBtn()}
          >
            View all
          </button>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

export default Homepage;
