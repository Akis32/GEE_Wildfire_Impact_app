# Wildfire Impact Application - [Link](https://ee-my-username32blue.projects.earthengine.app/view/wildfire-impact)

This repository contains the web-based application "Wildfire Impact" for analyzing the impact of fires using Google Earth Engine and Google Earth Engine's user interface (UI). Harnessing the power of Google Earth Engine, the "Wildfire Impact" application is designed to visualize, identify, and calculate the impact of wildfires worldwide from Sentinel-2 images, in a mater of minutes.

[![WildfireImpactDemo](https://img.youtube.com/vi/hG2sv7bSYec/maxresdefault.jpg)](https://youtu.be/hG2sv7bSYec)


## Summary

Explore the impact of wildfires using the "Wildfire Impact" application tool which allows you to:

- **Input Parameters**: Define date ranges for pre-fire and post-fire satellite imagery to analyze the impact within specific timeframes.

- **Area of Interest (AOI)**: Easily delineate AOIs using intuitive drawing tools for precise analysis of wildfire impact in chosen regions.

- **Fire Impact Classification**: The tool calculates the dNBR index and categorizes wildfire impact into severity levels: unburned, low severity, moderate severity, and high severity, each represented with a unique color.

- **Data Export**: Export AOI polygons in KML and shapefile formats for further analysis or reporting.

## How It Works

The tool operates in two steps:

1. **Data Collection and Visualize Impact**: Select the country of interest and specify the post-fire and pre-fire image collection periods. The tool uses this data to calculate the dNBR index, identifying areas affected by wildfires.

2. **AOI Analysis**: Define an AOI, and the tool provides dNBR statistics and calculates the burned area. You can also download the burned area data in KML format.

Whether you're a researcher, land manager, or concerned citizen, the Fire Impact Analysis Tool offers a powerful and accessible way to assess the impact of wildfires and make informed decisions based on geospatial data.

## Table of Contents

- [User Interface (UI)](#user-interface-ui)
- [Model Workflow](#model-workflow)
- [AOI Impact Analysis](#aoi-impact-analysis)

## User Interface (UI)

![UI](https://github.com/Akis32/GEE_Wildfire_Impact_app/assets/142306838/c5eb3428-fa73-4857-8690-aab9ad207455)


1. Country selection list
2. Selection of start and end dates for post-fire image collection
3. Selection of start and end dates for pre-fire image collection
4. Run the model to visualize wildfire impact
5. Layer manipulation (turn on/off layers and adjust transparency)
6. Drawing tools for defining AOI
7. Map pan option
8. AOI impact calculation based on the specified polygon/rectangle
9. Link for downloading the burn area polygon

## Model Workflow

To use the visualization model:

1. Select your country of interest.
2. Define the post-fire image collection period.
3. Define the pre-fire image collection period.
4. Click the "Run model" button.
5. Explore layers: Classified DNBR Index, Post-fire SWIR-NIR-Red Band, Pre-fire SWIR-NIR-Red Band.


![Visualization model](https://github.com/Akis32/GEE_Wildfire_Impact_app/assets/142306838/59780972-3394-438b-aad9-9e93e739e51d)


## AOI Impact Analysis

To analyze specific regions:

1. Use the drawing tools (UI No 6) to define the AOI.
2. Click the AOI Impact button.
3. View results: DNBR pixel frequency, burn area in hectares, and KML export link (UI No 9).
4. Use the pan icon (UI No 7) to exit drawing mode and navigate on the map.

**Note**: Cloud coverage can affect results, so ensure your AOI images are cloud-free.

![AOI Impact](https://github.com/Akis32/GEE_Wildfire_Impact_app/assets/142306838/6f5573cc-302f-4f25-b158-91d18fa6898d)



