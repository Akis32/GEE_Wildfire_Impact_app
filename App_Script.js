var S2 = ee.ImageCollection("COPERNICUS/S2_SR"),
    LISB = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    geometry = /* color: #1589ff */ee.Geometry.MultiPoint();


//*********************************************INPUTS****************************************************************//

//After fire end date range
var AF_Date_Start_Input = ui.Textbox({
  placeholder: "Enter date (yyyy-mm-dd)",
  style: { width: '200px' }
});

// After fire end date range
var AF_Date_End_Input = ui.Textbox({
  placeholder: "Enter date (yyyy-mm-dd)",
  style: { width: '200px' }
});


//Pre fire end date range
var PF_Date_Start_Input = ui.Textbox({
  placeholder: "Enter date (yyyy-mm-dd)",
  style: { width: '200px' }
});

//After fire end date range
var PF_Date_End_Input = ui.Textbox({
  placeholder: "Enter date (yyyy-mm-dd)",
  style: { width: '200px' }
});


//*********************************************MODEL**********************************************************//

//******************************************************Input processing
AF_Date_Start_Input.onChange(updateSelectedDates);
AF_Date_End_Input.onChange(updateSelectedDates);
PF_Date_Start_Input.onChange(updateSelectedDates);
PF_Date_End_Input.onChange(updateSelectedDates);

// Function to validate and process user input
function processUserInput(input) {
  var datePattern = /^([0-9]{4})-(0[1-9]|1[0-2])-([0-9]{2})$/;
  if (datePattern.test(input)) {
    return input; // Return the input date as is
  } else {
    return null;
  }
}

// Function to update selected dates
function updateSelectedDates() {
  var startInput = AF_Date_Start_Input.getValue();
  var endInput = AF_Date_End_Input.getValue();
  
  var formattedStart = processUserInput(startInput);
  var formattedEnd = processUserInput(endInput);
  
  if (formattedStart && formattedEnd) {
    print("Selected Start Date:", formattedStart);
    print("Selected End Date:", formattedEnd);
    // Use the formatted dates for further processing
  } else {
    print("Invalid date format. Please use yyyy-mm-dd format.");
  }
}

//*******************************************************Drawing tools

//Get the drawing tools widget object,
//define it as a variable for convenience in recalling it later.
var drawingTools = Map.drawingTools();

drawingTools.setShown(true);

//Setup a while loop to clear all existing geometries 
//that have been added as imports from drawing tools 
//(from previously running the script).
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}

//Initialize a dummy GeometryLayer with null geometry 
//to act as a placeholder for drawn geometries.
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '#1589FF'});

drawingTools.layers().add(dummyGeometry);


//Define the geometry clearing function.
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}

//Define functions that will be called when 
//each respective drawing button is clicked.
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}

function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}


//*******************************************************General variables
// Remove layers
function removelay(){
  
  var lay = Map.layers().get(0);
  if(lay){
  Map.remove(lay)}

  else{print('layer missing')}
}



//Visualization
var palettes = require('users/gena/packages:palettes');//Load color palettes
var palette1 = palettes.crameri.vik[25];//Define a specific palette option
var palette2 = palettes.crameri.lajolla[25];//Define a specific palette option

var Viz_AG = {min:0,max:6000,bands:['B12','B8','B4']};
var Viz_RGB = {min:0, max:4000,bands:['B4', 'B3', 'B2']};
var Viz_CI = {min:0, max:7000,bands:['B8', 'B4', 'B3']};
var Viz_class = {min:1, max:4,palette:'#0ae042, #fff70b, #ffaf38, #ff641b'};


