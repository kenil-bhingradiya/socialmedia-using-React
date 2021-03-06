import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  function logout(){
    localStorage.clear();
        window.location.href = '/login';
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">FanField</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
               
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbarLink">Homepage</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbarLink">Timeline</span>
        </Link>
        <button onClick={logout} className="topbarLogout">
          <span className="">Logout</span>
          </button>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          {/*<div className="topbarIconItem">*/}
          <Link to={"/messenger"} className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </Link>
          {/*</div>*/}
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
