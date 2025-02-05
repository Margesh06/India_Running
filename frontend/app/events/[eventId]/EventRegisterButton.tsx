"use client";

import { useRouter } from 'next/navigation';

const EventRegisterButton = ({eveName, evePrice}) => {
  const router = useRouter();
  const access_token = localStorage.getItem('access_token');

  return (
    <button
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
    onClick={() => {
      if (access_token) {
        router.push(`/checkout?name=${encodeURIComponent(eveName)}&price=${encodeURIComponent(evePrice)}`);
      } else {
        alert('Please log in to register for events.');
        router.push('/auth/login');
      }
    }}
  >
    + Add
  </button>
  );
};

export default EventRegisterButton;