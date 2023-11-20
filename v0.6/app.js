
var data; 
var resultCount = document.getElementById("result-count");
var searchAPIURL = 'https://geo-api-1.vercel.app/api/data/search/';
var categoryAPIURL = 'https://geo-api-1.vercel.app/api/data/category/';

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
  var count = data.layer_details.length;
  var dataLayers = data.layer_details;
  var mapviewurl = 'https://search.gisdata.io/map.html?url=';
  for (var i = 0; i < count; i++) {
      results += "<div> <div class='uk-card uk-card-default uk-card-body uk-card-hover'>" + 
        "<h2 class='uk-text-break'>" + "<strong>" + dataLayers[i].LAYER + "</strong>" + "</h2>" + 
        "<div class='uk-card-badge uk-label'>" + dataLayers[i].Category + "</div>" +
        "<p class='uk-text-break'>" + "<strong>Host URL: </strong>" + "<a href='"+ dataLayers[i].HOSTURL + "'>" + dataLayers[i].HOSTURL + "</a>" + "</p>" + 
        "<p class='uk-text-break'>" + "<strong>Layer URL: </strong>" + "<a href='"+ dataLayers[i].LAYERURL + "'>" + dataLayers[i].LAYERURL + "</a>" + "</p>" + 
        "<p class='uk-text-break'>" + "<strong>Layer Type: </strong>" + dataLayers[i].TYPE + "</p>" +  
        "<a class='uk-button uk-button-secondary uk-button-small' href='"+ mapviewurl + dataLayers[i].LAYERURL +"' target='_blank'>View Layer</a>" +
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
      var rendata = data.records;
      var results = "";
      var count = rendata.length;
      var mapviewurl = 'https://search.gisdata.io/map.html?url=';
      for (var i = 0; i < count; i++) {
        results += "<div> <div class='uk-card uk-card-default uk-card-body uk-card-hover'>" + 
          "<h2 class='uk-text-break'>" + "<strong>" + rendata[i].LAYER + "</strong>" + "</h2>" + 
          "<div class='uk-card-badge uk-label'>" + rendata[i].Category + "</div>" +
          "<p class='uk-text-break'>" + "<strong>Host URL: </strong>" + "<a href='"+ rendata[i].HOSTURL + "'>" + rendata[i].HOSTURL + "</a>" + "</p>" + 
          "<p class='uk-text-break'>" + "<strong>Layer URL: </strong>" + "<a href='"+ rendata[i].LAYERURL + "'>" + rendata[i].LAYERURL + "</a>" + "</p>" + 
          "<p class='uk-text-break'>" + "<strong>Layer Type: </strong>" + rendata[i].TYPE + "</p>" +  
          "<a class='uk-button uk-button-secondary uk-button-small' href='"+ mapviewurl + rendata[i].LAYERURL +"' target='_blank'>View Layer</a>" +
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
