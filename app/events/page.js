'use client';

import { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data.events);
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <div>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
