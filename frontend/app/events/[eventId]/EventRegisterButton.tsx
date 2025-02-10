"use client";

import { useRouter } from 'next/navigation';
import { ArrowRight } from "lucide-react";

const EventRegisterButton = ({eveName, evePrice, eventId}) => {
  const router = useRouter();
  const access_token = localStorage.getItem('access_token');


  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 flex items-center gap-2"
      onClick={() => {
        if (access_token) {
          router.push(`/checkout?name=${encodeURIComponent(eveName)}&price=${encodeURIComponent(evePrice)}&eventId=${encodeURIComponent(eventId)}`);
        } else {
          alert("Please log in to register for events.");
          router.push("/auth/login");
        }
      }}
    >
      Proceed <ArrowRight size={20} />
    </button>
  );
  
};

export default EventRegisterButton;