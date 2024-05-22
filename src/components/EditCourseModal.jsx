import ModalButton from "./ModalButton";
import styles from "./CourseModal.module.css";
import { useForm } from "react-hook-form";
import { useCreateStudy } from "../services/useStudy";
import { useUpdateStudy } from "../services/useStudy";
import { useUpdateModule } from "../services/useModule";

/* eslint-disable react/prop-types */
function EditCourseModal({ children, type, courseId, moduleId, onClick }) {
  const localdata = localStorage.getItem("user");
  const userData = JSON.parse(localdata);
  const inputStyle = {
    width: "27.1rem",
    textAlign: "center",
    padding: "0.5rem 0 0.5rem 0",
    border: "none",
    borderRadius: "5px",
    marginTop: "0.5rem",
    fontWeight: "600",
  };

  const { createStudy } = useCreateStudy();
  const { update } = useUpdateStudy();
  const { updateModule } = useUpdateModule();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      publisher: userData.user,
      courseId: courseId,
      title: children,
      id: moduleId,
    },
  });

  console.log(courseId);

  function onSubmit(data) {
    console.log(data);

    if (type === "new-course") {
      createStudy(data, {
        onSuccess: () => {
          onClick();
          reset();
        },
      });
    } else if (type === "module-edit") {
      updateModule(data, {
        onSuccess: () => {
          onClick();
          reset();
        },
        onError: () => {
          onClick();
          reset();
        },
      });
    } else {
      update(data, {
        onSuccess: () => {
          onClick();
          reset();
        },
        onError: () => {
          onClick();
          reset();
        },
      });
    }
  }

  // i need to rename this component to be resuable. This will be use for Modules as well the new name should be Edit Title Modal
  return (
    <form
      className={`${styles.container} ${styles[type]}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div style={{ marginTop: "2.5rem" }}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          {...register("title")}
          style={inputStyle}
        />
      </div>
      <div>
        <ModalButton type="cancel" onClick={onClick}>
          Cancel
        </ModalButton>
        <ModalButton type="save">Save</ModalButton>
      </div>
    </form>
  );
}
export default EditCourseModal; /* eslint-disable react/prop-types */
