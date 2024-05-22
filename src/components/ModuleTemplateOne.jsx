import styles from "../components/ModuleTemplateOne.module.css";
import videoIcon from "../assets/icons/video_icon.png";
import uploadIcon from "../assets/icons/upload_icon.png";
import nextButton from "../assets/icons/buttons/next.png";
import { useContext, useEffect, useState } from "react";
import { useUploadVideo } from "../services/useVideo";
import { useUploadImage } from "../services/useImage";
import { useContent } from "../services/useContent";
import { useModule } from "../services/useModule";
import { NewModuleContext } from "./NewModuleContext";
import { useNavigate, useParams } from "react-router-dom";
function ModuleTemplateOne() {
  const { id } = useParams();
  const [flipCardImg, setFlipCardImg] = useState([]);
  const [newVideoUpload, setNewVideoUpload] = useState({
    video: "",
    module: [],
  });
  const [newContentUpload, setNewContentUpload] = useState({
    content: "",
    module: "",
  });
  const { data: modules, isLoading } = useModule();
  const [currentModuleId, setCurrentModuleId] = useState("");
  const { uploadVideo } = useUploadVideo();
  const { uploadImage } = useUploadImage();
  const { createContent } = useContent();
  const { newModule, setActiveTab } = useContext(NewModuleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (id !== undefined) {
        setCurrentModuleId(id);
      } else {
        for (let i = 0; i < modules.length; i++) {
          if (modules[i].title === newModule.title) {
            setCurrentModuleId(modules[i].id);
          }
        }
      }
    }
  }, [isLoading, modules, currentModuleId, newModule.title, id]);

  function handleImgUpload(data) {
    setFlipCardImg((img) => [
      ...img,
      { ...img, image: data, module: currentModuleId },
    ]);
  }

  if (isLoading) {
    return <span>...loading</span>;
  }

  function handleText(e) {
    setNewContentUpload((text) => ({
      ...text,
      content: e,
      module: currentModuleId,
    }));
    console.log(e.key);
  }

  function handleVideoUpload(video) {
    setNewVideoUpload((v) => ({
      ...v,
      video: video,
      module: currentModuleId,
    }));
  }

  function tempfunc() {
    createContent(newContentUpload);
    uploadVideo(newVideoUpload);

    if (flipCardImg.length > 1) {
      for (let y = 0; y < flipCardImg.length; y++) {
        uploadImage(flipCardImg[y]);
      }
    } else {
      uploadImage(flipCardImg[0]);
    }
    navigate("/create-module/finish");
    setActiveTab("finishing-touches");
  }

  console.log(id);

  return (
    <div className={styles.container}>
      <div className={styles.sectionOne}>
        <textarea
          className={styles.textarea}
          placeholder="Enter Text here "
          onChange={(e) => handleText(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.sectionTwo}>
        <label className={styles.label}>
          {newVideoUpload.video !== "" ? (
            <p>{newVideoUpload.video.name}</p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              Upload your desired video
              <img
                src={videoIcon}
                style={{ width: "10rem", height: "8rem", marginLeft: "1rem" }}
              />
            </div>
          )}
          <input
            type="file"
            id="video"
            style={{ visibility: "hidden" }}
            onChange={(e) => handleVideoUpload(e.target.files[0])}
          />
        </label>
      </div>

      <div className={styles.sectionThree}>
        <label className={styles.label}>
          Upload images for flip card
          <img src={uploadIcon} />
          <input
            type="file"
            style={{ visibility: "hidden" }}
            onChange={(e) => handleImgUpload(e.target.files[0])}
          />
        </label>
      </div>
      <button className={styles.button} onClick={() => tempfunc()}>
        <img src={nextButton} />
        Next
      </button>
    </div>
  );
}
export default ModuleTemplateOne;
