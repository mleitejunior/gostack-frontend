import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      "title": `Repositorio no ${Date.now()}`,
      "url": "http://github.com/mleitejunior",
      "techs": "Java, JS, React, React Native, Spring Boot" 
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const indexOfRepository = repositories.find(repo => repo.id === id).id;

    repositories.splice(indexOfRepository , 1);

    await api.delete(`repositories/${id}`);

    setRepositories([repositories]);
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((repo) => {
          return (
            <li key={repo.id}>{repo.id} = {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
            </li>
          )
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
