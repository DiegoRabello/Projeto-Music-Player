// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Header } from "../../components/header";
// import { Star } from "phosphor-react";
// import styles from "./home.module.css";
// import { api } from "../../services/api";
// import { STORAGE_SERVICE } from "../../services/storage";

// export function Home() {
//   const navigate = useNavigate();
//   const [dado, setDado] = useState("");
//   const [datas, setDatas] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [showFavorites, setShowFavorites] = useState(false);

//   const token =
//     "BQCFQiMH2J2KNthvrjuBZd0UjvJbCrulioMsXpcfmH6ByADgqPfeUcWcsjWQCLb8NsfpP3WE2qvrMZ-0u5DpW0hBW4FqZuo6C7rXlKNULqWGh272UDM";

//   function handleChangeSearchValue(e) {
//     setDado(e.target.value);
//   }

//   useEffect(() => {
//     console.log("Dados aqui: ", datas);
//     console.log("Quantidade de dados: ", datas.length);
//   }, [datas]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const { data } = await api.get(`/v1/search?q=${dado}&type=track`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const tracks = data.tracks.items.map((item) => item);
//       setDatas(tracks);
//     } catch (error) {
//       console.error("Erro ao buscar dados: ", error);
//     }
//   }
//   const toggleSongInPlaylist = (song) => {
//     const isFavorite = favorites.some(
//       (favorite) => favorite.name === song.name
//     );

//     if (isFavorite) {
//       STORAGE_SERVICE.deletePlaylist(song.name);
//       setFavorites(favorites.filter((favorite) => favorite.name !== song.name));
      
//     } else {
//       STORAGE_SERVICE.createPlaylist(song);
//       setFavorites([...favorites, song]);
//       alert(`A música "${song.name}" foi adicionada à playlist!`);
//     }
//   };

//   const loadFavorites = () => {
//     const savedFavorites = STORAGE_SERVICE.listContacts();
//     setFavorites(savedFavorites);
//     setShowFavorites(true);
//   };

//   const resetState = () => {
//     setDado("");
//     setDatas([]);
//     setShowFavorites(false);
//     navigate("/");
//   };

//   return (
//     <div>
//       <Header
//         handleChangeSearchValue={handleChangeSearchValue}
//         loadFavorites={loadFavorites}
//         resetState={resetState}
//         dado={dado}
//         handleSubmit={handleSubmit}
//       />
//       <main>
//         <div className={styles.musics}>
//           {showFavorites ? (
//             <ul className={styles.album}>
//               {favorites.map((favorite, index) => (
//                 <li key={index} style={{ marginTop: "20px" }}>
//                   <img
//                     className={styles.img1}
//                     src={favorite.imagem}
//                     alt="Foto do álbum"
//                   />
//                   <section className={styles.content}>
//                     <div className={styles.textContent}>
//                       <h1>{favorite.name}</h1>
//                       <p>{favorite.artista}</p>
//                       <div className={styles.favorite}>
//                         <audio controls>
//                           <source src={favorite.audio} type="audio/mpeg" />
//                           Seu navegador não suporta o elemento de áudio.
//                         </audio>
//                         <button onClick={() => toggleSongInPlaylist(favorite)}>
//                           <Star size={32} color="#c8cb1a" weight="fill" />
//                         </button>
//                       </div>
//                     </div>
//                   </section>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               {datas.length > 0 && (
//                 <ul className={styles.album}>
//                   {datas.map((data, index) => (
//                     <li key={index} style={{ marginTop: "20px" }}>
//                       <img
//                         className={styles.img1}
//                         src={data.album.images[0].url}
//                         alt={data.album.name}
//                       />
//                       <section className={styles.content}>
//                         <div className={styles.textContent}>
//                           <h1>{data.name}</h1>
//                           <p>{data.artists[0].name}</p>
//                           <div className={styles.favorite}>
//                             <audio controls>
//                               <source
//                                 src={data.preview_url}
//                                 type="audio/mpeg"
//                               />
//                               Seu navegador não suporta o elemento de áudio.
//                             </audio>
//                             <button onClick={() => toggleSongInPlaylist(data)}>
//                               <Star size={32} color="#c8cb1a" weight="fill" />
//                             </button>
//                           </div>
//                         </div>
//                       </section>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </form>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { Star } from "phosphor-react";
import styles from "./home.module.css";
import { api } from "../../services/api";
import { STORAGE_SERVICE } from "../../services/storage";

