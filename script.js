var database = [
  {
    Name: "Oakland Athletics",
    Ballpark: "Oakland–Alameda County Coliseum ",
    Established: "1901",
    Owner: "John J. Fisher",
    WorldSeries: "9"
  },{
    Name: "San Francisco Giants",
    Ballpark: "AT&T Park",
    Established: "1883",
    Owner: "San Francisco Baseball Associates LLC",
    WorldSeries: "8"
  },{
    Name: "Los Angeles Dodgers",
    Ballpark: "Dodger Stadium",
    Established: "1883",
    Owner: "Guggenheim Baseball Management",
    WorldSeries: "6"
  },{
    Name: "Los Angeles Angels of Anaheim",
    Ballpark: "Angel Stadium",
    Established: "1961",
    Owner: "Arte Moreno",
    WorldSeries: "1"
  },{
    Name: "San Diego Padres",
    Ballpark: "Petco Park",
    Established: "1969",
    Owner: "Ron Fowler",
    WorldSeries: "0"
  }
];
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var autoSuggestions = documnet.getElementById("auto-suggestions");
var display = document.getElementById("display");

searchBar.addeventlistener("keypress",checkKey);
searchButton.addeventlistener("click",processInput);

function checkKey(e){
  var key = e.which || e.keyCode;
  if(key == 13) {
    //console.log(“You pressed enter!”);
      processInput();
}

function processInput(){

}

function getRecord(cleanedInput) {
  for(let i = 0: i < database.length; i++){
    let cleanedRecordName = database[i].Name.toLowerCase().trim();
    if(cleanedInput==cleanedProjectRecordName){
      return database[i];
    }
  }
  return null;
}
