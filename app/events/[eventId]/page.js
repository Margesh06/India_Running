// export default async function EventDetails({ params }) {
//     const { eventId } = params;
//     const res = await fetch(`/api/events/${eventId}`);
//     const event = await res.json();

//     return (
//       <div>
//         <h1>{event.title}</h1>
//         <p>Date: {new Date(event.date).toLocaleDateString()}</p>
//         <p>Location: {event.location}</p>
//         <p>Category: {event.category}</p>
//         <p>{event.description}</p>
//       </div>
//     );
//   }

import React from 'react';

import Image from "next/image";
import Link from "next/link";
import Link from 'next/link';
import EventRegisterButton from './EventRegisterButton';

const EventPage = async ({ params }) => {
  const { eventId } = params;
  const events = [
    {
      id: 1,
      name: "Indian Navy Half Marathon 2025",
      date: "Feb 2, 2025",
      location: "Delhi",
      description: "A full marathon for all levels of runners.",
      price: "1000",
      image:
        "https://media.istockphoto.com/id/1733237354/photo/runners-on-the-street-healthy-lifestyle-marathon-athletics.jpg?s=2048x2048&w=is&k=20&c=tOaMqk8XrhiIS0eBEYl0-jfxL988gLXtkzLyGPlBG3s=",
      type: "In-Person",
      categories: ["5K", "10K", "21K"],
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
      name: "Nagpur Run",
      date: "Feb 9, 2025",
      location: "Bangalore",
      description: "A 5K run for beginners and families.",
      price: "300",
      image:
        "https://plus.unsplash.com/premium_photo-1663090417989-b399378d45ac?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      type: "Virtual",
      categories: ["3K", "10k"],
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

  const eve = events.find((event) => event.id == eventId);

  if (!eve) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  return (
    // <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
    //   <div className="bg-green-900 text-white py-6 text-center w-full rounded-lg shadow-lg px-6">
    //     <header className="w-full flex justify-between items-center text-white p-4 m-4 rounded-lg">
    //       <Link href="/" className="text-5xl">
    //         <img
    //           src="https://registrations.indiarunning.com/Logo1.svg"
    //           alt="Home"
    //           className="w-50 h-50"
    //         />
    //       </Link>
    //       <h1 className="text-3xl font-bold">{eve.name}</h1>
    //       <Link href="/auth/login" className="text-4xl">
    //         <img
    //           src="https://registrations.indiarunning.com/default-login-icon.svg"
    //           alt="Login"
    //           className="w-10 h-10"
    //         />
    //       </Link>
    //     </header>
    //   </div>

    //   <div className="container mx-auto px-8 py-8 bg-white shadow-lg rounded-lg text-center mb-8">
    //     <img
    //       src={eve.image}
    //       alt={eve.name}
    //       className="w-1/2 mx-auto rounded-lg shadow-md border border-gray-300"
    //     />
    //     <div className="mt-8 flex justify-center gap-16 text-gray-800 px-6">
    //       <p className="text-lg font-semibold">📅 {eve.date}</p>
    //       <p className="text-lg font-semibold">📍 {eve.location}</p>
    //       <p className="text-lg font-semibold">🛶 {eve.categories.join(", ")}</p>
    //       <p className="text-lg font-semibold">🏃 {eve.activityType}</p>
    //     </div>
    //   </div>

    //   <div className="container mx-auto px-8 py-8 bg-gray-200 shadow-lg rounded-lg text-center mb-8">
    //     <h2 className="text-3xl font-bold text-gray-800 mb-6">About the Event</h2>
    //     <p className="text-xl text-gray-700 px-6">{eve.description}</p>
    //   </div>

    //   <div className="container mx-auto px-8 py-8 bg-white shadow-lg rounded-lg text-center">
    //     <h2 className="text-3xl font-bold text-gray-800 mb-6">Select Category</h2>
    //     <div className="mt-10 flex justify-evenly items-center text-gray-700 px-6">
    //       <p className="text-xl font-bold">Type: {eve.categories.join(", ")}</p>
    //       <p className="text-xl font-bold">Price: Rs. {eve.price}</p>
    //       <button
    //         className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
    //       >
    //         Register Now
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col h-screen overflow-y-auto ">
      <div className="pb-4 bg-white shadow-md">
        <div style={{ backgroundColor: 'rgb(0 46 37)' }} className="flex flex-col w-full bg-gradient-to-r from-secondary-900 to-secondary-900 h-[50%] lg:h-[60%]">
          <nav className="flex flex-row-reverse justify-around w-11/12 mx-auto pt-5 smobile:pt-10 smobile:mb-0 tablet:mb-8">
            <div className="flex items-center cursor-pointer basis-1/12">
              <div className="relative flex flex-row items-center gap-3 group">
                <div className=" ">
                  <img src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="Logout" width={30} height={30} className="" />
                </div>
                <div className="absolute hidden group-hover:block -bottom-12 -left-12">
                  <button className="text-[#023571] font-rubik font-semibold text-sm tablet:text-base px-2 pr-4 py-2 flex items-center border-1 rounded-md bg-white">
                    <img src="https://www.indiarunning.com/images/DefaultUserProfile.svg" alt="Logout" width={20} height={20} className="px-2 h-100 w-100" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <Link href="/" target="_blank" className="pl-0 mt-2 sm:mt-0 sm:pl-24 basis-2/3">
              <Image className="block smobile:h-9 smobile:w-32 tablet:w-64 tablet:h-14" src="https://registrations.indiarunning.com/Logo1.svg" alt="Logo" width={256} height={56} />
            </Link>
          </nav>

          <div className="pt-7 w-full flex flex-col items-center">
            <h1 className="font-extrabold text-center text-white text-5xl  font-paytone m-5">
              {eve.name}
            </h1>
            <div className="block mx-2 tablet:mx-auto rounded-xl">
              <Image
                className="rounded-xl max-h-[600px]"
                src={eve.image}
                alt="Main Banner"
                width={1000}
                height={900}
              />
            </div>
            <div className="flex px-2 mx-auto justify-between max-w-[50%]  items-start flex-wrap bg-sematicInfo-100  py-2  border w-4/5 w-full gap-y-4  list-none shadow-infoCard bg-blue-100 m-5">
              <div className="flex justify-between w-full">
                {/* Location */}
                <li className="flex flex-col items-center h-full justify-between min-w-fit w-1/4 basis-full">
                  <div className="rounded-full">

                    <Image className="p-2 smobile:w-8 smobile:h-8 tablet:w-12 tablet:h-12" alt="Location" src="https://www.indiarunning.com/icons/location-red-icon.svg" width={48} height={48} />
                  </div>

                  <p className="font-medium text-center underline text-primary smobile:text-xs tablet:text-base line-clamp-1">{eve.location}</p>

                </li>

                {/* Calendar */}
                <li className="flex flex-col items-center h-full justify-between min-w-fit w-1/4 basis-full">
                  <div className="rounded-full">
                    <Image className="p-2 smobile:w-8 smobile:h-8 tablet:w-12 tablet:h-12" alt="Calendar" src="https://registrations.indiarunning.com/Calendar.svg" width={48} height={48} />
                  </div>
                  <p className="font-medium text-center smobile:text-xs tablet:text-base line-clamp-1">{eve.date}</p>

                </li>

                {/* Run */}
                <li className="flex flex-col items-center h-full justify-between min-w-fit w-1/4 basis-full">
                  <div className="rounded-full">
                    <Image className="p-2 smobile:w-8 smobile:h-8 tablet:w-12 tablet:h-12" alt="Run" src="https://registrations.indiarunning.com/Run.svg" width={48} height={48} />
                  </div>
                  <p className="font-medium text-center smobile:text-xs tablet:text-base line-clamp-1">{eve.categories.join(", ")}</p>

                </li>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 text-center bg-gray-200">
        <h4 className="mb-4 font-bold text-center text-xl font-montserrat">About the Event</h4>
        <div className="px-3 tablet:px-8 lg:px-16 text-s tablet:text-base">
          {eve.description}
        </div>
      </div>

      <div className="pt-10 pb-20 px-3 tablet:px-8 lg:px-16 bg-gray-200">
        <h4 className="mb-1 font-bold text-center text-2xl">Select Category</h4>
        <p className="mb-4 font-medium text-center text-black text-s">
          Here are the available categories for {eve.name}
        </p>

        <div className="mx-auto mt-5 bg-white rounded-md w-[90%]  shadow-md">
          <div className="flex justify-between py-10 px-8 items-center">
            <div>
              <p className="font-medium text-xl">{eve.categories.join(", ")}</p>
              <p className="text-base">Registration closes on </p>
              <p className="text-red-800 font-bold">{eve.date}, 5:30 AM</p>
            </div>
            <div>
              <div >
                <div className="flex justify-evenly">Inclusive</div>
                <div className='flex gap-2 mt-2'><span className="px-1 py-1 bg-blue-200 rounded-md text-sm">Tshirt</span>
                <span className="px-1 py-1 bg-blue-200 rounded-md text-sm">Medals</span>
                <span className="px-1 py-1 bg-blue-200 rounded-md text-sm">Refreshments</span></div>
                
              </div>
            </div>
            <div>
              <p className="text-xl font-medium">Rs. {eve.price}</p>
              <p className="text-xs">(Inc. of all taxes)</p>
              
            </div>
            <div><button className="mt-2 px-6 py-2  rounded bg-green-500">+ Add</button></div>
          </div>
      <div className="container mx-auto px-8 py-8 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Select Category</h2>
        <div className="mt-10 flex justify-evenly items-center text-gray-700 px-6">
          <p className="text-xl font-bold">Type: {eve.categories.join(", ")}</p>
          <p className="text-xl font-bold">Price: Rs. {eve.price}</p>
          <EventRegisterButton />
        </div>
      </div>
    </div>
  );
};

export default EventPage;