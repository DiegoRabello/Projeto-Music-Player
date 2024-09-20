import { useEffect, useState } from "react";
import {api} from "../../services/api"

export function PegarMusica() {

  const [dado, setdado] = useState('')
  const [datas, setdatas] = useState([])
  // const [loading, setLoading] = useState(false)
  const token =
    "BQDQ9d4IbSo1JU2gi3lZcE5dChGiSk6pV06edkfMynD1cRCa9Uly7MrxBK5oFWpcDEj3fn8LljG4-KhF9Gw1JREsALdIXrgQAW5v5LwiYs39DJf4C38";

  function handleChangeSearchValue(e){
    setdado(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // setLoading(true)
    const {data}  = await api.get(
      `/v1/search?q=${dado}&type=track`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

    console.log(data)
    console.log(data.albums)

    // const dito = data.albums.items.map((item) => ({
    //   fullName: item.name,
    //   description: item.album_type,
    // }
    // ));

    const dito = data.tracks.items.map((item) => item)

    setdatas(dito)
    // setLoading(false)

  }

  useEffect(()=>{
    console.log("data aqui ",datas)
    console.log(datas.length)

    
    // console.log("este sao os albuns", datas.albums.items[0].name)
    
    
  },[datas])

  

  

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChangeSearchValue} type="text" value={dado} />
        <button type="submit">enviar</button>
        
        
        {datas.length > 0 && (
          <ul>{datas.map((data, index)=>(
            <li key={index} style={{ "margin-top": "20px" }}>
              <img src={data.album.images[0].url} alt="" style={{ "width": "200px" }}/>
              <p>{data.name}</p>
              <p>{data.album_type}</p>
              <button>Salvar</button>
            </li>
          ))}</ul>
        )}
      </form>
    </div>
  )
}

