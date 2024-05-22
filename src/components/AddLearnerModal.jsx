import SearchBar from "./SearchBar";
import styles from "../components/AddLearnerModal.module.css";
import addIcon from "../assets/icons/buttons/add_icon.png";
import close from "../assets/icons/close.png";
import { useAllUser } from "../services/useAllUser";
import { useAllSite } from "../services/useSite";
import { useUpdateSite } from "../services/useSite";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function AddLearnerModal({ onClick, siteId }) {
  const { data: learners, isLoading } = useAllUser();
  const { data: sites, isLoading: loadingSites } = useAllSite();
  const { updateSite } = useUpdateSite();
  const navigate = useNavigate();
  const [learnersFilterList, setLearnersFilterList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLearnerListVisible, setIsLearnerListVisible] = useState(false);
  const [addedLearnerList, setAddedLearnerList] = useState([]);
  const [uploadData, setUploadData] = useState({});

  useEffect(() => {
    if (!isLoading) {
      if (search.length !== 0) {
        setIsLearnerListVisible(true);
      } else {
        setIsLearnerListVisible(false);
      }
      setLearnersFilterList(
        learners.filter((learner) =>
          `${learner.first_name} ${learner.last_name} ${learner.email}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }
  }, [search, learners, isLoading]);

  useEffect(() => {
    if (!loadingSites) {
      let arry = [];
      for (let i = 0; i < sites.length; i++) {
        if (sites[i].id === siteId) {
          setUploadData((data) => ({
            ...data,
            Study: sites[i].Study,
            publisher: sites[i].publisher,
            title: sites[i].title,
          }));
          for (let y = 0; y < sites[i].user.length; y++) {
            for (let x = 0; x < learners.length; x++) {
              if (sites[i].user[y] === learners[x].id) {
                arry = [...arry, learners[x]];
              }
            }
          }
        }
      }
      setAddedLearnerList(arry);
    }
  }, [siteId, loadingSites, sites, learners]);

  useEffect(() => {
    setUploadData((data) => ({
      ...data,
      id: siteId,
      user: addedLearnerList.map((user) => {
        return user.id;
      }),
    }));
  }, [addedLearnerList, siteId]);

  function handleSearch(e) {
    setSearch(e);
  }

  function handleSave() {
    updateSite(uploadData);
    onClick();
  }

  console.log(uploadData);

  function handleAddListLearner(user) {
    for (let i = 0; i < addedLearnerList.length; i++) {
      if (user.id === addedLearnerList[i].id) {
        setSearch("");
        toast.error("Learner already apart of site");
        return;
      }
    }
    setAddedLearnerList((learner) => [...learner, user]);
    setSearch("");
  }

  function handleRemoveListLearner(userId) {
    setAddedLearnerList((l) => l.filter((learner) => learner.id !== userId));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.side}>
          <img src={addIcon} />
          <span>Add Learner</span>
        </div>
        <button className={styles.closeButton} onClick={onClick}>
          <img src={close} />
        </button>
      </div>
      <div style={{ display: "flex", gap: "2rem", marginRight: "2rem" }}>
        <div className={styles.searchSection}>
          <SearchBar onChange={handleSearch}>Search Learners</SearchBar>
          {isLearnerListVisible && (
            <ul className={styles.learnersList}>
              {learnersFilterList.map((learner) => (
                <li
                  className={styles.listItem}
                  key={learner.id}
                  onClick={() => handleAddListLearner(learner)}
                >
                  {learner.first_name === "" || learner.last_name === ""
                    ? learner.email
                    : `${learner.first_name} ${learner.last_name}`}
                </li>
              ))}
            </ul>
          )}
          <div className={styles.learnersSection}>
            <ul className={styles.selectedLearnerList}>
              {addedLearnerList.map((learner) => (
                <li className={styles.slectedListItem} key={learner.id}>
                  {learner.first_name === "" || learner.last_name === ""
                    ? learner.email
                    : `${learner.first_name} ${learner.last_name}`}
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveListLearner(learner.id)}
                  >
                    <img
                      src={close}
                      style={{ height: "0.7rem", width: "0.7rem" }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.buttonSection}>
          <button
            className={`${styles.button} ${styles.addLearnerButton}`}
            onClick={() => navigate("/sign-up")}
          >
            Add New Learner
          </button>
          <button className={styles.button} onClick={() => handleSave()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddLearnerModal; /* eslint-disable react/prop-types */
