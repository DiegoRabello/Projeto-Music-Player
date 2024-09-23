const DB_KEY = "@Playlist"
export const STORAGE_SERVICE = {
    listContacts: () => {
    const storage = localStorage.getItem(DB_KEY);

    if (storage) {
        return JSON.parse(storage)
    }

    return []
},

createPlaylist: (data) => {
    try {
        const storage = localStorage.getItem(DB_KEY);
        const songFavorite = {
            name: data.name,
            artista: data.artists && data.artists.length > 0 
                ? data.artists[0].name 
                : "Artista desconhecido",
            audio: data.preview_url || null,
            imagem: data.imagem 
                
                
        };

        let contacts = [];

        if (storage) {
            try {
                contacts = JSON.parse(storage) || [];
            } catch (error) {
                console.error("Erro ao parsear o storage:", error);
            }
        }

        contacts.push(songFavorite);
        localStorage.setItem(DB_KEY, JSON.stringify(contacts));
        
    } catch (error) {
        console.error("Erro ao salvar a música na playlist:", error);
    }
},
deletePlaylist: (dataName) => {
    const storage = localStorage.getItem(DB_KEY);
    if (storage) {
        const playlist = JSON.parse(storage);
        const updatedPlaylist = playlist.filter(
        (playlist) => playlist.name !== dataName
      );
      localStorage.setItem(DB_KEY, JSON.stringify(updatedPlaylist));
    }
},

updateTaskState: (taskDescription) => {
    const storage = localStorage.getItem(DB_KEY);

    if (storage) {
        const storageParsed = JSON.parse(storage)

        const updatedTask = storageParsed.map(item => {
            if (item.description === taskDescription) {
                return {
                ...item,
                isCompleted: !item.isCompleted
                }
            }
            return item
        })
        return localStorage.setItem(DB_KEY, JSON.stringify(updatedTask))
        }
    return alert('Task not found');
    }
}



