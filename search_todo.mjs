
const clearButton = document.getElementById('clear-button');
const minNumberInput = document.getElementById("min-price");
const maxNumberInput = document.getElementById("max-price");
const minIncrementButton = document.getElementById("min-increment");
const minDecrementButton = document.getElementById("min-decrement");
const maxIncrementButton = document.getElementById("max-increment");
const maxDecrementButton = document.getElementById("max-decrement");

//Reset filters
clearButton.addEventListener('click', function(event){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {checkbox.checked = false });
    minNumberInput.value = 0;
    maxNumberInput.value = 300;
    event.preventDefault();
});


//Price set buttons
minNumberInput.addEventListener("keydown", function(event) {
    event.preventDefault();
  });

  maxNumberInput.addEventListener("keydown", function(event) {
    event.preventDefault();
  });

minIncrementButton.addEventListener("click", function(event) {
    const currentValue = parseInt(minNumberInput.value);
    minNumberInput.value = currentValue + 10;

    if (parseInt(maxNumberInput.value) < parseInt(minNumberInput.value)) {
      maxNumberInput.value = minNumberInput.value;
    }
    event.preventDefault();
});

minDecrementButton.addEventListener("click", function(event) {
    const currentValue = parseInt(minNumberInput.value);
    minNumberInput.value = currentValue - 10;

    if (parseInt(minNumberInput.value) < 0){
        minNumberInput.value = 0;
    }

    if (parseInt(maxNumberInput.value) < parseInt(minNumberInput.value)) {
      maxNumberInput.value = minNumberInput.value;
    }
    event.preventDefault();
});

maxIncrementButton.addEventListener("click", function(event) {
    const currentValue = parseInt(maxNumberInput.value);
    maxNumberInput.value = currentValue + 10;

    if (parseInt(minNumberInput.value) > parseInt(maxNumberInput.value)) {
      minNumberInput.value = maxNumberInput.value;
    }
    event.preventDefault();
});

maxDecrementButton.addEventListener("click", function(event) {
    const currentValue = parseInt(maxNumberInput.value);
    maxNumberInput.value = currentValue - 10;

    if (parseInt(maxNumberInput.value) < 0){
        maxNumberInput.value = 0;
    }

    if (parseInt(minNumberInput.value) > parseInt(maxNumberInput.value)) {
      minNumberInput.value = maxNumberInput.value;
    }
    event.preventDefault();
});


//Configure dates
var rentDateInput = document.getElementById('rent-date');
var returnDateInput = document.getElementById('return-date');

var today = new Date().toISOString().split('T')[0];
rentDateInput.value = today;

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var defaultReturnDate = tomorrow.toISOString().split('T')[0];
returnDateInput.value = defaultReturnDate;

rentDateInput.addEventListener('input', function() {
  var minDate = new Date().toISOString().split('T')[0];
  if (rentDateInput.value < minDate) {
    rentDateInput.value = minDate;
  }
  
  if (returnDateInput.value <= rentDateInput.value) {
    var nextDay = new Date(rentDateInput.value);
    nextDay.setDate(nextDay.getDate() + 1);
    returnDateInput.value = nextDay.toISOString().split('T')[0];
  }
});

returnDateInput.addEventListener('input', function() {
  if (returnDateInput.value <= rentDateInput.value) {
    var nextDay = new Date(rentDateInput.value);
    nextDay.setDate(nextDay.getDate() + 1);
    returnDateInput.value = nextDay.toISOString().split('T')[0];
  }
});

rentDateInput.addEventListener('change', function() {
  if (rentDateInput.value > returnDateInput.value) {
    var nextDay = new Date(rentDateInput.value);
    nextDay.setDate(nextDay.getDate() + 1);
    returnDateInput.value = nextDay.toISOString().split('T')[0];
  }
});


//Retrieve form data
document.querySelector('.search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  
  const searchData = {};

  for (const [name, value] of formData) {
    if (name =='carbrand' || name == 'category'){     //Array for checkbox values
      searchData[name] = [];
    } else{searchData[name] = value;}                 //For plain values
  }
  
  const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  selectedCheckboxes.forEach(function(checkbox) {
    const name = checkbox.getAttribute('name');
    const value = checkbox.getAttribute('id');
    searchData[name].push(value);
  });

//Create search/filter query string

  let categories = "";
  let carbrands = "";

  for(var key in searchData) {
    if(key=='category' && searchData[key]){
      for(var i in searchData[key]){
        if(i==0){
          categories = searchData[key][i];
        } else{ categories = categories.concat(", ", searchData[key][i]); }
      }
    }
    else if (key=='carbrand' && searchData[key]){
      for(var i in searchData[key]){
        if(i==0){
          carbrands = searchData[key][i];
        } else{ carbrands = carbrands.concat(", ", searchData[key][i]); }
      }
    }
 }

 //const stringQuery = "Selected brands: ${carbrands} \nSelected categories ${categories} \nPrice range ${searchData['min-price']} - ${searchData['max-price']}";
 const stringQuery = "Selected brands: " +carbrands+ "\nSelected categories: " +categories+ "\nPrice range: " + searchData['min-price'] + "-" + searchData['max-price'] +"\nLocation: " + searchData['location'] + "\nRent dates: " + searchData['rent-date'] +" to "+ searchData['return-date'];
 console.log(stringQuery);
  
});

