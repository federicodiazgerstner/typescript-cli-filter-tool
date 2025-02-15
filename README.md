# CLI Filter (Typescript)

## Overview

The **Typescript CLI Filter Tool** is a command-line tool built with TypeScript that allows users to filter a dataset of properties based on various criteria such as price, rooms, location, and amenities.

## Supported Features

- Filter properties by price, square footage, rooms, bathrooms.
- Match properties based on included amenities.
- Search descriptions for specific words.
- Find properties within a given distance from a specified location.

## Installation

### Prerequisites

Ensure you have **Node.js** installed. If not, download and install it from [Node.js official website](https://nodejs.org/). You have to also install **ts-node** globally. You can run `npm install -g ts-node`.

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/federicodiazgerstner/typescript-cli-filter-tool.git
   cd typescript-cli-filter-tool
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

## Usage

### Command Structure

Run the CLI with including any filtering options:

```sh
ts-node src/index.ts [options]
```

### Options

| Option                             | Description                                         | Example Usage                   |
| ---------------------------------- | --------------------------------------------------- | ------------------------------- |
| `--minSqft <number>`               | Minimum square footage                              | `--minSqft 1000`                |
| `--maxSqft <number>`               | Maximum square footage                              | `--maxSqft 3000`                |
| `--lighting <type>`                | Lighting condition (`low`, `medium`, `high`)        | `--lighting high`               |
| `--minPrice <number>`              | Minimum price                                       | `--minPrice 200000`             |
| `--maxPrice <number>`              | Maximum price                                       | `--maxPrice 500000`             |
| `--rooms <number>`                 | Exact number of rooms                               | `--rooms 3`                     |
| `--bathrooms <number>`             | Exact number of bathrooms                           | `--bathrooms 2`                 |
| `--includes <words>`               | Description must contain certain words              | `--includes pool,garden`        |
| `--amenities <list>`               | Required amenities                                  | `--amenities garage,pool`       |
| `--location <lat,lon,maxDistance>` | Filter properties within a distance from a location | `--location 40.7128,-74.006,10` |

### Example Commands

#### Find properties with a pool and at least 3 rooms:

```sh
node src/index.ts --rooms 3 --amenities pool
```

#### Find properties under $500,000 with high lighting and a garage:

```sh
node src/index.ts --maxPrice 500000 --lighting high --amenities garage
```

#### Find properties within 15 km of a given location:

```sh
node src/index.ts --location 40.7128,-74.006,15
```

## Sample Data Source (`properties.json`)

Make sure to have a `properties.json` file in the root directory with sample property data:

```json
[
  {
    "squareFootage": 1500,
    "lighting": "high",
    "price": 300000,
    "rooms": 3,
    "bathrooms": 2,
    "location": [40.7128, -74.006],
    "description": "Beautiful house with a pool and garage.",
    "amenities": { "yard": true, "garage": true, "pool": true }
  }
]
```
