import NavSide from "../components/NavSide";
import Header from "../components/Header";
import mainStyles from "../components/main.module.css";
import styles from "../components/CreateModulePage.module.css";
import moduleIcon from "../assets/icons/module_icon.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { NewModuleContext } from "../components/NewModuleContext";
import {
  useCreateModule,
  useModule,
  useUpdateModule,
} from "../services/useModule";
import { toast } from "react-hot-toast";

export default function CreateModulePage() {
  const localdata = localStorage.getItem("user");
  const userData = JSON.parse(localdata);
  const { data: modules, isLoading: loadingModules } = useModule();
  const { createModule } = useCreateModule();
  const { updateModule } = useUpdateModule();
  const [templateOption, setTemplateOption] = useState("");
  const { newModule, setNewModule, activeTab, setActiveTab } =
    useContext(NewModuleContext);
  const navigate = useNavigate();

  const activeTabStyle = {
    borderRight: "0.5rem solid #49408d",
    backgroundColor: "#F1F1F1",
  };

  useEffect(() => {
    if (activeTab === "title") {
      navigate("/create-module/title");
    }
  }, [navigate, activeTab]);

  useEffect(() => {
    setNewModule((module) => ({ ...module, template: templateOption }));
  }, [templateOption, setNewModule]);

  function handleactiveTab(tab) {
    if (tab === "title") {
      setActiveTab(tab);
    } else if (newModule.title.length !== 0 && tab === "template") {
      setActiveTab(tab);
    } else if (
      templateOption !== null &&
      tab === "designs" &&
      newModule.study.length !== 0
    ) {
      setActiveTab(tab);
    } else if (
      templateOption !== null &&
      tab === "finishing-touches" &&
      newModule.study.length !== 0
    ) {
      setActiveTab(tab);
    }
  }

  function handleSetTemplate() {
    if (!loadingModules) {
      for (let m = 0; m < modules.length; m++) {
        if (newModule.title.toLowerCase() === modules[m].title.toLowerCase()) {
          toast.error(
            "There is a module with this Title. Please use a different title"
          );
          return;
        }
      }
      createModule(newModule);
      navigate("designs");
      setActiveTab("designs");
    }
  }

  // we will need to re- create this function to satisfy the new logics of the module being created after templates
  function handleCreate() {
    updateModule(newModule);
    setNewModule({
      title: "",
      template: "",
      publisher: userData.user,
      study: [],
    });
    setActiveTab("title");
    navigate("/modules");
  }

  function handleCancel() {
    setNewModule({
      title: "",
      template: "",
      publisher: userData.user,
      study: [],
    });
    setActiveTab("title");
    navigate("/modules");
  }

  console.log(newModule);
  console.log(activeTab);

  return (
    <div className={mainStyles.main}>
      <NavSide />
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.side}>
            <img src={moduleIcon} />
            <span>Modules</span>
          </div>
          {activeTab === "designs" ||
          (newModule.title.length !== 0 && templateOption !== "") ? (
            <button
              className={styles.createButton}
              onClick={() => handleCreate()}
            >
              Create
            </button>
          ) : (
            <button className={styles.createButton}>Cancel</button>
          )}
          {/* <button className={styles.createButton}>Create</button> */}
        </div>

        <div className={styles.body}>
          <nav className={styles.bodyNav}>
            <ul className={styles.navList}>
              <Link
                to="title"
                className={styles.link}
                onClick={() => handleactiveTab("title")}
                style={activeTab === "title" ? activeTabStyle : {}}
              >
                <li className={styles.listItem}>Title</li>
              </Link>
              <Link
                to={newModule.title.length !== 0 && "templates"}
                className={styles.link}
                onClick={() => handleactiveTab("template")}
                style={activeTab === "template" ? activeTabStyle : {}}
              >
                <li className={styles.listItem}>Template</li>
              </Link>
              <Link
                to={
                  templateOption !== null &&
                  "designs" &&
                  newModule.study.length !== 0
                }
                className={styles.link}
                onClick={() => handleactiveTab("designs")}
                style={activeTab === "designs" ? activeTabStyle : {}}
              >
                <li className={styles.listItem}>Design</li>
              </Link>
              <Link
                to={
                  templateOption !== null &&
                  "finish" &&
                  newModule.study.length !== 0
                }
                className={styles.link}
                onClick={() => handleactiveTab("finishing-touches")}
                style={activeTab === "finishing-touches" ? activeTabStyle : {}}
              >
                <li className={styles.listItem}>Finishin Touches</li>
              </Link>

              <li
                className={`${styles.link} ${styles.listItem}`}
                style={{ backgroundColor: "#6C9399", marginTop: "26.1rem" }}
                onClick={() => handleCancel()}
              >
                Cancel
              </li>
            </ul>
          </nav>
          <div className={styles.itemContainer}>
            <Outlet
              context={[templateOption, setTemplateOption, handleSetTemplate]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
