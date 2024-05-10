import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import birthdaySong from './birthday_song.mp3';
import NewsCrawler from './NewsCrawler';
import './HomePage.css';

const useCountdown = (targetDate) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
};

const handleSubmit = (password, navigate) => {
  if (password === 'Spaghetti') { // Consider using a more secure authentication method
    navigate('/video-page');
  } else {
    alert('Incorrect password. Please try again.');
  }
};

const handleKnockKnock = (setShowContent, setShowNewsCrawler) => {
  setShowContent(true);
  setShowNewsCrawler(false);
};

const HomePage = () => {
  const [password, setPassword] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [showNewsCrawler, setShowNewsCrawler] = useState(false);
  const hint = "Your favourite food.";
  const newsItems = ["This is a birthday message website dedicated only to you.Happy Birthday Love of my life.The one and only Ifedayo Busayo Savage.I love you so so much "];
  const navigate = useNavigate();

  const birthdayDate = new Date('2025-05-09T00:00:00');
  const countdown = useCountdown(birthdayDate);

  return (
    <div className="homepage-container">
      {showContent && (
        <>
          <Confetti />
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(password, navigate);
          }}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <p>Hint: {hint}</p>
            <button type="submit">Submit</button>
          </form>
          <audio className="audio-player" id="birthdaySong" src={birthdaySong} controls autoPlay />
        </>
      )}
      {!showContent && (
        <div className="knock-button-container">
          <button className="knock-button" onClick={() => handleKnockKnock(setShowContent, setShowNewsCrawler)}>Knock, knock!</button>
        </div>
      )}
      {showNewsCrawler && <NewsCrawler />}
      <footer className="footer-container">
        <div className="footer-countdown">
          {Object.entries(countdown).map(([unit, value]) => (
            <div className="countdown-item" key={unit}>
              <div className="countdown-value">{value}</div>
              <div className="countdown-label">{unit.charAt(0).toUpperCase() + unit.slice(1)}</div>
            </div>
          ))}
        </div>
        <div className="footer-newscrawler">
          {showNewsCrawler && <NewsCrawler />}
          <NewsCrawler items={newsItems} />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;