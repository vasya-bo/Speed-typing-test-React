import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import { textReducer, initialStateText } from './reducers/textReducer';

function App() {
  const [text, dispatch] = useReducer(textReducer, initialStateText);
  const [data, setData] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [keyPressed, setKeyPressed] = useState(null);
  const [color, setColor] = useState('#03b403');
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
    setData('Officia consectetur landjaeger lorem salami, short loin pariatur burgdoggen bacon laborum irure beef ribs do. Laborum buffalo prosciutto, deserunt ipsum sirloin pork chop aute tongue filet mignon consectetur occaecat ex short ribs frankfurter. Minim est laborum bresaola pork belly. Ullamco aliqua bacon brisket in flank do ut boudin t-bone laboris. Deserunt consequat sausage swine reprehenderit. Brisket aliquip shank officia shoulder.');
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
        setColor('#03b403');
        const dataArray = text.notDone.split('');
        const firstLetter = dataArray[0];
        dataArray.shift();

        dispatch({ type: 'RIGHT_LETTER', payload: { firstLetter, dataArray } });

        setKeyPressed(null);
      } else {
        console.log('wrong letter');
        setColor('#ec5b2f');
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
    stopTimer();
    setSeconds({ timer: null, seconds: 0 });
  }

  return (
    <div className="App">

      <div className="navbar navbar-expand-lg bg-primary header">
        <span className="card-title">Check your typing skills!</span>
      </div>

      <div className="textArea-container">
        <div className="textArea">
          <span id="text-right">{text.Right}</span>
          <span id="text-in-process" style={{ backgroundColor: color }}>{text.inProcess}</span>
          <span id="text-not-proccessed">
            {text.notDone}
            {' '}
          </span>
        </div>
      </div>

      {startButton && <button id="start" className="btn btn-primary" type="button" onClick={() => start()}>Start</button>}

      {showResult && <h2>Great job!</h2>}

      {!startButton
     && (
       <>
         <div className="statistic-container">
           <div id="accuracy-Area">
             Accuracy:
             {' '}
             {
        text.numberWrong + text.numberRight !== 0
          ? ((text.numberRight * 100) / (text.numberWrong + text.numberRight)).toFixed(1) : 100
        }
             %

           </div>
           <div id="timer-Area">
             Typing speed:
             {' '}
             {seconds.seconds !== 0
               ? Math.floor((text.numberRight * 60) / (seconds.seconds)) : 0}
             {' '}
             char/min

           </div>
         </div>

         {text.inProcess && <button className="btn btn-primary" type="button" onClick={() => reload()}>Start over</button> }
       </>
     )}
      {showResult
     && <button className="btn btn-primary" type="button" onClick={() => reload()}>Again!</button>}
    </div>
  );
}

export default App;
