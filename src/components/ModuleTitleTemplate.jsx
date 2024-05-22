import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import nextButton from "../assets/icons/buttons/next.png";
import { NewModuleContext } from "./NewModuleContext";
/* eslint-disable react/prop-types */
function ModuleTitleTemplate() {
  const {
    onHandleTitle,
    onHandleEditModuleTitle,
    newModule,
    setActiveTab,
    editModule,
  } = useContext(NewModuleContext);
  const navigate = useNavigate();

  const container = {
    display: "flex",
    justifyContent: "space-between",
    height: "10rem",
    width: "50rem",
    alignItems: "center",
    marginTop: "-3rem",
  };

  const inputStyle = {
    width: "35rem",
    padding: "0.9rem 0 0.9rem 1rem",
    // alignSelf: "start",
    margin: "1rem 0 0 3rem",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
  };

  const buttonbStyles = {
    display: "flex",
    flexDirection: "column",
    border: "none",
    backgroundColor: "transparent",
    marginLeft: "5rem",
    transform: "translate(0, 0.6rem)",
    cursor: "pointer",
  };

  function handleNexttab() {
    if (newModule.title.length !== 0) {
      setActiveTab("template");
      navigate("/create-module/templates");
    }
  }

  console.log(newModule);
  // console.log(editModule);

  return (
    <div style={container}>
      <input
        type="text"
        style={inputStyle}
        placeholder={editModule.title === "" ? "Enter Desired Title" : {}}
        value={editModule.title === "" ? newModule.title : editModule.title}
        onChange={(e) => {
          if (editModule.title === "") {
            onHandleTitle(e.target.value);
          } else {
            onHandleEditModuleTitle(e.target.value);
          }
        }}
      />
      <button style={buttonbStyles} onClick={() => handleNexttab()}>
        <img src={nextButton} />
        <span style={{ fontWeight: "600", color: "#152D30" }}>Next</span>
      </button>
    </div>
  );
} /* eslint-disable react/prop-types */
export default ModuleTitleTemplate;
