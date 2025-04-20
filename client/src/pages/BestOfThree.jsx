import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function BestOfThree() {
  const location = useLocation();
  const [receivedData, setReceivedData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.response) {
      const responseString = location.state.response;

      // Remove the ```json\n and \n``` wrappers
      const cleanString = responseString.substring(responseString.indexOf('['), responseString.lastIndexOf(']') + 1);

      try {
        // Attempt to parse the cleaned JSON string
        const parsedData = JSON.parse(cleanString);
        setReceivedData(parsedData);
        console.log('Parsed data in BestOfThree:', parsedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setReceivedData([]);
      }
    } else {
      setReceivedData([]);
    }
  }, [location.state]);

  if (!receivedData) {
    return (
      <div className="bg-gray-100 p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Loading Movie Data...</h1>
        </div>
      </div>
    );
  }

  const MovieCard = ({ movie }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform hover:scale-105">
        <img src={movie.poster} alt={`${movie.title} Poster`} className="w-full h-auto object-cover rounded-t-lg" />
        <div className="p-4 flex-grow flex flex-col justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{movie.title}</h2>
          <p className="text-gray-600 mb-1">Director: {movie.director}</p>
          <p className="text-gray-600 mb-2">Year: {movie.year}</p>
          <p className="text-gray-700 font-medium">Rating: {movie.rating}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Top Movies</h1>
        {Array.isArray(receivedData) && receivedData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {receivedData.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No movie data received or data is empty.</p>
        )}
      </div>
    </div>
  );
}