import NavSide from "../components/NavSide";
import Header from "../components/Header";
import mainStyles from "../components/main.module.css";
import styles from "../components/CreateModulePage.module.css";
import moduleIcon from "../assets/icons/module_icon.png";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { NewModuleContext } from "../components/NewModuleContext";
import { useUpdateModule } from "../services/useModule";
import { useModule } from "../services/useModule";

export default function EditModulePage() {
  const { updateModule } = useUpdateModule();
  const { data: modules, isLoading } = useModule();
  const { id } = useParams();
  const [templateOption, setTemplateOption] = useState("");
  const { editModule, setEditModule, activeTab, setActiveTab } =
    useContext(NewModuleContext);
  const navigate = useNavigate();

  const activeTabStyle = {
    borderRight: "0.5rem solid #49408d",
    backgroundColor: "#F1F1F1",
  };

  useEffect(() => {
    if (!isLoading) {
      for (let i = 0; i < modules.length; i++) {
        if (modules[i].id === id) {
          setEditModule(modules[i]);
        }
      }
    }
  }, [id, isLoading, modules, setEditModule]);

  useEffect(() => {
    if (activeTab === "title") {
      navigate(`/edit-module/${id}/title`);
    }
  }, [navigate, activeTab, id]);

  // useEffect(() => {
  //   setEditModule((module) => ({ ...module, template: templateOption }));
  // }, [templateOption, setEditModule]);

  function handleactiveTab(tab) {
    if (tab === "title") {
      setActiveTab(tab);
    } else if (editModule.title.length !== 0 && tab === "template") {
      setActiveTab(tab);
    } else if (templateOption !== "" && tab === "designs") {
      setActiveTab(tab);
    } else if (templateOption !== "" && tab === "finishing-touches") {
      setActiveTab(tab);
    }
  }

  function handleSave() {
    updateModule(editModule);
    setActiveTab("title");
    setEditModule({
      title: "",
      template: "",
      publisher: "",
      study: [],
    });
    navigate("/modules");
  }

  function handleCancel() {
    setActiveTab("title");
    navigate("/modules");
    setEditModule({
      title: "",
      template: "",
      publisher: "",
      study: [],
    });
  }

  console.log(editModule);
  // console.log(newModule.title.length);
  // console.log(templateOption);
  // console.log(activeTab);

  if (isLoading) {
    return () => {
      <span>...loading</span>;
    };
  }

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
          (editModule.title?.length !== 0 && templateOption !== "") ? (
            <button
              className={styles.createButton}
              onClick={() => handleSave()}
            >
              Save
            </button>
          ) : (
            <button
              className={styles.createButton}
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          )}
          {/* <button className={styles.createButton}>Create</button> */}
        </div>

        <div className={styles.body}>
          <nav className={styles.bodyNav}>
            <ul className={styles.navList}>
              <Link
                to={`/edit-module/${id}/title`}
                className={styles.link}
                onClick={() => handleactiveTab("title")}
                style={activeTab === "title" ? activeTabStyle : {}}
              >
                <li className={styles.listItem}>Title</li>
              </Link>
              <Link
                to={
                  editModule.title?.length !== 0 &&
                  `/edit-module/${id}/templates/?temp=${editModule.template}`
                }
                className={styles.link}
                onClick={() => handleactiveTab("template")}
                style={activeTab === "template" ? activeTabStyle : {}}
              >
                <li className={styles.listItem}>Template</li>
              </Link>
              <Link
                to={templateOption !== "" && `/edit-module/${id}/designs`}
                className={styles.link}
                onClick={() => handleactiveTab("designs")}
                style={activeTab === "designs" ? activeTabStyle : {}}
              >
                <li className={styles.listItem}>Design</li>
              </Link>
              <Link
                to={`/edit-module/${id}/finish`}
                className={styles.link}
                onClick={() => handleactiveTab("finishing-touches")}
                style={activeTab === "finishing-touches" ? activeTabStyle : {}}
              >
                <li className={styles.listItem}>Finishin Touches</li>
              </Link>

              {/* <Link
                // to={() => handleCancel()}
                className={styles.link}
                style={{ backgroundColor: "#6C9399", marginTop: "26.1rem" }}
                // onClick={() => handleCancel()}
              >
                < className={styles.listItem} onClick={() => handleCancel()}>
                  Cancel
                </li>
              </Link> */}
            </ul>
          </nav>
          <div className={styles.itemContainer}>
            <Outlet context={[templateOption, setTemplateOption]} />
          </div>
        </div>
      </div>
    </div>
  );
}
