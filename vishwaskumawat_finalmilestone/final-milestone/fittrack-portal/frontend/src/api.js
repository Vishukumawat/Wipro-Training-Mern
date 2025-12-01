const API = "/api";
// Function to fetch the list of programs
export async function fetchPrograms() {
  const res = await fetch(API + "/programs");
  return await res.json();
}
// Function to enroll a user in a program
export async function enroll(programId, userId = "USR101") {
  const res = await fetch(API + "/enroll", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, programId })
  });

  return await res.json();
}
