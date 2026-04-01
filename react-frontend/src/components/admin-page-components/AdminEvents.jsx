import { useEffect, useState } from "react";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div className="card bg-base-100 shadow p-4">
      <h2 className="font-semibold mb-3">Events</h2>

      <div className="space-y-2">
        {events.map(ev => (
          <div key={ev.id} className="flex justify-between">
            <span>{ev.description}</span>
            <span className="text-sm opacity-60">{ev.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