var countryList = [
  "Afghanistan",
  "Aksai Chin",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Ashmore & Cartier Is",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas, The",
  "Bahrain",
  "Baker Island",
  "Bangladesh",
  "Barbados",
  "Bassas da India",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bir Tawil",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burma",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Clipperton Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Coral Sea Islands",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Dhekelia",
  "Dem Rep of the Congo",
  "Demchok Area",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Dragonja River Mouth",
  "Dramana-Shakatoe Area",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Europa Island",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French S & Antarctic Lands",
  "Gabon",
  "Gambia, The",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Glorioso Island",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Howland Island",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Jan Mayen",
  "Japan",
  "Jarvis Island",
  "Jersey",
  "Johnston Atoll",
  "Jordan",
  "Juan de Nova Island",
  "Kazakhstan",
  "Kenya",
  "Kingman Reef",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Koualou Area",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Liancourt Rocks",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Madeira Islands",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nauru",
  "Navassa Island",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palmyra Atoll",
  "Panama",
  "Papua New Guinea",
  "Paracel Islands",
  "Paraguay",
  "Peru",
  "Pitcairn Islands",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Siachen-Saltoro Area",
  "Sierra Leone",
  "Singapore",
  "Sinafir & Tiran Is.",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Spain (Africa)",
  "Spain (Canary Is)",
  "Spratly Islands",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "U.S. Virgin Islands",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States (Alaska)",
  "United States (Hawaii)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Wake Island",
  "Wallis & Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

var selectedCountry = "Greece";

var Country_select = LISB.filter(ee.Filter.equals('country_na', selectedCountry));

function updateSelectedCountry(selectedCountry) {

  // Update the Country_select variable
  Country_select = LISB.filter(ee.Filter.equals('country_na', selectedCountry));}

//******************************************************Visualize function


function model(){
  
  legendPanel.clear();
  resultsPanel.clear();
  inspector.clear();
  
  
  var AF_Date_Start_format = processUserInput(AF_Date_Start_Input.getValue());
  var AF_Date_End_format = processUserInput(AF_Date_End_Input.getValue());
  var PF_Date_Start_format = processUserInput(PF_Date_Start_Input.getValue());
  var PF_Date_End_format = processUserInput(PF_Date_End_Input.getValue());
  
  //After fire
  var collection_AF = S2.filterDate(AF_Date_Start_format, AF_Date_End_format)
      .sort('CLOUDY_PIXEL_PERCENTAGE', false)
      .filterBounds(Country_select);
  var AF_Img = ee.Image(collection_AF.mosaic()).clip(Country_select);

  var NBR_AF = AF_Img.normalizedDifference(['B8','B12']);

  //Pre Image
  var collection_PF = S2.filterDate(PF_Date_Start_format,PF_Date_End_format).sort('CLOUDY_PIXEL_PERCENTAGE', false).filterBounds(Country_select);
  var PF_Img = ee.Image(collection_PF.mosaic()).clip(Country_select);

  var NBR_PF = PF_Img.normalizedDifference(['B8','B12']);

  //DNBR Calculation
  var DNBR = NBR_PF.subtract(NBR_AF);

  //Classification of DNBR
  var class_DNBR = DNBR
  .where(DNBR.gt(-2).and(DNBR.lte(0.12)),1)     //Unburned - Blue
  .where(DNBR.gt(0.12).and(DNBR.lte(0.27)),2)   //Low Severity - yellow
  .where(DNBR.gt(0.27).and(DNBR.lte(0.45)),3)   //Moderate Severity - Orange
  .where(DNBR.gt(0.45).and(DNBR.lte(2)),4)      //High severity - Purple 
  .remap([1,2,3,4],[1,2,3,4]);  

  //Apply focal filter
  var Kernel = ee.Kernel.square({radius:3,units:"pixels"});

  var filter_DNBR = class_DNBR.reduceNeighborhood({
    reducer: ee.Reducer.mode(),
    kernel: Kernel
  });

  //Zoom Country
  Map.centerObject(Country_select);

  //Layer to add on the map
  removelay();
  removelay();
  removelay();
  removelay();
  removelay();

  Map.addLayer(PF_Img,Viz_AG,'(SWIR-NIR-Red) prefire');
  Map.addLayer(AF_Img,Viz_AG,'(SWIR-NIR-Red) postfire');
  Map.addLayer(filter_DNBR,Viz_class,'DNBR',false);

  //Add legend on the map
  // set position of panel
  var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  });
 
  // Create legend title
  var legendTitle = ui.Label({
    value: 'Fire impact (DNBR index)',
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
 
  // Add the title to the panel
  legend.add(legendTitle);
 
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
        var colorBox = ui.Label({
          style: {
            backgroundColor: color,
            padding: '8px',
            margin: '0 0 4px 0'
          }
        });
        var description = ui.Label({
          value: name,
          style: {margin: '0 0 4px 6px'}
        });
        return ui.Panel({
          widgets: [colorBox, description],
          layout: ui.Panel.Layout.Flow('horizontal')
        });
  };
 
  //  Palette with the colors
  var palette =['#0ae042', 'fff70b', '#ffaf38', '#ff641b'];
 
  // name of the legend
  var names = ['Unburned','Low Severity','Moderate Severity', 'High Severity'];
 
  // Add color and and names
  for (var i = 0; i < 4; i++) {
    legend.add(makeRow(palette[i], names[i]));
    }  
 

  legendPanel.add(legend);
  
  
}

