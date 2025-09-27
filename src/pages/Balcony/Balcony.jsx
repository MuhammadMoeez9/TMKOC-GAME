import React, { useState, useEffect } from "react";
import TapuHappy from "../../assets/JethalalHall/TapuHappy.webp";
import jethalal_logo from "../../assets/jethalal_logo.webp";

export default function Balcony() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const GAME_START_DATE = new Date("2006-07-25T08:00:00"); // 25 July 2006 at 08:00
  function getCurrentDate(minutesSinceStart) {
    const currentDate = new Date(GAME_START_DATE);
    currentDate.setMinutes(currentDate.getMinutes() + minutesSinceStart);

    const options = { day: "2-digit", month: "long", year: "numeric" }; // "25 July 2006"
    return currentDate.toLocaleDateString("en-US", options);
  }
  // Date

  function getCurrentDate(minutesSinceStart) {
    const currentDate = new Date(GAME_START_DATE);
    currentDate.setMinutes(currentDate.getMinutes() + minutesSinceStart);

    const options = { day: "2-digit", month: "long", year: "numeric" }; // "25 July 2006"
    return currentDate.toLocaleDateString("en-US", options);
  }

  // Date

  useEffect(() => {
    // Check agar user ne kabhi close kiya tha
    const closedBefore = localStorage.getItem("sidebarClosed");
    if (closedBefore === "true") {
      setIsSidebarOpen(false); // ✅ agar close kiya tha to force close
    }
  }, []);

  const handleClose = () => {
    setIsSidebarOpen(false);
    localStorage.setItem("sidebarClosed", "true"); // ✅ ek dafa close karne ke baad permanently close
  };

  const handleOpen = () => {
    setIsSidebarOpen(true);
    // ❌ localStorage ko update nahi karna, taake "pehli dafa open" behavior preserve rahe
  };

  // Time

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

  function getFormattedTime(minutesSinceStart) {
    const totalMinutes = START_HOUR * 60 + minutesSinceStart;
    const hours = Math.floor((totalMinutes % 1440) / 60); // 1440 = minutes in a day
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  }

  function getCurrentDay(minutesSinceStart) {
    const dayIndex =
      Math.floor((START_HOUR * 60 + minutesSinceStart) / 1440) % 7;
    return DAYS[dayIndex];
  }

  const [minutesSinceStart, setMinutesSinceStart] = useState(() => {
    const stored = parseInt(localStorage.getItem("minutesSinceStart"), 10);
    return isNaN(stored) ? 0 : stored;
  });

  useEffect(() => {
    const updatedMinutes = minutesSinceStart + 30;
    setMinutesSinceStart(updatedMinutes);
    localStorage.setItem("minutesSinceStart", updatedMinutes);
  }, []);

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
  const [time, setTime] = useState(getFormattedTime(0));
  const [day, setDay] = useState(getCurrentDay(0));
  const [date, setDate] = useState(getCurrentDate(0));

  useEffect(() => {
    setTime(getFormattedTime(minutesSinceStart));
    setDay(getCurrentDay(minutesSinceStart));
    setDate(getCurrentDate(minutesSinceStart));
  }, [minutesSinceStart]);

  // Time

  return (
    <div className="min-h-screen bg-background">
      {/* Toggle button (left arrow when open, right arrow when closed) */}
      {!isSidebarOpen && (
        <div className="fixed top-4 left-4 z-50 text-white">
          <button
            onClick={handleOpen}
            className="p-2 rounded-md bg-primary text-primary-foreground flex items-center justify-center w-10 h-10 text-2xl"
          >
            →
          </button>
        </div>
      )}

      {/* Main Layout Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside
            className={`
              w-full lg:w-[35%] bg-[#212121] p-6 text-white
              flex flex-col fixed inset-0 z-40 
              lg:relative lg:z-auto
              lg:sticky lg:top-0 lg:h-screen
            `}
          >
            {/* Close button - Always visible */}
            <div className="absolute top-4 right-4">
              <button
                onClick={handleClose}
                className="p-2 rounded-md bg-primary text-primary-foreground flex items-center justify-center w-10 h-10 text-3xl"
              >
                ×
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="space-y-6 mt-16 lg:mt-12 overflow-y-auto max-h-[calc(100vh-4rem)] pr-2">
              {/* Logo/Brand */}
              <div className="p-4 bg-background rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-primary text-center">
                  <q>Daily Life Of Jethalal</q>
                </h1>

                <div className="bg-background rounded-lg shadow-sm p-4">
                  <img
                    src={jethalal_logo}
                    alt="Professional headshot of a business person with a friendly smile"
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <p className="text-muted-foreground mt-2 text-center">
                  Version 0.1
                </p>
              </div>

              {/* Navigation 1 */}
              <nav className="bg-background rounded-lg shadow-sm p-4 text-center">
                <ul className="space-y-1 text-lg text-blue-600">
                  <li>
                    Time: <span>{time}</span>{" "}
                    <span>({getTimePeriodLabel(time)})</span>
                  </li>
                  <li>
                    Date: <span>{date}</span>
                  </li>
                  <li>
                    Day: <span>{day}</span>
                  </li>
                </ul>
              </nav>

              {/* Navigation 2*/}
              <nav className="bg-background rounded-lg shadow-sm p-4 text-center">
                <ul className="space-y-2 text-green-600">
                  <li>
                    Money: <span>{money}</span>
                  </li>
                  <li>
                    Respect: <span>{respect}</span>
                  </li>
                  <li>
                    Muscularity: <span>{muscularity}</span>
                  </li>
                  <li>
                    RelationShip: <span>{relationship}</span>
                  </li>
                  <li
                    className="block p-2 hover:bg-accent rounded-md text-foreground"
                    onClick={() => setShowCheat(true)}
                  >
                    Cheats
                  </li>
                  <li>
                    <a
                      href="/portfolio"
                      className="block p-2 hover:bg-accent rounded-md text-foreground"
                    >
                      Portfolio
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        )}

        {/* cheat */}
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

        {/* Main Content Area */}
        <main
          className={`flex-1 bg-background p-6 lg:p-8 transition-all duration-300 ${
            isSidebarOpen
              ? "lg:opacity-100 opacity-50 lg:translate-x-0"
              : "opacity-100"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <div className=" p-6 min-h-screen min-w-screen">
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
                  <p className="text-white font-semibold text-lg leading-snug pt-4">
                    Jethalal: Hi , Tapu
                  </p>
                </div>

                {/* Alex Message */}
                <div className="max-w-xl mb-6 shadow-[4px_4px_4px_rgba(0,0,0,0.5)] rounded-lg border border-white bg-[#007B85] p-4 flex gap-4">
                  <img
                    src={TapuHappy}
                    alt="Portrait of a young man with brown hair looking at the camera in natural light"
                    className="w-20 h-20 rounded-lg border-2 border-white object-cover flex-shrink-0"
                  />
                  <p className="text-white font-semibold text-lg leading-snug pt-4">
                    Tapu: Papa Mujhe 5000 Rupee chahiye <br />
                    please....
                  </p>
                </div>

                {/* Jethalal */}
                <div className="max-w-xl mb-6 shadow-[4px_4px_4px_rgba(0,0,0,0.5)] rounded-lg border border-white bg-[#FA5591] p-4 flex gap-4">
                  <img
                    src="https://placehold.co/80x80?text=Emma&font=roboto"
                    alt="Portrait of a young woman with long brown hair smiling softly at the camera"
                    className="w-20 h-20 rounded-lg border-2 border-white object-cover flex-shrink-0"
                  />
                  <p className="text-white font-semibold text-lg leading-snug pt-4">
                    Jethalal: 5000??? Kis Cheez ke liye?
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
