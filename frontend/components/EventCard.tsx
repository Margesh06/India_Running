"use client";

import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function EventCard({ event }) {
  const startDate = new Date(event.start_date);
const endDate = new Date(event.end_date);
const reg_close_date = new Date(event.reg_close_date)

const startDay = startDate.getDate();
const startMonth = startDate.toLocaleString("en-US", { month: "short" });

const endDay = endDate.getDate();
const endMonth = endDate.toLocaleString("en-US", { month: "short" });

const reg_close_day = reg_close_date.getDate();
const reg_close_month = reg_close_date.toLocaleString("en-US", { month: "short" });
const reg_close_year = reg_close_date.getFullYear();

const isSameDate =
  startDate.getFullYear() === endDate.getFullYear() &&
  startDate.getMonth() === endDate.getMonth() &&
  startDate.getDate() === endDate.getDate();
  
  return (
    <div className="max-w-md w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="relative">
      <img
        src={event.banner_image || '/default-event-image.jpg'}
        alt={event.name}
        className="w-full h-[200px] object-cover"
      />
      

<div className="absolute left-4 bottom-0 transform translate-y-1/2 bg-white rounded-lg shadow-md p-3 text-center min-w-[60px]">
  <div className="text-2xl font-bold text-gray-800">{startDay}</div>
  <div className="text-sm font-medium text-gray-600">{startMonth}</div>
  {!isSameDate && (
    <>
      <div className="text-2xl font-bold text-gray-800">{endDay}</div>
      <div className="text-sm font-medium text-gray-600">{endMonth}</div>
    </>
  )}
</div>;

    </div>
  
    <div className="p-6 pt-12">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{event.name}</h3>
  
      <div className="flex flex-wrap gap-2 mb-4">
  {event.eventCategories?.map((eventCategory, index) => (
    <span
      key={index}
      className="px-3 py-1 rounded-full text-sm font-medium bg-[#E8F9F6] text-[#00A991]"
    >
      {eventCategory.category.title}  
    </span>
  ))}
</div>

  
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">{event.city || 'AnyWhere'}</span>
        <span className="mx-2">|</span>
        <span className="text-[#00A991] font-medium">{event.activity_type || '999'}</span>
      </div>
  
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-gray-500">Registrations closing on</p>
            <p className="text-sm font-medium text-[#FF3366]">{reg_close_day + " " + reg_close_month + ", " + reg_close_year}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-lg font-bold">₹ {event.minPrice || '999'}</p>
          </div>
        </div>
  
        {event.event_type === "virtual" && (
  <div className="flex items-center gap-2 text-[#FF3366] text-sm mb-4">
    <div className="w-4 h-4 rounded-full border-2 border-[#FF3366] flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-[#FF3366]"></div>
    </div>
    This is a virtual event
  </div>
)}
  
        <Link
          href={`/events/${event.id}`}
          className="block w-full bg-[#FF3366] text-white text-center py-3 rounded-lg font-medium hover:bg-[#E62E5C] transition-colors duration-300"
        >
          Register
        </Link>
      </div>
    </div>
  </div>
  
  );
}