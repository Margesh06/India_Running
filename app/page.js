'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventCard from '../components/EventCard'; 

const events = [
  {
    id: 1,
    name: 'Full Marathon 2025',
    date: 'Feb 1, 2025',
    location: 'Mumabai',
    description: 'A full marathon for all levels of runners.',
    price: '1000',
    image: 'https://media.istockphoto.com/id/1733237354/photo/runners-on-the-street-healthy-lifestyle-marathon-athletics.jpg?s=2048x2048&w=is&k=20&c=tOaMqk8XrhiIS0eBEYl0-jfxL988gLXtkzLyGPlBG3s=',
  },
  {
    id: 2,
    name: 'Half Marathon 2025',
    date: 'March 5, 2025',
    location: 'Delhi',
    description: 'A challenging half marathon for intermediate runners.',
    price: '500',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: '5K Fun Run 2025',
    date: 'April 10, 2025',
    location: 'Bangalore',
    description: 'A 5K run for beginners and families.',
    price: '300',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: '10K Challenge 2025',
    date: 'May 20, 2025',
    location: 'Hyderabad',
    description: 'A challenging 10K for experienced runners.',
    price: '700',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Trail Run 2025',
    date: 'June 15, 2025',
    location: 'Shimla',
    description: 'A scenic trail run through the hills.',
    price: '1500',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'City Marathon 2025',
    date: 'July 25, 2025',
    location: 'Chennai',
    description: 'A vibrant marathon through the city streets.',
    price: '1200',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    name: 'Beach Run 2025',
    date: 'August 12, 2025',
    location: 'Goa',
    description: 'A refreshing beachside run.',
    price: '800',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    name: 'Night Run 2025',
    date: 'September 5, 2025',
    location: 'Mumbai',
    description: 'An exciting night run with glowing accessories.',
    price: '600',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    name: 'Mountain Marathon 2025',
    date: 'October 10, 2025',
    location: 'Manali',
    description: 'A breathtaking marathon in the mountains.',
    price: '2000',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 10,
    name: 'Charity Run 2025',
    date: 'November 18, 2025',
    location: 'Kolkata',
    description: 'A run for a cause, supporting local charities.',
    price: '400',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 11,
    name: 'Desert Run 2025',
    date: 'December 1, 2025',
    location: 'Jaisalmer',
    description: 'A thrilling run through the desert landscape.',
    price: '2500',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 12,
    name: 'Winter Wonderland Run 2025',
    date: 'December 25, 2025',
    location: 'Gulmarg',
    description: 'A festive run through snowy landscapes.',
    price: '1800',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 13,
    name: 'River Run 2025',
    date: 'January 15, 2025',
    location: 'Kerala',
    description: 'A peaceful run along the riverbanks.',
    price: '1000',
    image: 'https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerRow = 3; 
  const rowsPerPage = 2; 
  const eventsPerPage = eventsPerRow * rowsPerPage; 

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  return (
    <div className="bg-gray-100">
      <header className="flex justify-between items-center p-6 bg-blue-600 text-white">
        <div className="text-2xl font-semibold">Marathon Platform</div>
        <div className="flex items-center space-x-6">
          <input
            type="text"
            placeholder="Search events"
            className="px-4 py-2 rounded-md bg-white text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="space-x-4">
            <Link href="/auth/login" className="text-white hover:text-gray-200">
              Login
            </Link>
            <Link href="/auth/register" className="text-white hover:text-gray-200">
              Register
            </Link>
            <Link
              href="/events/create"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
            >
              Create Event
            </Link>
          </div>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No events found
            </p>
          )}
        </div>
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}