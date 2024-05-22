// import imageOne from "../assets/test-images/image-1.png";
// import imageTwo from "../assets/test-images/image-2.png";
import { useContext, useEffect, useState } from "react";
import styles from "./FinishModuleOne.module.css";
import { NewModuleContext } from "./NewModuleContext";
import { useModule } from "../services/useModule";
import { useListVideo } from "../services/useVideo";
import { useImages } from "../services/useImage";
import { useGetContent } from "../services/useContent";
function FinishModuleOne() {
  const { data: modules, isLoading } = useModule();
  const { data: videos, isLoading: loadingVideos } = useListVideo();
  const { data: images, isLoading: loadingImages } = useImages();
  const { data: contents, isLoading: loadingContents } = useGetContent();
  // const [flipImg, setFlipImg] = useState(0);
  const [count, setCount] = useState(0);
  const { newModule, setNewModule } = useContext(NewModuleContext);
  const [currentModuleId, setCurrentModuleId] = useState("");
  const [moduleVideo, setModuleVideo] = useState({
    id: "",
    video: "",
    module: "",
  });
  const [moduleContent, setModuleContent] = useState({
    id: "",
    content: "",
    module: "",
  });
  const [moduleImages, setModuleImages] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      for (let i = 0; i < modules.length; i++) {
        if (modules[i].title === newModule.title) {
          setCurrentModuleId(modules[i].id);
        }
      }
    }
  }, [isLoading, modules, currentModuleId, newModule.title]);

  useEffect(() => {
    if (!isLoading || !loadingVideos) {
      if (videos !== undefined) {
        for (let y = 0; y < videos.length; y++) {
          if (currentModuleId === videos[y].module) {
            setModuleVideo(videos[y]);
          }
        }
      }
    }
  }, [isLoading, loadingVideos, videos, currentModuleId]);

  useEffect(() => {
    if (!isLoading || !loadingImages) {
      if (images !== undefined) {
        setModuleImages([]);
        for (let y = 0; y < images.length; y++) {
          if (currentModuleId === images[y].module) {
            setModuleImages((image) => [...image, images[y]]);
          }
        }
      }
    }
  }, [isLoading, loadingImages, images, currentModuleId]);

  useEffect(() => {
    if (!isLoading || !loadingContents) {
      if (contents !== undefined) {
        for (let y = 0; y < contents.length; y++) {
          if (currentModuleId === contents[y].module) {
            setModuleContent(contents[y]);
          }
        }
      }
    }
  }, [isLoading, loadingContents, contents, currentModuleId]);

  useEffect(() => {
    var myVideo = document.getElementById("my-vid");
    var vSource = document.getElementById("v-src");
    if (!loadingVideos || !loadingContents || !loadingImages) {
      if (moduleVideo.video !== "") {
        myVideo.pause();
        vSource.setAttribute("src", `${moduleVideo.video}`);
        myVideo.load();
      }
    }
  }, [loadingContents, loadingImages, loadingVideos, moduleVideo.video]);

  useEffect(() => {
    if (currentModuleId !== "") {
      setNewModule((m) => ({ ...m, id: currentModuleId }));
    }
  }, [currentModuleId, setNewModule]);

  console.log(currentModuleId);

  // console.log(videos);
  // console.log(contents);
  // console.log(images);
  // console.log(moduleImages);
  // console.log(moduleContent);
  // console.log(moduleVideo);
  // console.log(flipImg);
  // console.log(count);
  console.log(newModule);

  function handleNextFlipCard() {
    if (count < moduleImages.length) {
      setCount((c) => c + 1);
    } else {
      return;
    }
  }

  if (isLoading || loadingContents || loadingImages || loadingVideos) {
    return <span>..loading</span>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Course heading</div>
      <div className={styles.sectionOne}>
        {contents !== undefined && <p>{moduleContent.content}</p>}
      </div>
      <div className={styles.sectionTwo}>
        {/* <button onClick={() => handleVideo()}>play</button> */}
        {moduleVideo !== undefined && (
          <video width="950" height="600" id="my-vid" controls>
            <source id="v-src" src={moduleVideo.video} type="video/mp4" />
          </video>
        )}
      </div>
      <div className={styles.sectionThree}>
        <button>prev</button>
        {moduleImages !== undefined && (
          <img
            src={moduleImages[count]?.image}
            style={{ height: "30rem", width: "16rem" }}
          />
        )}
        {/* <img
          src={moduleImages[count]?.image}
          style={{ height: "30rem", width: "16rem" }}
        /> */}

        <button onClick={() => handleNextFlipCard()}>Next</button>
      </div>
    </div>
  );
}
export default FinishModuleOne;
