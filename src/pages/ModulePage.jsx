import NavSide from "../components/NavSide";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CourseFilter from "../components/CourseFilter";
import ActionButton from "../components/ActionButton";
import CautionCard from "../components/CautionCard";
import EditCourseModal from "../components/EditCourseModal";
import AddCoursesTab from "../components/AddCoursesTab";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModule } from "../services/useModule";
import { useStudy } from "../services/useStudy";
import { useDeleteModule } from "../services/useModule";
import mainStyles from "../components/main.module.css";
import styles from "../components/ModulePage.module.css";
import pencilIcon from "../assets/icons/buttons/pencil_icon.png";
import addIcon from "../assets/icons/buttons/add_icon.png";
import canIcon from "../assets/icons/buttons/can_icon.png";
import moduleIcon from "../assets/icons/module_icon.png";
import close from "../assets/icons/close.png";
import { Toaster } from "react-hot-toast";
export default function ModulePage() {
  const { data: modules, isLoading } = useModule();
  const { data: courses } = useStudy();
  const { deleteModule } = useDeleteModule();
  const navigate = useNavigate();
  const [buttonsIsVisible, setButtonIsVisible] = useState(false);
  const [buttonNum, setButtonNum] = useState();
  const [moduleFilterList, setModuleFilterList] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddCourseModalVisible, setIsAddCourseModalVisible] = useState(false);
  const [isCourseListVisible, setIsCourseListVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState({});
  const [selectedCourse, setSelectedCourse] = useState({
    courseId: "",
    courseTitle: "Courses",
  });

  useEffect(() => {
    if (isLoading) {
      return () => {
        <span>loading..</span>;
      };
    }

    if (selectedCourse.courseTitle !== "Courses" && search.length > 0) {
      setSelectedCourse((course) => ({
        ...course,
        courseId: "",
        courseTitle: "Courses",
      }));
      setIsCourseListVisible(false);
    }

    if (selectedCourse.courseTitle !== "Courses" && search.length === 0) {
      let arry = [];
      for (let i = 0; i < modules.length; i++) {
        for (let x = 0; x < modules[i].study.length; x++) {
          if (modules[i].study[x] === selectedCourse.courseId) {
            arry = [...arry, modules[i]];
          }
        }
      }
      setModuleFilterList(arry);
    } else {
      setModuleFilterList(
        modules.filter((module) =>
          module.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [modules, isLoading, search, selectedCourse]);

  const buttonOptions = [
    {
      image: addIcon,
      text: "Add Course",
    },
    {
      image: pencilIcon,
      text: "Edit Title",
    },
    {
      image: canIcon,
      text: "Delete",
    },
    {
      image: close,
      text: "Cancel",
    },
  ];

  const tableColStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "14rem",
    position: "absolute",
    transform: "translate(-2rem, 1.5rem)",
    zIndex: "99",
  };

  function handleButton(key) {
    setButtonNum(key);
    setButtonIsVisible(true);
  }

  function handleCloseButton(option, module) {
    if (option === "Edit Title") {
      setSelectedModule(module);
      setIsModalVisible(true);
    }

    if (option === "Delete") {
      deleteModule(module.id);
    }

    if (option === "Add Course") {
      setSelectedModule(module);
      setIsAddCourseModalVisible(true);
    }

    setButtonNum();
    setButtonIsVisible(false);
  }

  function handleSearch(e) {
    setSearch(e);
  }

  function handleFilter(id, title) {
    setSelectedCourse((course) => ({
      ...course,
      courseId: id,
      courseTitle: title,
    }));
    setIsCourseListVisible(false);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  function handleCloseAddCourseModal() {
    setIsAddCourseModalVisible(false);
  }

  return (
    <div className={mainStyles.main}>
      <NavSide />
      <Header />
      <div className={styles.container}>
        <div
          className={styles.header}
          style={
            isModalVisible || isAddCourseModalVisible ? { opacity: 0.3 } : {}
          }
        >
          <div className={styles.title}>
            <img src={moduleIcon} />
            <span>Modules</span>
          </div>
          <button
            className={styles.addCourse_btn}
            onClick={() => navigate("/create-module")}
          >
            <img src={addIcon} />
            Create Course
          </button>
        </div>
        <div
          className={styles.searchSection}
          style={
            isModalVisible || isAddCourseModalVisible ? { opacity: 0.3 } : {}
          }
        >
          <SearchBar onChange={handleSearch}>Search Modules</SearchBar>
          <CourseFilter
            onClick={() => setIsCourseListVisible(!isCourseListVisible)}
          >
            {selectedCourse.courseTitle}
          </CourseFilter>
        </div>
        {isCourseListVisible && (
          <ul className={styles.courseList}>
            {courses.map((course) => (
              <li
                className={styles.courseItem}
                key={course.id}
                onClick={() => handleFilter(course.id, course.title)}
              >
                {course.title}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.tableContainer}>
          <table
            className={styles.table}
            style={
              isModalVisible || isAddCourseModalVisible ? { opacity: 0.3 } : {}
            }
          >
            <thead
              style={{
                height: "4.3rem",
              }}
            >
              <tr style={{ backgroundColor: "#DEEFF1" }}>
                <th>Title</th>
                <th>Courses</th>
                <th>Publisher</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody style={{ height: "4.3rem", textAlign: "center" }}>
              {moduleFilterList.map((module, index) => (
                <tr key={module.id} className={styles.row}>
                  {/* Modules Title row */}
                  <td>
                    <Link
                      to={`/edit-module/${module.id}`}
                      className={styles.link}
                    >
                      {module.title}
                    </Link>
                  </td>
                  {/* Number of Courses row */}
                  <td>{module.study.length}</td>
                  {/* Publisher row */}
                  <td>Keith Parkinson</td>

                  {/* Action button row */}
                  <td style={buttonsIsVisible ? tableColStyle : {}}>
                    {!buttonsIsVisible && (
                      <button
                        className={styles.actionButton}
                        onClick={() => handleButton(index)}
                      >
                        ...
                      </button>
                    )}
                    {buttonNum === index && (
                      <div>
                        {buttonOptions.map((option) => (
                          <ActionButton
                            key={option.text}
                            onClick={() =>
                              handleCloseButton(option.text, module)
                            }
                          >
                            <img src={option.image} />
                            <span>{option.text}</span>
                          </ActionButton>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {moduleFilterList.length === 0 && (
            <CautionCard type="modules">
              <p>No Modules</p>
            </CautionCard>
          )}
        </div>
        {isModalVisible && (
          <EditCourseModal
            type="module-edit"
            onClick={handleCloseModal}
            moduleId={selectedModule.id}
          >
            {selectedModule.title}
          </EditCourseModal>
        )}
        {isAddCourseModalVisible && (
          <AddCoursesTab
            selectedModule={selectedModule}
            type="modules"
            onHandleCloseAddCourseModal={handleCloseAddCourseModal}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
}
