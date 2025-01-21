import Link from 'next/link';

export default function EventCard({ event }) {
  return (
    <div className="max-w-xs rounded-lg shadow-lg bg-white overflow-hidden">
      <img
        src={event.image || '/default-event-image.jpg'}
        alt={event.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{event.name}</h3>
        <p className="text-lg text-gray-600 mb-2">
          {event.date} | {event.location}
        </p>
        <p className="text-sm text-gray-500 mb-4">{event.description}</p>
        <div className="flex justify-between items-center">
          <Link
            href={`/events/${event.id}`}
            className="text-blue-600 hover:underline font-medium"
          >
            View Details
          </Link>
          <span className="text-lg font-semibold text-green-600">{event.price}</span>
        </div>
      </div>
    </div>
  );
}
