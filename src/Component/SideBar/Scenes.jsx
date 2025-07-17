// src/scenes/scenes.js
const scenes = {
  wakeUp: {
    text: "Jethalal wakes up at 8:00 AM.",
    image: "/media/wakeup.jpg",
    options: [{ text: "Go to Washroom", next: "washroom" }],
  },
  washroom: {
    text: "You are in the washroom.",
    image: "/media/washroom.jpg",
    options: [
      { text: "Brush Teeth", next: "breakfast", set: { hasBrushed: true } },
    ],
  },
  breakfast: {
    text: "You’re at the kitchen.",
    image: "/media/kitchen.jpg",
    condition: (state) => state.daily.hasBrushed,
    options: [
      { text: "Eat Breakfast", next: "nextScene", set: { hasEaten: true } },
    ],
  },
  blocked: {
    text: "You can't eat until you brush your teeth!",
    options: [{ text: "Go back to washroom", next: "washroom" }],
  },
};
export default scenes;
