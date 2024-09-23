import { useState, useEffect } from "react";
import axios from "axios";

export function Api() {
  const clientID = "eab84205a13a4f35b18d58aa1e4f023f";
  const clientSecret = "d6873fb3a8ca4557848314b6b391d27a";

  const [dado, setDado] = useState('');
  const [token, setToken] = useState('');

  const handleChangeSearchValue = (e) => {
    setDado(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          params.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
              username: clientID,
              password: clientSecret,
            },
          }
        );
        setToken(response.data.access_token);
        console.log('Token:', response.data.access_token);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchToken();

    const intervalId = setInterval(fetchToken, 3600000)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChangeSearchValue} type="text" value={dado} />
        <button type="submit">Enviar</button>
      </form>
      {token && <p>Token: {token}</p>}
    </div>
  );
}
