import { useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";

export default function Confirmation() {
  let { id } = useParams();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  const [searchParams] = useSearchParams();
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
    <div className="fs-3 fst-italic position-absolute top-50 start-50 translate-middle">
      <div>Thank you for confirming your participation to the event!</div>
      <div>See you soon </div>
    </div>
  );
}
