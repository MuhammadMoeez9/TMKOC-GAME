import React, { useState, useEffect } from "react";
import "../../Component/SideBar/SideBar.css";
import jethalal_logo from "../../assets/jethalal_logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TapuHappy from "../../assets/JethalalHall/TapuHappy.webp";
import FadeContent from "../../Component/SideBar/FadeContent";
// import scenes from "./Scenes";

const Hall = () => {
  const [showCheat, setShowCheat] = useState(false);
  const [cheatCode, setCheatCode] = useState("");
  const [isCheatValid, setIsCheatValid] = useState(false);

  const [money, setMoney] = useState(
    () => parseInt(localStorage.getItem("money")) || 100
  );
  const [respect, setRespect] = useState(
    () => parseInt(localStorage.getItem("respect")) || 100
  );
  const [muscularity, setMuscularity] = useState(
    () => parseInt(localStorage.getItem("muscularity")) || 100
  );
  const [relationship, setRelationship] = useState(
    () => parseInt(localStorage.getItem("relationship")) || 100
  );

  useEffect(() => localStorage.setItem("money", money), [money]);
  useEffect(() => localStorage.setItem("respect", respect), [respect]);
  useEffect(
    () => localStorage.setItem("muscularity", muscularity),
    [muscularity]
  );
  useEffect(
    () => localStorage.setItem("relationship", relationship),
    [relationship]
  );

  const handleCheatCheck = () => {
    if (cheatCode.trim().toLowerCase() === "jethalal") {
      setIsCheatValid(true);
    } else {
      setIsCheatValid(false);
      alert("Invalid Cheat Code!");
    }
  };

  const addStat = (statSetter) => {
    statSetter((prev) => prev + 50);
  };

  // Time Feature
  const START_HOUR = 8;
  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  // Time Feature
  // Formated Time

  function getFormattedTime(minutesSinceStart) {
    const totalMinutes = START_HOUR * 60 + minutesSinceStart;
    const hours = Math.floor((totalMinutes % 1440) / 60); // 1440 = minutes in a day
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  }
  // Formated Time
  // Current Date Function
  function getCurrentDay(minutesSinceStart) {
    const dayIndex =
      Math.floor((START_HOUR * 60 + minutesSinceStart) / 1440) % 7;
    return DAYS[dayIndex];
  }
  // Current Date Function

  const [minutesSinceStart, setMinutesSinceStart] = useState(() => {
    const stored = parseInt(localStorage.getItem("minutesSinceStart"), 10);
    return isNaN(stored) ? 0 : stored;
  });

  useEffect(() => {
    const updatedMinutes = minutesSinceStart + 30;
    setMinutesSinceStart(updatedMinutes);
    localStorage.setItem("minutesSinceStart", updatedMinutes);
  }, []);

  // Time Feature

  // Time , Date , Day
  const GAME_START_DATE = new Date("2006-07-25T08:00:00"); // 25 July 2006 at 08:00
  function getCurrentDate(minutesSinceStart) {
    const currentDate = new Date(GAME_START_DATE);
    currentDate.setMinutes(currentDate.getMinutes() + minutesSinceStart);

    const options = { day: "2-digit", month: "long", year: "numeric" }; // "25 July 2006"
    return currentDate.toLocaleDateString("en-US", options);
  }

  function getTimePeriodLabel(time) {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const totalMinutes = hour * 60 + minute;

    if (totalMinutes >= 0 && totalMinutes < 1) {
      return "Night"; // 00:00 exactly
    } else if (totalMinutes >= 1 && totalMinutes < 300) {
      return "Midnight"; // 00:01 - 04:59
    } else if (totalMinutes >= 300 && totalMinutes <= 719) {
      return "Morning"; // 05:00 - 11:59
    } else if (totalMinutes >= 720 && totalMinutes <= 990) {
      return "Afternoon"; // 12:00 - 16:30
    } else if (totalMinutes >= 991 && totalMinutes < 1200) {
      return "Evening"; // 16:31 - 19:59
    } else if (totalMinutes >= 1200 && totalMinutes < 1440) {
      return "Night"; // 20:00 - 23:59
    }
    return ""; // default fallback
  }

  // SideBar Visibility

  const [isVisible, setIsVisible] = useState(() => {
    const stored = localStorage.getItem("sidebarVisible");
    return stored === null ? true : JSON.parse(stored); // default to true
  });

  // Whenever visibility changes, update localStorage
  useEffect(() => {
    localStorage.setItem("sidebarVisible", JSON.stringify(isVisible));
  }, [isVisible]);
  // SideBar Visibility

  // Time Feature 2

  const [time, setTime] = useState(getFormattedTime(0));
  const [day, setDay] = useState(getCurrentDay(0));
  const [date, setDate] = useState(getCurrentDate(0));

  useEffect(() => {
    setTime(getFormattedTime(minutesSinceStart));
    setDay(getCurrentDay(minutesSinceStart));
    setDate(getCurrentDate(minutesSinceStart));
  }, [minutesSinceStart]);
  // console.log("Current time:", time);

  // Time Feature 2

  const fullText = "Good morning Jethalal, chlo utho washroom jao";
  const [displayedText, setDisplayedText] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[i]);
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
        setShowMenu(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Main">
      {isVisible ? (
        <div className="SideBar">
          <button onClick={() => setIsVisible(false)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="Div-Logo">
            <img className="Logo" src={jethalal_logo} alt="logo" />
          </div>
          <div className="Player-Stats">
            <p className="Version">Version 1.00</p>
            <p className="stat">
              <span className="Time">Time:</span>
              <span>{time}</span> <span>({getTimePeriodLabel(time)})</span>
            </p>
            <p className="stat">
              <span className="Date">Date:</span>
              <span>{date}</span>
            </p>
            <p className="stat">
              <span className="Day">Day:</span>
              <span>{day}</span>
            </p>
            <p className="Money">
              Money: <span>{money}</span>
            </p>
            <p className="Money">
              Respect: <span>{respect}</span>
            </p>
            <p className="Money">
              Muscularity: <span>{muscularity}</span>
            </p>
            <p className="Money">
              RelationShip: <span>{relationship}</span>
            </p>
          </div>
          <div className="Buttons-group">
            <button id="btn-grp">Home</button>
            <button id="btn-grp" onClick={() => setShowCheat(true)}>
              Cheats
            </button>
            <button id="btn-grp">Collection</button>
            <button id="btn-grp">Save</button>
            <button id="btn-grp">Load</button>
          </div>
        </div>
      ) : (
        <button className="OpenBtn" onClick={() => setIsVisible(true)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}

      {/* Cheat Panel */}
      {showCheat && (
        <div className="CheatPanel">
          <button onClick={() => setShowCheat(false)}>X</button>
          <h2>Enter Cheat Code:</h2>
          <input
            type="text"
            value={cheatCode}
            onChange={(e) => setCheatCode(e.target.value)}
            placeholder="Enter Code"
          />
          <button onClick={handleCheatCheck}>Submit</button>

          {isCheatValid && (
            <div className="CheatOptions">
              <h3>Cheats Unlocked 🎉</h3>
              <span>
                <button onClick={() => addStat(setMoney)}>+50 Money</button>
                <button onClick={() => addStat(setMoney)}>+500 Money</button>
              </span>
              <button onClick={() => addStat(setRespect)}>+50 Respect</button>
              <button onClick={() => addStat(setMuscularity)}>
                +50 Muscularity
              </button>
              <button onClick={() => addStat(setRelationship)}>
                +50 Relationship
              </button>
            </div>
          )}
        </div>
      )}

      {/* Right Side Content */}

      <div className="bg-black p-6 min-h-screen">
        <p className="text-white text-lg mb-6 max-w-xl leading-relaxed">
          You quickly finish your breakfast and get ready for school.
        </p>

        {/* Alex Message */}
        <div className="max-w-xl mb-6 shadow-[4px_4px_4px_rgba(0,0,0,0.5)] rounded-lg border border-white bg-[#007B85] p-4 flex gap-4">
          <img
            src={TapuHappy}
            alt="Portrait of a young man with brown hair looking at the camera in natural light"
            className="w-20 h-20 rounded-lg border-2 border-white object-cover flex-shrink-0"
          />
          <p className="text-white font-semibold text-lg leading-snug pt-4">
            Tapu: Hi Papa!
          </p>
        </div>

        {/* Emma Message */}
        <div className="max-w-xl mb-6 shadow-[4px_4px_4px_rgba(0,0,0,0.5)] rounded-lg border border-white bg-[#FA5591] p-4 flex gap-4">
          <img
            src="https://placehold.co/80x80?text=Emma&font=roboto"
            alt="Portrait of a young woman with long brown hair smiling softly at the camera"
            className="w-20 h-20 rounded-lg border-2 border-white object-cover flex-shrink-0"
          />
          <p className="text-white font-semibold text-lg leading-snug">
            Emma: Almost. Just need to
            <br />
            grab my bag.
          </p>
        </div>

        {/* Alex Message */}
        <div className="max-w-xl mb-6 shadow-[4px_4px_4px_rgba(0,0,0,0.5)] rounded-lg border border-white bg-[#1B5E61] p-4 flex gap-4">
          <img
            src="https://placehold.co/80x80?text=Alex&font=roboto"
            alt="Portrait of a young man with brown hair looking at the camera in natural light"
            className="w-20 h-20 rounded-lg border-2 border-white object-cover flex-shrink-0"
          />
          <p className="text-white font-semibold text-lg leading-snug">
            Alex: I hope we don't have too
            <br />
            much homework today
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hall;
