import React, { useEffect, useState } from "react";
import axios from 'axios';
import { fetchAllDataApi, redirectApi } from "../utils/api";
import Form from './Form'; // Import the Form component

const ShortenedUrlList = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(fetchAllDataApi);
      setUrls(response.data);
    } catch (error) {
      console.error('Error fetching shortened URLs:', error);
    }
  };

  const handleNewUrl = (newUrl) => {
    setUrls([newUrl, ...urls]); // Prepend the new URL to the existing list
  };
  

  return (
    <div className="mt-8 text-center lg:w-2/3 m-auto">
      <Form onShorten={handleNewUrl} /> {/* Pass the callback function */}
      <h2 className="text-lg font-semibold my-8">Shortened URLs:</h2>
      <ul className="mt-2">
        {urls.map((url) => (
          <li key={url._id} className="mt-2 shadow p-2 bg-green-50 rounded">
            <div>
              <span className="text-gray-600 mr-2">Short URL:</span>
              <a
                href={redirectApi + url.shortCode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {redirectApi + url.shortCode}
              </a>
            </div>
            <div>
              <span className="text-gray-600 mr-2">Original URL:</span>
              <span className="break-all">{url.originalUrl}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortenedUrlList;
