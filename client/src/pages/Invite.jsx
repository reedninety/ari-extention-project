import { useState } from "react";

export default function Invite() {
  const [event, setEvent] = useState({
    eventname: "",
    location: "",
    date: "",
  });
  const [friends, setFriends] = useState([
    { firstname: "", lastname: "", email: "" },
  ]);
  async function addEvent(event, friends) {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ event, friends }),
      });
      if (!response.ok) {
        throw new Error("Failed to add event");
      }
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };
  const handleFriendInputChange = (e, i) => {
    const { name, value } = e.target;
    const newFriends = [...friends];
    newFriends[i][name] = value;
    setFriends(newFriends);
  };

  const handleAddFriend = () => {
    setFriends((prev) => [...prev, { firstname: "", lastname: "", email: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent(event, friends);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4 mb-3">
            <label className="form-label">Event</label>
            <input
              className="form-control"
              type="text"
              name="eventname"
              value={event.eventname}
              onChange={handleEventInputChange}
              required
            />
          </div>
          <div className="col-4 mb-3">
            <label className="form-label">Location</label>
            <input
              className="form-control"
              type="text"
              name="location"
              value={event.location}
              onChange={handleEventInputChange}
              required
            />
          </div>
          <div className="col-4 mb-3">
            <label className="form-label">Date and Time</label>
            <input
              className="form-control"
              type="datetime-local"
              name="date"
              value={event.date}
              onChange={handleEventInputChange}
              required
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddFriend}
          className="btn btn-primary"
        >
          Add Friends
        </button>
        {friends.map((friend, i) => (
          <div key={i} className="row mt-4">
            <div className=" col-4 mb-3">
              <input
                className="form-control"
                placeholder="First Name"
                type="text"
                name="firstname"
                value={friend.firstname}
                onChange={(e) => handleFriendInputChange(e, i)}
                required
              />
            </div>
            <div className=" col-4 mb-3">
              <input
                placeholder="Last Name"
                className="form-control"
                type="text"
                name="lastname"
                value={friend.lastname}
                onChange={(e) => handleFriendInputChange(e, i)}
                required
              />
            </div>
            <div className=" col-4 mb-3">
              <input
                placeholder="Email address"
                className="form-control"
                type="email"
                name="email"
                value={friend.email}
                onChange={(e) => handleFriendInputChange(e, i)}
                required
              />
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}
