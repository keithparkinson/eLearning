import NavSide from "../components/NavSide";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CautionCard from "../components/CautionCard";
import AddModuleCard from "../components/AddModuleCard";
import { useEffect, useState } from "react";
import { useModule } from "../services/useModule";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateModule } from "../services/useModule";
import mainStyles from "../components/main.module.css";
import styles from "../components/AddModulePage.module.css";
import moduleIcon from "../assets/icons/module_icon.png";
export default function AddModulePage() {
  const { data: modules, isLoading } = useModule();
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateModule } = useUpdateModule();
  const [search, setSearch] = useState("");
  const [moduleFilterList, setModuleFilterList] = useState([]);

  useEffect(() => {
    if (isLoading) {
      return () => {
        <span>loading..</span>;
      };
    }

    setModuleFilterList(
      modules.filter((module) =>
        module.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [modules, search, isLoading]);

  function handleSearch(e) {
    setSearch(e);
  }

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

  function handleAddModule(moduleId) {
    let obj = {};
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].id === moduleId) {
        obj = modules[i];
      }
    }
    obj.study = [...obj.study, id];
    updateModule(obj);
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
          <div className={styles.searchSection}>
            <span>Filter: </span>
            <SearchBar onChange={handleSearch}>Search Module</SearchBar>
          </div>
        </div>
        <div className={styles.addButton}>
          <button
            className={styles.button}
            onClick={() => navigate(`/course/${id}`)}
          >
            Done
          </button>
          <button
            className={styles.button}
            onClick={() => navigate("/create-module")}
          >
            Add a new Module
          </button>
        </div>

        <ul className={styles.moduleList}>
          {moduleFilterList.map((module) => (
            <li key={module.id}>
              <AddModuleCard
                onClick={() => handleAddModule(module.id)}
                onHandleRemoveModule={() => handleRemoveModule(module.id)}
                id={id}
              >
                <p>{module.title}</p>
              </AddModuleCard>
            </li>
          ))}
        </ul>
        {moduleFilterList.length === 0 && (
          <CautionCard type="add-modules">
            <p>No Modules</p>
          </CautionCard>
        )}
      </div>
    </div>
  );
}
