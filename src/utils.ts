import { Filter, Property } from "./types";
import haversineDistance from "haversine-distance";

export function filterProperties(
  properties: Property[],
  criteria: Filter
): Property[] {
  return properties.filter((property) => {
    if (criteria.squareFootage) {
      if (
        criteria.squareFootage.min &&
        property.squareFootage < criteria.squareFootage.min
      )
        return false;
      if (
        criteria.squareFootage.max &&
        property.squareFootage > criteria.squareFootage.max
      )
        return false;
    }

    if (criteria.lighting && property.lighting !== criteria.lighting)
      return false;

    if (criteria.price) {
      if (criteria.price.min && property.price < criteria.price.min)
        return false;
      if (criteria.price.max && property.price > criteria.price.max)
        return false;
    }

    if (criteria.rooms !== undefined && property.rooms !== criteria.rooms)
      return false;

    if (
      criteria.bathrooms !== undefined &&
      property.bathrooms !== criteria.bathrooms
    )
      return false;

    if (
      criteria.includes &&
      !criteria.includes.some((word) => property.description.includes(word))
    )
      return false;

    if (
      criteria.amenities &&
      !criteria.amenities.every((amenity) => property.amenities[amenity])
    )
      return false;

    if (criteria.location) {
      const distance = haversineDistance(
        { latitude: criteria.location.lat, longitude: criteria.location.lon },
        { latitude: property.location[0], longitude: property.location[1] }
      );

      if (distance > criteria.location.maxDistance) return false;
    }

    return true;
  });
}
