import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Events() {
  const [eventList, setEventList] = useState([]);

  async function getEvents() {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEventList(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <div className="fs-3">Your Events</div>

      {eventList.map((eventType) => (
        <div key={eventType.id}>
          <Link to={`/events/${eventType.id}`} className="fs-4">
            {eventType.eventname}
          </Link>
        </div>
      ))}

      <Outlet />
    </div>
  );
}
