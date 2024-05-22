import downArrow from "../assets/icons/down_arrow.png";
/* eslint-disable react/prop-types */
function CourseFilter({ onClick, children }) {
  const dropfilterStyle = {
    padding: "0.5rem 0 0.5rem 0",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#6C9399",
    width: "13rem",
    fontSize: "16px",
    cursor: "pointer",
  };
  return (
    <div>
      <span>Filter: </span>
      <button style={dropfilterStyle} onClick={onClick}>
        {children} <img src={downArrow} style={{ marginLeft: "1rem" }} />
      </button>
    </div>
  );
}
export default CourseFilter; /* eslint-disable react/prop-types */
