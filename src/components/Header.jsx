import styles from "./Header.module.css";
import profile_img from "../assets/icons/profileimg.png";
import downArrow from "../assets/icons/down_arrow.png";
import upArrow from "../assets/icons/up_arrow.png";
import { useUser } from "../services/useLogin";
import { useSite } from "../services/useSite";
import { useState } from "react";

function Header() {
  const { data: user, isLoading } = useUser();
  const { data: sites, isLoading: isLoadingSites } = useSite();
  const [siteDropListVisible, setSiteDropListVisible] = useState(false);

  if (isLoading) {
    return <span>loading..</span>;
  }

  return (
    <header className={styles.header}>
      <div className={styles.section_1}>
        <div className={styles.profile_img}>
          <img src={profile_img} className={styles.img} />
        </div>

        <div className={styles.profile_detail}>
          <p>
            Name: {user.user.first_name} {user.user.last_name}
          </p>
          <p>Email: {user.user.email}</p>
          <p>Title: {user.user.role}</p>
        </div>
      </div>

      <div className={styles.section_2}>
        {isLoadingSites ? (
          <span>loading..</span>
        ) : (
          <div className={styles.site_list_section}>
            {!siteDropListVisible ? (
              <button
                className={styles.site_list_btn}
                onClick={() => setSiteDropListVisible((s) => !s)}
              >
                Sites <img src={downArrow} className={styles.downArrow} />
              </button>
            ) : (
              <button
                className={styles.site_list_btn}
                onClick={() => setSiteDropListVisible((s) => !s)}
                style={{
                  backgroundColor: "#6c9399",
                  borderRadius: "5px 5px 0 0",
                }}
              >
                Sites <img src={upArrow} className={styles.downArrow} />
              </button>
            )}

            {siteDropListVisible && (
              <ul className={styles.siteList}>
                {sites.map((site) => (
                  <li key={site.id} className={styles.siteTitle}>
                    {site.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
