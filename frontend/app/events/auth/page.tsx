"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type User = {
  email: string
  firstName: string
  lastName: string
  mobile: string
  organization: string
}

type Event = {
  id: string
  name: string
  date: string
}

export default function EventsPage() {
  const [view, setView] = useState<"auth" | "signup" | "dashboard" | "create" | "details">("auth")
  const [email, setEmail] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    email:"",
    firstName: "",
    lastName: "",
    mobile: "",
    organization: "",
  })

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const eventId = searchParams.get("eventId")
    if (eventId) {
      fetchEventDetails(eventId)
    }
  }, [searchParams])

  const checkEmail = async (email: string) => {
    try {
      const response = await fetch(`http://localhost:5000/organisers/check-email?email=${email}`);
  
      if (!response.ok) {
        throw new Error("Failed to check email");
      }
  
      const data = await response.json();
      return data.exists; 
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  }

  const createUser = async (formData) => {
    const response = await fetch("http://localhost:5000/organisers/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      throw new Error("Failed to register organiser");
    }
  
    return response.json();
  }

  const fetchEvents = async () => {
    // Implement your API call to fetch events
    return [
      { id: "1", name: "Sample Event 1", date: "2023-06-01" },
      { id: "2", name: "Sample Event 2", date: "2023-06-15" },
    ]
  }

  const fetchEventDetails = async (eventId: string) => {
    // Implement your API call to fetch event details
    setCurrentEvent({ id: eventId, name: `Event ${eventId}`, date: "2023-06-01" })
    setView("details")
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const exists = await checkEmail(email)
      if (exists) {
        setFormData({ email:formData?.email, firstName: formData?.firstName, lastName: formData?.lastName, mobile: "" , organization: "" })
        // const fetchedEvents = await fetchEvents()
        // setEvents(fetchedEvents)
        // setView("dashboard")
        router.push('/events/dashboard');
        try {
          const response = await fetch("http://localhost:5000/organisers/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
      
          if (!response.ok) {
            throw new Error("Email not found");
          }
      
          const data = await response.json();
          localStorage.setItem("organiserToken", data.token);
          return data;
        } catch (error) {
          console.error("Login failed:", error);
          return null;
        }
      } else {
        setView("signup")
        setFormData({ email:formData?.email, firstName: formData?.firstName, lastName: formData?.lastName, mobile: "", organization: "" })
      }
    } catch (error) {
      console.error("Error checking email:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newUser = await createUser({ email, ...formData })
      setUser(newUser)
      const fetchedEvents = await fetchEvents()
      setEvents(fetchedEvents)
      setView("dashboard")
    } catch (error) {
      console.error("Error creating user:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderAuthForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-4">Sign In/Sign Up</h2>
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Please enter your email address</p>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-[#ff0066] hover:bg-[#ff1a75]" disabled={loading}>
          {loading ? "Checking..." : "Get OTP"}
        </Button>
      </form>
    </div>
  )

  const renderSignupForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      <form onSubmit={handleSignupSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            Creating Account with {email}{" "}
            <button type="button" onClick={() => setView("auth")} className="text-[#ff0066] hover:underline">
              change email
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="text-sm text-gray-600">
              First Name
            </label>
            <Input
              id="firstName"
              placeholder="Enter your First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="text-sm text-gray-600">
              Last Name
            </label>
            <Input
              id="lastName"
              placeholder="Enter your Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="mobile" className="text-sm text-gray-600">
              Mobile Number
            </label>
            <div className="flex">
              <div className="flex items-center gap-1 px-3 border rounded-l bg-gray-50">
                <span className="text-sm">🇮🇳</span>
                <span className="text-sm">+91</span>
              </div>
              <Input
                id="mobile"
                type="tel"
                className="rounded-l-none"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="organization" className="text-sm text-gray-600">
              Organization Name
            </label>
            <Input
              id="organization"
              placeholder="Enter your Organization Name"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-[#ff0066] hover:bg-[#ff1a75]" disabled={loading}>
          {loading ? "Creating account..." : "Continue"}
        </Button>
      </form>
    </div>
  )

  const renderDashboard = () => (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-semibold">Event Dashboard</h1>
      <Button onClick={() => setView("create")} className="bg-[#ff0066] hover:bg-[#ff1a75]">
        Create New Event
      </Button>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex justify-between items-center p-4 border rounded">
            <div>
              <h2 className="font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-600">{event.date}</p>
            </div>
            <Button onClick={() => fetchEventDetails(event.id)}>View Details</Button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCreateEvent = () => (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-semibold">Create New Event</h1>
      <form className="space-y-4">
        <Input placeholder="Event Name" />
        <Input type="date" />
        <Button type="submit" className="bg-[#ff0066] hover:bg-[#ff1a75]">
          Create Event
        </Button>
      </form>
    </div>
  )

  const renderEventDetails = () => (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-semibold">{currentEvent?.name}</h1>
      <p>Date: {currentEvent?.date}</p>
      <Button className="w-full bg-[#ff0066] hover:bg-[#ff1a75]">Register for Event</Button>
    </div>
  )

  return (
    <main
      className="min-h-screen relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-photo/barbell-fitness-training-gym-sports-600nw-2139742761.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-5xl font-bold mb-6">
                <span className="text-[#00ffcc]">Organise</span> remarkable
                <br />
                events with ease.
              </h2>
              <p className="text-xl">We are here to help and guide you to make your event a success.</p>
            </div>
            <div className="md:ml-auto max-w-md w-full">
              {view === "auth" && renderAuthForm()}
              {view === "signup" && renderSignupForm()}
              {view === "dashboard" && renderDashboard()}
              {view === "create" && renderCreateEvent()}
              {view === "details" && renderEventDetails()}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}