'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import MarathonImage1 from '../../../public/login.jpg';
import MarathonImage2 from '../../../public/register.webp';
import MarathonImage3 from '../../../public/login.jpg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    MarathonImage1,
    MarathonImage2,
    MarathonImage3, // Add more images if needed
  ];

  // Auto-switch image every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval when component unmounts
  }, []);

  // Manually change image index on button click
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index); // Set the current image based on the clicked dot
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block w-1/2">
        {/* Card Flip Container */}
        <div className="relative w-full h-full">
          <div className="group relative w-full h-full perspective-1000">
            <div className="flip-card w-full h-full bg-transparent relative">
              <div className="flip-card-inner w-full h-full absolute transform transition-all duration-500 group-hover:rotate-y-180">
                {/* Front Image */}
                <div className="flip-card-front w-full h-full">
                  <Image
                    src={images[currentIndex]}
                    alt={`Marathon Image ${currentIndex + 1}`}
                    width={500}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-500"
                  />
                </div>
                {/* Back Image - Could be any content */}
                <div className="flip-card-back w-full h-full bg-gray-800 text-white flex justify-center items-center">
                  <p>Back Side Content</p>
                </div>
              </div>
            </div>

            {/* Dots navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    currentIndex === index ? 'bg-blue-600' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <div className="max-w-sm w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Do not have an account?{' '}
              <Link href="/auth/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
