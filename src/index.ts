import { Command } from "commander";
import { filterProperties } from "./utils";
import { Property, FilterCriteria } from "./types";
import * as fs from "fs";

const program = new Command();

const properties: Property[] = JSON.parse(
  fs.readFileSync("properties.json", "utf8")
);

program
  .version("1.0.0")
  .description("CLI to filter properties based on various criteria")
  .option("--minSqft <number>", "Minimum square footage", parseFloat)
  .option("--maxSqft <number>", "Maximum square footage", parseFloat)
  .option("--lighting <type>", "Lighting (low, medium, high)")
  .option("--minPrice <number>", "Minimum price", parseFloat)
  .option("--maxPrice <number>", "Maximum price", parseFloat)
  .option("--rooms <number>", "Exact number of rooms", parseInt)
  .option("--bathrooms <number>", "Exact number of bathrooms", parseInt)
  .option(
    "--includes <words>",
    "Words that must be in the description, comma-separated"
  )
  .option("--amenities <list>", "Amenities required (e.g., garage,pool)")
  .option("--location <lat,lon,maxDistance>", "Filter by distance", (value) => {
    const [lat, lon, maxDistance] = value.split(",").map(parseFloat);
    return { lat, lon, maxDistance };
  })
  .action((options) => {
    const criteria: FilterCriteria = {
      squareFootage: { min: options.minSqft, max: options.maxSqft },
      lighting: options.lighting,
      price: { min: options.minPrice, max: options.maxPrice },
      rooms: options.rooms,
      bathrooms: options.bathrooms,
      includes: options.includes?.split(","),
      amenities: options.amenities?.split(","),
      location: options.location,
    };

    const results = filterProperties(properties, criteria);
    console.log(JSON.stringify(results, null, 2));
  });

program.parse(process.argv);
