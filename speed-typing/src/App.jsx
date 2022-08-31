import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import { textReducer, initialStateText } from './reducers/textReducer';

function App() {
  const [text, dispatch] = useReducer(textReducer, initialStateText);

  const [data, setData] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [keyPressed, setKeyPressed] = useState(null);
  const [color, setColor] = useState('green');
  const [startButton, setStartButton] = useState(true);
  const [seconds, setSeconds] = useState({ timer: null, seconds: 0 });

  function startTimer() {
    const timerID = setInterval(() => {
      setSeconds((prevValue) => ({ ...prevValue, seconds: prevValue.seconds + 1, timer: timerID }));
    }, 1000);
  }

  function stopTimer() {
    clearInterval(seconds.timer);
  }

  useEffect(() => {
    // fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text')
    //   .then((response) => response.text())
    //   .then((response) => { setData(response); });
    setData('12345678890');
    console.log('upload1');
  }, [data]);

  useEffect(() => {
    console.log('addEvent upload');
    window.addEventListener('keypress', (event) => {
      event.preventDefault();
      setKeyPressed(event.key);
    }, true);
  }, []);

  useEffect(() => {
    if (keyPressed && text.numberAll !== text.numberRight) {
      if (keyPressed === text.inProcess) {
        setColor('green');
        const dataArray = text.notDone.split('');
        const firstLetter = dataArray[0];
        dataArray.shift();

        dispatch({ type: 'RIGHT_LETTER', payload: { firstLetter, dataArray } });

        setKeyPressed(null);
      } else {
        console.log('wrong letter');
        setColor('red');
        setKeyPressed(null);

        dispatch({ type: 'WRONG_LETTER' });
      }
    }

    console.log(text.numberAll, text.numberRight);
    if (text.numberAll !== 0 && text.numberAll === text.numberRight) {
      console.log('you are done! ');

      setShowResult(true);
      stopTimer();
    }
  }, [keyPressed, text]);

  function start() {
    const dataArray = data.split('');
    const firstLetter = dataArray[0];
    dataArray.shift();
    dispatch({ type: 'START', payload: { firstLetter, dataArray } });
    startTimer();
    setStartButton(false);
  }

  function reload() {
    dispatch({ type: 'NEW_GAME' });
    setData(null);
    setShowResult(false);
    setColor('green');
    setStartButton(true);
    setSeconds({ timer: null, seconds: 0 });
  }

  return (
    <div className="App">

      {startButton && <button id="start" type="button" onClick={() => start()}>Start!</button>}

      <span id="text-right">{text.Right}</span>
      <span id="text-in-process" style={{ backgroundColor: color }}>{text.inProcess}</span>
      <span id="text-not-proccessed">
        {text.notDone}
        {' '}
      </span>
      <br />

      {showResult && <h2>End!</h2>}

      {!startButton
     && (
     <>
       <div id="accuracy-Area">
         Точность:
         {
        text.numberWrong + text.numberRight !== 0
          ? ((text.numberRight * 100) / (text.numberWrong + text.numberRight)).toFixed(1) : 100
        }
         %

       </div>
       <div id="timer-Area">
         Скорость:
         {seconds.seconds !== 0
           ? Math.floor((text.numberRight * 60) / (seconds.seconds)) : 0}
         {' '}
         знак/мин

       </div>
     </>
     )}
      {showResult
     && <button type="button" onClick={() => reload()}>Еще раз!</button>}
    </div>
  );
}

export default App;
