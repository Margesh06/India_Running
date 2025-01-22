import React, { useState, useEffect } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const getNextIndex = (index) => (index + 1) % images.length;
  const getPrevIndex = (index) => (index - 1 + images.length) % images.length;

  return (
    <div className="relative flex justify-center items-center w-full h-[500px] bg-gray-100 overflow-hidden">
      <div className="relative w-[95%] h-full flex justify-center items-center">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="object-contain w-full h-full"
        />
      </div>

      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-gray-800 scale-110" : "bg-gray-400"}`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>

      {/* <button
        type="button"
        className="absolute left-3 z-30 flex items-center justify-center h-8 w-8 bg-white/50 rounded-full shadow-lg hover:bg-white/70"
        onClick={() => setCurrentIndex(getPrevIndex(currentIndex))}
      >
        <span className="inline-flex items-center justify-center w-8 h-8">
          <svg
            className="w-4 h-4 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
        </span>
      </button>
      <button
        type="button"
        className="absolute right-3 z-30 flex items-center justify-center h-8 w-8 bg-white/50 rounded-full shadow-lg hover:bg-white/70"
        onClick={() => setCurrentIndex(getNextIndex(currentIndex))}
      >
        <span className="inline-flex items-center justify-center w-8 h-8">
          <svg
            className="w-4 h-4 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
        </span>
      </button> */}
    </div>
  );
};

export default Carousel;
