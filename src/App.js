import React, { useState, useEffect } from "react";
import Header from './components/Header'
import api from './services/api';


import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [techs, setTechs] = useState([]);





  useEffect(() => {
    api.get('repositories').then(response =>
      setRepositories(response.data))
  }, []
  )

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url,
      title,
      techs
    });

    console.log(response);

    setRepositories([...repositories, response.data])

    setTechs('');
    setUrl('');
    setTechs('');
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(newRepositories);
  }


  function handleUrl(e) {
    setUrl(e);
  }

  function handleTitle(e) {
    setTitle(e);
  }

  function handleTechs(e) {

    const techs = e.split(',')

    setTechs(techs);

  }

  return (
    <>
      <Header />

      <div>
        <label>
          Insira as informações do novo repositório: 
        </label>
      </div>

      <div className='input'>
        <div className='item'>
        <label>Url </label>
        <input type="text" className='textInput' onChange={(e) => handleUrl(e.target.value)} />
        </div>


        <div className='item'>
        <label>Title </label>
        <input type="text" className='textInput' onChange={(e) => handleTitle(e.target.value)} />
        </div>

      
        <div className='item'>
        <label>Techs </label>
        <input type="text" className='textInput' onChange={(e) => handleTechs(e.target.value)} />
        </div>

      
        <div className='item'>
        <button onClick={handleAddRepository}>Adicionar</button>
        </div>
      </div>

      <div>
        <ul data-testid="repository-list">
          {repositories.map(repository => {
            return (
              <li key={repository.id}>
                <h1>{repository.title}</h1>
                <a href={repository.url} className="url" target="_blank" rel="noopener noreferrer">Acessar repositório</a>
                <p className="techs">{repository.techs}</p>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
              </button>
              </li>
            )
          })
          }
        </ul>
      </div>

    </>
  );
}

export default App;
