import ModalButton from "./ModalButton";
import { useUpdateLearner } from "../services/useAllUser";
import downArrow from "../assets/icons/down_arrow.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
/* eslint-disable react/prop-types */
function EditLearnerModal({ selectedLearner, onHandleCloseEditLearnerModal }) {
  const { updateLearner } = useUpdateLearner();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: selectedLearner.id,
      first_name: selectedLearner.first_name,
      last_name: selectedLearner.last_name,
      email: selectedLearner.email,
      userName: selectedLearner.userName,
      role: selectedLearner.role,
    },
  });
  const [isRoleListVisible, setIsRoleListVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const modalStyle = {
    width: "28.9rem",
    height: "33.5rem",
    backgroundColor: "#F1F1F1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    borderRadius: "5px",
    padding: "1rem",
    color: "#152D30",
  };

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    color: "#152D30",
  };

  const inputStyle = {
    fontSize: "16px",
    width: "24.7rem",
    height: "2rem",
    border: "none",
    borderRadius: "5px",
    paddingLeft: "1rem",
  };

  const buttonStyle = {
    fontSize: "16px",
    width: "25rem",
    padding: "0.5rem 0 0.5rem 6rem",
    marginBottom: "3rem",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#ABCED3",
    color: "#152D30",
    cursor: "pointer",
  };

  const roleListStyle = {
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    position: "absolute",
    transform: "translate(0.2rem, 4rem)",
  };

  const roleItemStyle = {
    backgroundColor: "#ABCED3",
    width: "24.7rem",
    borderBottom: "thin solid #152D30",
    padding: "0.5rem 0 0.5rem 0",
    display: "flex",
    justifyContent: "center",
    fontWeight: "500",
    cursor: "pointer",
  };

  function onSubmit(data) {
    updateLearner(data);
    onHandleCloseEditLearnerModal();
  }

  function handleRole() {
    setSelectedRole();
    setIsRoleListVisible(false);
  }

  console.log(selectedRole);
  return (
    <form style={modalStyle} onSubmit={handleSubmit(onSubmit)}>
      <div style={divStyle}>
        <label>First Name:</label>
        <input type="text" style={inputStyle} {...register("first_name")} />
      </div>
      <div style={divStyle}>
        <label>Last Name:</label>
        <input type="text" style={inputStyle} {...register("last_name")} />
      </div>
      <div style={divStyle}>
        <label>Email:</label>
        <input type="text" style={inputStyle} {...register("email")} />
      </div>
      <div style={divStyle}>
        <label>Username:</label>
        <input
          type="text"
          style={inputStyle}
          placeholder={selectedLearner.email}
          disabled
        />
      </div>
      <div style={divStyle}>
        <label>Role</label>
        <button
          style={buttonStyle}
          onClick={() => setIsRoleListVisible(!isRoleListVisible)}
          type="button"
        >
          Null
          <img src={downArrow} style={{ marginLeft: "6rem" }} />
        </button>
        {isRoleListVisible && (
          <ul style={roleListStyle}>
            <li style={roleItemStyle} onClick={() => handleRole()}>
              Super User
            </li>
            <li style={roleItemStyle} onClick={() => handleRole()}>
              Coordinator
            </li>
            <li style={roleItemStyle} onClick={() => handleRole()}>
              Site Monitor
            </li>
            <li style={roleItemStyle} onClick={() => handleRole()}>
              Study Monitor
            </li>
            <li style={roleItemStyle} onClick={() => handleRole()}>
              Koneksa
            </li>
          </ul>
        )}

        <div style={{ marginLeft: "1.5rem" }}>
          <ModalButton type="cancel" onClick={onHandleCloseEditLearnerModal}>
            Cancel
          </ModalButton>
          <ModalButton type="save">Save</ModalButton>
        </div>
      </div>
    </form>
  );
}
export default EditLearnerModal; /* eslint-disable react/prop-types */
