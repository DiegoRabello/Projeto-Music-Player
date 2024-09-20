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
    const storage = localStorage.getItem(DB_KEY);
    const songFavorite = {
        name: data.name,
        artista: data.artists[0].name,
        audio: data.preview_url,
        imagem: data.album.images[0].url
    };  

    if (storage) {
        const storageParsed = JSON.parse(storage);

        const contacts = [...storageParsed, songFavorite];

        return localStorage.setItem(DB_KEY, JSON.stringify(contacts));
    }

    return localStorage.setItem(DB_KEY, JSON.stringify([songFavorite]));
},
deleteContact: (contactName) => {
    const storage = localStorage.getItem(DB_KEY);
    if (storage) {
        const contacts = JSON.parse(storage);
        const updatedContacts = contacts.filter(
        (contact) => contact.name !== contactName
      );
      localStorage.setItem(DB_KEY, JSON.stringify(updatedContacts));
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



