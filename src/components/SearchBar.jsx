/* eslint-disable react/prop-types */
import searchIcon from "../assets/icons/search_icon.png";
import styles from "./SearchBar.module.css";
function SearchBar({ children, onChange, type }) {
  const searchBarStyle = {
    backgroundImage: `url(${searchIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "8px 5px",
  };

  return (
    <input
      type="text"
      className={`${styles.searchBar} ${styles[type]}`}
      style={searchBarStyle}
      placeholder={children}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar; /* eslint-disable react/prop-types */