//*******************************summarize function
function summary(){
  
  resultsPanel.clear();
  
  var AOI = drawingTools.layers().get(0).getEeObject();
  
  var AF_Date_Start_format = processUserInput(AF_Date_Start_Input.getValue());
  var AF_Date_End_format = processUserInput(AF_Date_End_Input.getValue());
  var PF_Date_Start_format = processUserInput(PF_Date_Start_Input.getValue());
  var PF_Date_End_format = processUserInput(PF_Date_End_Input.getValue());
  
  
  
  //After fire
  var collection_AF = S2.filterDate(AF_Date_Start_format, AF_Date_End_format)
      .sort('CLOUDY_PIXEL_PERCENTAGE', false)
      .filterBounds(Country_select);
  var AF_Img = ee.Image(collection_AF.mosaic()).clip(Country_select);

  var NBR_AF = AF_Img.normalizedDifference(['B8','B12']);

  //Pre Image
  var collection_PF = S2.filterDate(PF_Date_Start_format,PF_Date_End_format).sort('CLOUDY_PIXEL_PERCENTAGE', false).filterBounds(Country_select);
  var PF_Img = ee.Image(collection_PF.mosaic()).clip(Country_select);

  var NBR_PF = PF_Img.normalizedDifference(['B8','B12']);

  //DNBR Calculation
  var DNBR = NBR_PF.subtract(NBR_AF);

  //Classification of DNBR
  var class_DNBR = DNBR
  .where(DNBR.gt(-2).and(DNBR.lte(0.12)),1)       //Unburned - Blue
  .where(DNBR.gt(0.12).and(DNBR.lte(0.27)),2)     //Low Severity - yellow
  .where(DNBR.gt(0.27).and(DNBR.lte(0.45)),3)     //Moderate Severity - Orange
  .where(DNBR.gt(0.45).and(DNBR.lte(2)),4)        //High severity - Purple 
  .remap([1,2,3,4],[1,2,3,4]);  

  //Apply focal filter
  var Kernel = ee.Kernel.square({radius:3,units:"pixels"});

  var filter_DNBR = class_DNBR.reduceNeighborhood({
    reducer: ee.Reducer.mode(),
    kernel: Kernel
  });

  
  // Clip DNBR using AOI
  var AOI_DNBR = filter_DNBR.clip(AOI).gt(1).multiply(ee.Image.pixelArea());
  
  // Get the total burned area value in square meters
  var totalBurnedArea = AOI_DNBR.reduceRegion({
    reducer: ee.Reducer.sum(),
    scale: 10, // Pixel size in meters
    maxPixels: 10000000000 
    });
  
  var burnedAreaha = totalBurnedArea.getNumber("remapped_mode").multiply(0.0001);
  
  //Mask to clip export only impacted pixels
  var mask = ee.Image(0)
              .where(filter_DNBR.gt(1),1)
              .clip(AOI);
  
  //Export DNBR of AOI to polygon
  var burnedArea_Polygon = filter_DNBR.mask(mask).reduceToVectors({
    geometry: AOI,
    scale: 20,
    geometryType: 'polygon',
    maxPixels: 10000000000,
    reducer: ee.Reducer.countEvery()
    });
    
  var burnedArea_Polygon_Chart = filter_DNBR.gt(1).selfMask().reduceToVectors({
    geometry: AOI,
    scale: 10,
    geometryType: 'polygon',
    maxPixels: 10000000000,
    reducer: ee.Reducer.countEvery()
    });

  var downloadUrl = burnedArea_Polygon.getDownloadURL({
    format: 'kml',
    filename: 'AOI polygon'
    });
  
  var label= ui.Label('Download AOI polygons'); // call ui.Label constructor to get the actual label, and give it a caption, in this case is "Download"
  label.setUrl(downloadUrl);
  label.style().set({shown: true});
  
  panel.add(label);

  Export.table.toDrive({
    collection: burnedArea_Polygon,
    description:'burnedArea_Polygon',
    fileFormat: 'SHP'
    });
    

  var chart =
    ui.Chart.image.histogram({image: DNBR.clip(burnedArea_Polygon_Chart), region: AOI, scale: 50, maxPixels:100000000000000000})
        .setSeriesNames(['DNBR'])
        .setOptions({
          title: 'AOI Impact histogram',
          hAxis: {
            title: 'DNBR',
            titleTextStyle: {italic: false, bold: true},
          },
          vAxis:
              {title: 'Count', titleTextStyle: {italic: false, bold: true}},
          colors: ['9c4f97']
        });

  // Create and add the chart to the results panel
  resultsPanel.add(chart);

  // Add burned area text to the inspector panel
  
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Calculating burned area...', {color: 'gray'}));

  burnedAreaha.evaluate(function(result) {
    inspector.clear();
    
    var burnedAreaText = ui.Label({
      value: "Burned Area: " + result.toFixed(2) + " ha",
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        margin: "10px"
      }
    });
  
   inspector.add(burnedAreaText);
  });
  
  

}

