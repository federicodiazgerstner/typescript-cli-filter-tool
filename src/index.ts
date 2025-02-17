import { input, select, checkbox, confirm } from "@inquirer/prompts";
import { filterProperties } from "./utils";
import { Property, Filter } from "./types";
import fs from "fs";

const properties: Property[] = JSON.parse(
  fs.readFileSync("properties.json", "utf8")
);

async function getUserInput(): Promise<Filter> {
  const minSqft = await input({
    message: "Enter minimum square footage (or leave empty):",
  });
  const maxSqft = await input({
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

  const minPrice = await input({
    message: "Enter minimum price (or leave empty):",
  });
  const maxPrice = await input({
    message: "Enter maximum price (or leave empty):",
  });
  const rooms = await input({
    message: "Enter number of rooms (or leave empty):",
  });
  const bathrooms = await input({
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
    squareFootage:
      minSqft || maxSqft
        ? { min: parseInt(minSqft), max: parseInt(maxSqft) }
        : { min: undefined, max: undefined },
    lighting:
      lighting === "" ? undefined : (lighting as "low" | "medium" | "high"),
    price:
      minPrice || maxPrice
        ? { min: parseFloat(minPrice), max: parseFloat(maxPrice) }
        : { min: undefined, max: undefined },
    rooms: rooms ? parseInt(rooms) : undefined,
    bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
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
