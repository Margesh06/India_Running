'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventCard from '../components/EventCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Carousel from '../components/carousel';
import Footer from "../components/Footer";

const events = [
  {
    id: 1,
    name: "Indian Navy Half Marathon 2025",
    date: "Feb 2, 2025",
    location: "Delhi",
    description: "A full marathon for all levels of runners.",
    price: "1000",
    image: "/B1.png",
    type: "In-Person",
    categories: ["5K", "10K", "21K"],
    activityType: "Running",
  },
  {
    id: 2,
    name: "Half Marathon 2025",
    date: "March 5, 2025",
    location: "Delhi",
    description: "A challenging half marathon for intermediate runners.",
    price: "500",
    image: "/B2.jpg",
    type: "In-Person",
    categories: ["21.1K"],
    activityType: "Running",
  },
  {
    id: 3,
    name: "Nagpur Run",
    date: "Feb 9, 2025",
    location: "Bangalore",
    description: "A 5K run for beginners and families.",
    price: "300",
    image: "/B3.png",
    type: "Virtual",
    categories: ["3K", "10k"],
    activityType: "Walking",
  },
  {
    id: 4,
    name: "10K Challenge 2025",
    date: "May 20, 2025",
    location: "Hyderabad",
    description: "A challenging 10K for experienced runners.",
    price: "700",
    image:
      "https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "In-Person",
    categories: ["10K"],
    activityType: "Running",
  },
  {
    id: 5,
    name: "Trail Run 2025",
    date: "June 15, 2025",
    location: "Shimla",
    description: "A scenic trail run through the hills.",
    price: "1500",
    image:
      "https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "In-Person",
    categories: ["5K", "10K"],
    activityType: "Cycling",
  },
  {
    id: 6,
    name: "City Marathon 2025",
    date: "July 25, 2025",
    location: "Chennai",
    description: "A vibrant marathon through the city streets.",
    price: "1200",
    image:
      "https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Virtual",
    categories: ["10K", "21.1K"],
    activityType: "Running",
  },
  {
    id: 7,
    name: "Beach Run 2025",
    date: "August 12, 2025",
    location: "Goa",
    description: "A refreshing beachside run.",
    price: "800",
    image:
      "https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "In-Person",
    categories: ["5K", "10K"],
    activityType: "Walking",
  },
  {
    id: 8,
    name: "Night Run 2025",
    date: "September 5, 2025",
    location: "Mumbai",
    description: "An exciting night run with glowing accessories.",
    price: "600",
    image:
      "https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Virtual",
    categories: ["5K", "10K"],
    activityType: "Walking",
  },

];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [eventsToShow, setEventsToShow] = useState(6);
  const [distanceDropdown, setDistanceDropdown] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const eventsPerRow = 3;
  const rowsPerPage = 2;
  const eventsPerPage = eventsPerRow * rowsPerPage;

  const router = useRouter();

  const distanceCategories = [
    "5K",
    "10K",
    "21.1K",
    "Marathon",
    "Ultra Marathon"
  ];

  const cityCategories = [
    "Mumbai",
    "Pune",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Kolkata",
  ];


  const filteredEvents = events.filter((event) =>
    (event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedActivity ? event.activityType === selectedActivity : true)
    && (selectedDistance
      ? event.categories.some((category) =>
        category.toLowerCase().includes(selectedDistance.toLowerCase())
      )
      : true) &&
    (selectedCity ? event.location.toLowerCase() === selectedCity.toLowerCase() : true)
  );

  const paginatedEvents = filteredEvents.slice(0, eventsToShow);

  const images = [
    '/B1.png',
    '/B2.jpg',
    '/B3.png',
  ];

  const handleShowMore = () => {
    setEventsToShow((prev) => prev + eventsPerPage);
  };

  let distanceTimeout, cityTimeout;
  const handleMouseEnterDistance = () => {
    clearTimeout(distanceTimeout);
    setDistanceDropdown(true);
  };

  const handleMouseLeaveDistance = () => {
    distanceTimeout = setTimeout(() => setDistanceDropdown(false), 200);
  };

  const handleMouseEnterCity = () => {
    clearTimeout(cityTimeout);
    setCityDropdown(true);
  };

  const handleMouseLeaveCity = () => {
    cityTimeout = setTimeout(() => setCityDropdown(false), 200);
  };

  const handleAuthForm = (formType) => {
    if (formType === 'login') {
      router.push('/auth/login');
    } else if (formType === 'register') {
      router.push('/auth/register');
    }
  };

  return (
    <div className="bg-gray-100">
      <header className="flex flex-wrap justify-between items-center p-6 bg-white text-white">
        <Link href="/" className="flex justify-center w-full sm:w-auto">
          <Image
            src={"/Lg.PNG"}
            alt="Marathon Platform Logo"
            layout="intrinsic"
            width={300}
            height={60}
            className="cursor-pointer object-contain w-32 sm:w-48 ml-6"
          />

        </Link>

        <div className="flex flex-wrap justify-between w-full sm:w-auto mt-4 sm:mt-0 space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-full sm:w-auto">
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="px-4 py-2 rounded-md bg-white text-gray-700 w-full"
            >
              <option value="">All Events</option>
              <option value="Running">Running</option>
              <option value="Walking">Walking</option>
              <option value="Cycling">Cycling</option>
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search events"
              className="px-4 py-2 rounded-md bg-white text-gray-700 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-auto space-x-4 flex flex-wrap justify-between sm:justify-start">
            <button
              onClick={() => handleAuthForm('login')}
              className="text-black hover:text-blue-500 hover:underline font-medium py-2 px-4 w-full sm:w-auto text-center"
            >
              Login
            </button>
            <button
              onClick={() => handleAuthForm('register')}
              className="text-black hover:text-blue-500 hover:underline font-medium py-2 px-4 w-full sm:w-auto text-center"
            >
              Register
            </button>
            <Link
              href="/events/dashboard"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 w-full sm:w-auto text-center"
            >
              Create Event
            </Link>
            <div className="flex items-center">
              <Link href="/userProfile" className="text-gray-600 hover:text-gray-900">
                <img src="/DefaultUserProfile.svg" alt="IR Logo" className="h-11 px-6" />
              </Link>

            </div>
          </div>
        </div>

        <nav className="flex justify-center space-x-12 px-4 h-12 items-center bg-gray-50 w-full">
          <div
            className="relative "
            onMouseEnter={handleMouseEnterDistance}
            onMouseLeave={handleMouseLeaveDistance}
          >
            <a href="#" className="text-gray-600 hover:text-red-500">
              Events by Distance
            </a>
            {distanceDropdown && (
              <div className="absolute p-3 left-0 mt-2 bg-white shadow-lg rounded-md w-80 z-20">
                <ul className="grid grid-cols-2 gap-2 p-2">
                  {distanceCategories.map((distance, index) => (
                    <li
                      key={index}
                      className={`text-gray-600 m-2 font-bold hover:text-red-500 text-left cursor-pointer 
            ${selectedDistance === distance ? 'text-red-500' : ''}`}
                      onClick={() => {
                        setSelectedDistance(distance);
                        setDistanceDropdown(false);
                      }}
                    >
                      {distance}
                    </li>
                  ))}
                  <li
                    className="text-gray-600 m-2 font-bold hover:text-red-500 text-left cursor-pointer"
                    onClick={() => {
                      setSelectedDistance('');
                      setDistanceDropdown(false);
                    }}
                  >
                    All Distances
                  </li>
                </ul>
              </div>
            )}
          </div>


          {/* Events by City */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterCity}
            onMouseLeave={handleMouseLeaveCity}
          >
            <a href="#" className="text-gray-600 hover:text-red-500">
              Events by City
            </a>
            {cityDropdown && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-72 z-20">
                <ul className="grid grid-cols-2 gap-2 p-2 m-4">
                  {cityCategories.map((city, index) => (
                    <li
                      key={index}
                      className={`text-gray-600 font-bold m-2 hover:text-red-500 text-left cursor-pointer 
            ${selectedCity === city ? 'text-red-500' : ''}`}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdown(false);
                      }}
                    >
                      {city}
                    </li>
                  ))}
                  <li
                    className="text-gray-600 m-2 font-bold hover:text-red-500 text-left cursor-pointer"
                    onClick={() => {
                      setSelectedCity('');
                      setCityDropdown(false);
                    }}
                  >
                    All Cities
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link href="/events/review" className="text-gray-600 hover:text-gray-900">
            Event Review
          </Link>

          <Link href="/blogs" className="text-gray-600 hover:text-gray-900">
            Stories and Blogs
          </Link>

          <Link href="/story" className="text-gray-600 hover:text-gray-900">
            Write your story
          </Link>
        </nav>

      </header>


      <div>
        <Carousel
          images={images}
          eventIds={['1', '2', '3']}
        />
      </div>


      <main className="p-6">
        <div className="px-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
            {paginatedEvents.length > 0 ? (
              paginatedEvents.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No events found
              </p>
            )}
          </div>
        </div>


        <div className="flex justify-center items-center mt-6">
          {filteredEvents.length > eventsToShow && (
            <button
              onClick={handleShowMore}
              className="flex bg-gallery items-center rounded-lg border hover:border-secondary-700 relative cursor-pointer px-6 py-2"
            >
              Show More
            </button>
          )}
        </div>

      </main>
      <Footer onDistanceChange={(distance) => setSelectedDistance(distance)}
        onCityChange={(city) => setSelectedCity(city)} selectedCity={selectedCity} selectedDistance={selectedDistance}/>
    </div>
  );
}
