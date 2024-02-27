import { Link } from "react-router-dom";
import background from "../background.png";

export default function Home() {
  return (
    <div>
      <img
        src={background}
        className="img-fluid"
        alt="homepage"
        style={{ width: "1200px", height: "auto" }}
      ></img>

      <Link
        to={"/invite"}
        className="fs-2"
        style={{ position: "absolute", bottom: "25%", right: "33%" }}
      >
        Invite Friends
      </Link>
    </div>
  );
}
