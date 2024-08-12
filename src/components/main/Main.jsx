import { useState } from "react";
import "./Main.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import HashLoader from "react-spinners/HashLoader";
// import { BounceLoader } from "react-spinners/";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [responseFlag, setResponseFlag] = useState(0);
  const [displayedResponse, setDisplayedResponse] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendClick = async () => {
    setLoading(true);
    setDisplayedResponse("");
    setResponseFlag(0);

    try {
      const response = await axios.get("/query", {
        baseURL: "http://localhost:5000",
        params: {
          query: inputText,
        },
      });

      setResponseFlag(1);
      typeResponse(response.data.received_query);
    } catch (error) {
      console.error("Error making request", error);
    } finally {
      setLoading(false);
    }
  };

  const typeResponse = (text) => {
    let index = 0;
    const speed = 100;

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
      {loading ? (
        <div className="loader">
          <HashLoader
            color={"#D0021b"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
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
                  <span>How can I help you today?</span>
                </p>
              </div>
              <div className="cards">
                <div className="card" onClick={handleSendClick}>
                  <p>Suggest some best 5g mobile phones which has good specs</p>
                  <img src={assets.bulb_icon} />
                </div>
                <div className="card" onClick={handleSendClick}>
                  <p>Is iPhone better than Redmi?</p>
                  <img src={assets.bulb_icon} />
                </div>
                <div className="card" onClick={handleSendClick}>
                  <p>What is the best budget mobile phone?</p>
                  <img src={assets.bulb_icon} />
                </div>
                <div className="card" onClick={handleSendClick}>
                  <p>What is a good triple camera mobile phone?</p>
                  <img src={assets.bulb_icon} />
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
      )}
    </div>
  );
};

export default Main;
