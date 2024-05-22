import ModalButton from "../components/ModalButton";
import styles from "../components/EditSiteModal.module.css";
import downArrow from "../assets/icons/down_arrow.png";
import { useForm } from "react-hook-form";
import { useStudy } from "../services/useStudy";
import { useCreateSite } from "../services/useSite";
import { useUpdateSite } from "../services/useSite";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
function EditSiteModal({ type, onClick, children, courseId, siteId }) {
  const localdata = localStorage.getItem("user");
  const userData = JSON.parse(localdata);
  const { data: courses, isLoading } = useStudy();
  const [isCourseListVisible, setIsCourseListVisible] = useState(false);
  const [siteStudy, setSiteStudy] = useState({});
  const [isCourseChange, setIsCourseChange] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    title: "Select Course",
  });
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: children,
      Study: "",
      publisher: userData.user,
      id: "",
    },
  });
  const { createSite } = useCreateSite();
  const { updateSite } = useUpdateSite();

  useEffect(() => {
    // if courseId is not undefined and we want to edit a site, it will enter this if block and within it will check if a change was make to the selectdCourse and exicute the corrcet operation
    if (courseId !== undefined) {
      if (!isCourseChange) {
        setValue("Study", siteStudy.id);
        setValue("id", siteId);
      } else {
        setValue("Study", selectedCourse.id);
        setValue("id", siteId);
      }
    }
    // this is else will initiate if courseId is undefined and so it will know we want to create a new site and not edit an already existing one
    else {
      setValue("Study", selectedCourse.id);
      setValue("id", undefined);
    }
  }, [selectedCourse, setValue, siteStudy, siteId, courseId, isCourseChange]);

  // this effect will take place when we are editing the site, it will set the the course drop down to this value. But selectedCourse will not have a value when this effect takes place.
  // this is just a visual effect that shows the course in drop down but does not mean it was selected.

  useEffect(() => {
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].id === courseId) {
        setSiteStudy((s) => ({
          ...s,
          title: courses[i].title,
          id: courses[i].id,
        }));
      }
    }
  }, [courseId, courses]);

  // useEffect(() => {
  //   document.addEventListener("keydown", onSubmit);
  // });

  // this function is handle triggered when we select a course from the drop menu, it will then assign the course to selecetdCourse
  function handleSelectedCourse(course, id) {
    setSelectedCourse({ ...courses, id: id, title: course });
    setIsCourseListVisible(false);
    setIsCourseChange(true);
  }

  function onSubmit(data, e) {
    console.log(e);
    // data will enter this if block if we want to update, so it will check if courseId is undefined or not and if we are on the site page, which is the only place we can edit a site.
    if (type === "site" && courseId !== undefined) {
      updateSite(data);
    } else {
      createSite(data);
    }
    // closes the modal after execution
    onClick();
    console.log(data);
  }

  if (isLoading) {
    return () => {
      <span></span>;
    };
  }

  // function handleKeyDown(e) {
  //   if (e.key === "Enter") {
  //     handleSubmit(onSubmit)
  //   } else {
  //     return;
  //   }
  //   // console.log("Key pressed: ", e.key);
  // }

  return (
    <form
      className={`${styles.container} ${styles[type]}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div style={{ marginTop: "2rem" }}>
        <label>Title: </label> <br />
        <input
          type="text"
          className={styles.input}
          placeholder={children}
          {...register("title", {
            required: true,
          })}
        />
      </div>
      <div>
        <label>Course: </label> <br />
        <button
          className={styles.dropButton}
          onClick={() => setIsCourseListVisible(!isCourseListVisible)}
          type="button"
        >
          {/* controls what the drop down course list displays. the isCourseChange will help control the selection of selected course for the sites page and courses page, that way we can change the courses if needed.  */}
          {type === "site" && courseId !== undefined && !isCourseChange
            ? siteStudy.title
            : type === "courses" && !isCourseChange
            ? siteStudy.title
            : selectedCourse.title}
          <img src={downArrow} style={{ marginLeft: "5rem" }} />
        </button>
        {isCourseListVisible && (
          <ul className={styles.courseList}>
            {courses.map((course) => (
              <li
                key={course.id}
                className={styles.item}
                onClick={() => handleSelectedCourse(course.title, course.id)}
              >
                {course.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ marginTop: "10rem" }}>
        <ModalButton type="cancel" onClick={onClick}>
          Cancel
        </ModalButton>
        <ModalButton type="save">Save</ModalButton>
      </div>
    </form>
  );
}
export default EditSiteModal; /* eslint-disable react/prop-types */
