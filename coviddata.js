"use strict";
// This selects the form from the html
let form = document.getElementById("inputform");
// This adds an event listener
form.addEventListener("submit", apicall);


//This function refreshes the page on a button click
function refreshPage(){
    if(confirm("Clear results?")){
      location.reload();
    }				
  }
  
function apicall(evt) {
    evt.preventDefault();
    
    // obtains the two halves of the url
    let JobTitle = document.getElementById("JobTitle").value;
    let baseUrlJobTitle = "http://api.lmiforall.org.uk/api/v1/soc/search?q=";
    // sanitizes the JobTitle
    JobTitle = JobTitle.toLowerCase();
    // removes special characters
    JobTitle = encodeURI(JobTitle);
    //This creates the url that will be used later to access the api by adding the entered query to the url below
    let jobURL = baseUrlJobTitle + JobTitle;
    let JobsURL = "http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=";
    
    //This creates a json form from the ReturnedValue to the query that we will operate on to display the values of title, description and tasks
    fetch(jobURL)
      .then((ReturnedValue) => ReturnedValue.json())
      .then((SavedJSON) => {
        console.log(SavedJSON);
        displayJobs(SavedJSON);
      });