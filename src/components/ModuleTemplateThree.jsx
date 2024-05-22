import { useState } from "react";
import testImage from "../assets/test-images/image-3.png";
import styles from "../components/ModuleTemplateThree.module.css";
function ModuleTemplateThree() {
  const [buttonClick, setButtonClick] = useState(false);
  return (
    <div>
      <img src={testImage} style={{ width: "60rem", height: "30rem" }} />
      <button
        className={styles.button}
        onClick={() => setButtonClick(!buttonClick)}
      ></button>
      <div className={styles.description}>
        {buttonClick ? (
          <p>You are now on the setting screen</p>
        ) : (
          <p>This is what you would click to see the Participants settings</p>
        )}
      </div>
    </div>
  );
}
export default ModuleTemplateThree;
