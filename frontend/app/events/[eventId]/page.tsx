"use client"

import React, { Suspense, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import EventRegisterButton from "./EventRegisterButton"
import { useRouter } from 'next/navigation';

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
  categories: string[]
  minPrice: number
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log ("Access token:",token);
    console.log(process.env.JWT_SECRET);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      //router.push("/auth/login");
    }
  }, []);

  const handleAdd = (categoryId: number) => {
    setSelectedCategories(new Set([categoryId]))
  }

  const handleRemove = (categoryId: number) => {
    setSelectedCategories(new Set())
  }

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/events/${eventId}`)
        const data = await response.json()
        console.log("API Response:", data)
        setEventData(data.data)
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

  const startDate = new Date(eventData.start_date)
  const startDay = startDate.getDate()
  const startMonth = startDate.toLocaleString("en-US", { month: "short" })
  const startYear = startDate.getFullYear()

  const { name, description, venue, gallery_images, banner_image } = eventData
  const handleLogout = () => {
    // localStorage.removeItem('access_token')
    window.location.href = '/userProfile'
  }

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <div className="pb-4 bg-white shadow-md">
        <div
          style={{ backgroundColor: "rgb(0 46 37)" }}
          className="flex flex-col w-full bg-gradient-to-r from-secondary-900 to-secondary-900 h-[50%] lg:h-[60%]"
        >
          <nav className="flex flex-row-reverse justify-around w-11/12 mx-auto pt-5 smobile:pt-10 smobile:mb-0 tablet:mb-8">
            <div className="flex items-center cursor-pointer basis-1/12">
              <div className="flex flex-row items-center gap-3 group">
              
              <div className="relative flex flex-col items-center">
  <button
    onClick={() => {
      if (isLoggedIn) {
        window.location.href = "/userProfile";
      } else {
        window.location.href = "/auth/login";
      }
    }}
    className="cursor-pointer"
  >
    <img
      src="https://www.indiarunning.com/images/DefaultUserProfile.svg"
      alt="User Profile"
      width={40}
      height={40}
    />
  </button>
</div>



              </div>
            </div>
            <Link href="/" className="pl-0 mt-2 sm:mt-0 sm:pl-24 basis-2/3">
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
            <h1 className="font-extrabold text-center text-white text-5xl font-paytone m-5">{eventData.name}</h1>
            <div className="block mx-2 tablet:mx-auto rounded-xl">
              <Image
                className="rounded-xl max-h-[600px]"
                src={eventData.banner_image || "/placeholder.svg"}
                alt="Main Banner"
                width={1000}
                height={900}
              />
            </div>
            <div className="flex px-2 mx-auto justify-between max-w-[50%] items-start flex-wrap bg-sematicInfo-100 py-2 border w-4/5 gap-y-4 list-none shadow-infoCard bg-blue-100 m-5">
              <div className="flex justify-between w-full">
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
                  <p className="font-medium text-center text-primary smobile:text-xs tablet:text-base line-clamp-1">
                    {eventData.city}
                  </p>
                </li>

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
            {eventData?.eventCategories?.map((category) => {
              const isSelected = selectedCategories.has(category.category.id)
              const isDisabled = selectedCategories.size > 0 && !isSelected

              return (
                <div 
                  key={category.id} 
                  className={`bg-white rounded-lg p-8 shadow-sm ${
                    isDisabled ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start border-l-4 border-[#00e6b3] pl-4">
                    <div className="flex-1">
                      <div className="grid grid-cols-[2fr,3fr,2fr] gap-8 items-center">
                        <div className="space-y-1">
                          <h3 className="text-2xl font-medium text-gray-900">{category.category.title}</h3>
                          <p className="text-gray-500 text-sm">
                            {isDisabled ? 'Please remove selected category first' : 'Registrations are open'}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-px bg-gray-200"></div>
                          <div className="flex-1">
                            <p className="text-gray-700 font-medium mb-2">Inclusive</p>
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
                        </div>

                        <div className="flex items-center justify-end space-x-8">
                          <div className="text-right">
                            <p className="text-xl font-medium">Rs. {category.category.price}</p>
                            <p className="text-xs text-gray-500">(Inc. of all taxes)</p>
                          </div>
                          {isSelected ? (
                            <button
                              onClick={() => handleRemove(category.category.id)}
                              className="px-4 py-2 border border-[#00e6b3] text-[#00e6b3] rounded-lg hover:bg-[#00e6b3] hover:text-white transition-colors font-medium whitespace-nowrap"
                            >
                              - Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAdd(category.category.id)}
                              disabled={isDisabled}
                              className={`px-4 py-2 ${
                                isDisabled 
                                  ? 'bg-gray-300 cursor-not-allowed' 
                                  : 'bg-[#00e6b3] hover:bg-[#00cc9f]'
                              } text-white rounded-lg transition-colors font-medium whitespace-nowrap`}
                            >
                              + Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {selectedCategories.size > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
              <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <p className="text-gray-900 font-medium">1 category selected</p>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xl font-medium">Subtotal: Rs. {subtotal}</p>
                    <p className="text-xs text-gray-500">(Inc. of all taxes)</p>
                  </div>
                  <div>
                    <EventRegisterButton 
                      eveName={eventData.name} 
                      evePrice={subtotal} 
                      eventId={eventData.id} 
                    />
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