//*********************************************UI**********************************************************//

//******************PANELS
// Add main panel
var panel = ui.Panel();
panel.style().set({
  width: "300px"
});

ui.root.add(panel);

//Create a results panel
var resultsPanel = ui.Panel({
  style: {
    backgroundColor: 'white',
    border: '1px solid black',
    padding: '5px',
    width: '450px',
    position:'bottom-right'
  }
});

Map.add(resultsPanel);

//Create a legend panel
var legendPanel = ui.Panel({
  style: {
    backgroundColor: 'white',
    border: '1px solid black',
    padding: '10px',
    width: '250px',
    position:'bottom-left'
  }
});

Map.add(legendPanel);

//Define a ui.Panel to hold 
//app instructions and the geometry drawing buttons.

var controlPanel = ui.Panel({
  widgets: [
    ui.Label('Define Area of Interest (AOI)'),
    ui.Button({
      label: ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal',Color:'#C11B17'}
    }),
    ui.Button({
      label:' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal',Color:'#C11B17'}
    })
    ],
  style: {position: 'top-left'},
  layout: null,
});

Map.add(controlPanel);

//Burn area calculation panel panel
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});

Map.add(inspector);

//*********************LABELS
//Country selection dropdown list
var countrySelect = ui.Select({
  items: countryList,
  placeholder: 'Select a country',
  onChange: updateSelectedCountry,
  style: {
    height:'50px',
    width:'200px',
    fontWeight:'50px'
  }
  
});

panel.add(countrySelect);

//After fire Date inputs
panel.add(ui.Label({
  value: "Select post-fire image collection period",
  style: { fontWeight: "bold" }
}));

panel.add(ui.Label({
  value: "Start date:"
}));

panel.add(AF_Date_Start_Input);

panel.add(ui.Label({
  value: "End date:"
}));

panel.add(AF_Date_End_Input);

//Post fire Date inputs
panel.add(ui.Label({
  value: "Select pre-fire image collection period",
  style: { fontWeight: "bold" }
}));

panel.add(ui.Label({
  value: "Start date:"
}));

panel.add(PF_Date_Start_Input);

//End date label
panel.add(ui.Label({
  value: "End date:"
}));


panel.add(PF_Date_End_Input);

//Model run button
var model_run = ui.Button({
  label: "Run model",
  onClick: model, // Call the displayAFImage function
  style: {
    stretch: "horizontal",
    height:'50px',
    fontWeight:'50px',
    Color:'#C11B17'
  }
});


panel.add(model_run);

// Create AOI Impact button
var aoiImpactButton = ui.Button({
  label: "AOI Impact",
  onClick: summary,
  style: {
    stretch: "horizontal",
    height:'50px',
    fontWeight:'50px',
    Color:'#C11B17'
  }
});

panel.add(aoiImpactButton);

