import NavSide from "../components/NavSide";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import AddLearnerSite from "../components/AddLearnerSite";
import ActionButton from "../components/ActionButton";
import CautionCard from "../components/CautionCard";
import { useEffect, useState } from "react";
import { useAllUser } from "../services/useAllUser";
import { useAllSite } from "../services/useSite";
import { useUpdateSite } from "../services/useSite";
import { useStudy } from "../services/useStudy";
import { useDeleteUser } from "../services/useAllUser";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import mainStyles from "../components/main.module.css";
import styles from "../components/LearnersPage.module.css";
import addIcon from "../assets/icons/buttons/add_icon.png";
import canIcon from "../assets/icons/buttons/can_icon.png";
import close from "../assets/icons/close.png";
import learnersIcon from "../assets/icons/learners_icon.png";
import downArrow from "../assets/icons/down_arrow.png";
import { Toaster } from "react-hot-toast";

export default function LearnersPage() {
  const { data: users, isLoading: loadingUsers } = useAllUser();
  const { data: sites, isLoading: loadingSites } = useAllSite();
  const { data: courses, isLoading: loadingCourses } = useStudy();
  const { deleteUser } = useDeleteUser();
  const { updateSite } = useUpdateSite();
  const [buttonsIsVisible, setButtonIsVisible] = useState(false);
  const [isCourseListVisible, setIsCourseListVisible] = useState(false);
  const [isSiteListVisible, setIsSiteListVisible] = useState(false);
  const [isAddSiteModalVisible, setIsAddSiteModalVisible] = useState(false);
  const [buttonNum, setButtonNum] = useState();
  const [learnerFilterList, setLearnerFilterList] = useState([]);
  const [siteFilterList, setSiteFilterList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { id: siteId } = useParams();
  const [selectedSite, setSelectedSite] = useState({ title: "Sites" });
  const [selectedCourse, setSelectedCourse] = useState({ title: "Courses" });
  const [selectedLearner, setSelectedLearner] = useState("");
  const [siteCount, setSiteCount] = useState([]);
  const [isLeavingSite, setIsLeavingSite] = useState(false);
  // const [courseCount, setCourseCount] = useState([]);

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // this Use Effect is when a site was selected from the site pages and will select the Course and Site associated with site that was selected Or if you select a course and Site from The Learners page to filter
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (loadingUsers || loadingSites || loadingCourses) {
      return () => {
        <span>loading..</span>;
      };
    }
    if (
      (selectedCourse.title !== "Courses" && search.length > 0) ||
      (selectedSite.title !== "Sites" && search.length > 0)
    ) {
      setSelectedCourse((course) => ({ ...course, title: "Courses" }));
      setSelectedSite((site) => ({ ...site, title: "Sites" }));
      setIsSiteListVisible(false);
    }

    setLearnerFilterList([]);

    if (
      siteId !== undefined &&
      search.length === 0 &&
      selectedCourse.title === "Courses"
    ) {
      // let arry = [];
      for (let i = 0; i < sites.length; i++) {
        if (sites[i].id === siteId) {
          setSelectedSite(sites[i]);
          for (let z = 0; z < courses.length; z++) {
            if (courses[z].id === sites[i].Study) {
              setSelectedCourse(courses[z]);
            }
          }

          for (let y = 0; y < sites[i].user.length; y++) {
            for (let x = 0; x < users.length; x++) {
              if (sites[i].user[y] === users[x].id) {
                setLearnerFilterList((learner) => [...learner, users[x]]);
              }
            }
          }
        }
      }
    } else if (
      (siteId === undefined &&
        search.length === 0 &&
        selectedCourse.title !== "Courses") ||
      (siteId !== undefined &&
        search.length === 0 &&
        selectedCourse.title !== "Courses")
    ) {
      let filter = [];
      let userFilter = [];
      for (let i = 0; i < siteFilterList.length; i++) {
        for (let z = 0; z < siteFilterList[i].user.length; z++) {
          filter = [...filter, siteFilterList[i].user[z]];
        }
      }

      for (let e = 0; e < filter.length; e++) {
        for (let a = 0; a < users.length; a++) {
          if (filter[e] === users[a].id) {
            userFilter = [...userFilter, users[a]];
          }
        }
      }
      setLearnerFilterList(userFilter);

      if (selectedSite.title !== "Sites") {
        let siteUserFilter = [];
        for (let x = 0; x < selectedSite.user?.length; x++) {
          for (let y = 0; y < users.length; y++) {
            if (selectedSite.user[x] === users[y].id) {
              siteUserFilter = [...siteUserFilter, users[y]];
            }
          }
        }
        setLearnerFilterList(siteUserFilter);
      }
    } else {
      setLearnerFilterList(
        users.filter((user) =>
          `${user.first_name} ${user.last_name} ${user.email}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }
  }, [
    users,
    loadingUsers,
    search,
    loadingSites,
    siteId,
    sites,
    loadingCourses,
    courses,
    siteFilterList,
    selectedCourse,
    selectedSite,
  ]);

  // This effect to calculate how many  sites a Learner is assigned to.
  useEffect(() => {
    if (!loadingUsers || !loadingSites) {
      setSiteCount([]);
      for (let x = 0; x < learnerFilterList.length; x++) {
        let num = 0;
        for (let y = 0; y < sites.length; y++) {
          for (let z = 0; z < sites[y].user.length; z++) {
            if (sites[y].user[z] === learnerFilterList[x].id) {
              num = num + 1;
            }
          }
        }
        setSiteCount((count) => [...count, num]);
      }
    }
  }, [
    learnerFilterList,
    loadingSites,
    loadingUsers,
    sites,
    isAddSiteModalVisible,
  ]);

  // this will come in effect if the user is trying to leave a site, it will trigger the update site Api.
  useEffect(() => {
    if (siteId !== undefined && isLeavingSite) {
      updateSite(selectedSite);
      setIsLeavingSite(false);
    }
  }, [selectedSite, siteId, updateSite, isLeavingSite]);

  const buttonOptions = [
    {
      image: addIcon,
      text: "Add To Site",
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

  function handleCloseButton(option, id) {
    if (option === "Delete") {
      deleteUser(id);
    } else if (option === "Add To Site") {
      setIsAddSiteModalVisible(true);
      setSelectedLearner(id);
    }

    setButtonNum();
    setButtonIsVisible(false);
  }

  function handleSearch(e) {
    setSearch(e);
  }

  function handleCourseList(course) {
    setSelectedCourse(course);
    setIsCourseListVisible(false);
    setIsSiteListVisible(true);
    setSiteFilterList(sites.filter((site) => site.Study === course.id));
  }

  function handleSiteList(site) {
    setSelectedSite(site);
    setIsSiteListVisible(false);
  }

  function handleCloseAddModal() {
    setIsAddSiteModalVisible(false);
  }

  function handleLeaveSite(userId) {
    if (siteId !== undefined) {
      var filt = [];

      filt = selectedSite.user.filter((l) => l !== userId);

      setSelectedSite((site) => ({ ...site, user: filt }));
      setIsLeavingSite(true);
    }
    setButtonNum();
    setButtonIsVisible(false);
  }
  console.log(siteFilterList);
  return (
    <div className={mainStyles.main}>
      <NavSide />
      <Header />
      <div className={styles.container}>
        <div
          className={styles.header}
          style={isAddSiteModalVisible ? { opacity: "0.3" } : {}}
        >
          <div className={styles.title}>
            <img src={learnersIcon} />
            <span>Learners</span>
          </div>
          <button
            className={styles.addLearner_btn}
            onClick={() => navigate("/sign-up")}
          >
            <img src={addIcon} />
            Add New Learner
          </button>
        </div>
        <div
          className={styles.searchSection}
          style={isAddSiteModalVisible ? { opacity: "0.3" } : {}}
        >
          <SearchBar onChange={handleSearch}>Search Learners</SearchBar>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <label>Filter: </label>
            <button
              className={styles.filterButton}
              onClick={() => setIsCourseListVisible(!isCourseListVisible)}
            >
              {selectedCourse.title}
              <img src={downArrow} style={{ marginLeft: "2rem" }} />
            </button>
            {isCourseListVisible && (
              <ul className={styles.courseList}>
                {courses.map((course) => (
                  <li
                    className={styles.filterItem}
                    key={course.id}
                    onClick={() => handleCourseList(course)}
                  >
                    {course.title}
                  </li>
                ))}
              </ul>
            )}

            <button
              className={styles.filterButton}
              onClick={() => setIsSiteListVisible(!isSiteListVisible)}
              disabled={selectedCourse.title === "Courses" && true}
            >
              {selectedSite.title}
              <img src={downArrow} style={{ marginLeft: "2rem" }} />
            </button>

            {isSiteListVisible && (
              <ul className={styles.siteList}>
                {siteFilterList.map((site) => (
                  <li
                    className={styles.filterItem}
                    key={site.id}
                    onClick={() => handleSiteList(site)}
                  >
                    {site.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div style={{ height: "42.5rem", overflowY: "auto" }}>
          <table
            className={styles.table}
            style={isAddSiteModalVisible ? { opacity: "0.3" } : {}}
          >
            <thead
              style={{
                height: "4.3rem",
              }}
            >
              <tr style={{ backgroundColor: "#DEEFF1" }}>
                <th>Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Last Logged In</th>
                <th>Sites</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody style={{ height: "4.3rem", textAlign: "center" }}>
              {learnerFilterList.map((user, index) => (
                <tr key={user.id} className={styles.row}>
                  <td>
                    <Link to={`/learner/${user.id}`} className={styles.link}>
                      {user.first_name === "" && user.last_name === ""
                        ? "N/A"
                        : `${user.first_name} ${user.last_name}`}
                    </Link>
                  </td>

                  <td>
                    <Link to={`/learner/${user.id}`} className={styles.link}>
                      {user.email}
                    </Link>
                  </td>
                  <td>{user.role}</td>
                  <td>10/10/2024</td>
                  {/* Site count number  */}
                  <td> {siteCount[index]}</td>
                  {/* Course numbers  */}
                  {/* <td></td> */}

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
                            key={option.text}
                            onClick={() =>
                              handleCloseButton(option.text, user.id)
                            }
                          >
                            <img src={option.image} />
                            <span>{option.text}</span>
                          </ActionButton>
                        ))}
                        {siteId !== undefined && (
                          <ActionButton
                            onClick={() => handleLeaveSite(user.id)}
                          >{`- Leave ${selectedSite.title}`}</ActionButton>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {learnerFilterList.length === 0 && (
            <CautionCard type="learners">
              <p>No Learners</p>
            </CautionCard>
          )}
        </div>
        {isAddSiteModalVisible && (
          <AddLearnerSite
            type="learners-page"
            learnerId={selectedLearner}
            onClick={handleCloseAddModal}
          ></AddLearnerSite>
        )}
      </div>
      <Toaster />
    </div>
  );
}
