import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing lazy-loaded components
const HomePage = lazy(() => import('./components/HomePage'));
const VideoPage = lazy(() => import('./components/VideoPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));
const Epistle = lazy(() => import('./components/EpistlePage'));

function App() {
  const [showNewsCrawler, setShowNewsCrawler] = useState(false);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Define routes for each component */}
          <Route path="/" element={<HomePage showNewsCrawler={showNewsCrawler} setShowNewsCrawler={setShowNewsCrawler} />} />
          <Route path="/video-page" element={<VideoPage />} />
          <Route path="/epistle" element={<Epistle />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
