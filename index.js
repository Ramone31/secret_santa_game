const { readCSV, writeCSV } = require("./file_handler");
const { assignSecretSanta } = require("./santa_logic");

const path=require("path")

require("dotenv").config();

const EMPLOYEE_CSV = path.resolve(process.env.EMPLOYEE_CSV);
const PREVIOUS_CSV = path.resolve(process.env.PREVIOUS_CSV);
const OUTPUT_CSV = path.resolve(process.env.OUTPUT_CSV);


async function main() {
  try {
    console.log("Reading employee data...");
    const employees = await readCSV(EMPLOYEE_CSV);

    console.log("Reading previous assignments...");
    const previousAssignments = await readCSV(PREVIOUS_CSV);

    console.log("Assigning Secret Santa...");
    const newAssignments = assignSecretSanta(employees, previousAssignments);

    console.log("Saving new assignments...");
    await writeCSV(OUTPUT_CSV, newAssignments);

    console.log("Secret Santa assignments saved successfully! 🎅🎁");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
