import { useOutletContext, useSearchParams } from "react-router-dom";
import styles from "./ModuleTemplateSelection.module.css";
import nextButton from "../assets/icons/buttons/next.png";
import CautionModal from "./CautionModal";
import { useContext, useEffect, useState } from "react";
import { NewModuleContext } from "./NewModuleContext";
import { Toaster } from "react-hot-toast";
function ModuleTemplateSelection() {
  const [templateOption, setTemplateOption, handleSetTemplate] =
    useOutletContext();
  const { editModule, setEditModule } = useContext(NewModuleContext);
  const [searchParams] = useSearchParams();
  const [isCautionVisible, setIsCautionVisible] = useState(false);

  const temp = searchParams.get("temp");

  useEffect(() => {
    setTemplateOption(temp);
  }, [setTemplateOption, temp]);

  function handleSelection(option) {
    setTemplateOption(option);
    setEditModule((module) => ({ ...module, template: option }));
  }

  const selectedOptionStytle = {
    border: "0.2rem solid #4685CC",
  };

  function handleModal() {
    setIsCautionVisible(true);
  }

  function handleCancelModal() {
    setIsCautionVisible(false);
  }

  console.log(editModule);
  console.log(templateOption);

  return (
    <div>
      <ul className={styles.templateList}>
        <li>
          <div
            className={styles.template}
            onClick={() => handleSelection("1")}
            style={templateOption === "1" ? selectedOptionStytle : {}}
          >
            <section className={styles.sectionOne}>
              <p>Information-Section</p>
            </section>
            <section className={styles.sectionTwo}>
              <p>Video-section</p>
            </section>
            <section className={styles.sectionThree}>
              <p>Flip-Image-Section</p>
            </section>
          </div>
        </li>
        <li>
          <div
            className={styles.template}
            onClick={() => handleSelection("2")}
            style={templateOption === "2" ? selectedOptionStytle : {}}
          >
            <section className={styles.sectionOne}>
              <p>Information-Section</p>
            </section>
            <section className={styles.sectionTwo}>
              <p>Video-section</p>
            </section>
          </div>
        </li>
        <li>
          <div
            className={styles.template}
            onClick={() => handleSelection("3")}
            style={templateOption === "3" ? selectedOptionStytle : {}}
          >
            Test Flight
          </div>
        </li>
      </ul>
      {templateOption !== null && (
        <button className={styles.button} onClick={() => handleModal()}>
          <img src={nextButton} />
          <span style={{ fontWeight: "600" }}>Next</span>
        </button>
      )}
      {isCautionVisible && (
        <CautionModal
          onHandleAdd={handleSetTemplate}
          onHandleCancle={handleCancelModal}
          type="create-module"
        >
          If you proceed to Designs a new Module will be created, are you sure ?
        </CautionModal>
      )}
      <Toaster />
    </div>
  );
}
export default ModuleTemplateSelection;
