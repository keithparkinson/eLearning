// import { useState } from "react";
import close from "../assets/icons/close.png";
import moduleSign from "../assets/icons/module_display.png";
// import { useModule, useUpdateModule } from "../services/useModule";

/* eslint-disable react/prop-types */
function ModuleCard({ children, onClick }) {
  // const { data: modules, isLoading } = useModule();
  // const { updateModule } = useUpdateModule();
  // const [selectedModule, setSelectedModule] = useState({});

  const cardStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "15.4rem",
    height: "20rem",
    backgroundColor: "#DEEFF1",
    borderRadius: "10px",
    padding: "1rem",
  };

  const bodyStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "1rem",
    gap: "3rem",
    fontSize: "18px",
    fontWeight: "600",
  };

  // function handleRemoveModule() {
  //   let obj = {};
  //   var filterObj = [];
  //   for (var i = 0; i < modules.length; i++) {
  //     if (modules[i].id === moduleId) {
  //       obj = modules[i];
  //       for (var x = 0; x < obj.study.length; x++) {
  //         if (obj.study[x] === siteId) {
  //           filterObj = obj.study.splice(x, 1);
  //           console.log(filterObj);
  //         }
  //       }
  //     }
  //   }
  //   updateModule(obj);

  //   // updateModule(selectedModule);
  // }

  // console.log(selectedModule);

  // if (isLoading) {
  //   return () => {
  //     <span></span>;
  //   };
  // }

  return (
    <div style={cardStyle}>
      <div style={bodyStyle}>
        <img src={moduleSign} />
        <p>{children}</p>
      </div>
      <button
        onClick={onClick}
        style={{
          height: "1rem",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <img src={close} style={{ height: "0.8rem", width: "0.8rem" }} />
      </button>
    </div>
  );
}
export default ModuleCard; /* eslint-disable react/prop-types */
