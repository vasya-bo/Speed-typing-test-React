import {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [data, setData] = useState('1234567890')
  const [textRight, setTextRight] = useState('')
  const [textInProcces, setTextInProcess] = useState('')
  const [textNotProccessed, setTextNotProccessed] = useState('')

  useEffect( () => {
  fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text")
  .then(response => response.text())
  .then(response => setData(response))
}, []);

//useEffect(() => {console.log('upload')}, [textInProcces,textNotProccessed])

function start() {
  let dataArray = data.split('')
  let firstLetter = dataArray[0];
  setTextInProcess(firstLetter);
  dataArray.shift();
  setTextNotProccessed(dataArray.join(''));
}



function handleKeyPress(event) {
  if(textNotProccessed.length > 0) {
    if(event.key === textInProcces){
  let dataArray = textNotProccessed.split('')
  let firstLetter = dataArray[0];
  setTextRight(currentValue => currentValue + textInProcces)
  setTextInProcess(currentValue => currentValue = firstLetter);
  dataArray.shift();
  setTextNotProccessed(dataArray.join(''));}
  else { console.log('wrong letter')}

}
  else {
    setTextRight(currentValue => currentValue = '')
    setTextInProcess(currentValue => currentValue = '')
    setTextNotProccessed(currentValue => currentValue = 'End!')
  }


}

  return (
    <div className="App">

<button id='start' onClick={()=> start()}>Start!</button>
      <div className='textArea'  >
      <span id='text-right'>{textRight}</span>
      <span id='text-in-process'>{textInProcces}</span>
      <span id='text-not-proccessed'>{textNotProccessed} </span><br></br>
      <input type='text' onKeyPress={(event) => handleKeyPress(event)}></input>
      </div>

      
    </div>
  );
}

export default App;
