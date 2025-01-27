"use client";

import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function EventCard({ event }) {
  return (
    <div className="max-w-md w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="relative">
      <img
        src={event.image || '/default-event-image.jpg'}
        alt={event.name}
        className="w-full h-[200px] object-cover"
      />
      <div className="absolute left-4 bottom-0 transform translate-y-1/2 bg-white rounded-lg shadow-md p-3 text-center min-w-[60px]">
        <div className="text-2xl font-bold text-gray-800">31</div>
        <div className="text-sm font-medium text-gray-600">Jan</div>
      </div>
    </div>
  
    <div className="p-6 pt-12">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{event.name}</h3>
  
      <div className="flex flex-wrap gap-2 mb-4">
        {event.categories?.map((category, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-sm font-medium bg-[#E8F9F6] text-[#00A991]"
          >
            {category}
          </span>
        ))}
      </div>
  
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">{event.location || 'AnyWhere'}</span>
        <span className="mx-2">|</span>
        <span className="text-[#00A991] font-medium">{event.activityType || '999'}</span>
      </div>
  
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-gray-500">Registrations closing on</p>
            <p className="text-sm font-medium text-[#FF3366]">30 Jan, 2025</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-lg font-bold">₹ {event.price || '999'}</p>
          </div>
        </div>
  
        {event.isVirtual && (
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