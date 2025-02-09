"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EventForm } from "@/components/EventForm";

export default function Home() {
  const [showEventForm, setShowEventForm] = useState(false);
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("organiserToken"); // Check token in localStorage

    if (!token) {
      router.push("/events/auth"); // Redirect to login page if not authenticated
    }
    else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events/organiser/1");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);


  const handleCreateEvent = () => {
    setShowEventForm(true);
  };

  const handleLogout = () => {
    // Remove organiserToken from localStorage
    localStorage.removeItem("organiserToken");
    router.push("/events/auth");
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-emerald-700 py-6 text-white">
        <button
          className="w-full px-6 py-3 flex items-center gap-3 hover:bg-emerald-600 transition-colors"
          onClick={() => window.location.href = '/events/dashboard'}
        >
          <LayoutGrid size={24} />
          <span className="text-sm">Events</span>
        </button>

        <div className="flex flex-col h-full">
          <div className="flex-grow">
            {/* Other sidebar content */}
          </div>

          <div className="mt-auto mb-8 mr-10 border-t border-green-700/20">
            <div className="px-6 py-4">
              <Button
                variant="ghost"
                className="w-full group relative overflow-hidden text-green-50 hover:text-white hover:bg-green-700/20 transition-all duration-300"
                onClick={handleLogout}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 via-green-600/5 to-green-600/0 group-hover:opacity-50 transition-opacity"></div>
                <div className="flex items-center space-x-2">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-green-500/0 via-green-500/70 to-green-500/0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Button>
            </div>
          </div>
        </div>


      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex justify-between items-center px-8 py-6 border-b">
          <div>
            <h1 className="text-2xl font-semibold">{showEventForm ? "Create Event" : "My Events"}</h1>
            <p className="text-gray-500 text-sm">
              {showEventForm ? "Fill in the details to create your event." : "Create and maintain your events."}
            </p>
          </div>
          <div className="text-2xl font-bold">Fitpage</div>
        </div>

        {!showEventForm && (
          <>
            {events.length > 0 ? (
              <>
                <div className="px-8 pt-6">
                  <Tabs defaultValue="active" className="w-full">
                    <TabsList className="w-full justify-start h-12 p-0 bg-transparent border-b rounded-none">
                      <TabsTrigger
                        value="active"
                        className="px-8 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none"
                      >
                        Active events
                      </TabsTrigger>
                      <TabsTrigger
                        value="past"
                        className="px-8 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none"
                      >
                        Past Events
                      </TabsTrigger>
                      <Button className="ml-auto bg-pink-500 hover:bg-pink-600" onClick={handleCreateEvent}>
                        + Create Event
                      </Button>
                    </TabsList>

                    <TabsContent value="active">
                      <div className="flex flex-col gap-4 mt-6">
                        {events.map((event, index) => (
                          <div key={event.id || index} className="flex gap-4 p-4 border rounded-lg">
                            <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={event.banner_image}
                                alt={event.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                    <MapPin size={16} />
                                    <span>{event.location || 'Mumbai'}</span>
                                    <span className="mx-2">|</span>
                                    <span>{event.event_type || 'On Ground'}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-end mt-4">
                                <div className="flex items-center gap-2">
                                  <span className="px-3 py-1 bg-green-200 text-green-600 rounded-full text-sm">
                                    Published
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="past">
                      <p className="text-gray-500 mt-6">No past events found.</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center mt-32">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <LayoutGrid size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 mb-6">Create your first event here</p>
                <Button className="bg-pink-500 hover:bg-pink-600" onClick={handleCreateEvent}>
                  + Create Event
                </Button>
              </div>
            )}
          </>
        )}

        {showEventForm && <EventForm />}
      </div>
    </div>
  );
}
