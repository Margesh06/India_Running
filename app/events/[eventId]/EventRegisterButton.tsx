"use client";

import { useRouter } from 'next/navigation';

const EventRegisterButton = ({eveName, evePrice}) => {
  console.log("eventreg",eveName);
  const router = useRouter();

  return (
    <button
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
    onClick={() => router.push(`/checkout?name=${encodeURIComponent(eveName)}&price=${encodeURIComponent(evePrice)}`)}
  >
    + Add
  </button>
  );
};

export default EventRegisterButton;