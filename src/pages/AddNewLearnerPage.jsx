import NavSide from "../components/NavSide";
import Header from "../components/Header";
import AddLearnerSite from "../components/AddLearnerSite";
import CautionModal from "../components/CautionModal";
import mainStyles from "../components/main.module.css";
import styles from "../components/AddNewLearnerPage.module.css";
import plus from "../assets/icons/buttons/plus.png";
import addIcon from "../assets/icons/buttons/add_icon.png";
import learnersIcon from "../assets/icons/learners_icon.png";
import { useCreateUser } from "../services/useAllUser";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function AddNewLearnerPage() {
  const { createUser } = useCreateUser();
  const navigate = useNavigate();
  const [isAddinSites, setIsAddinSites] = useState(false);
  const [addedLearner, setAddedLearner] = useState({});
  const [formAction, setFormAction] = useState("");
  const [isCaution, setIsCaution] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "Henry@1234!",
    },
  });

  function onSubmit(data) {
    setAddedLearner(data);

    if (!isAddinSites && formAction === "Add another Learner") {
      createUser(data);
      reset();
    } else if (!isAddinSites && formAction === "Add") {
      createUser(data);
      navigate("/learners");
    } else if (isAddinSites && formAction === "Add Sites") {
      createUser(data);
    }
  }

  function handleCancel() {
    navigate("/learners");
  }

  function handleAddingSites() {
    setIsAddinSites(true);
    setFormAction("Add Sites");
  }

  function handleSaveSites() {
    reset();
    setIsAddinSites(false);
    setIsCaution(false);
  }

  return (
    <div className={mainStyles.main}>
      <NavSide />
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={learnersIcon} />
          <span>New Learner</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className={styles.informationSection}>
              <div>
                <label htmlFor="first-name">First Name: </label>
                <br />
                <input
                  type="text"
                  id="first-name"
                  className={styles.input}
                  {...register("first_name")}
                />
              </div>

              <div>
                <label htmlFor="last-name">Last Name: </label>
                <br />
                <input
                  type="text"
                  id="last-name"
                  className={styles.input}
                  {...register("last_name")}
                />
              </div>

              <div>
                <label htmlFor="email">Email: </label>
                <br />
                <input
                  type="text"
                  id="email"
                  className={styles.input}
                  {...register("email")}
                />
              </div>

              <div>
                <label htmlFor="username">Username: </label>
                <br />
                <input
                  type="text"
                  id="username"
                  className={styles.input}
                  disabled
                />
              </div>
            </div>

            <div className={styles.passwordSection}>
              <div className={styles.header}>
                <span>Set Password</span>
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <label htmlFor="password">New Password: </label>
                <br />
                <input type="text" id="password" className={styles.input} />
              </div>

              <div style={{ marginLeft: "2rem" }}>
                <label htmlFor="password-2">Confirm New Password: </label>
                <br />
                <input type="text" id="password-2" className={styles.input} />
              </div>
            </div>
            <div style={{ marginLeft: "5rem" }}>
              {!isAddinSites && (
                <button
                  className={styles.addLearnerButton}
                  onClick={() => setFormAction("Add another Learner")}
                >
                  <img src={addIcon} />
                  Add another Learner
                </button>
              )}
            </div>
          </div>

          <div className={styles.formButtonSection}>
            <button
              className={styles.formButton}
              type="button"
              onClick={() => navigate("/learners")}
            >
              Cancel
            </button>
            <button
              className={styles.formButton}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                backgroundColor: "#e45399",
              }}
              onClick={() => setFormAction("Add")}
            >
              <img src={plus} />
              Add
            </button>

            <button
              onClick={() => setIsCaution(true)}
              className={styles.siteButton}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                backgroundColor: "#e45399",
                padding: "0.3rem 0 0.3rem 0",
              }}
              type="button"
            >
              <img src={addIcon} />
              Add Sites
            </button>
            {isCaution && (
              <CautionModal
                type="signUp"
                onHandleCancle={setIsCaution}
                onHandleAdd={handleAddingSites}
              >
                Note: if you add sites, this user will be created. do you wish
                to continue ?
              </CautionModal>
            )}
          </div>
        </form>
        {isAddinSites && (
          <AddLearnerSite
            onHandleCancel={handleCancel}
            type="signUp"
            addedLearner={addedLearner}
            onHandleAddAnother={handleSaveSites}
          ></AddLearnerSite>
        )}
      </div>
      <Toaster />
    </div>
  );
}
