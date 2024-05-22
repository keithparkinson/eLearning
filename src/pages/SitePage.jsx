import NavSide from "../components/NavSide";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CourseFilter from "../components/CourseFilter";
import ActionButton from "../components/ActionButton";
import CautionCard from "../components/CautionCard";
import EditSiteModal from "../components/EditSiteModal";
import AddLearnerModal from "../components/AddLearnerModal";
import { useEffect, useState } from "react";
import { useAllSite } from "../services/useSite";
import { useStudy } from "../services/useStudy";
import { useAllUser } from "../services/useAllUser";
import { useDeleteSite } from "../services/useSite";
import mainStyles from "../components/main.module.css";
import styles from "../components/SitePage.module.css";
import pencilIcon from "../assets/icons/buttons/pencil_icon.png";
import addIcon from "../assets/icons/buttons/add_icon.png";
import canIcon from "../assets/icons/buttons/can_icon.png";
import siteIcon from "../assets/icons/site_icon.png";
import close from "../assets/icons/close.png";
import learnersIcon from "../assets/icons/learners_icon.png";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
export default function SitePage() {
  const { data: courses } = useStudy();
  const { data: sites, isLoading } = useAllSite();
  const { data: learners, isLoading: loadingLearners } = useAllUser();
  const { deleteSite } = useDeleteSite();
  const navigate = useNavigate();
  const [buttonsIsVisible, setButtonIsVisible] = useState(false);
  const [buttonNum, setButtonNum] = useState();
  const [siteFilterList, setSiteFilterList] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isCourseListVisible, setIsCourseListVisible] = useState(false);
  const [selectedSite, setSelectedSite] = useState({});
  const [selectedListCourse, setSelectedListCourse] = useState({
    id: "",
    title: "Course",
  });

  useEffect(() => {
    if (isLoading || loadingLearners) {
      return () => {
        <span>loading..</span>;
      };
    }
    if (search.length > 0 && selectedListCourse.title !== "Course") {
      setSelectedListCourse((course) => ({
        ...course,
        id: "",
        title: "Course",
      }));
    }
    if (search.length === 0 && selectedListCourse.title !== "Course") {
      setSiteFilterList(
        sites.filter((site) => site.Study.includes(selectedListCourse.id))
      );
    } else {
      setSiteFilterList(
        sites.filter((site) =>
          site.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [sites, isLoading, loadingLearners, search, selectedListCourse]);

  const buttonOptions = [
    {
      image: addIcon,
      text: "Add Learner",
    },
    {
      image: learnersIcon,
      text: "Learners",
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

  function handleCloseButton(option, id, title, study) {
    if (option === "Edit Title") {
      setIsEditModalVisible(true);
      setSelectedSite({
        ...selectedSite,
        title: title,
        study: study,
        siteId: id,
      });
    } else if (option === "Add Learner") {
      setIsAddModalVisible(true);
      setSelectedSite({
        ...selectedSite,
        title: title,
        study: study,
        siteId: id,
      });
    } else if (option === "Delete") {
      deleteSite(id);
    } else if (option === "Learners") {
      navigate(`/learners/${id}`);
    }

    setButtonNum();
    setButtonIsVisible(false);
  }

  function handleSearch(e) {
    setSearch(e);
  }

  function handleCloseAddModal() {
    setIsAddModalVisible(false);
    setSelectedSite({});
  }

  function handleCloseEditModal() {
    setIsEditModalVisible(false);
    setSelectedSite({});
  }

  function handleCourseDropList(courseId, courseTitle) {
    setSelectedListCourse((course) => ({
      ...course,
      title: courseTitle,
      id: courseId,
    }));
    setIsCourseListVisible(false);
  }

  return (
    <div className={mainStyles.main}>
      <NavSide />
      <Header />
      <div className={styles.container}>
        <div
          className={styles.header}
          style={
            isEditModalVisible
              ? { opacity: "0.3" }
              : isAddModalVisible
              ? { opacity: "0.3" }
              : {}
          }
        >
          <div className={styles.title}>
            <img src={siteIcon} />
            <span>Sites</span>
          </div>
          <button
            className={styles.addSite_btn}
            onClick={() => setIsEditModalVisible(true)}
          >
            <img src={addIcon} />
            Add New Site
          </button>
        </div>
        <div
          className={styles.searchSection}
          style={
            isEditModalVisible
              ? { opacity: "0.3" }
              : isAddModalVisible
              ? { opacity: "0.3" }
              : {}
          }
        >
          <SearchBar onChange={handleSearch}>Search Sites</SearchBar>
          <CourseFilter
            onClick={() => setIsCourseListVisible(!isCourseListVisible)}
          >
            {selectedListCourse.title}
          </CourseFilter>
        </div>
        {isCourseListVisible && (
          <ul className={styles.courseList}>
            {courses.map((course) => (
              <li
                className={styles.courseItem}
                key={course.id}
                onClick={() => handleCourseDropList(course.id, course.title)}
              >
                {course.title}
              </li>
            ))}
          </ul>
        )}
        <div
          style={{
            height: "42.5rem",
            overflowY: "auto",
          }}
        >
          <table
            className={styles.table}
            style={
              isEditModalVisible
                ? { opacity: "0.3" }
                : isAddModalVisible
                ? { opacity: "0.3" }
                : {}
            }
          >
            <thead
              style={{
                height: "4.3rem",
              }}
            >
              <tr style={{ backgroundColor: "#DEEFF1" }}>
                <th>Title</th>
                <th>Course</th>
                <th>Learners</th>
                <th>Publisher</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody style={{ height: "4.3rem", textAlign: "center" }}>
              {siteFilterList.map((site, index) => (
                <tr key={site.id} className={styles.row}>
                  {/* Site  Row */}
                  <td>
                    <Link
                      className={styles.link}
                      to={`/learners/${site.id}?course=${site.Study}`}
                    >
                      {site.title}
                    </Link>
                  </td>
                  {/* Course  Row */}
                  {courses?.map((course) => {
                    if (course.id === site.Study) {
                      return <td key={course.id}>{course.title}</td>;
                    }
                  })}
                  {/* Number of learners  Row */}
                  <td>{site.user.length}</td>
                  {/* Publisher Row */}
                  <td>
                    {learners.map((learner) => {
                      if (learner.id === site.publisher) {
                        return learner.email;
                      }
                    })}
                  </td>

                  {/* Action button Row */}
                  <td style={buttonsIsVisible ? tableColStyle : {}}>
                    {!buttonsIsVisible && (
                      <button
                        onClick={() => handleButton(index)}
                        className={styles.actionButton}
                      >
                        ...
                      </button>
                    )}
                    {buttonNum === index && (
                      <div>
                        {buttonOptions.map((option) => (
                          <ActionButton
                            key={option.image}
                            onClick={() =>
                              handleCloseButton(
                                option.text,
                                site.id,
                                site.title,
                                site.Study
                              )
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
          {siteFilterList.length === 0 && (
            <CautionCard type="course-module">
              <p>No Sites</p>
            </CautionCard>
          )}
        </div>
        {isEditModalVisible && (
          <EditSiteModal
            type="site"
            onClick={handleCloseEditModal}
            courseId={selectedSite.study}
            siteId={selectedSite.siteId}
          >
            {selectedSite.title}
          </EditSiteModal>
        )}
        {isAddModalVisible && (
          <AddLearnerModal
            onClick={() => handleCloseAddModal()}
            siteId={selectedSite.siteId}
          />
        )}
        <Toaster />
      </div>
    </div>
  );
}
