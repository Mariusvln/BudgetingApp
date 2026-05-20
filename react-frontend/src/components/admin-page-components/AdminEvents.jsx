import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 50;

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8080/api/activity", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Events request failed: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setEvents(
          Array.isArray(data)
            ? [...data]
                .filter((event) => {
                  const action = (event.action || "").toLowerCase();
                  return (
                    action.includes("category") &&
                    !action.includes("logged in") &&
                    !action.includes("logged out")
                  );
                })
                .sort((left, right) => new Date(right.timestamp) - new Date(left.timestamp))
            : [],
        );
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
        setEvents([]);
      });
  }, []);

  const getActor = (event) => event.username || event.email || "Admin";
  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, events.length);
  const visibleEvents = useMemo(
    () => events.slice(pageStart, pageEnd),
    [events, pageEnd, pageStart],
  );

  return (
    <div className="card rounded-2xl bg-base-100 p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Events</h2>
        <p className="text-sm text-base-content/60">
          Showing {events.length === 0 ? 0 : pageStart + 1}-{pageEnd} of{" "}
          {events.length} category events
        </p>
      </div>

      <div className="space-y-3">
        {visibleEvents.length > 0 ? (
          visibleEvents.map((ev) => (
            <div
              key={ev.id}
              className="flex flex-col gap-2 rounded-xl bg-base-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="font-medium">{ev.action}</span>
                <p className="mt-1 text-sm text-base-content/60">
                  By {getActor(ev)}
                </p>
              </div>
              <span className="text-sm text-base-content/60">
                {new Date(ev.timestamp).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <div className="rounded-xl bg-base-200 p-6 text-center text-base-content/50">
            No events found
          </div>
        )}
      </div>

      {events.length > PAGE_SIZE ? (
        <div className="mt-4 flex flex-col gap-3 text-sm text-base-content/60 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Page {safePage} of {totalPages}
          </span>

          <div className="join">
            <button
              type="button"
              className="btn join-item btn-sm"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn join-item btn-sm"
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminEvents;
