import { useState } from "react";
import "./Main.css";
import axios from "axios";
import { assets } from "../../assets/assets";
// import { AppContext } from "../context/AppContext";

const Main = () => {
  const [inputText, setInputText] = useState("");
  // const [response, setResponse] = useState("");
  const [responseFlag, setResponseFlag] = useState(0);
  const [displayedResponse, setDisplayedResponse] = useState("");
  // const { prevPrompts, setPrevPrompts } = useContext(AppContext);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendClick = async () => {
    try {
      const response = await axios.get("/query", {
        baseURL: "http://localhost:5000",
        params: {
          query: inputText,
        },
      });
      setResponseFlag(1);
      setDisplayedResponse("");
      // setPrevPrompts((prev) => [...prev, inputText]);
      typeResponse(response.data.received_query);
    } catch (error) {
      console.error("Error making request", error);
    }
  };

  const typeResponse = (text) => {
    let index = 0;
    const speed = 50; // Adjust the speed as needed

    const type = () => {
      if (index < text.length) {
        setDisplayedResponse((prev) => prev + text.charAt(index));
        index++;
        setTimeout(type, speed);
      }
    };

    type();
  };

  return (
    <div className="main">
      <div className="nav">
        <p>VendorAI</p>
      </div>

      <div className="main-container">
        {responseFlag ? (
          <>
            <div className="response-container">
              <div className="response">{displayedResponse}</div>
            </div>
            <div className="main-bottom">
              <div className="search-box">
                <input
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Enter a prompt here"
                />
                <div>
                  <img
                    src={assets.send_icon}
                    alt="Send"
                    onClick={handleSendClick}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="greet">
              <p>
                <span>Hello, DEV.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={handleSendClick}>
                <p>Suggest some best 5g mobile phones which has good specs</p>
              </div>
              <div className="card" onClick={handleSendClick}>
                <p>Is iPhone better than Redmi?</p>
              </div>
              <div className="card" onClick={handleSendClick}>
                <p>What is the best budget mobile phone?</p>
              </div>
              <div className="card" onClick={handleSendClick}>
                <p>What is a good triple camera mobile phone?</p>
              </div>
            </div>
            <div className="main-bottom">
              <div className="search-box">
                <input
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Enter a prompt here"
                />
                <div>
                  <img
                    src={assets.send_icon}
                    alt="Send"
                    onClick={handleSendClick}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
