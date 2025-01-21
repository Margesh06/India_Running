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
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter((event) => {
    return (
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
            <Link
              href="/auth/login"
              className="text-white hover:text-gray-200"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="text-white hover:text-gray-200"
            >
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
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No events found
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
