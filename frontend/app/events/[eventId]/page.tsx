"use client"

import React, { Suspense, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

import EventRegisterButton from "./EventRegisterButton"

// Define the type for event data
type EventData = {
  id: number
  name: string
  description: string
  venue: string
  gallery_images: string[]
  organiser_id: number
  event_type: string
  activity_type: string
  start_date: string
  end_date: string
  reg_close_date: string
  country: string
  state: string
  city: string
  pincode: string
  area: string
  banner_image: string
  mobile_banner: string
  eventCategories: {
    id: number
    category: {
      id: number;
      title: string;
      price: string;
      additionalInfo?: string;
      ageLimitMin?: number;
      ageLimitMax?: number;
      inclusive: string[];
    }
  }[]
  categories: string[] // This represents the category titles like "10K", "21.1K"
  minPrice: number // The minimum price from the event categories
}

const EventPage = ({
  params,
}: {
  params: Promise<{ eventId: string }>
}) => {
  const { eventId } = React.use(params)
  const [eventData, setEventData] = useState<EventData | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set())
  const [eventCategories, setEventCategories] = useState<EventData["eventCategories"]>([])
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = (categoryId: number) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev)
      newSet.add(categoryId)
      return newSet
    })
  }

  const handleRemove = (categoryId: number) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev)
      newSet.delete(categoryId)
      return newSet
    })
  }

  useEffect(() => {
    // Fetch event data from API
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/events/${eventId}`)
        const data = await response.json()
        console.log("API Response:", data)
        setEventData(data.data) // Use `data.data` based on the response structure
        setEventCategories(data.data.eventCategories)
      } catch (error) {
        console.error("Error fetching event data:", error)
      }
    }

    fetchEventData()
  }, [eventId])

  if (!eventData) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>
  }

  const subtotal = Array.from(selectedCategories).reduce((sum, categoryId) => {
    const category = eventCategories.find((c) => c.category.id === categoryId)
    return sum + (category ? Number.parseFloat(category.category.price) : 0)
  }, 0)

  // Format start date for display
  const startDate = new Date(eventData.start_date)
  const startDay = startDate.getDate()
  const startMonth = startDate.toLocaleString("en-US", { month: "short" })
  const startYear = startDate.getFullYear()

  const { name, description, venue, gallery_images, banner_image } = eventData
  const handleLogout = () => {
    localStorage.removeItem('access_token')
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col h-screen overflow-y-auto ">
      <div className="pb-4 bg-white shadow-md">
        <div
          style={{ backgroundColor: "rgb(0 46 37)" }}
          className="flex flex-col w-full bg-gradient-to-r from-secondary-900 to-secondary-900 h-[50%] lg:h-[60%]"
        >
          <nav className="flex flex-row-reverse justify-around w-11/12 mx-auto pt-5 smobile:pt-10 smobile:mb-0 tablet:mb-8">
            <div className="flex items-center cursor-pointer basis-1/12">
              <div className=" flex flex-row items-center gap-3 group">
                <div
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img
                    src="https://www.indiarunning.com/images/DefaultUserProfile.svg"
                    alt="User Profile"
                    width={40}
                    height={40}
                    className="cursor-pointer"
                  />

                  <div
                    className={`absolute flex justify-between top-12 transition-opacity duration-500 ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                  >
                    <button
                      onClick={handleLogout}
                      className="text-[#023571] font-semibold text-sm px-6 py-2 flex items-center border rounded-md bg-white shadow-lg transition hover:bg-gray-100"
                    >
                      <img src="https://registrations.indiarunning.com/logout-icon.svg" alt="Logout" className="mr-2 w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/" target="_blank" className="pl-0 mt-2 sm:mt-0 sm:pl-24 basis-2/3">
              <Image
                className="block smobile:h-9 smobile:w-32 tablet:w-64 tablet:h-14"
                src="https://registrations.indiarunning.com/Logo1.svg"
                alt="Logo"
                width={256}
                height={56}
              />
            </Link>
          </nav>

          <div className="pt-7 w-full flex flex-col items-center">
            <h1 className="font-extrabold text-center text-white text-5xl  font-paytone m-5">{eventData.name}</h1>
            <div className="block mx-2 tablet:mx-auto rounded-xl">
              <Image
                className="rounded-xl max-h-[600px]"
                src={eventData.banner_image || "/placeholder.svg"}
                alt="Main Banner"
                width={1000}
                height={900}
              />
            </div>
            <div className="flex px-2 mx-auto justify-between max-w-[50%]  items-start flex-wrap bg-sematicInfo-100  py-2  border w-4/5 gap-y-4  list-none shadow-infoCard bg-blue-100 m-5">
              <div className="flex justify-between w-full">
                {/* Location */}
                <li className="flex flex-col items-center h-full justify-between min-w-fit w-1/4 basis-full">
                  <div className="rounded-full">
                    <Image
                      className="p-2 smobile:w-8 smobile:h-8 tablet:w-12 tablet:h-12"
                      alt="Location"
                      src="https://www.indiarunning.com/icons/location-red-icon.svg"
                      width={48}
                      height={48}
                    />
                  </div>
                  <p className="font-medium text-center underline text-primary smobile:text-xs tablet:text-base line-clamp-1">
                    {eventData.city}
                  </p>
                </li>

                {/* Calendar */}
                <li className="flex flex-col items-center h-full justify-between min-w-fit w-1/4 basis-full">
                  <div className="rounded-full">
                    <Image
                      className="p-2 smobile:w-8 smobile:h-8 tablet:w-12 tablet:h-12"
                      alt="Calendar"
                      src="https://registrations.indiarunning.com/Calendar.svg"
                      width={48}
                      height={48}
                    />
                  </div>
                  <p className="font-medium text-center smobile:text-xs tablet:text-base line-clamp-1">
                    {startDay + " " + startMonth}
                  </p>
                  <p>{startYear}</p>
                </li>

                {/* Run */}
                <li className="flex flex-col items-center h-full justify-between min-w-fit w-1/4 basis-full">
                  <div className="rounded-full">
                    <Image
                      className="p-2 smobile:w-8 smobile:h-8 tablet:w-12 tablet:h-12"
                      alt="Run"
                      src="https://registrations.indiarunning.com/Run.svg"
                      width={48}
                      height={48}
                    />
                  </div>
                  <p className="font-medium text-center smobile:text-xs tablet:text-base line-clamp-1">
                    {eventData?.categories?.join(", ")}
                  </p>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 text-center bg-gray-200">
        <h4 className="mb-4 font-bold text-center text-xl font-montserrat">About the Event</h4>
        <div className="px-3 tablet:px-8 lg:px-16 text-s tablet:text-base">{eventData.description}</div>
      </div>

      <div className="pt-10 pb-20 px-3 tablet:px-8 lg:px-16 bg-gray-200">
        <h4 className="mb-1 font-bold text-center text-2xl">Select Category</h4>
        <p className="mb-4 font-medium text-center text-black text-s">
          Here are the available categories for {eventData.name}
        </p>

        <div className="min-h-screen pb-20">
          <div className="space-y-4">
            {eventData?.eventCategories?.map((category) => (
              <div key={category.id} className="bg-white rounded-lg p-8 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-medium text-gray-900">{category.category.title}</h3>
                  <p className="text-gray-500 text-sm">Registrations are open</p>
                </div>

                <div className="flex-1 mx-16">
                  <p className="text-gray-700 mb-3">Inclusive</p>
                  <div className="flex flex-wrap gap-2">
                    {category.category.inclusive?.length > 0 ? (
                      category.category.inclusive.map((item) => (
                        <span key={item} className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No inclusions available</span>
                    )}
                  </div>
                </div>


                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xl font-medium">Rs. {category.category.price}</p>
                    <p className="text-xs text-gray-500">(Inc. of all taxes)</p>
                  </div>
                  {selectedCategories.has(category.category.id) ? (
                    <button
                      onClick={() => handleRemove(category.category.id)}
                      className="px-4 py-2 border border-[#00e6b3] text-[#00e6b3] rounded-lg hover:bg-[#00e6b3] hover:text-white transition-colors font-medium"
                    >
                      - Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdd(category.category.id)}
                      className="px-4 py-2 bg-[#00e6b3] text-white rounded-lg hover:bg-[#00cc9f] transition-colors font-medium"
                    >
                      + Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedCategories.size > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
              <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <p className="text-gray-900 font-medium">
                  {selectedCategories.size} {selectedCategories.size === 1 ? "category" : "categories"} selected
                </p>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xl font-medium">Subtotal: Rs. {subtotal}</p>
                    <p className="text-xs text-gray-500">(Inc. of all taxes)</p>
                  </div>
                  <div>
                    <EventRegisterButton eveName={eventData.name} evePrice={subtotal} />
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function EventPageWrapper({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-600">Loading...</div>}>
      <EventPage params={params} />
    </Suspense>
  )
}

