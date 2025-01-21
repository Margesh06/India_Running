import EventForm from '../../../components/EventForm'; 

export default function CreateEventPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Create a New Event</h1>
      <EventForm />  
    </div>
  );
}
