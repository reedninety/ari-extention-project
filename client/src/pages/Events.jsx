import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Events() {
  const [eventList, setEventList] = useState([]);

  async function getEvents() {
    try {
      const response = await fetch("/api/events", {
        method: "GET",
        headers: {
          "authorization": "Bearer " + localStorage.getItem("token"),
        },
      });
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
        <div key={eventType.userid}>
          <Link to={`/events/${eventType.userid}`} className="fs-4">
            {eventType.eventname}
          </Link>
        </div>
      ))}

      <Outlet />
    </div>
  );
}
