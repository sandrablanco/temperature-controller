import React  from 'react'
import TemperatureControls from './components/TemperatureControls';
import TemperatureDisplay from './components/TemperatureDisplay';
import {useState, useEffect} from 'react';
import HistoryList from './components/HistoryList';


// import TemperatureDisplay from './components/TemperatureDisplay';
// import HistoryList from './components/HistoryList';


function App() {
  const [temperatura, setTemperatura] = useState (20)
  const [historial, setHistorial] = useState(() => { //carga historial guardado al iniciar
    const historialGuardado = localStorage.getItem('historial');
    return historialGuardado ? JSON.parse(historialGuardado) : [];
  });
  
  useEffect(() => { //guarda historial en localStorage cada vez que cambia
    localStorage.setItem('historial', JSON.stringify(historial));
  }, [historial]);

  const [loading, setLoading] = useState (true)

  useEffect(() => {setTimeout(() => {
    setLoading(false);
  }, 3000); }, []);

  const añadirHistorial = (nuevaTemperatura) => {
    const fecha = new Date().toLocaleTimeString();
    setHistorial ([...historial, {fecha, nuevaTemperatura}]);
  }
  
    const incrementarTemperatura = () =>{
      if (temperatura < 40) {
      const nuevaTemperatura = temperatura+1
      setTemperatura(nuevaTemperatura)
      añadirHistorial(nuevaTemperatura)
      }
    }
    const decrementarTemperatura =()=>{
      if (temperatura > 0) {
      const nuevaTemperatura = temperatura-1
      setTemperatura(nuevaTemperatura)
      añadirHistorial(nuevaTemperatura)
      }
    }
   const resetearTemperatura = () => {
     setTemperatura(20)
     setHistorial([]) //limpia historial al resetear
     localStorage.removeItem('historial') //elimina historial guardado al resetear

    }
    return(
      <div className='app'>
        <h1>Controlador Temperatura</h1>
        <TemperatureDisplay temperatura={temperatura}/>
        <TemperatureControls 
          incrementarTemperatura ={incrementarTemperatura}
          decrementarTemperatura ={decrementarTemperatura}
          resetearTemperatura = {resetearTemperatura}
        />
        <h2> Historial </h2> 
        {loading ? <p>Cargando historial...</p> : (
        <HistoryList historial={historial} /> )}
</div>

    )
}
export default App;



