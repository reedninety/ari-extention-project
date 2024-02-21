import { useState, useEffect } from "react";

export default function Invite() {
  const [eventsList, setEventsList] = useState([]);
  const [eventType, setEvent] = useState({
    eventname: "",
    location: "",
    date: "",
  });
  async function getEvents() {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEventsList(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    console.log(eventType);
  };
  return (
    <div>
      <form className="mt-3" onSubmit={handleEventSubmit}>
        <div className="mb-3">
          <label className="form-label">Event</label>
          <input
            className="form-control"
            type="text"
            name="eventname"
            value={eventType.eventname}
            onChange={handleEventInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            className="form-control"
            type="text"
            name="location"
            value={eventType.location}
            onChange={handleEventInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date and Time</label>
          <input
            className="form-control"
            type="datetime-local"
            name="date"
            value={eventType.date}
            onChange={handleEventInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}
