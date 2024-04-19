import React, { useState } from 'react';
import axios from 'axios';
import { shortenApi } from '../utils/api';

const Form = ({ onShorten }) => {
  const [originalUrl, setOriginalUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${shortenApi}`, { originalUrl });
      onShorten(res.data); // Call the callback function with the new data
      setOriginalUrl(''); // Clear the input field after submitting
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        placeholder="Enter URL to shorten"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Shorten
      </button>
    </form>
  );
};

export default Form;
