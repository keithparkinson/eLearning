import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ModuleTemplateOne from "./ModuleTemplateOne";
import ModuleTemplateTwo from "./ModuleTemplateTwo";
import ModuleTemplateThree from "./ModuleTemplateThree";

function ModuleDesignTemplate() {
  const [templateOption] = useOutletContext();
  const [option, setOption] = useState("");

  const templates = [
    <ModuleTemplateOne key="1" />,
    <ModuleTemplateTwo key="2" />,
    <ModuleTemplateThree key="3" />,
  ];

  useEffect(() => {
    setOption(
      templates.map((template) => {
        if (template.key === templateOption) {
          return template;
        }
      })
    );
  }, [templateOption]);

  return <div style={{ marginLeft: "6rem" }}>{option}</div>;
}
export default ModuleDesignTemplate;
