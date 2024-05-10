import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Epistle.css';
import epistleVideo from './epistle.mp4';
import epistleText from './EpistleText.js';

const Epistle = ({ handleEnd }) => {
  const [showEpistle, setShowEpistle] = useState(false);
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    handleEnd();
    setShowEpistle(true);
  };

  useEffect(() => {
    document.title = 'Epistle';
  }, []);

  return (
    <div className="epistle-container">
      {!showEpistle ? (
       <ReactPlayer
       url={epistleVideo}
       playing
       width="100%"
       height="100%"
       style={{ borderRadius: '8px' }}
       onEnded={handleVideoEnd}
       controls
       config={{
         file: {
           attributes: {
             className: 'react-player',
           },
         },
       }}
     />
      ) : (
        <div className="epistle-text-container">
          <h1>Birthday message</h1>
          <h2>A little expression of love</h2>
          <p>{epistleText}</p>
          <button onClick={() => navigate('/')}>Go Back</button>
        </div>
      )}
    </div>
  );
};

const EpistlePage = () => {
  const [loading, setLoading] = useState(true);

  const handleEnd = () => {
    setLoading(false);
  };

  useEffect(() => {
    handleEnd();
  }, []);

  return (
    <div className="epistle-page-container">
      {loading && <div>Loading...</div>}
      {!loading && (
        <Epistle handleEnd={handleEnd} />
      )}
    </div>
  );
};

export default EpistlePage;