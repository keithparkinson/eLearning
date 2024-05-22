import NavSide from "../components/NavSide";
import Header from "../components/Header";
import CustomSelector from "../components/CustomSelector";
import CourseCard from "../components/CourseCard";
import main_styles from "../components/main.module.css";
import headerIcon from "../assets/icons/course_header_icon.png";
import styles from "../components/CoursePage.module.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useStudy } from "../services/useStudy";
import { useSite } from "../services/useSite";
import { useGetProgress } from "../services/useProgress";

import { useEffect, useState } from "react";
function UserCoursePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { data: studies, isLoading } = useStudy();
  const { data: userSites, isLoading: loadingUserSites } = useSite();
  const { data: progress, isLoading: loadingProgress } = useGetProgress();
  const options = ["Completed", "Not Started", "In Progress", "Over due"];
  const [selectedOption, setSelectedOption] = useState("");
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [userCourses, setUserCourses] = useState([]);
  const [statusSort, setStatusSort] = useState([]);

  const status = searchParams.get("status");

  useEffect(() => {
    if (status !== null) {
      setSelectedOption(status);
    } else {
      setSelectedOption("Completed");
    }
  }, [status]);

  useEffect(() => {
    if (!isLoading || !loadingUserSites) {
      if (studies !== undefined && userSites !== undefined) {
        setUserCourses(
          studies.filter((study) => {
            return userSites.find((site) => site.Study === study.id);
          })
        );
      }
    }
  }, [isLoading, loadingUserSites, studies, userSites]);

  useEffect(() => {
    if (!isLoading || !loadingUserSites || !loadingProgress) {
      if (id !== undefined) {
        if (selectedOption === "Completed") {
          setStatusSort([]);
          let filt1 = [];
          filt1 = progress.filter((p) => p.status === "CM");
          console.log(filt1);
          for (let i = 0; i < filt1.length; i++) {
            for (let y = 0; y < userCourses.length; y++) {
              if (
                filt1[i].Study === userCourses[y].id &&
                filt1[i].user === id
              ) {
                console.log(filt1[i]);
                setStatusSort((course) => [...course, userCourses[y]]);
              }
            }
          }
        }

        if (selectedOption === "Not Started") {
          setStatusSort([]);
          let filt2 = [];
          filt2 = progress.filter((p) => p.status === "Not Started");
          console.log(filt2);
          for (let i = 0; i < filt2.length; i++) {
            for (let y = 0; y < userCourses.length; y++) {
              if (
                filt2[i].Study === userCourses[y].id &&
                filt2[i].user === id
              ) {
                console.log(filt2[i]);
                setStatusSort((course) => [...course, userCourses[y]]);
              }
            }
          }
        }

        if (selectedOption === "In Progress") {
          setStatusSort([]);
          let filt3 = [];
          filt3 = progress.filter((p) => p.status === "IP");
          console.log(filt3);
          for (let i = 0; i < filt3.length; i++) {
            for (let y = 0; y < userCourses.length; y++) {
              if (
                filt3[i].Study === userCourses[y].id &&
                filt3[i].user === id
              ) {
                console.log(filt3[i]);
                setStatusSort((course) => [...course, userCourses[y]]);
              }
            }
          }
        }

        if (selectedOption === "Over due") {
          setStatusSort([]);
          let filt4 = [];
          filt4 = progress.filter((p) => p.status === "OD");
          console.log(filt4);
          for (let i = 0; i < filt4.length; i++) {
            for (let y = 0; y < userCourses.length; y++) {
              if (
                filt4[i].Study === userCourses[y].id &&
                filt4[i].user === id
              ) {
                console.log(filt4[i]);
                setStatusSort((course) => [...course, userCourses[y]]);
              }
            }
          }
        }
      }
    }
  }, [
    selectedOption,
    id,
    isLoading,
    loadingProgress,
    loadingUserSites,
    progress,
    userCourses,
  ]);

  console.log(userCourses);
  console.log(status);

  // console.log(statusSort);
  console.log(selectedOption);
  // console.log(progress);

  function handleSelector(option) {
    setSelectorVisible(false);
    setSelectedOption(() => option);
  }
  console.log(id);
  return (
    <div className={main_styles.main}>
      <NavSide />
      <Header />
      <div className={styles.courses}>
        <div className={styles.courses_container}>
          <div className={styles.courses_heading}>
            <div className={styles.headingLeftSide}>
              <img src={headerIcon} />
              <span className={styles.heading}>Courses</span>
            </div>

            <div className={styles.course_sort_selector}>
              {!selectorVisible ? (
                <button
                  onClick={() => setSelectorVisible(true)}
                  className={styles.selector_btn}
                >
                  {selectedOption}
                </button>
              ) : (
                <ul className={styles.selctorOptionList}>
                  {options.map((option) => (
                    <li key={option}>
                      <CustomSelector onHandleSelector={handleSelector}>
                        {option}
                      </CustomSelector>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={styles.cardContainer}>
            {isLoading ? (
              <span>loading...</span>
            ) : (
              <ul
                className={styles.courses_list}
                // style={selectorVisible ? { marginTop: "-58px" } : {}}
              >
                {statusSort.map((course) => (
                  <li key={course.id}>
                    <Link to="/study" style={{ textDecoration: "none" }}>
                      <CourseCard study={course} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserCoursePage;
