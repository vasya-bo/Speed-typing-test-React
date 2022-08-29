import {useState, useEffect} from 'react'
import './App.css';

function App() {

  const [data, setData] = useState(null)

  useEffect( () => {
  fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text")
  .then(response => response.text())
  .then(response => setData(response))  
}, [])
  return (
    <div className="App">
      {data}
    </div>
  );
}

export default App;
