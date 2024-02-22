import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Events() {
  const [eventList, setEventList] = useState([]);

  async function getEvents(options = {}, id = "") {
    try {
      const response = await fetch(`/api/events/${id}`, options);
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
      <h2>Your Events</h2>
      <ul>
        {eventList.map((eventType) => (
          <li key={eventType.id}>{eventType.eventname}</li>
        ))}
      </ul>
    </div>
  );
}
