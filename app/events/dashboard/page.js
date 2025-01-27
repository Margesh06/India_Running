"use client"

import { useState } from "react"
import { LayoutGrid, Users, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventForm } from "@/components/EventForm"

export default function Home() {
  const [showEventForm, setShowEventForm] = useState(false)

  const handleCreateEvent = () => {
    setShowEventForm(true)
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-emerald-700 py-6 text-white">
        <button className="w-full px-6 py-3 flex items-center gap-3 hover:bg-emerald-600 transition-colors">
          <LayoutGrid size={24} />
          <span className="text-sm">Dashboard</span>
        </button>
        <button className="w-full px-6 py-3 flex items-center gap-3 hover:bg-emerald-600 transition-colors relative after:content-[''] after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-8 after:bg-white">
          <RotateCcw size={24} className="rotate-90" />
          <span className="text-sm">Events</span>
        </button>
        <button className="w-full px-6 py-3 flex items-center gap-3 hover:bg-emerald-600 transition-colors">
          <Users size={24} />
          <span className="text-sm">Profile</span>
        </button>
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
            <div className="bg-pink-100 px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users className="text-pink-500" />
                <span className="text-pink-500">
                  Complete your KYC (Know Your Customer) process to ensure the security and compliance of your account.
                </span>
              </div>
              <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
                Verify Now
              </Button>
            </div>

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
                </TabsList>
              </Tabs>
            </div>

            <div className="flex flex-col items-center justify-center mt-32">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <LayoutGrid size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 mb-6">Create your first event here</p>
              <Button className="bg-pink-500 hover:bg-pink-600" onClick={handleCreateEvent}>
                + Create Event
              </Button>
            </div>
          </>
        )}

        {showEventForm && <EventForm />}
      </div>
    </div>
  )
}

