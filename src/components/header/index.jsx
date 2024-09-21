
import { MagnifyingGlass, Gear, Bell, List } from "phosphor-react";
import img from "./img/music.png";
import styles from "./header.module.css";

export function Header({
  handleChangeSearchValue,
  loadFavorites,
  resetState,
  dado,
  handleSubmit,
}) {
  return (
    <header className={styles.header}>
      <div className={styles["left-container"]}>
        <img
          src={img}
          alt="Music"
          className={styles.iconImage}
          onClick={resetState}
          style={{ cursor: "pointer" }}
        />
        <div className={styles.searchBar}>
          <MagnifyingGlass size={20} className={styles.icon} />
          <input
            type="text"
            placeholder="Search for songs, artists, etc."
            className={styles.input}
            onChange={handleChangeSearchValue}
            value={dado}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          />
        </div>
      </div>
      <div className={styles["right-container"]}>
        <button onClick={loadFavorites} className={styles.premiumButton}>
          Favoritos
        </button>
        <div className={styles.iconsGroup}>
          <button>
            <Gear size={30} className={styles.iconGear} />
          </button>
          <button>
            <Bell size={30} className={styles.iconBell} />
          </button>
          <button>
            <List size={30} className={styles.iconList} />
          </button>
        </div>
      </div>
    </header>
  );
}
