import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Videopage.css';
import happyBirthdayVideo from './Happy Birthday.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const VideoPage = () => {
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const hint = "ME";

  const handlePasswordSubmit = () => {
    if (password === 'mariam') {
      navigate('/epistle');
    } else {
      alert('Incorrect password!');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`videopage-container ${darkMode? 'dark-mode' : ''}`}>
      <div className="video-container">
        <ReactPlayer
          url={happyBirthdayVideo}
          muted
          controls
          width="80%"
          height="auto"
          style={{ borderRadius: '8px' }}
          playsinline
          onError={(error) => console.error('Error playing video:', error)}
        />
      </div>
      <Footer
        password={password}
        setPassword={setPassword}
        handlePasswordSubmit={handlePasswordSubmit}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        hint={hint} // pass the hint variable as a prop
      />
    </div>
  );
};

const Footer = ({
  password,
  setPassword,
  handlePasswordSubmit,
  darkMode,
  toggleDarkMode,
  hint,
}) => {
  return (
    <div className="footer">
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={handlePasswordSubmit}>Enter</button>
      <p>Hint: {hint}</p>

      <DarkModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

const PasswordInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="password"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

const DarkModeButton = ({ darkMode, toggleDarkMode }) => {
  return (
    <button onClick={toggleDarkMode}>
      <FontAwesomeIcon icon={darkMode? faSun : faMoon} />
    </button>
  );
};

export default VideoPage;