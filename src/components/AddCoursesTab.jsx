import SearchBar from "./SearchBar";
import downArrow from "../assets/icons/down_arrow.png";
import addIcon from "../assets/icons/buttons/add_icon.png";
import close from "../assets/icons/close.png";
import hideIcon from "../assets/icons/buttons/hide_icon.png";
import showIcon from "../assets/icons/buttons/show_icon.png";
import styles from "./AddCoursesTab.module.css";
import { useStudy } from "../services/useStudy";

import { useUpdateModule } from "../services/useModule";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NewModuleContext } from "./NewModuleContext";

/* eslint-disable react/prop-types */
function AddCoursesTab({ selectedModule, type, onHandleCloseAddCourseModal }) {
  const {
    onHandleNewModuleStudy,
    onHandleRemoveNewModuleStudy,
    editModule,
    onHandleEditModuleStudy,
    onHandleRemoveEditModuleStudy,
  } = useContext(NewModuleContext);
  const { data: courses, isLoading } = useStudy();
  const { updateModule } = useUpdateModule();
  const [search, setSearch] = useState("");
  const [courseFilterList, setCourseFilterList] = useState([]);
  const [isSearchListVisible, setIsSearchListVisible] = useState(false);
  const [isCourseListVisible, setIsCourseListVisible] = useState(false);
  const [moduleCourseList, setModuleCourseList] = useState([]);
  const [isAddCourseTabVisible, setIsAddCourseTabVisible] = useState(false);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    if (type === "modules") {
      setIsAddCourseTabVisible(true);
    }
  }, [type]);

  useEffect(() => {
    if (!isLoading) {
      if (search.length > 0) {
        setIsSearchListVisible(true);
      } else {
        setIsSearchListVisible(false);
      }
      setCourseFilterList(
        courses.filter((course) =>
          course.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [courses, search, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setModuleCourseList([]);
      // this effect will take place if we did not select a module from the modules page so selectedModule will not be undefined
      if (selectedModule !== undefined) {
        for (let i = 0; i < selectedModule.study.length; i++) {
          for (let x = 0; x < courses.length; x++) {
            if (selectedModule.study[i] === courses[x].id) {
              setModuleCourseList((course) => [...course, courses[x]]);
            }
          }
        }
        // if we are editing a module from the edit-module page this eefect will take place and list out the courses from that module editModule
      } else {
        for (let i = 0; i < editModule.study.length; i++) {
          for (let x = 0; x < courses.length; x++) {
            if (editModule.study[i] === courses[x].id) {
              setModuleCourseList((course) => [...course, courses[x]]);
            }
          }
        }
      }
    }
  }, [selectedModule, courses, isLoading, editModule]);

  function handleSearch(e) {
    setSearch(e);
  }

  function handleSelectedSearch(course) {
    setModuleCourseList((module) => [...module, course]);
    setIsSearchListVisible(false);
  }

  function handleSelectdCourse(course) {
    for (let i = 0; i < moduleCourseList.length; i++) {
      if (course.id === moduleCourseList[i].id) {
        toast.error("Course already added");
        return;
      }
    }

    setModuleCourseList((module) => [...module, course]);
    // if state controles if we are adding courses from modules page which is where selectedModule comes from
    if (selectedModule !== undefined) {
      selectedModule.study = [...selectedModule.study, course.id];
      setIsChange(true);
    } else if (selectedModule === undefined && editModule.title !== "") {
      // this statement is if we are adding courses for a existing module that is being edited from edit-module page
      onHandleEditModuleStudy(course.id);
    } else {
      // this statement is if we are adding courses for a new Module that is being created from create-module page
      onHandleNewModuleStudy(course.id);
    }

    setIsCourseListVisible(false);
  }

  function handleRemoveCourse(id) {
    // this is a visualization for of the course list, does not affect the object directly
    setModuleCourseList((module) =>
      module.filter((course) => course.id !== id)
    );
    // this if statement removed the course from the the selectedModule if access this from the modules page
    if (selectedModule !== undefined) {
      selectedModule.study = selectedModule.study.filter(
        (course) => course !== id
      );
      setIsChange(true);
    } else if (selectedModule === undefined && editModule.title !== "") {
      onHandleRemoveEditModuleStudy(id);
    } else {
      onHandleRemoveNewModuleStudy(id);
    }
  }

  function handleSave() {
    updateModule(selectedModule);
    onHandleCloseAddCourseModal();
  }

  if (isLoading) {
    return <span>loading...</span>;
  }

  return (
    <div
      className={`${styles.container} ${styles[type]}`}
      style={!isAddCourseTabVisible ? { height: "5rem" } : {}}
    >
      <div className={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img src={addIcon} />
          <span>Add Courses</span>
        </div>
        {!isAddCourseTabVisible ? (
          <button
            className={styles.hideButton}
            onClick={() => setIsAddCourseTabVisible(true)}
          >
            <img src={showIcon} style={{ width: "2rem", height: "1.5rem" }} />
          </button>
        ) : (
          <button
            className={styles.hideButton}
            onClick={() => setIsAddCourseTabVisible(false)}
          >
            <img src={hideIcon} style={{ width: "2rem", height: "2rem" }} />
          </button>
        )}
      </div>

      <div className={styles.mainSection}>
        {isAddCourseTabVisible && (
          <div className={styles.searchSection}>
            <SearchBar onChange={handleSearch}>Search Courses</SearchBar>
            {isSearchListVisible && (
              <ul className={styles.searchList}>
                {courseFilterList.map((course) => (
                  <li
                    className={styles.searchItem}
                    key={course.key}
                    onClick={() => handleSelectedSearch(course)}
                  >
                    {course.title}
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.coursesContainer}>
              <ul className={styles.courseList}>
                {moduleCourseList.map((course) => (
                  <li className={styles.courseItem} key={course.id}>
                    {course.title}
                    <button
                      style={{ backgroundColor: "transparent", border: "none" }}
                      onClick={() => handleRemoveCourse(course.id)}
                    >
                      <img src={close} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {isAddCourseTabVisible && (
          <div className={styles.buttonSection}>
            <button
              className={styles.dropButton}
              onClick={() => setIsCourseListVisible(!isCourseListVisible)}
              style={
                isCourseListVisible
                  ? {
                      borderBottomLeftRadius: "0",
                      borderBottomRightRadius: "0",
                    }
                  : {}
              }
            >
              Courses <img src={downArrow} />
            </button>
            {isCourseListVisible && (
              <ul className={styles.dropList}>
                {courses.map((course) => (
                  <li
                    className={styles.listItem}
                    key={course.id}
                    onClick={() => handleSelectdCourse(course)}
                  >
                    {course.title}
                  </li>
                ))}
              </ul>
            )}
            {type === "modules" && (
              <div>
                {isChange ? (
                  <button
                    className={styles.button}
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={onHandleCloseAddCourseModal}
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} /* eslint-disable react/prop-types */
export default AddCoursesTab;
