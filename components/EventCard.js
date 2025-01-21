import Link from 'next/link';

export default function EventCard({ event }) {
  return (
    <div className="relative max-w-sm rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden">
      <div className="relative">
        <img
          src={event.image || '/default-event-image.jpg'}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-gray-700 bg-opacity-80 text-white text-xs font-semibold px-3 py-2 rounded-tr-md">
          <p className="writing-vertical">{event.date}</p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-3 truncate">{event.name}</h3>
        <p className="text-md text-gray-600 mb-2">{event.location}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-3">{event.description}</p>

        <div className="mb-4 border-t pt-4">
  <p className="text-sm font-medium text-gray-700 mb-2">
    <span className="font-semibold text-gray-800">Event Type: </span>
    {event.isVirtual ? 'Virtual' : 'In-Person'}
  </p>
  <p className="text-lg font-semibold text-blue-300 mb-2">
    {event.activityType || 'Running'}
  </p>
  <div>
    <ul className="flex flex-wrap gap-2 mt-2">
      {event.categories?.map((category, index) => (
        <li
          key={index}
          className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full shadow-sm"
        >
          {category}
        </li>
      ))}
    </ul>
  </div>
</div>


        <div className="flex justify-between items-center">
          <Link
            href={`/events/${event.id}`}
            className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
          >
            Register
          </Link>
          <span className="text-lg font-semibold text-green-600">
            {event.price ? `₹${event.price} onwards` : 'Free'}
          </span>
        </div>
      </div>
    </div>
  );
}
