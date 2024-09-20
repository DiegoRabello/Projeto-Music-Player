import { MagnifyingGlass, Star } from "phosphor-react";
import { Gear, Bell, List } from "phosphor-react";
import img from "./img/music.png";
import styles from "./header.module.css";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { STORAGE_SERVICE } from "../../services/storage";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const [dado, setdado] = useState("");
  const [datas, setdatas] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const token =
    "BQCe6PL7X32bnQYgpcirJgKUA5iewQh2zGMXJRR5qeW0mCW3fAp0jvVanonXErpYkjd97YziMo6PvPQUJDIjvmNBZVODvN9pqL97vX9zeCFIAoGsuQM";

  function handleChangeSearchValue(e) {
    setdado(e.target.value);
  }

  useEffect(() => {
    console.log("data aqui ", datas);
    console.log(datas.length);
  }, [datas]);

  async function handleSubmit(e) {
    e.preventDefault();

    const { data } = await api.get(`/v1/search?q=${dado}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const tracks = data.tracks.items.map((item) => item);
    setdatas(tracks);
  }

  const addSongToPlaylist = (song) => {
    STORAGE_SERVICE.createPlaylist(song);
    alert(`A música "${song.name}" foi adicionada à playlist!`);
  };

  const loadFavorites = () => {
    const savedFavorites = STORAGE_SERVICE.listContacts();
    setFavorites(savedFavorites);
    setShowFavorites(true);
  };

  const resetState = () => {
    setdado("");
    setdatas([]);
    setShowFavorites(false);
    navigate("/");
  };

  return (
    <>
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
      <main>
        <div className={styles.musics}>
          {showFavorites ? (
            <ul className={styles.album}>
              {favorites.map((favorite, index) => (
                <li key={index} style={{ marginTop: "20px" }}>
                  <img
                    className={styles.img1}
                    src={favorite.imagem}
                    alt="Foto do album"
                  />
                  <section className={styles.content}>
                    <div className={styles.textContent}>
                      <h1>{favorite.name}</h1>
                      <p>{favorite.artista}</p>
                      <div className={styles.favorite}>
                        <audio controls>
                          <source src={favorite.audio} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        <button onClick={() => addSongToPlaylist(favorite)}>
                          <Star size={32} color="#c8cb1a" weight="fill" />
                        </button>
                      </div>
                    </div>
                  </section>
                </li>
              ))}
            </ul>
          ) : (
            <form onSubmit={handleSubmit}>
              {datas.length > 0 && (
                <ul className={styles.album}>
                  {datas.map((data, index) => (
                    <li key={index} style={{ marginTop: "20px" }}>
                      <img
                        className={styles.img1}
                        src={data.album.images[0].url}
                        alt={data.album.name}
                      />
                      <section className={styles.content}>
                        <div className={styles.textContent}>
                          <h1>{data.name}</h1>
                          <p>{data.artists[0].name}</p>
                          <div className={styles.favorite}>
                            <audio controls>
                              <source
                                src={data.preview_url}
                                type="audio/mpeg"
                              />
                              Your browser does not support the audio element.
                            </audio>
                            <button onClick={() => addSongToPlaylist(data)}>
                              <Star size={32} color="#c8cb1a" weight="fill" />
                            </button>
                          </div>
                        </div>
                      </section>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          )}
        </div>
      </main>
    </>
  );
}
