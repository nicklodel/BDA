import React, { useEffect,useState } from 'react'
import Axios from 'axios'
function Edit (){
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
        Items.push(
          
          <option value={value['idatraccion']}>{value['idatraccion']}</option>
          )}

  
  
  
    const [data,setData] = useState({
        idatraccion: 0,
          nombre: "",
          aforo: 0,
          edadrecomendada: 0,
          duracionmin: 0
  })
  
  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }
  
  function submitPut(e){
    e.preventDefault();
    Axios.put("http://localhost:5000/put",{
      idatraccion: data.idatraccion,
      nombre: data.nombre,
      aforo: data.aforo,
      edadrecomendada: data.edadrecomendada,
      duracionmin: data.duracionmin
    }).then(res =>{
      console.log(res.data)
    })
  }


  return (
    <div className="App">
      <form onSubmit={(e) => submitPut(e)}>
        <label>Id Atracción</label>
        <br />
        <select value={data.idatraccion} id='idatraccion'onChange= {(e) =>handle(e)}>
            <option value='-'>-</option>
            {Items}
        </select>
        <br /> 
        <label>Nombre</label>
        <br />
        <input
          type="text"
          id="nombre"
          value={data.nombre}
          placeholder="nombre"
          onChange={(e) => handle(e)}
        />
        <br />
        <label>Aforo</label>
        <br />
        <input
          type="number"
          id="aforo"
          value={data.aforo}
          placeholder="aforo"
          onChange={(e) => handle(e)}
        />
        <br />
           <label>Edad recomendada</label>
           <br />
           <input
          type="number"
          id="edadrecomendada"
          value={data.edadrecomendada}
          placeholder="edadrecomendada"
          onChange={(e) => handle(e)}
        />
        <br></br>
        <label>Duracion min</label>
        <br />
        <input
          type="number"
          id="duracionmin"
          value={data.duracionmin}
          placeholder="duracionmin"
          onChange={(e) => handle(e)}
        />

        <button type="submit">Añadir</button>
        <br />
      </form>
    </div>
  );
}
 
export default Edit;