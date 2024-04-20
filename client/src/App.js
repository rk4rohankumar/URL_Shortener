import React from 'react';
import ShortenedUrlList from './components/ShortenedUrlList';

const App = () => {


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">URL Shortener</h1>
      <ShortenedUrlList />
    </div>
  );
};

export default App;
