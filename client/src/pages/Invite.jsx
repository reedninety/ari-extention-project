import { useState } from "react";

export default function Invite() {
  const [input, setInput] = useState({
    event: { eventname: "", location: "", date: "" },
    friend: { firstname: "", lastname: "", email: "" },
  });
  async function addEvent() {
    try {
      const response = await fetch("/api/events/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent();
    setInput({
      event: { eventname: "", location: "", date: "" },
      friend: { firstname: "", lastname: "", email: "" },
    });
  };
  return (
    <div>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Event</label>
          <input
            className="form-control"
            type="text"
            name="eventname"
            value={input.event.eventname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            className="form-control"
            type="text"
            name="location"
            value={input.event.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date and Time</label>
          <input
            className="form-control"
            type="datetime-local"
            name="date"
            value={input.event.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            className="form-control"
            type="text"
            name="firstname"
            value={input.friend.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            className="form-control"
            type="text"
            name="lastname"
            value={input.friend.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={input.friend.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}
