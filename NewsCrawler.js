import React from 'react';
import  './NewsCrawler.css'
const NewsCrawler = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="news-crawler">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="news-item">
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
};

export default NewsCrawler;
