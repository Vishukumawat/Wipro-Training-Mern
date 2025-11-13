// Import fs.promises
import { writeFile, readFile } from "fs/promises";

async function run() {
  const input = "Node.js is awesome!";

  try {
    // Write to file
    await writeFile("feedback.txt", input);
    console.log("Data written successfully.");

    console.log("Reading file...");

    // Read file
    const data = await readFile("feedback.txt", "utf8");
    console.log(data);

  } catch (error) {
    console.log("Error:", error);
  }
}

run();
