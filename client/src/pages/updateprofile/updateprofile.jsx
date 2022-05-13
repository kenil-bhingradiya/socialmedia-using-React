import "./updateprofile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useHistory } from "react-router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const server = process.env.REACT_APP_SERVER_URL || "http://localhost:8800/";
  const [user, setUser] = useState({city: "", from: "", relationship: "", coverPicture: "", profilePicture: ""});
  const username = useParams().username;
  console.log(username)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);


  //const email = useRef();
  //const password = useRef();
  //const passwordAgain = useRef();
  // const city = useRef();
  // const from = useRef();
  // const relationship = useRef();
  // const coverPicture = useRef();
  // const profilePicture = useRef();
  const history = useHistory();

  const handleChange = (key, val) => {
    setUser({...user, [key]: val})
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    // const user = {
    //   city: city.current.value,
    //   from: from.current.value,
    //   relationship: relationship.current.value,
    //   coverPicture: coverPicture.current.value,
    //   profilePicture: profilePicture.current.value,
    // };
    try {
      await axios.put(`${server}api/users/`+user._id, user);
      history.push("/profile/"+username);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
          <div className="loginRight">
          <form onSubmit={handleSubmit} className="loginBox" >
            <label>City</label>
                <input
                onChange={e => handleChange('city', e.target.value)}
                value={user.city}
                    placeholder="City name"
                    // ref={city}
                    className="loginInput"
                />

            <label> From </label>
                <input 
                onChange={e => handleChange('from', e.target.value)}
                value={user.from}
                    placeholder="From"
                    // ref={from}
                    className="loginInput"
                />

            <label> relationship </label>
                <input 
               onChange={e => handleChange('relationship', e.target.value)}
               value={user.relationship}
                    placeholder="your status"
                    // ref={relationship}
                    className="loginInput"
                />
            <label> Profile Photo </label>
                <input 
                    onChange={e => handleChange('profilePicture', e.target.files[0])}
                    value={user.profilePicture}
                    // ref={profilePicture}
                    type="file"
                    className="loginInput"
                />
            <label> Cover Photo </label>
                <input 
                onChange={e => handleChange('coverPicture', e.target.files[0])}
                value={user.coverPicture}
                    type="file"
                    // ref={coverPicture}
                    className="loginInput"
                />
            <button className="loginButton" type="submit" onClick={handleSubmit}>
             Enter
            </button>
          </form>
          
        </div>











            
          </div>
        </div>
      </div>
    </>
  );
}
