import { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
// import Main from "../main/Main";
// import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  // const { prevPrompts } = useContext(AppContext);
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />

        <div className="new-chat">
          <img
            src={assets.plus_icon}
            onClick={() => {
              window.location.reload();
            }}
            alt=""
          />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>Suggest some best 5g...</p>
            </div>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>triple camera mobile...</p>
            </div>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>best budget mobile...</p>
            </div>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>Is iPhone better...</p>
            </div>
          </div>
        ) : null}
      </div>
      {/* <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
      </div>
      <div className="bottom-item recent-entry">
        <img src={assets.history_icon} alt="" />
        {extended ? <p>Activity</p> : null}
      </div>
      <div className="bottom-item recent-entry">
        <img src={assets.setting_icon} alt="" />
        {extended ? <p>Settings</p> : null}
      </div> */}
    </div>
  );
};

export default Sidebar;
