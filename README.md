# Wildfire Impact Application - [Link](https://ee-my-username32blue.projects.earthengine.app/view/wildfire-impact)

This repository contains the web-based application "Wildfire Impact" for analyzing the impact of fires using Google Earth Engine and Google Earth Engine's user interface (UI). Harnessing the power of Google Earth Engine, the "Wildfire Impact" application is designed to visualize, identify, and calculate the impact of wildfires worldwide from Sentinel-2 images, in a mater of minutes.

**Click the image below for the model workflow demo**
[![WildfireImpactDemo](https://img.youtube.com/vi/hG2sv7bSYec/maxresdefault.jpg)](https://youtu.be/hG2sv7bSYec)

### Development team: 
[Minas Chatzigeorgiadis](https://www.linkedin.com/in/minas-chatz/), [Dr Thanos Doganis](https://www.linkedin.com/in/thanos-doganis-41550915/) and [Io Doagani](https://www.linkedin.com/in/dogani-io/), GIS Lab reserch team of [MSc Climate ICT](https://masters.ds.unipi.gr/MSc_Climate_ICT/en/) of [University of Piraeus](https://www.unipi.gr/unipi/en/)
_______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

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

![UI](https://github.com/Akis32/GEE_Wildfire_Impact_app/assets/142306838/225e1858-39b3-4b4d-a1a1-721eda4bff00)



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

![Visualization model](https://github.com/Akis32/GEE_Wildfire_Impact_app/assets/142306838/26cbedaa-ccad-4d04-83d0-5f363274b47d)

The workflow to run the visualization model:

- **Step 1:** Define the country you are interested to calculate the wildfire impact from the dropdown list
- **Step 2:** Define the post-fire image collecton period. This the time period that the model will use to extract and compose post-fire images for further calculations and visualization. The start and end dates must be inputed in the form of yyyy-mm-dd (eg. 2023-09-01), it is good practice to define a period greater than 10 days to esure image availability
- **Step 3:**  Define the pre-fire image collecton period. This the time period that the model will use to extract and compose pre-fire images for further calculations and visualization. The start and end dates must be inputed in the form of yyyy-mm-dd (eg. 2023-09-01). Try to define a period before the wildfire greater than 30 days to esure image availability. An option is to use 1 or 2 months period after the end of the fire season of the previous year to ensure minimal cloud cover.
- **Step 4:** Press "Run model" button (UI No 4)
- **Step 5:** Browse through the layers from the Legend option (UI No 5).
   The model produces 3 layers on the map:
  - Classified DNBR Index tht classifies wildfire impact severity 4 categories unburned, low, moderate, and high.
  - Post-fire SWIR-NIR-Red Band combination that enables rapid visualization of burn scars and identification of cloud coverage.
  - Pre-fire SWIR-NIR-Red Band combination that enables burn scar comparisons and identification of cloud coverage.


## AOI Impact Analysis

![AOI Impact](https://github.com/Akis32/GEE_Wildfire_Impact_app/assets/142306838/04f20129-2c28-4583-bbec-63bd72379bbc)

The Wildfire Impact application enables for furter analysis of user defined Areas Of Interst (AOI). To asses the wildfire impact of specific regions:

- **Step 1:** Define the AOI from the custom Drawing Tools (UI No 6). Click on ether polygon or rectangle and draw on the map to specify the AOI. Click a second time on the polygon or rectangle button to reset the polygons an define a defferent AOI. It is good practice to enclose one wildfire per AOI. Large AOI may cause very long processing times
- **Step 2:** Click on the AOI Impact button
- **Step 3:** The results will pop up
    - DNBR pixel frequancy in the burn area within the AOI
    - Burn area in ha (This calculation is process heavy and will take some time usually 1 to 3 minutes)
    - KML Export link (UI No 9)
- **Step 4:** Use the pan icon (UI No7) to exit drawing mode an navigate on the map

**Note**: Cloud coverage can affect results, so ensure your AOI images are cloud-free.
