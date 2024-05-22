import { createContext, useState } from "react";

const NewModuleContext = createContext();
/* eslint-disable react/prop-types */
function ModuleProvider({ children }) {
  const localdata = localStorage.getItem("user");
  const userData = JSON.parse(localdata);
  // const [newVideoUpload, setNewVideoUpload] = useState({
  //   video: "",
  //   module: [],
  // });
  // const [newContentUpload, setNewContentUpload] = useState({
  //   content: "",
  //   module: "",
  // });
  // const [newImagesUpload, setNewImagesUpload] = useState([]);
  const [newModule, setNewModule] = useState({
    title: "",
    template: "",
    publisher: userData?.user,
    study: [],
  });
  const [editModule, setEditModule] = useState({
    title: "",
    template: "",
    publisher: "",
    study: [],
  });

  const [activeTab, setActiveTab] = useState("title");

  function handleNewModuleTitle(e) {
    setNewModule((module) => ({ ...module, title: e }));
  }

  function handleEditModuleTitle(e) {
    setEditModule((module) => ({ ...module, title: e }));
  }

  function handleNewModuleStudy(course) {
    setNewModule((module) => ({ ...module, study: [...module.study, course] }));
  }

  function handleRemoveNewModuleStudy(course) {
    setNewModule((module) => ({
      ...module,
      study: module.study.filter((study) => study !== course),
    }));
  }

  function handleEditModuleStudy(course) {
    setEditModule((module) => ({
      ...module,
      study: [...module.study, course],
    }));
  }

  function handleRemoveEditModuleStudy(course) {
    setEditModule((module) => ({
      ...module,
      study: module.study.filter((study) => study !== course),
    }));
  }

  return (
    <NewModuleContext.Provider
      value={{
        activeTab,
        setActiveTab,
        newModule,
        setNewModule,
        onHandleTitle: handleNewModuleTitle,
        onHandleNewModuleStudy: handleNewModuleStudy,
        editModule,
        setEditModule,
        onHandleEditModuleTitle: handleEditModuleTitle,
        onHandleEditModuleStudy: handleEditModuleStudy,
        onHandleRemoveNewModuleStudy: handleRemoveNewModuleStudy,
        onHandleRemoveEditModuleStudy: handleRemoveEditModuleStudy,
      }}
    >
      {children}
    </NewModuleContext.Provider>
  );
}
export { ModuleProvider, NewModuleContext };
/* eslint-disable react/prop-types */
