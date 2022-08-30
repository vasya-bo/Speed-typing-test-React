import {useState, useEffect} from 'react'
import './App.css';

function App() {
const [data, setData] = useState('')
const [showResult, setShowResult] = useState(false)
const [keyPressed, setKeyPressed] = useState(null)
const [color, setColor] = useState('green')

  const [text,setText] = useState({Right: '', inProcess: '', notDone: '', numberAll: 0, numberRight: 0, numberWrong: 0})


  useEffect( () => {
  // fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text")
  // .then(response => response.text())
  // .then(response => { setData(response)})
  setData('12345678890')
  console.log('upload1')
}, [data]);

useEffect(() => {
  console.log('addEvent upload')
  window.addEventListener('keypress', (event) => {
    event.preventDefault()
    setKeyPressed(prevValue => prevValue = event.key)}, true)

}, [])

useEffect(()=> {
  console.log('key in state', keyPressed)
  console.log('text in procces', text.inProcess)
  if (keyPressed && text.numberAll !== text.numberRight) {
  if(keyPressed ===  text.inProcess){
    setColor(prevValue => prevValue = 'green')

  let dataArray = text.notDone.split('')
  let firstLetter = dataArray[0];
  dataArray.shift();
  setText(prevValue => { return {...prevValue, 
                                Right: prevValue.Right + prevValue.inProcess,
                                 inProcess:firstLetter, 
                                 notDone: dataArray.join(''), 
                                 numberRight: prevValue.numberRight +1}})
  setKeyPressed(prevValue => prevValue = null)
} 
 else {console.log('wrong letter')
setColor(prevValue => prevValue = 'red')
setKeyPressed(prevValue => prevValue = null)
setText(prevValue=>{return {...prevValue, numberWrong: prevValue.numberWrong +1}})
}
}

console.log (text.numberAll, text.numberRight)
if (text.numberAll !== 0 && text.numberAll === text.numberRight) {console.log('you are done! ')
  
setShowResult(prevValue => prevValue = true)}
}, [keyPressed, text])


function start() {
  let dataArray = data.split('')
  let firstLetter = dataArray[0];
dataArray.shift()

  setText(text => { return {...text,numberAll:dataArray.length+1, inProcess:firstLetter, notDone: dataArray.join('')}})
} 

  return (
    <div className="App">

<button id='start' onClick={()=> start()}>Start!</button>
      
      <span id='text-right'>{text.Right}</span>
      <span id='text-in-process' style={{'backgroundColor': color}}>{text.inProcess}</span>
      <span id='text-not-proccessed'>{text.notDone} </span><br></br>

      {showResult && <h2>End!</h2>}
    </div>
  );
}

export default App;
