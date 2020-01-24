import React, { useState  , useEffect } from 'react';
import api from "./services/api"

// Principais conceitos

// Componente : Bloco isolado de HTML, CSS e JavaScript, o qual não interfece no restante da aplicação
// um componente deve ter um único conteiner sempre ( utiliza a tag vazia <> </> )

// Estado : Informações mantidas pelo componente ( Lembrar: imultabilidade )

// Propriedade : Informações que o componente PAI pode passar para o componente FILHO

import "./global.css"
import "./App.css"
import "./SideBar.css"
import "./Main.css"

import DevForm from "./components/DevForm"
import DevItem from "./components/DevItem"

function App() {
  const [ devs , setDevs ] = useState([])
  
  useEffect( () => {
    async function loadDevs(){
      const response = await api.get("/devs")

      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {  
    const response = await api.post("/devs", data)

    setDevs([...devs, response.data])
  } 

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        < DevForm onSubmit={handleAddDev} /> 
      </aside>
      
      <main>
        <ul> 
          { devs.map(dev => (
            < DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
