import React, { useState, useRef } from 'react';
import './App.css';
import Card from './Card';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
  };

  const recordLapTime = () => {
    const currentLapTime = Date.now() - startTimeRef.current;
    setLapTimes([...lapTimes, currentLapTime]);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
      
      <div className="App" style={{ backgroundImage: `url('https://media.istockphoto.com/id/1393709868/vector/clock-or-stopwatch-pocket-watch-on-a-dark-blue-background-clockwork-pocket-watch-abstract.jpg?s=612x612&w=0&k=20&c=SW3NnN07tAy-UOeE8s82l3BhUOosnRtMKRM5Q99ru54=')` }}>
      <div>
      <h1 style={{color:'white'}}>StopWatch</h1>
    <div className="container">
        <Card>
          <div className="stopwatch">
            <div className="display">{formatTime(time)}</div>
            <div className="controls">
              {!isRunning ?
                <button onClick={startTimer}>Start</button> :
                <>
                  <button onClick={pauseTimer}>Pause</button>
                  <button onClick={recordLapTime}>Lap</button>
                </>
              }
              <button onClick={resetTimer}>Reset</button>
            </div>
            <div className="lap-times">
              <h2>Lap Times</h2>
              <ul>
                {lapTimes.map((lapTime, index) => (
                  <li key={index}>{`Lap ${index + 1}: ${formatTime(lapTime)}`}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </div>
  );
}

export default App;
