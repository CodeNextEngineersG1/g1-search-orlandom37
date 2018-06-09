//var database = [
//   {
//     Name: "Oakland Athletics",
//     Picture: "img/Oakland.png",
//     Ballpark: "Oakland–Alameda County Coliseum ",
//     Established: "1901",
//     Owner: "John J. Fisher",
//     WorldSeries: "9"
//   },{
//     Name: "San Francisco Giants",
//     Picture: "img/SF.png",
//     Ballpark: "AT&T Park",
//     Established: "1883",
//     Owner: "San Francisco Baseball Associates LLC",
//     WorldSeries: "8"
//   },{
//     Name: "Los Angeles Dodgers",
//     Picture: "img/LA.png",
//     Ballpark: "Dodger Stadium",
//     Established: "1883",
//     Owner: "Guggenheim Baseball Management",
//     WorldSeries: "6"
//   },{
//     Name: "Los Angeles Angels of Anaheim",
//     Picture: "img/LAA.png",
//     Ballpark: "Angel Stadium",
//     Established: "1961",
//     Owner: "Arte Moreno",
//     WorldSeries: "1"
//   },{
//     Name: "San Diego Padres",
//     Picture: "img/SD.png",
//     Ballpark: "Petco Park",
//     Established: "1969",
//     Owner: "Ron Fowler",
//     WorldSeries: "0"
//   }
//];
var database;
var searchButton = document.getElementById("search-button");
var autoSuggestions = document.getElementById("auto-suggestions");
var display = document.getElementById("display");
var searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", getAutoSuggestions);
searchBar.addEventListener("keypress",checkKey);
searchButton.addEventListener("click",processInput);

loadData();

function loadData() {
  searchBar.style.display = "none";
  searchButton.style.display = "none";
  fetch("database.json")
  .then(function(response) {
    response.json()
    .then(function(jsonObj) {
      database = jsonObj;
      console.log("Database Loaded Successfully");
    }).then(function() {
      searchBar.style.display = "block";
      searchButton.style.display = "block";
    })
  });
}


function checkKey(e){
  var key = e.which || e.keyCode;
  if(key == 13) {
    //console.log(“You pressed enter!”);
      processInput();
}
}
function processInput(){
 let cleanedInput = searchBar.value.toLowerCase().trim();
 document.getElementById("auto-suggestions").innerHTML = "";
 document.getElementById("auto-suggestions").style.display = "none";
 document.getElementById("search-bar").value = "";

    let databaseRecord = getRecord(cleanedInput);
    if(databaseRecord != null){
    displayRecord(databaseRecord);
  }else{
    displaySuggestions(getSuggestions(cleanedInput));
  }
}

function getRecord(cleanedInput) {
  for(let i = 0; i < database.length; i++){
    let cleanedRecordName = database[i].Name.toLowerCase().trim();
    if(cleanedInput==cleanedRecordName){
      return database[i];
    }
  }
  return null;
}

function displayRecord(databaseRecord) {

var recordName = document.createElement("h1");
recordName.innerHTML = databaseRecord.Name;
var recordPicture = document.createElement("img");
recordPicture.src = databaseRecord.Picture;
var recordBallpark = document.createElement("h3");
recordBallpark.innerHTML = "<b>Ballpark:</b> " + databaseRecord.Ballpark;
var recordEstablished = document.createElement("h3");
recordEstablished.innerHTML =  "<b>Established:</b> " +  databaseRecord.Established;
var recordOwner = document.createElement("h3");
recordOwner.innerHTML =  "<b>Owner:</b> " + databaseRecord.Owner;
var recordWorldSeries= document.createElement("h3");
recordWorldSeries.innerHTML =  "<b>WorldSeries:</b> " + databaseRecord.WorldSeries;
display.appendChild(recordName);
display.appendChild(recordPicture);
display.appendChild(recordBallpark);
display.appendChild(recordEstablished);
display.appendChild(recordOwner);
display.appendChild(recordWorldSeries);
}
function getAutoSuggestions(){
  let cleanedInput = searchBar.value.toLowerCase().trim();
  document.getElementById("auto-suggestions").innerHTML= "";
  for(let i = 0; i < database.length; i++){
  let cleanedRecordName = database[i].Name.toLowerCase().trim();
  if(cleanedRecordName.startsWith(cleanedInput) && cleanedRecordName.length > 0){
  let matching = cleanedRecordName.substring(0, searchBar.value.length);
  let remaining = cleanedRecordName.substring(searchBar.value.length);
  let result = matching + "<b>" + remaining + "<b>";
  let button = document.createElement("button");
  button.innerHTML = result;
  button.style.display = "block";
  button.className = "suggestions";
  activateSuggestionButton(button, database[i]);
  autoSuggestions.appendChild(button);
  }
 }
if(autoSuggestions.hasChildNodes()){
  autoSuggestions.style.display = "block";
}else{
  autoSuggestions.style.display = "none";
}
}

function activateSuggestionButton(button, record) {
  button.addEventListener("click", function() {
    displayRecord(record);
    document.getElementById("autoSuggestions").innerHTML = "";
    document.getElementById("autoSuggestions").style.display = "none";
    document.getElementById("searchBar").value = "";
  });
}

function getSuggestions(cleanedInput) {
  let suggestions = [i];
  for(let i = 0; i < database.length; i++){
  let cleanedRecordName = database[i].Name.toLowerCase().trim();
  if(cleanedRecordName.startsWith(cleanedInput)&& cleanedInput.length > 0){
  suggestions.push(database[i]);
  }
  }
  return suggestions;
}

function displaySuggestions(suggestions){
document.getElementById("display").innerHTML = "";
let paragraph = document.createElement("p");
if(suggestion.length > 0){
paragraph.innerHTML = "Did you mean:";
display.appendChild(paragraph);
for(let i = 0; i < suggestions.length; i++){
let button = document.createElement("button");
button.innerHTML = suggestions[i].name;
button.style.display = "block";
button.className = "suggestion";
activateSuggestionButton("button", suggestions[i]);
document.getElementById("display").appendChild(button);
}
  }else{
   paragraph.innerHTML = "No results!";
   display.appendChild(paragraph);
}
}
