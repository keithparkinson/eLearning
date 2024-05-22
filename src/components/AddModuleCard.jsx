import addIcon from "../assets/icons/buttons/add_icon.png";
import moduleSign from "../assets/icons/module_display.png";
import checkIcon from "../assets/icons/buttons/check_icon.png";
import { useEffect, useState } from "react";
import { useModule } from "../services/useModule";
/* eslint-disable react/prop-types */
function AddModuleCard({ children, onClick, onHandleRemoveModule, id }) {
  const { data: modules, isLoading } = useModule();
  const [isModuleAdded, setIsModuleAdded] = useState(false);
  const [addedModule, setAddedModule] = useState("");
  const cardContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "18rem",
    width: "13.4rem",
    backgroundColor: "#DEEFF1",
    borderRadius: "10px",
    paddingTop: "1rem",
  };

  // useEffect(() => {
  //   if (isLoading) {
  //     return () => {
  //       <span></span>;
  //     };
  //   } else {
  //     for (var i = 0; i < modules.length; i++) {
  //       if (modules[i].title.includes("m")) {
  //         for (var y = 0; modules[i].study.length; y++) {
  //           if (modules[i].study[y] === id) {
  //             console.log(modules[i]);
  //           }
  //         }
  //       }
  //     }
  //   }
  // }, [isLoading, modules, id, children]);

  useEffect(() => {
    let str = [];
    for (let i = 0; i < modules.length; i++) {
      for (let y = 0; y < modules[i].study.length; y++) {
        if (modules[i].study[y] === id) {
          str = [...str, modules[i].title];
        }
      }
      setAddedModule(str.toString());
    }
  }, [modules, id, isModuleAdded]);

  console.log(addedModule);

  // console.log(id);
  // console.log(children.props.children);

  function handleAddButton() {
    setIsModuleAdded(true);
    onClick();
  }

  function handleRemoveButton() {
    setIsModuleAdded(false);
    onHandleRemoveModule();
  }

  if (isLoading) {
    return () => {
      <span></span>;
    };
  }

  return (
    <div style={cardContainerStyle}>
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          height: "1.7rem",
        }}
      >
        {isModuleAdded || addedModule.includes(children.props.children) ? (
          <img
            src={checkIcon}
            onClick={() => handleRemoveButton()}
            style={{ width: "1.65rem", height: "1.65rem" }}
          />
        ) : (
          <img src={addIcon} onClick={() => handleAddButton()} />
        )}
      </button>
      <div style={cardStyle}>
        <img src={moduleSign} />
        {children}
      </div>
    </div>
  );
}
export default AddModuleCard; /* eslint-disable react/prop-types */
