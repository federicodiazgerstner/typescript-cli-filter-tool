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

Then, follow the instructions with the desired filters

## Sample Data Source (`properties.json`)

Make sure to have a `properties.json` file in the root directory with sample property data (or feel free to use the current one in the repo):

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
