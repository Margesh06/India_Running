'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventCard from '../components/EventCard'; 
import Logo from '../public/Lg.PNG';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Carousel from '../components/carousel';

const events = [
    {
      id: 1,
      name: "Full Marathon 2025",
      date: "Feb 1, 2025",
      location: "Mumbai",
      description: "A full marathon for all levels of runners.",
      price: "1000",
      image:
        "https://media.istockphoto.com/id/1733237354/photo/runners-on-the-street-healthy-lifestyle-marathon-athletics.jpg?s=2048x2048&w=is&k=20&c=tOaMqk8XrhiIS0eBEYl0-jfxL988gLXtkzLyGPlBG3s=",
      type: "In-Person",
      categories: ["42K"],
      activityType: "Running",
    },
    {
      id: 2,
      name: "Half Marathon 2025",
      date: "March 5, 2025",
      location: "Delhi",
      description: "A challenging half marathon for intermediate runners.",
      price: "500",
      image:
        "https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      type: "In-Person",
      categories: ["21.1K"],
      activityType: "Running",
    },
    {
      id: 3,
      name: "5K Fun Run 2025",
      date: "April 10, 2025",
      location: "Bangalore",
      description: "A 5K run for beginners and families.",
      price: "300",
      image:
        "https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      type: "Virtual",
      categories: ["5K"],
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
  const eventsPerRow = 3;
  const rowsPerPage = 2;
  const eventsPerPage = eventsPerRow * rowsPerPage;

  const router = useRouter(); 

  const filteredEvents = events.filter((event) =>
    (event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedActivity ? event.activityType === selectedActivity : true)
  );

  const paginatedEvents = filteredEvents.slice(0, eventsToShow); 

  const images = [
    'https://race-registration-cdn.indiarunning.com/events/2025/02/16/chandigarh-fast-marathon-2025/banner1727426134767.jpeg',
    'https://race-registration-cdn.indiarunning.com/events/2025/02/02/wesness-5k-run-for-women-2025/banner1737044217349.jpeg',
    'https://race-registration-cdn.indiarunning.com/events/2025/02/02/indian-navy-half-marathon-2025/banner1736749961418.jpeg',
    'https://race-registration-cdn.indiarunning.com/events/2025/02/09/sakal-nagpur-run-2025/banner1734797929108.jpeg',
    'https://race-registration-cdn.indiarunning.com/events/2025/01/26/run-wild-marathon-2025-2025/banner1735585526324.jpeg',
  ];

  const handleShowMore = () => {
    setEventsToShow((prev) => prev + eventsPerPage); 
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
            src={Logo.src}
            alt="Marathon Platform Logo"
            layout="intrinsic"
            width={300}
            height={60}
            className="cursor-pointer object-contain w-32 sm:w-48"
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
              href="/events/create"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 w-full sm:w-auto text-center"
            >
              Create Event
            </Link>
          </div>
        </div>
      </header>

      <div>
        <Carousel images={images} />
      </div>

      <main className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events</h2>
        <div className="px-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}
