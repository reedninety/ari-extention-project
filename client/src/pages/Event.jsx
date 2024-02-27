import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Event() {
  const [friendsData, setFriendsData] = useState([]);
  const [eventData, setEventData] = useState({});
  let { id } = useParams();

  async function getEvent() {
    try {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();
      const extractedEventData = {
        id: data[0].id,
        eventname: data[0].eventname,
        location: data[0].location,
        date: new Date(data[0].date).toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        }),
      };
      setEventData(extractedEventData);
      console.log(friendsData, data);
      setFriendsData(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getEvent();
  }, [id]);

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendEmail = async (id) => {
    try {
      const response = await fetch(`/api/send-email/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      window.alert("Emails sent successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="mt-4 fs-3">
        The {eventData.eventname} event will be at {eventData.location} on{" "}
        {eventData.date}.
      </div>
      <div className="mt-4 fs-4">The friends invited are:</div>
      {friendsData.map((friend, i) => (
        <div className="row mt-3" key={i}>
          <div className="col-4">
            {friend.firstname} {friend.lastname}
          </div>
          <div className="col-4">{friend.email}</div>
          <div className="col-4">
            Confirmed: {friend.confirmed ? "YES" : "NO"}
          </div>
        </div>
      ))}
      <div className="btn-group mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => deleteEvent(eventData.id)}
        >
          <i class="fa-solid fa-trash"></i> Delete Event
        </button>{" "}
        <button
          className="btn btn-outline-secondary"
          onClick={() => sendEmail(eventData.id)}
        >
          <i class="fa-solid fa-envelope"></i> Send Invitation
        </button>
      </div>
    </div>
  );
}
