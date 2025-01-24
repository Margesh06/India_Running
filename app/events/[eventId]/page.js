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
import Link from 'next/link';

const EventPage = async ({ params }) => {
  const { eventId } = await params; // Await params before destructuring
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
      categories: ["5K","10K","21K"],
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
      categories: ["3K","10k"],
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
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
      <div className="bg-green-900 text-white py-6 text-center w-full rounded-lg shadow-lg px-6">
        <header className="w-full flex justify-between items-center text-white p-4 m-4 rounded-lg">
          <Link href="/" className="text-5xl">
            <img
              src="https://registrations.indiarunning.com/Logo1.svg"
              alt="Home"
              className="w-50 h-50"
            />
          </Link>
          <h1 className="text-3xl font-bold">{eve.name}</h1>
          <Link href="/auth/login" className="text-4xl">
            <img
              src="https://registrations.indiarunning.com/default-login-icon.svg"
              alt="Login"
              className="w-10 h-10"
            />
          </Link>
        </header>
      </div>

      <div className="container mx-auto px-8 py-8 bg-white shadow-lg rounded-lg text-center mb-8">
        <img
          src={eve.image}
          alt={eve.name}
          className="w-1/2 mx-auto rounded-lg shadow-md border border-gray-300"
        />
        <div className="mt-8 flex justify-center gap-16 text-gray-800 px-6">
          <p className="text-lg font-semibold">📅 {eve.date}</p>
          <p className="text-lg font-semibold">📍 {eve.location}</p>
          <p className="text-lg font-semibold">🛶 {eve.categories.join(", ")}</p>
          <p className="text-lg font-semibold">🏃 {eve.activityType}</p>
        </div>
      </div>

      <div className="container mx-auto px-8 py-8 bg-gray-200 shadow-lg rounded-lg text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About the Event</h2>
        <p className="text-xl text-gray-700 px-6">{eve.description}</p>
      </div>

      <div className="container mx-auto px-8 py-8 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Select Category</h2>
        <div className="mt-10 flex justify-evenly items-center text-gray-700 px-6">
          <p className="text-xl font-bold">Type: {eve.categories.join(", ")}</p>
          <p className="text-xl font-bold">Price: Rs. {eve.price}</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
