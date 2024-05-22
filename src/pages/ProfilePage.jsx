import NavSide from "../components/NavSide";
import Header from "../components/Header";
import main_styles from "../components/main.module.css";
import styles from "../components/ProfilePage.module.css";
import PersonalInformationForm from "../components/PersonalInformationForm";
import pencil from "../assets/icons/pencil.png";
import { useUser } from "../services/useLogin";
import { useState } from "react";

function ProfilePage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { data, isLoading } = useUser();

  // function handleCloseForm() {
  //   setIsFormVisible((visible) => false);
  // }

  // function handleSubmitForm(e) {
  //   e.preventDefault();
  // }

  if (isLoading) {
    return <span>loading..</span>;
  }

  return (
    <div className={main_styles.main}>
      <NavSide />
      <Header />
      <div className={styles.profile}>
        {/* This is the section handles displaying the profile and image upload */}
        <div className={styles.profile_picture_container}>
          <div className={styles.profile_img}>
            <div className={styles.img_frame}>
              <img src="" />
            </div>
            <button className={styles.upload_btn}>
              Upload Profile Picture
            </button>
          </div>
          <div className={styles.profile_detail}>
            <span>
              Name : {data.user.first_name} {data.user.last_name}
            </span>
            <span>Last Logged in: {data.user.last_login}</span>
            <span>Sites: 77777777</span>
            <span>Title: {data.user.role}</span>
          </div>
        </div>

        {/* This is the section displays the the user personal information */}

        <div className={styles.profile_imformation_container}>
          <div className={styles.information_header}>
            <span>Personal Information</span>
            <button
              className={styles.edit_btn}
              onClick={() => setIsFormVisible(true)}
            >
              <img src={pencil} />
            </button>
          </div>

          <table className={styles.profile_information_list}>
            <tbody>
              <tr>
                <td className={styles.list}>First Name</td>
                <td className={styles.list}>{data.user.first_name}</td>
              </tr>
              <tr>
                <td className={styles.list}>Last Name</td>
                <td className={styles.list}>{data.user.last_name}</td>
              </tr>
              <tr>
                <td className={styles.list}>Email</td>
                <td className={styles.list}>{data.user.email}</td>
              </tr>
              <tr>
                <td className={styles.list}>Username</td>
                <td className={styles.list}>{data.user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* This is the section handles updating the users password */}
        <div className={styles.profile_reset_password_container}>
          <div className={styles.header}>
            <span>Reset Password</span>
          </div>
          <div className={styles.reset_password_input}>
            <div className={styles.input_container_1}>
              <label>Current Password</label>
              <input className={styles.textbox} />
            </div>

            <div className={styles.input_container_2}>
              <label>New Password</label>
              <input className={styles.textbox} />
            </div>

            <div className={styles.input_container_3}>
              <label>Confirm Password</label>
              <input className={styles.textbox} />
            </div>
          </div>
        </div>
        {/* This is the section handles editing and updating the users personal information */}

        {isFormVisible && (
          <PersonalInformationForm
            setIsFormVisible={setIsFormVisible}
            user={data.user}
          />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
