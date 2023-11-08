import { Link } from "react-router-dom";
import { MdPlaylistAdd } from "react-icons/md";

export default function CreateListButton() {
  return (
    <Link to="/create/list" className="create-list-link">
      <MdPlaylistAdd />
      Aufgabenliste erstellen
    </Link>
  );
}
