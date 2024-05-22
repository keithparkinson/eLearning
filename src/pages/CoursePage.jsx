import NavSide from "../components/NavSide";
import Header from "../components/Header";
import ModuleCard from "../components/ModuleCard";
import CautionCard from "../components/CautionCard";
import EditCourseModal from "../components/EditCourseModal";
import EditSiteModal from "../components/EditSiteModal";
import { useAllSite } from "../services/useSite";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useModule } from "../services/useModule";
import { useStudy } from "../services/useStudy";
import { useDeleteSite } from "../services/useSite";
import { useUpdateModule } from "../services/useModule";
import mainStyles from "../components/main.module.css";
import styles from "../components/CoursePage2.module.css";
import addIcon from "../assets/icons/buttons/add_icon.png";
import headerIcon from "../assets/icons/course_header_icon.png";
import downArrow from "../assets/icons/down_arrow.png";
import close from "../assets/icons/close.png";
import pencil from "../assets/icons/pencil.png";

export default function CoursePage() {
  const { data: sites, isLoading } = useAllSite();
  const { data: modules, isLoading: modulesIsLoading } = useModule();
  const { data: courses, isLoading: loadingCourses } = useStudy();
  const { deleteSite } = useDeleteSite();
  const { updateModule, isSuccess } = useUpdateModule();
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseModules, setCourseModules] = useState([]);
  const [courseSites, setCourseSites] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSiteModalVisible, setIsSiteModalVisible] = useState(false);
  const [isSiteListVisible, setIsSiteListVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});

  useEffect(() => {
    if (modulesIsLoading || isLoading || loadingCourses) {
      return () => {
        <span>loading..</span>;
      };
    }
    setCourseModules(modules.filter((module) => module.study.includes(id)));
  }, [modules, id, modulesIsLoading, isLoading, loadingCourses, isSuccess]);

  useEffect(() => {
    if (!isLoading) {
      setCourseSites(sites.filter((site) => site.Study === id));
    }
  }, [sites, id, isLoading]);

  useEffect(() => {
    if (!loadingCourses) {
      courses.map((course) => {
        if (course.id === id) {
          setSelectedCourse(course);
        }
      });
    }
  }, [courses, id, loadingCourses]);

  function handleAddSiteModal() {
    setIsSiteModalVisible(true);
    setIsModalVisible(false);
  }

  function handleEditModal() {
    setIsModalVisible(true);
    setIsSiteModalVisible(false);
  }

  function handleCloseEditModal() {
    setIsModalVisible(false);
  }

  function handleCloseAddSiteModal() {
    setIsSiteModalVisible(false);
  }

  function handleRemoveSite(id) {
    deleteSite(id);
  }

  // navigate(`/course-modules/${id}/&${selectedSiteModules}`);

  function handleRemoveModule(moduleId) {
    let obj = {};

    for (var i = 0; i < modules.length; i++) {
      if (modules[i].id === moduleId) {
        obj = modules[i];
        for (var x = 0; x < obj.study.length; x++) {
          if (obj.study[x] === id) {
            var filterObj = obj.study.splice(x, 1);
            console.log(filterObj);
          }
        }
      }
    }
    updateModule(obj);
  }

  return (
    <div className={mainStyles.main}>
      <NavSide />
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.courseContainer}>
          <div className={styles.header}>
            <div className={styles.side}>
              <img src={headerIcon} />
              <span>{selectedCourse.title}</span>
            </div>
            <button
              className={styles.side_btn}
              onClick={() => handleEditModal()}
            >
              <img src={pencil} style={{ height: "1rem", width: "1rem" }} />
              <span>Edit</span>
            </button>
          </div>

          <div className={styles.bodySection}>
            <label
              htmlFor="course-image"
              className={styles.uploadButton}
              style={
                isModalVisible
                  ? { opacity: 0.3 }
                  : isSiteModalVisible
                  ? { opacity: 0.3 }
                  : {}
              }
            >
              <img
                src={selectedCourse.study_image}
                style={{ marginTop: "1rem" }}
              />
              <p>No image/Upload image</p>
              <input
                type="file"
                id="course-image"
                style={{ display: "none" }}
              />
            </label>
            <div
              className={styles.siteSection}
              style={
                isModalVisible
                  ? { opacity: 0.3 }
                  : isSiteModalVisible
                  ? { opacity: 0.3 }
                  : {}
              }
            >
              <div className={styles.siteButtonSection}>
                <button
                  className={styles.dropList}
                  onClick={() => setIsSiteListVisible(!isSiteListVisible)}
                  style={
                    isSiteListVisible
                      ? {
                          borderBottomLeftRadius: "0",
                          borderBottomRightRadius: "0",
                        }
                      : {}
                  }
                >
                  Sites <img src={downArrow} style={{ marginLeft: "5rem" }} />
                </button>
                {isSiteListVisible && (
                  <ul className={styles.siteList}>
                    {courseSites.length === 0 && (
                      <li className={styles.listItem}> No Sites</li>
                    )}
                    {courseSites.map((site) => (
                      <li className={styles.listItem} key={site.id}>
                        <span style={{ marginLeft: "2rem" }}>{site.title}</span>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() => handleRemoveSite(site.id)}
                        >
                          <img src={close} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button className={styles.previewButton}>Preview Course</button>
            </div>
            <button
              className={styles.addSite_btn}
              onClick={() => handleAddSiteModal()}
            >
              <img src={addIcon} />
              Add site
            </button>
            {courseSites.length === 0 && !isSiteModalVisible && (
              <CautionCard>
                <p>No Sites Added</p>
              </CautionCard>
            )}
            {isModalVisible && (
              <EditCourseModal
                type="edit"
                onClick={handleCloseEditModal}
                courseId={id}
              >
                {selectedCourse.title}
              </EditCourseModal>
            )}
            {isSiteModalVisible && (
              <EditSiteModal
                type="course"
                onClick={handleCloseAddSiteModal}
                courseId={id}
              ></EditSiteModal>
            )}
          </div>
        </div>

        <div className={styles.moduleContainer}>
          <div className={styles.header}>
            <div className={styles.side}>
              <img src={headerIcon} />
              <span>Modules</span>
            </div>
            <button
              className={styles.addModule_btn}
              onClick={() => navigate(`/course-modules/${id}`)}
            >
              <img src={addIcon} />
              Add Module
            </button>
          </div>
          <ul className={styles.moduleList}>
            {courseModules.map((module) => (
              <li key={module.id}>
                <ModuleCard onClick={() => handleRemoveModule(module.id)}>
                  {module.title}
                </ModuleCard>
              </li>
            ))}
          </ul>
          {courseModules.length === 0 && (
            <CautionCard type="course-module">
              <p>No Modules Added</p>
            </CautionCard>
          )}
        </div>
        <Toaster />
      </main>
    </div>
  );
} /* eslint-disable no-unused-vars */
