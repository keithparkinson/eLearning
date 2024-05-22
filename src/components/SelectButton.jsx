import { useState } from "react";
import styles from "./SelectButton.module.css";

function SelectButton() {
  const [buttonSelected, setButtonSelected] = useState(false);

  const buttonOnStyle = {
    justifyContent: "end",
    backgroundColor: "#FF5AAA",
  };

  console.log(buttonSelected);

  return (
    <button
      className={styles.select_btn}
      onClick={() => setButtonSelected(!buttonSelected)}
      style={buttonSelected ? buttonOnStyle : {}}
    >
      <div className={styles.btn_bubble}></div>
    </button>
  );
}

export default SelectButton;
