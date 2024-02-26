import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="fs-1">OWL MAIL</h1>
      <Link to={"/invite"} className="nav-link">
        <button type="button" className="btn btn-outline-secondary btn-lg">
          Invite Friends
        </button>
      </Link>
    </div>
  );
}
