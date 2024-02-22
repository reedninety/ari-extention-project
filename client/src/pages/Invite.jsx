import { useState } from "react";

export default function Invite() {
  const [input, setInput] = useState({
    eventname: "",
    location: "",
    date: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  async function addEvent() {
    const eventAdded = {
      event: {
        eventname: input.eventname,
        location: input.location,
        date: input.date,
      },
      friend: {
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
      },
    };
    try {
      const response = await fetch("/api/events/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(eventAdded),
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
      eventname: "",
      location: "",
      date: "",
      firstname: "",
      lastname: "",
      email: "",
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
            value={input.eventname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            className="form-control"
            type="text"
            name="location"
            value={input.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date and Time</label>
          <input
            className="form-control"
            type="datetime-local"
            name="date"
            value={input.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            className="form-control"
            type="text"
            name="firstname"
            value={input.firstname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            className="form-control"
            type="text"
            name="lastname"
            value={input.lastname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={input.email}
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
