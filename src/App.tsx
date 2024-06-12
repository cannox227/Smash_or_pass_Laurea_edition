
import { useState } from 'react';
import './App.css';
import Canvas from './Canvas.tsx';
import person_face from './assets/media/mati-face.webp';

export const person_name = 'Maty';

function App() {
  const [animate, setAnimate] = useState(false);
  const [showHomeIntro, setShowHomeIntro] = useState(true);
  const [animationDone, setAnimationDone] = useState(false);

  const handleStartClick = () => {
    setAnimate(true);
    setShowHomeIntro(false);
  };

  const handleAnimationEnd = () => {
      setAnimationDone(true);
   };


  return (
    <>
        {showHomeIntro && !animationDone && (
        
        <div className="image-container">
        <img
          src={person_face}
          alt="Person face"
          className={`rotating-image ${animate ? 'animate' : ''}`}
          onAnimationEnd={handleAnimationEnd}
        />

      <div className="home_intro">
        <h1>Smash or Pass</h1>
      <h2>{person_name}'s Laurea Edition</h2>
      <div className="card">
        <button onClick={handleStartClick}>Start!</button>
      </div>
      </div>
      </div>
      )}

      {!showHomeIntro && (
          <Canvas />
      )}

    </>
  );
}

export default App;