export function Home() {
  const navigate = useNavigate();
  const [dado, setDado] = useState("");
  const [datas, setDatas] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const token =
    "BQBywpnTledrBv0CK8roPeVdgFIc4R2G2dJcvYY-2VzFSr4ZcPAgsEHTbrdxKFl5XYrezjs3PbZRh9_Ni4ZffsPaaS-7kpBosgZrtUiGOzhcK8ebYmU";

  const artistId = "7H55rcKCfwqkyDFH9wpKM6";
  useEffect(() => {
    // Função para buscar músicas recomendadas do Brasil
    async function fetchRecommendedTracks() {
      try {
        const { data } = await api.get(
          `/v1/recommendations?market=BR&seed_artists=${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const tracks = data.tracks.map((track) => ({
          name: track.name,
          artista: track.artists[0].name,
          imagem: track.album.images[0].url,
          audio: track.preview_url,
        }));
        setDatas(tracks);
      } catch (error) {
        console.error("Erro ao buscar recomendações: ", error);
      }
    }
    
    // Chama a função de recomendações ao montar o componente
    fetchRecommendedTracks();
  }, [token]);

  useEffect(() => {
    // Função para buscar músicas recomendadas do Brasil
    async function fetchRecommendedTracks() {
      try {
        const { data } = await api.get(
          `/v1/recommendations?market=BR&seed_artists=${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const tracks = data.tracks.map((track) => ({
          name: track.name,
          artista: track.artists[0].name,
          imagem: track.album.images[0].url,
          audio: track.preview_url,
        }));
        setDatas(tracks);
      } catch (error) {
        console.error("Erro ao buscar recomendações: ", error);
      }
    }

    // Chama a função de recomendações ao montar o componente
    fetchRecommendedTracks();
  }, [token]);
  
  function handleChangeSearchValue(e) {
    setDado(e.target.value);
  }
  
  useEffect(() => {
    console.log("Dados aqui: ", datas);
    console.log("Quantidade de dados: ", datas.length);
  }, [datas]);
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.get(`/v1/search?q=${dado}&type=track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const tracks = data.tracks.items.map((item) => ({
        name: item.name,
        artista: item.artists[0].name,
        imagem: item.album.images[0].url,
        audio: item.preview_url,
      }));
      setDatas(tracks);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  }
  
  // const addSongToPlaylist = (song) => {
    //   STORAGE_SERVICE.createPlaylist(song);
    //   alert(`A música "${song.name}" foi adicionada à playlist!`);
    // };
    
    const toggleSongInPlaylist = (song) => {
      const isFavorite = favorites.some(
        (favorite) => favorite.name === song.name
      );
      
      if (isFavorite) {
        STORAGE_SERVICE.deletePlaylist(song.name);
        setFavorites(favorites.filter((favorite) => favorite.name !== song.name));
        
      } else {
        STORAGE_SERVICE.createPlaylist(song);
        setFavorites([...favorites, song]);
        alert(`A música "${song.name}" foi adicionada à playlist!`);
    }
  };
  
  
  const loadFavorites = () => {
    const savedFavorites = STORAGE_SERVICE.listContacts();
    setFavorites(savedFavorites);
    setShowFavorites(true);
  };
  
  const resetState = async () => {
    setDado("");
    setDatas([]);
    setShowFavorites(false);
    navigate("/"); 
    window.location.reload();
  };
  
  return (
    <div>
      <Header
        handleChangeSearchValue={handleChangeSearchValue}
        loadFavorites={loadFavorites}
        resetState={resetState}
        dado={dado}
        handleSubmit={handleSubmit}
        />
      <main>
        <div className={styles.musics}>
          {showFavorites ? (
            <ul className={styles.album}>
              {favorites.map((favorite, index) => (
                <li key={index} style={{ marginTop: "20px" }}>
                  <img
                    className={styles.img1}
                    src={favorite.imagem}
                    alt="Foto do álbum"
                  />
                  <section className={styles.content}>
                    <div className={styles.textContent}>
                      <h1>{favorite.name}</h1>
                      <p>{favorite.artista}</p>
                      <div className={styles.favorite}>
                        <audio controls>
                          <source src={favorite.audio} type="audio/mpeg" />
                          Seu navegador não suporta o elemento de áudio.
                        </audio>
                        <button onClick={() => toggleSongInPlaylist(favorite)}>
                          <Star size={32} color="#c8cb1a" weight="fill" />
                        </button>
                      </div>
                    </div>
                  </section>
                </li>
              ))}
            </ul>
          ) : (
            <ul className={styles.album}>
              {datas.map((data, index) => (
                <li key={index} style={{ marginTop: "20px" }}>
                  <img
                    className={styles.img1}
                    src={data.imagem}
                    alt={data.name}
                  />
                  <section className={styles.content}>
                    <div className={styles.textContent}>
                      <h1>{data.name}</h1>
                      <p>{data.artista}</p>
                      <div className={styles.favorite}>
                        <audio controls>
                          <source src={data.audio} type="audio/mpeg" />
                          Seu navegador não suporta o elemento de áudio.
                        </audio>
                        <button onClick={() => toggleSongInPlaylist(data)}>
                          <Star size={32} color="#c8cb1a" weight="fill" />
                        </button>
                      </div>
                    </div>
                  </section>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
