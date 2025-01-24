import React, { useState, useEffect } from "react";
import Link from 'next/link';

const Carousel = ({ images, eventIds }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slides every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  // Ensure eventIds is always an array and has the same length as images
  const validEventIds = Array.isArray(eventIds) && eventIds.length === images.length ? eventIds : [];

  return (
    <div className="relative flex justify-center items-center w-full h-[500px] bg-gray-100 overflow-hidden">
      <div
        className="relative flex transition-all duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex justify-center items-center"
          >
            {validEventIds[index] ? ( // Check if the eventId exists for the current index
              <Link href={`/events/${validEventIds[index]}`} className="w-full h-full block">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="object-contain w-full h-full"
                />
              </Link>
            ) : (
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="object-contain w-full h-full"
              />
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-gray-800 scale-110" : "bg-gray-400"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
