import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [keyPressed, setKeyPressed] = useState(null);
  const [color, setColor] = useState('green');
  const [startButton, setStartButton] = useState(true);

  const [text, setText] = useState({
    Right: '', inProcess: '', notDone: '', numberAll: 0, numberRight: 0, numberWrong: 0,
  });

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
    fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text')
      .then((response) => response.text())
      .then((response) => { setData(response); });
    // setData('12345678890');
    console.log('upload1');
  }, []);

  useEffect(() => {
    console.log('addEvent upload');
    window.addEventListener('keypress', (event) => {
      event.preventDefault();
      setKeyPressed(event.key);
    }, true);
  }, []);

  useEffect(() => {
    console.log('key in state', keyPressed);
    console.log('text in procces', text.inProcess);
    if (keyPressed && text.numberAll !== text.numberRight) {
      if (keyPressed === text.inProcess) {
        setColor('green');

        const dataArray = text.notDone.split('');
        const firstLetter = dataArray[0];
        dataArray.shift();
        setText((prevValue) => ({
          ...prevValue,
          Right: prevValue.Right + prevValue.inProcess,
          inProcess: firstLetter,
          notDone: dataArray.join(''),
          numberRight: prevValue.numberRight + 1,
        }));
        setKeyPressed(null);
      } else {
        console.log('wrong letter');
        setColor('red');
        setKeyPressed(null);
        setText((prevValue) => ({ ...prevValue, numberWrong: prevValue.numberWrong + 1 }));
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

    setText((prevValue) => ({
      ...prevValue, numberAll: dataArray.length + 1, inProcess: firstLetter, notDone: dataArray.join(''),
    }));
    startTimer();
    setStartButton(false);
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
    </div>
  );
}

export default App;
