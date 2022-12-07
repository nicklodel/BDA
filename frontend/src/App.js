import React, {useEffect, useState} from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css'

function App() {

  async function deleteItem(id) {
    await fetch("http://localhost:5000/" + id, {mode:'cors'})
  }

  const [backendData,setBackendData] = useState([{}])
  const Items = [];
  
  useEffect(() =>{
    fetch("http://localhost:5000/atracciones", {mode:'cors'}).then(
      response => response.json()
    ).then(
      data =>{
        setBackendData(data)
      }
    )
  })
  
  const map = new Map(Object.entries(backendData));
  map.forEach(call)

  

  function call(value,key,map){
    Items.push(<tr>
      <td>
      {value['idatraccion']}
      </td>
      <td>{value['nombre']}</td>
      <td>{value['aforo']}</td>
      <td>{value['edadrecomendada']}</td>
      <td>{value['duracionmin']}</td>
      <button onClick = {() => deleteItem(value['idatraccion'])}>Eliminar</button>
      
      </tr>)
  }
  
  return (
    
    <div>
      <table>
  <tr>
    <th>idatracción</th>
    <th>nombre</th>
    <th>aforo</th>
    <th>edad recomendada</th>
    <th>Duración min</th>
  </tr>
  {Items}
  </table>
  </div>
  );
}

export default App;
