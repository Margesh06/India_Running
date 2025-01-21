export default async function EventDetails({ params }) {
    const { eventId } = params;
    const res = await fetch(`/api/events/${eventId}`);
    const event = await res.json();
  
    return (
      <div>
        <h1>{event.title}</h1>
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        <p>Location: {event.location}</p>
        <p>Category: {event.category}</p>
        <p>{event.description}</p>
      </div>
    );
  }
  