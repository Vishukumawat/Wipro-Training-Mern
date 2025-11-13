import EventEmitter from "events";

const event = new EventEmitter();

event.on("userLoggedIn", (name) => {
  console.log(`User ${name} logged in.`);
});

event.on("userLoggedOut", (name) => {
  console.log(`User ${name} logged out.`);
});

event.on("sessionExpired", (name) => {
  console.log(`Session expired for ${name}.`);
});

// Emit events
event.emit("userLoggedIn", "vishwas");
event.emit("userLoggedOut", "vishwas");

// BONUS: Emit after 5 seconds
setTimeout(() => {
  event.emit("sessionExpired", "vishwas");
}, 5000);
