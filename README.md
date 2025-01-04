# Choropleth Map of U.S. Counties

This project is a choropleth map that visualizes U.S. counties based on education levels. It was built using D3.js and fulfills specific user stories, including interactive tooltips and color-based data representation.

## Project Overview

The map displays U.S. counties, each colored based on the percentage of people with a bachelor’s degree or higher. When users hover over a county, a tooltip shows the county name, state, and education percentage. The project uses D3.js to create an interactive and visually appealing map.

## Features

- **Interactive Map**: Users can hover over counties to see details like county name, state, and education percentage.
- **Color-Coded Counties**: Counties are colored based on the percentage of people with a bachelor’s degree or higher.
- **Tooltips**: On hover, tooltips display detailed information for each county.
- **Legend**: A color legend is displayed to indicate the range of education levels.

## Technologies Used

- **D3.js**: JavaScript library for creating the interactive map and visualizations.
- **TopoJSON**: Format used for encoding and simplifying the geographic data of U.S. counties.
- **GeoJSON**: Format used for geospatial data of U.S. counties.
- **HTML/CSS**: For structuring and styling the webpage.

## Getting Started

1. Clone this repository.
2. Open `index.html` in a web browser to view the map.

Alternatively, you can view the live version of the project at this link: **[Live Demo](https://shishwami.github.io/FCC-Chroropleth-Map/)**

## Usage

- **Hover Over Counties**: Hover your mouse over any county to view its name, state, and education percentage.
- **Legend**: Use the color legend to understand the range of education percentages.
  
## Dependencies

- D3.js (v6 or later)
- TopoJSON (for geographic data encoding)
  
## Credits

This project uses educational data sourced from FreeCodeCamp's public dataset:
- **Education Data**: [Education Data](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json)
- **County Data**: [County Data](https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json)

This project is part of the FreeCodeCamp Data Visualization challenge. Learn more about FreeCodeCamp at [FreeCodeCamp](https://www.freecodecamp.org).
