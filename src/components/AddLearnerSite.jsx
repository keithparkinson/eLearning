import { useEffect, useState } from "react";
import { useAllSite } from "../services/useSite";
import { useStudy } from "../services/useStudy";
import { useAllUser } from "../services/useAllUser";
import { useUpdateSite } from "../services/useSite";
import { useCreateProgress } from "../services/useProgress";
import SearhBar from "../components/SearchBar";
import ModalButton from "../components/ModalButton";
import styles from "../components/AddLearnerSite.module.css";
import downArrow from "../assets/icons/down_arrow.png";
import addIcon from "../assets/icons/buttons/add_icon.png";
import close from "../assets/icons/close.png";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function AddLearnerSite({
  type,
  onClick,
  learnerId,
  onHandleCancel,
  addedLearner,
  onHandleAddAnother,
}) {
  const { data: sites, isLoading } = useAllSite();
  const { data: courses } = useStudy();
  const { data: learners, isLoading: loadingLearners } = useAllUser();
  const { updateSite } = useUpdateSite();
  const navigate = useNavigate();
  const { createProg } = useCreateProgress();
  const [isCourseListVisible, setIsCourseListVisible] = useState(false);
  const [isSiteListVisible, setIsSiteListVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("learner-page");
  const [siteFilterList, setSiteFilterList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({ title: "Courses" });
  const [selectedSite, setSelectedSite] = useState({ title: "Sites" });
  const [learnersSiteList, setLearnersSiteList] = useState([]);
  const [newLearner, setNewLearner] = useState({});

  useEffect(() => {
    if (isLoading) {
      return () => {
        <span>...</span>;
      };
    }

    if (search.length > 0 && selectedCourse.title !== "Courses") {
      setSelectedCourse("Courses");
    }

    if (search.length === 0) {
      setSearchType("learner-page");
    } else {
      setSearchType("drop-list");
    }
    if (search.length === 0 && selectedCourse.title !== "Courses") {
      setSiteFilterList(
        sites.filter((site) => site.Study.includes(selectedCourse.id))
      );
    } else {
      setSiteFilterList(sites.filter((site) => site.title.includes(search)));
    }
  }, [sites, search, isLoading, selectedCourse]);

  useEffect(() => {
    if (!loadingLearners && addedLearner !== undefined) {
      let user = {};
      for (let l = 0; l < learners.length; l++) {
        if (learners[l].email === addedLearner.email) {
          user = learners[l];
        }
      }
      setNewLearner(user);
    }
  }, [loadingLearners, addedLearner, learners]);

  useEffect(() => {
    if (!isLoading) {
      if (addedLearner === undefined) {
        let siteFilter = [];
        for (let x = 0; x < sites.length; x++) {
          for (let y = 0; y < sites[x].user.length; y++) {
            if (sites[x].user[y] === learnerId) {
              siteFilter = [...siteFilter, sites[x]];
            }
          }
        }
        setLearnersSiteList(siteFilter);
      } else if (learnerId === undefined) {
        let siteFilter = [];

        for (let x = 0; x < sites.length; x++) {
          for (let y = 0; y < sites[x].user.length; y++) {
            if (sites[x].user[y] === newLearner.id) {
              siteFilter = [...siteFilter, sites[x]];
            }
          }
        }
        setLearnersSiteList(siteFilter);
      }
    }
  }, [learnerId, sites, isLoading, newLearner, addedLearner]);

  function handleSearch(e) {
    setSearch(e);
  }

  function handleSelectedCourse(course) {
    setIsCourseListVisible(!isCourseListVisible);
    setSelectedCourse(course);
    setIsSiteListVisible(true);
  }

  function handleCousreList() {
    setIsCourseListVisible(!isCourseListVisible);
    setIsSiteListVisible(false);
  }

  function handleAddSite(site) {
    let newProgress = {};
    for (let x = 0; x < learnersSiteList.length; x++) {
      if (site.id === learnersSiteList[x].id) {
        return;
      }
    }
    if (learnerId === undefined) {
      site.user = [...site.user, newLearner.id];
      newProgress = { ...newProgress, study: site.study, user: newLearner.id };
    } else if (addedLearner === undefined) {
      site.user = [...site.user, learnerId];
      newProgress = { ...newProgress, Study: site.Study, user: learnerId };
    }
    console.log(newProgress);

    setSelectedSite(site);
    setLearnersSiteList((learner) => [...learner, site]);
    setIsSiteListVisible(false);
    updateSite(site);
    createProg(newProgress);
  }

  function handleRemoveSite(site) {
    // filter out the learnerId and save the reminder in filt
    let filt = [];
    filt = site.user.filter((u) => u !== learnerId);

    // this will remove the site  from the learnerSiteList to give a visiual representation of the site being removed
    setLearnersSiteList((learner) => learner.filter((s) => s.id !== site.id));

    // update site object and saving the filtered users array:filt to send it to the updateSite Api
    site = { ...site, user: filt };
    updateSite(site);
  }

  function handleSave() {
    if (type !== "signUp") {
      onClick();
      toast.success("Learner's Site List was Updated");
    } else if (type === "signUp") {
      toast.success("Learner's Site List was Updated");
      navigate("/learners");
    }
  }

  return (
    <div className={`${styles.siteSection} ${styles[type]}`}>
      <div className={styles.header}>
        <img src={addIcon} />
        <span>Add Sites</span>
      </div>
      <div className={styles.controlContainer}>
        <div className={styles.side}>
          <SearhBar type={searchType} onChange={handleSearch}>
            Search Sites
          </SearhBar>
          {search.length !== 0 && (
            <ul className={styles.filterList}>
              {siteFilterList.map((site) => (
                <li key={site.id} className={styles.filterItem}>
                  {site.title}
                </li>
              ))}
            </ul>
          )}
          <div className={styles.siteListContainer}>
            <ul className={styles.siteContainerList}>
              {learnersSiteList.map((site) => (
                <li className={styles.containerItem} key={site.id}>
                  {site.title}
                  <button
                    onClick={() => handleRemoveSite(site)}
                    style={{ border: "none", backgroundColor: "transparent" }}
                    type="button"
                  >
                    <img
                      src={close}
                      style={{ width: "0.7rem", height: "0.7rem" }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.side}>
          <label>Filter: </label>
          <button
            className={styles.button}
            onClick={() => handleCousreList()}
            type="button"
          >
            {selectedCourse.title}
            <img src={downArrow} style={{ marginLeft: "2rem" }} />
          </button>
          {isCourseListVisible && (
            <ul className={styles.courseList}>
              {courses.map((course) => (
                <li
                  className={styles.listItem}
                  key={course.id}
                  onClick={() => handleSelectedCourse(course)}
                >
                  {course.title}
                </li>
              ))}
            </ul>
          )}

          <button
            className={styles.button}
            onClick={() => setIsSiteListVisible(!isSiteListVisible)}
            disabled={selectedCourse.title === "Courses"}
            type="button"
          >
            {selectedSite.title}
            <img src={downArrow} style={{ marginLeft: "2rem" }} />
          </button>

          {isSiteListVisible && (
            <ul className={styles.siteList}>
              {siteFilterList.map((site) => (
                <li
                  className={styles.listItem}
                  key={site.id}
                  onClick={() => handleAddSite(site)}
                >
                  {site.title}
                </li>
              ))}
            </ul>
          )}
          {type !== "learners-page" && (
            <button
              className={styles.addAnotherButton}
              type="button"
              onClick={() => onHandleAddAnother()}
            >
              <img src={addIcon} /> Add Another Learner
            </button>
          )}
        </div>
      </div>

      <div className={styles.buttonSection}>
        <ModalButton
          type="cancel"
          onClick={type === "signUp" ? onHandleCancel : onClick}
        >
          Cancel
        </ModalButton>
        <ModalButton type="save" onClick={() => handleSave()}>
          Save
        </ModalButton>
      </div>
    </div>
  );
} /* eslint-disable react/prop-types */
export default AddLearnerSite;
