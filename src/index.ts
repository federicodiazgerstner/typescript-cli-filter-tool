import { input, select, checkbox, confirm, number } from "@inquirer/prompts";
import { filterProperties } from "./utils";
import { Property, Filter } from "./types";
import fs from "fs";

const properties: Property[] = JSON.parse(
  fs.readFileSync("properties.json", "utf8")
);

async function getUserInput(): Promise<Filter> {
  const minSqft = await number({
    message: "Enter minimum square footage (or leave empty):",
  });
  const maxSqft = await number({
    message: "Enter maximum square footage (or leave empty):",
  });

  const lighting = await select({
    message: "Select lighting condition:",
    choices: [
      { name: "Low", value: "low" },
      { name: "Medium", value: "medium" },
      { name: "High", value: "high" },
      { name: "Skip", value: "" },
    ],
  });

  const minPrice = await number({
    message: "Enter minimum price (or leave empty):",
  });
  const maxPrice = await number({
    message: "Enter maximum price (or leave empty):",
  });
  const rooms = await number({
    message: "Enter number of rooms (or leave empty):",
  });
  const bathrooms = await number({
    message: "Enter number of bathrooms (or leave empty):",
  });

  const includes = await input({
    message:
      "Enter words to match in description (comma-separated, or leave empty):",
  });

  const amenitiesInput = await input({
    message:
      "Enter required amenities (comma-separated, e.g., gym, sauna, pool):",
  });

  const amenities = amenitiesInput
    ? amenitiesInput.split(",").map((a) => a.trim().toLowerCase())
    : undefined;

  const useLocation = await confirm({
    message: "Do you want to filter by location?",
    default: false,
  });
  let location: [number, number, number] | undefined = undefined;
  if (useLocation) {
    const lat = await input({ message: "Enter latitude:" });
    const lon = await input({ message: "Enter longitude:" });
    const maxDist = await input({ message: "Enter max distance in km:" });

    location = [parseFloat(lat), parseFloat(lon), parseFloat(maxDist)];
  }

  return {
    squareFootage: { min: minSqft, max: maxSqft },
    lighting:
      lighting === "" ? undefined : (lighting as "low" | "medium" | "high"),
    price: { min: minPrice, max: maxPrice },
    rooms: rooms ? rooms : undefined,
    bathrooms: bathrooms ? bathrooms : undefined,
    includes: includes ? includes.split(",").map((s) => s.trim()) : undefined,
    amenities: amenities,
    location: location
      ? { lat: location[0], lon: location[1], maxDistance: location[2] }
      : undefined,
  };
}

async function main() {
  console.log(`
 ________________________________________________________
|                                                        |
| Welcome to the Property Filter CLI Tool for HomeVision |
|________________________________________________________|

`);
  const criteria = await getUserInput();

  const results = filterProperties(properties, criteria);

  if (results.length > 0) {
    console.log(
      `\nFound ${results.length} matching properties:\n`,
      JSON.stringify(results, null, 2)
    );
  } else {
    console.log("\nNo matching properties found.");
  }
}

main();
