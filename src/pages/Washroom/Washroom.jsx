import React, { useState, useEffect } from "react";
import "../../Component/SideBar/SideBar.css";
import jethalal_logo from "../../assets/jethalal_logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showCheat, setShowCheat] = useState(false);
  const [cheatCode, setCheatCode] = useState("");
  const [isCheatValid, setIsCheatValid] = useState(false);

  const [money, setMoney] = useState(
    () => parseInt(localStorage.getItem("money")) || 100
  );
  const [respect, setRespect] = useState(
    () => parseInt(localStorage.getItem("respect")) || 100
  );
  const [Energy, setEnergy] = useState(
    () => parseInt(localStorage.getItem("Energy")) || 100
  );
  const [relationship, setRelationship] = useState(
    () => parseInt(localStorage.getItem("relationship")) || 100
  );

  useEffect(() => localStorage.setItem("money", money), [money]);
  useEffect(() => localStorage.setItem("respect", respect), [respect]);
  useEffect(() => localStorage.setItem("muscularity", Energy), [Energy]);
  useEffect(
    () => localStorage.setItem("relationship", relationship),
    [relationship]
  );

  //Brush and Shower Function

  const handleBrush = () => {
    setEnergy((prev) => Math.min(prev + 3, 100));
  };

  const handleShower = () => {
    setEnergy((prev) => Math.min(prev + 10, 100));
  };

  //Brush and Shower Function

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
              Time: <span>{time}</span>{" "}
              <span>({getTimePeriodLabel(time)})</span>
            </p>
            <p className="stat">
              Date: <span>{date}</span>
            </p>
            <p className="stat">
              Day: <span>{day}</span>
            </p>
            <p className="Money">
              Money: <span>{money}</span>
            </p>
            <p className="Money">
              Respect: <span>{respect}</span>
            </p>
            <p className="Money">
              Energy: <span>{Energy}</span>
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
              <button onClick={() => addStat(setEnergy)}>+50 Energy</button>
              <button onClick={() => addStat(setRelationship)}>
                +50 Relationship
              </button>
            </div>
          )}
        </div>
      )}

      {/* Right Side Content */}
      <div className="RightContent">
        <h2>you are in the washroom</h2>
        <p onClick={handleBrush}>Brush</p>
        <p onClick={handleShower}>Take a Shower</p>
        <br />
        <ul>
          <li>BedRoom</li>
          <li>Kitchen</li>
          <li>Hall</li>
          <li>Society</li>
        </ul>
        {/* <h2>{displayedText}</h2>
        {showMenu && (
          <ul className="MenuList">
            <li>Washroom</li>
            <li>Kitchen</li>
            <li>Hall</li>
            <li>Society</li>
          </ul>
        )} */}
      </div>
    </div>
  );
};

export default SideBar;
