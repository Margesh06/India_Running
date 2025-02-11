'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, DollarSign, Medal, Timer, Trophy } from 'lucide-react';
import { jwtDecode } from "jwt-decode";

interface Event {
  id: number;
  name: string;
  description: string;
  venue: string;
  start_date: string;
  minPrice: number;
}

export default function RegisteredEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken?.sub;

        if (!userId) {
          console.error('User ID not found in token');
          return;
        }

        const eventIdsResponse = await fetch(`http://localhost:5000/registration/${userId}`);
        const eventIds: number[] = await eventIdsResponse.json();

        const eventPromises = eventIds.map(eventId =>
          fetch(`http://localhost:5000/events/${eventId}`).then(res => res.json())
        );

        const eventResponses = await Promise.all(eventPromises);
        const eventData = eventResponses.map(res => res.data);

        const uniqueEventsMap = new Map();
        eventData.forEach(event => uniqueEventsMap.set(event.id, event));

        setEvents(Array.from(uniqueEventsMap.values()));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Timer className="h-8 w-8 text-blue-500 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070')] bg-cover opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-blue-900/90"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16 relative">
          <div className="inline-block relative">
            <Trophy className="absolute -left-12 top-1/2 -translate-y-1/2 h-10 w-10 text-yellow-400 animate-bounce" />
            <h1 className="text-5xl font-bold text-white mb-4 relative">
              Your Events
              <Medal className="absolute -right-12 top-1/2 -translate-y-1/2 h-10 w-10 text-yellow-400 animate-bounce" />
            </h1>
          </div>
          <p className="text-blue-200 text-lg">Track your marathon journey</p>
        </div>

        {events.length === 0 ? (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-blue-900/80 rounded-lg p-12 text-center ring-1 ring-blue-500/20 backdrop-blur-lg">
              <Timer className="h-20 w-20 mx-auto mb-6 text-blue-400" />
              <h2 className="text-3xl font-bold mb-4 text-white">No Events Found</h2>
              <p className="text-blue-200">
                Start your running journey today! Register for upcoming marathons.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <div
                key={`${event.id}-${index}`} // Ensure uniqueness by appending index
                className="group relative transform hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                <Card className="relative bg-blue-900/80 transition-all duration-300 backdrop-blur-lg border-0 ring-1 ring-blue-500/20">
                  <CardHeader className="space-y-1 pb-4">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-300 text-white border-0" variant={undefined}>
                        Marathon
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {event.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-blue-200 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center text-sm text-blue-200 group-hover:text-blue-300 transition-colors">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        <span>{formatDate(event.start_date)}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-blue-200 group-hover:text-blue-300 transition-colors">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{event.venue}</span>
                      </div>

                      <div className="flex items-center text-sm text-blue-200 group-hover:text-blue-300 transition-colors">
                        {/* <DollarSign className="mr-2 h-4 w-4" /> */}
                        <span>Entry fee: <span className="font-bold">₹{event.minPrice}</span></span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
