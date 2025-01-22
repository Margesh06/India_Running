import React, { useState, useEffect } from "react";
import Image from "next/image";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Auto slide every 3 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  const getNextIndex = (index) => (index + 1) % images.length;
  const getPrevIndex = (index) => (index - 1 + images.length) % images.length;

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
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
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
