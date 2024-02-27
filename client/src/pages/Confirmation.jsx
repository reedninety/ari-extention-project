import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function Confirmation() {
  let { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // replace search
  const email = searchParams.get("email");

  const updateConfirmation = async () => {
    try {
      const response = await fetch(`/api/events/${id}/${email}`, {
        method: "PUT",
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    updateConfirmation();
  }, []);

  return (
    <div>
      <div>
        Thank you for confirming your participation to the event! See you soon!
      </div>
    </div>
  );
}
