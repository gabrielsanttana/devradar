import React, {useState, useEffect} from "react";

import "./DevForm.css";

function DevForm({onSubmit}) {
  const [username, setUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.log(error);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit({
      github_username: username,
      techs,
      latitude,
      longitude
    });
  
    console.log(username);
    
    setUsername("");
    setTechs("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          type="text"
          id="github_username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          autoFocus />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias <span>(separadas por vírgula)</span></label>
        <input
          type="text"
          id="techs"
          value={techs}
          onChange={(event) => setTechs(event.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            id="latidude"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit">Enviar</button>
    </form>
  )
}

export default DevForm;
