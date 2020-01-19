import React, { useState, useEffect } from 'react';

import DevItem from "./components/DevItem/DevItem";
import DevForm from "./components/DevForm/DevForm";
import api from "./services/api";

import './global.css';
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleSubmit(data) {
    const response = await api.post("/devs", data);
      
    setDevs([...devs, response.data]);
  } 

  return (
    <div id="container">
      <aside>
        <strong>Cadastrar</strong>

        <DevForm onSubmit={handleSubmit} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem dev={dev} key={dev._id} />
          ))}
        </ul>
      </main> 
    </div>
  );
}

export default App;
