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
        date: data[0].date,
      };
      setEventData(extractedEventData);
      console.log(data);
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
  return (
    <div>
      <div>
        {eventData.eventname} {eventData.location} {eventData.date}
      </div>
      {friendsData.map((friend) => (
        <div key={friend.id}>
          {friend.firstname} {friend.lastname} {friend.email} {friend.confirmed}
        </div>
      ))}
      <button onClick={() => deleteEvent(eventData.id)}>DELETE EVENT</button>{" "}
      <br></br>
      <br></br>
      <button onClick={() => sendInvitation(eventData.id)}>
        Send Invitation
      </button>
    </div>
  );
}
