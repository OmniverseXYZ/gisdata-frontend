
var data; 
var resultCount = document.getElementById("result-count");
var searchAPIURL = 'https://gisapi.io/api/data/search/';
var categoryAPIURL = 'https://gisapi.io/api/data/category/';


function search() {
  var inputIds = ["search-input-1", "search-input-2", "search-input-3"];
  var query = "";
  
  for (var i = 0; i < inputIds.length; i++) {
    var inputValue = document.getElementById(inputIds[i]).value;
    if (inputValue) {
      query = inputValue;
      break;
    }
  }
  console.log(query);
  var querysearchAPIURL = searchAPIURL + query;
  console.log(querysearchAPIURL);
  fetch(querysearchAPIURL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    renderData(data);
  })
  .catch(error => {
    console.error("Error Fetching Data: ", error);
    resultsInfo = "<div class='uk-alert-danger' uk-alert>" + 
        "<a class='uk-alert-close' uk-close></a>" + 
        "<p> Sorry there are no results for " + "<strong>" + query + 
        "</strong> in the indexed data right now. Please <a href='https://forms.gle/NmaDyxNPkn9pCRLD6'>contact me</a> if you believe this query should return data in the future.</p></div>";
        resultCount.innerHTML = resultsInfo;
  });
};

function renderData(data) {
  console.log("renderData: ", data )
  var results = '';
  var count = data.new_layer_details.length;
  var dataLayers = data.new_layer_details;
  var mapviewurl = 'https://search.gisdata.io/map.html?url=';
  for (var i = 0; i < count; i++) {
      results += "<div> <div class='uk-card uk-card-default uk-card-body uk-card-hover'>" + 
        "<h2 class='uk-text-break'>" + "<strong>" + dataLayers[i].LAYER + "</strong>" + "</h2>" + 
        "<div class='uk-card-badge uk-label'>" + dataLayers[i].CATEGORY + "</div>" +

        "<div class='uk-flex uk-flex-center'>" + 
        "<div class='uk-width-1-2 uk-margin-left'>" +
        "<a class='uk-button uk-button-secondary uk-button-small' href='"+ mapviewurl + dataLayers[i].URL + 
        "' target='_blank' uk-tooltip='EXPERIMENTAL. Works for Feature Layers, NOT Raster or Image Layers yet.'>View Layer</a> </div>" +
        "<div>" +
        "<p>" + dataLayers[i].TYPE + "</p> </div> </div>" +
        
        
        
        "<ul uk-accordion='multiple: true'>" +

        "<li class='uk-open'>" + "<a class='uk-accordion-title' href><strong>Layer URL: </strong></a>" + "<div class='uk-accordion-content'>" +
        "<p class='uk-text-break'>" + "<a href='"+ dataLayers[i].URL + "'>" + dataLayers[i].URL + "</a>" + "</p>" + 
        "</div> </li>" +

        "<li>" + "<a class='uk-accordion-title' href><strong>Host URL: </strong></a>" + "<div class='uk-accordion-content'>" +
        "<p class='uk-text-break'>" + "<a href='"+ dataLayers[i].HOSTURL + "'>" + dataLayers[i].HOSTURL + "</a>" + "</p>" + 
        "</div> </li>" +

        "<li>" + "<a class='uk-accordion-title' href><strong>Layer Fields: </strong></a>" + "<div class='uk-accordion-content'>" +
        "<p class='uk-text-break'>" + dataLayers[i].FIELDS + "</p>" + 
        "</div> </li>" +

        "<li>" + "<a class='uk-accordion-title' href><strong>Layer CRS: </strong></a>" + "<div class='uk-accordion-content'>" +
        "<p class='uk-text-break'>" + dataLayers[i].CRS + "</p>" + 
        "</div> </li>" +

        "<li>" + "<a class='uk-accordion-title' href><strong>Layer Extent: </strong></a>" + "<div class='uk-accordion-content'>" +
        "<p class='uk-text-break'>" + dataLayers[i].EXTENT + "</p>" + 
        "</div> </li>" +

        "</ul>" +
      "</div> </div>";

      
  }

  // Create the results alerts based on the amount of results
  var resultsInfo = '';
  if (count !=0) {
      resultsInfo = "<div class='uk-alert-success' uk-alert>" + 
      "<a class='uk-alert-close' uk-close></a>" + 
      "<p>There are " + "<strong>" + count + 
      "</strong> results for your search.</p></div>"
  }
  resultCount.innerHTML = resultsInfo;

  document.getElementById("results-container").innerHTML = results;
};

