import { useEffect, useState } from "react";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/activity", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Events request failed: ${res.status}`);
        }
        return res.json();
      })
      .then((data) =>
        setEvents(
          Array.isArray(data)
            ? [...data]
                .sort((left, right) => new Date(right.timestamp) - new Date(left.timestamp))
                .slice(0, 8)
            : [],
        ),
      )
      .catch((error) => {
        console.error("Error loading events:", error);
        setEvents([]);
      });
  }, []);

  return (
    <div className="card rounded-2xl bg-base-100 p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Events</h2>
        <p className="text-sm text-gray-500">
          Showing {events.length} events
        </p>
      </div>

      <div className="space-y-3">
        {events.length > 0 ? (
          events.map((ev) => (
            <div
              key={ev.id}
              className="flex flex-col gap-1 rounded-xl bg-base-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-medium">{ev.action}</span>
              <span className="text-sm text-gray-500">
                {new Date(ev.timestamp).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <div className="rounded-xl bg-base-200 p-6 text-center text-gray-400">
            No events found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
