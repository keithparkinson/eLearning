import styles from "./PersonalInfomationForm.module.css";
import { useForm } from "react-hook-form";

/* eslint-disable react/prop-types */
function PersonalInformationForm({ setIsFormVisible, user }) {
  const { register, handleSubmit } = useForm({
    defaultValues: user,
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form
      className={styles.profile_information_edit_container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.input_container}>
        <label>First Name:</label>
        <input
          className={styles.information_textbox}
          id="first_name"
          {...register("first_name")}
        />
      </div>

      <div className={styles.input_container}>
        <label>Last Name:</label>
        <input
          className={styles.information_textbox}
          id="last_name"
          {...register("last_name")}
          placeholder={user.last_name}
        />
      </div>

      <div className={styles.input_container}>
        <label>Email:</label>
        <input
          className={styles.information_textbox}
          id="email"
          {...register("email")}
          placeholder={user.email}
        />
      </div>

      <div className={styles.input_container}>
        <label>Username:</label>
        <input
          className={styles.information_textbox}
          id="username"
          {...register("username", { disabled: true })}
          placeholder={user.email}
        />
      </div>

      <div className={styles.button_container}>
        <button
          className={styles.btn_1}
          type="button"
          onClick={() => setIsFormVisible(false)}
        >
          Cancel
        </button>
        <button className={styles.btn_2}>Save</button>
      </div>
    </form>
  );
}

export default PersonalInformationForm;
/* eslint-disable react/prop-types */
