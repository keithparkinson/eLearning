import NavSide from "../components/NavSide";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ActionButton from "../components/ActionButton";
import CautionCard from "../components/CautionCard";
import EditSiteModal from "../components/EditSiteModal";
import Spinner from "../components/Spinner";
import EditCourseModal from "../components/EditCourseModal";
import { useEffect, useState } from "react";
import { useStudy } from "../services/useStudy";
import { useDeleteStudy } from "../services/useStudy";
import { useAllUser } from "../services/useAllUser";
import { useAllSite } from "../services/useSite";
import { useModule } from "../services/useModule";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import mainStyles from "../components/main.module.css";
import styles from "../components/AdminCoursePage.module.css";
import headerIcon from "../assets/icons/course_header_icon.png";
import pencilIcon from "../assets/icons/buttons/pencil_icon.png";
import addIcon from "../assets/icons/buttons/add_icon.png";
import canIcon from "../assets/icons/buttons/can_icon.png";
import close from "../assets/icons/close.png";

export default function AdminCoursePage() {
  const [buttonsIsVisible, setButtonIsVisible] = useState(false);
  const { data: studies, isLoading } = useStudy();
  const { data: sites, isLoading: loadingSites } = useAllSite();
  const { data: learners, isLoading: loadingUsers } = useAllUser();
  const { data: modules, isLoading: loadingModules } = useModule();
  const { deleteCourse } = useDeleteStudy();
  const navigate = useNavigate();
  const [buttonNum, setButtonNum] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddSiteModalVisible, setIsAddSiteModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [courseFilterList, setCourseFilterList] = useState([]);
  const [modalType, setModalType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [siteCount, setSiteCount] = useState([]);
  const [moduleCount, setModuleCount] = useState([]);

  const buttonOptions = [
    {
      image: addIcon,
      text: "Add Module",
    },
    {
      image: addIcon,
      text: "Add Site",
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

  function handleCloseButton(option, course) {
    setButtonNum();
    setButtonIsVisible(false);
    setSelectedCourse(course);

    if (option === "Delete") {
      deleteCourse(course.id);
    } else if (option === "Edit Title") {
      setIsModalVisible(true);
      setModalType("edit-course");
    } else if (option === "Cancel") {
      setButtonIsVisible(false);
    } else if (option === "Add Site") {
      setIsAddSiteModalVisible(true);
    } else if (option === "Add Module") {
      navigate(`/course-modules/${course.id}`);
    }
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  function handleSearch(e) {
    setSearch(e);
  }

  useEffect(() => {
    if (!isLoading) {
      setCourseFilterList(
        studies.filter((title) =>
          title.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [studies, search, isLoading]);

  useEffect(() => {
    if (!loadingSites) {
      setSiteCount([]);
      for (let i = 0; i < studies?.length; i++) {
        setSiteCount((s) => [...s, num]);
        let num = 0;
        for (let x = 0; x < sites.length; x++) {
          if (studies[i].id.includes(sites[x].Study)) {
            // setCount((c) => c + 1);
            num = num + 1;
          }
        }
      }
    }
  }, [loadingSites, sites, studies]);

  useEffect(() => {
    if (!loadingModules) {
      setModuleCount([]);
      for (let i = 0; i < studies?.length; i++) {
        setModuleCount((m) => [...m, num]);
        let num = 0;
        for (let x = 0; x < modules.length; x++) {
          for (let y = 0; y < modules[x].study.length; y++) {
            if (studies[i].id.includes(modules[x].study[y])) {
              num = num + 1;
            }
          }
        }
      }
    }
  }, [loadingModules, modules, studies]);

  if (isLoading || loadingUsers) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

  function handleAddNew() {
    setIsModalVisible(true);
    setModalType("new-course");
  }

  function handleCloseAddSite() {
    setIsAddSiteModalVisible(false);
  }
  return (
    <div className={mainStyles.main}>
      <NavSide />
      <Header />
      <div className={styles.container}>
        <div
          className={styles.header}
          style={isModalVisible ? { opacity: "0.5" } : {}}
        >
          <div className={styles.title}>
            <img src={headerIcon} />
            <span>Courses</span>
          </div>
          <button
            className={styles.addCourse_btn}
            onClick={() => handleAddNew()}
          >
            <img src={addIcon} />
            Add New Course
          </button>
        </div>
        <div className={styles.searchBarSection}>
          <SearchBar onChange={handleSearch}>Search Courses</SearchBar>
        </div>
        <div>
          <table
            className={styles.table}
            style={isModalVisible ? { opacity: "0.3" } : {}}
          >
            <thead
              style={{
                height: "4.3rem",
              }}
            >
              <tr style={{ backgroundColor: "#DEEFF1" }}>
                <th>Title</th>
                <th>Sites</th>
                <th>Modules</th>
                <th>Publisher</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody style={{ height: "4.3rem", textAlign: "center" }}>
              {courseFilterList.map((study, index) => (
                <tr key={study.id} className={styles.row}>
                  <td>
                    <Link to={`/course/${study.id}`} className={styles.link}>
                      {study.title}
                    </Link>
                  </td>
                  <td>{siteCount[index]}</td>
                  <td>{moduleCount[index]}</td>
                  <td>
                    {learners.map((learner) => {
                      if (learner.id === study.publisher) {
                        return learner.email;
                      }
                    })}
                  </td>
                  <td style={buttonsIsVisible ? tableColStyle : {}}>
                    {!buttonsIsVisible && (
                      <button
                        onClick={() => handleButton(index)}
                        style={{
                          border: "none",
                          fontSize: "2rem",
                          paddingBottom: "0.5rem",
                          width: "3rem",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                        }}
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
                              handleCloseButton(option.text, study)
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
        </div>
        {courseFilterList.length === 0 && (
          <CautionCard type="courses">
            <p>No Courses</p>
          </CautionCard>
        )}
        {isModalVisible && (
          <EditCourseModal
            type={modalType}
            onClick={handleCloseModal}
            courseId={selectedCourse.id}
          >
            {modalType === "edit-course" ? selectedCourse.title : null}
          </EditCourseModal>
        )}
        {isAddSiteModalVisible && (
          <EditSiteModal
            type="courses"
            courseId={selectedCourse.id}
            onClick={handleCloseAddSite}
          />
        )}
        <Toaster />
      </div>
    </div>
  );
}