// Function to filter data by category and display the results
function filterByCategory(category) {
    const resultsContainer = document.getElementById('results-container'); // Assuming there's a container to display results
    resultsContainer.innerHTML = ''; // Clear previous results
    var reqcategoryAPIURL = categoryAPIURL + category;

    fetch(reqcategoryAPIURL)
    .then(response => response.json())
    .then(data => {
      console.log(data.records);
      var dataLayers = data.records;
      var results = "";
      var count = dataLayers.length;
      var mapviewurl = 'https://search.gisdata.io/map.html?url=';
      for (var i = 0; i < count; i++) {
        results += "<div> <div class='uk-card uk-card-default uk-card-body uk-card-hover'>" + 
        "<h2 class='uk-text-break'>" + "<strong>" + dataLayers[i].LAYER + "</strong>" + "</h2>" + 
        "<div class='uk-card-badge uk-label'>" + dataLayers[i].CATEGORY + "</div>" +

        "<div class='uk-flex uk-flex-center'>" + 
        "<div class='uk-width-1-2 uk-margin-left'>" +
        "<a class='uk-button uk-button-secondary uk-button-small' href='"+ mapviewurl + dataLayers[i].URL + 
        "' target='_blank' uk-tooltip='EXPERIMENTAL. Works for Feature Layers, NOT Raster or Image Layers yet.'>View Layer</a> </div>" +
        "<div>" +
        "<p>" + dataLayers[i].TYPE + "</p> </div> </div>" +
        
        
        
        "<ul uk-accordion='multiple: true'>" +

        "<li class='uk-open'>" + "<a class='uk-accordion-title' href><strong>Layer URL: </strong></a>" + "<div class='uk-accordion-content'>" +
        "<p class='uk-text-break'>" + "<a href='"+ dataLayers[i].URL + "'>" + dataLayers[i].URL + "</a>" + "</p>" + 
        "</div> </li>" +

        "<li>" + "<a class='uk-accordion-title' href><strong>Host URL: </strong></a>" + "<div class='uk-accordion-content'>" +
        "<p class='uk-text-break'>" + "<a href='"+ dataLayers[i].HOSTURL + "'>" + dataLayers[i].HOSTURL + "</a>" + "</p>" + 
        "</div> </li>" +

        "<li>" + "<a class='uk-accordion-title' href><strong>Layer Fields: </strong></a>" + "<div class='uk-accordion-content'>" +
        "<p class='uk-text-break'>" + dataLayers[i].FIELDS + "</p>" + 
        "</div> </li>" +

        "<li>" + "<a class='uk-accordion-title' href><strong>Layer CRS: </strong></a>" + "<div class='uk-accordion-content'>" +
        "<p class='uk-text-break'>" + dataLayers[i].CRS + "</p>" + 
        "</div> </li>" +

        "<li>" + "<a class='uk-accordion-title' href><strong>Layer Extent: </strong></a>" + "<div class='uk-accordion-content'>" +
        "<p class='uk-text-break'>" + dataLayers[i].EXTENT + "</p>" + 
        "</div> </li>" +

        "</ul>" +
      "</div> </div>";
      }
      if (count != 0) {
        resultsInfo = "<div class='uk-alert-success' uk-alert>" + 
        "<a class='uk-alert-close' uk-close></a>" + 
        "<p>There are " + "<strong>" + count + 
        "</strong> results for <strong>" + category + "</strong></p></div>"

      }
      resultCount.innerHTML = resultsInfo;
      //
      document.getElementById("results-container").innerHTML = results;
    })
    .catch(error => {
      console.error("Error Fetching Data: ", error);
      resultsInfo = "<div class='uk-alert-danger' uk-alert>" + 
        "<a class='uk-alert-close' uk-close></a>" + 
        "<p> Sorry there are no results for " + "<strong>" + category + 
        "</strong> in the indexed data right now. Please <a href='https://forms.gle/NmaDyxNPkn9pCRLD6'>contact me</a> if you believe this query should return data in the future.</p></div>";
        resultCount.innerHTML = resultsInfo;
    });
  
};

// Attach event listeners to category links
var categoryLinks = document.querySelectorAll('.uk-nav.uk-navbar-dropdown-nav li a.selector');
categoryLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        filterByCategory(e.target.innerText);
    });
});
