"use strict";
/*Nathan Kier Api JS document*/
// select form
let form = document.getElementById("inputform");
// adds an event listener
form.addEventListener("submit", apicall);

// create apicall function, using single parameter evt
function apicall(evt) {
  evt.preventDefault();

  // get form selection call-type
  

  // get job type
  let job = document.getElementById("job").value;
  let baseUrljob = "https://api.coronavirus.data.gov.uk/v1/data";

  
  // sanitizes the entered job
  job = job.toLowerCase();
  // encodes the URL to remove special characters
  // https://www.w3schools.com/jsref/jsref_encodeuri.asp
  //URL is encoded
  job = encodeURI(job);


let JobssURL = baseUrljob + job;
let usersURL = "http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=";

//fetches the completed URL
fetch(JobssURL)
  .then((response) => response.json())
  .then((responeJSON) => {
    console.log(responeJSON);
    displayJobss(responeJSON);
  });
//this function is used to find and then display the jobs title, soc code, its description, the qualifications necessary and tasks that will be completed.
function displayJobss(response) {
  console.log(response);

  // select the first tempalte element. As there is only one, selecting it by
  // its TagName is a valid way
  let template = document.getElementsByTagName("template")[0];

  for (let i = 0; i < response.length; i++) {
    // select the Jobs item from the array that the API returned
    let JobsItem = response[i];
    console.log(JobsItem);

    // clones the template and its child-elements
    let Jobs = template.content.cloneNode(true);

    // add the data from the Jobs
    let JobsTheTitle = JobsItem.title;
    let JobsTheBody = JobsItem.soc;
	let JobsTheDesc = JobsItem.description;
    let JobsTheQual = JobsItem.qualifications;
	let JobsTheTask = JobsItem.tasks;
	
    // querySelector returns the FIRST element that matches
    let JobsHeader = Jobs.querySelector("span.date");
    let JobsContent = Jobs.querySelector("span.areaName");
	let JobsJDesc = Jobs.querySelector("span.areaCode")
	let JobsJQual = Jobs.querySelector("span.newCasesBySpecimenDate")
	let JobsJTask = Jobs.querySelector("span.cumCasesBySpecimenDate")
    // assigns values to the title, soc, description, qualifications and tasks
    JobsHeader.innerText = "Title: " + JobsTheTitle;
    JobsContent.innerText = JobsTheBody;
	JobsJDesc.innerText = JobsTheDesc;
	JobsJQual.innerText = JobsTheQual;
	JobsJTask.innerText = JobsTheTask;
    
	
    let identifierElement = Jobs.querySelector("span.identifier");
    identifierElement.innerText = JobsItem.identifier;

    
    let JobsButton = Jobs.querySelector("button.show_details");
    JobsButton.addEventListener("click", displayYearPay);

    // add the Jobs to the Jobslist
    let JobsListSection = document.getElementById("Jobslist");
    JobsListSection.appendChild(Jobs);
  }
}


//this function is used to find the most recent year(2019) and the salary for that year. This salary is then converted into an annual salary using small calculation.
// I chose to use 2019 as the maximum year rather than math.max() as aafter testing 17 different job types (joiner, gardener, pharmacy, mechanic, electrician, technician, etc.) i found the highest year to always be 2019.
function displayYearPay(evt) {
  //the currentTarget property gives you the element to which the event was attached
  let btn = evt.currentTarget;
  console.log(btn);

  
  let Jobs = btn.parentElement;
  console.log(Jobs);

  let identifier = Jobs.querySelector(".areaName").innerText;
  console.log(identifier);
  
  
  if (Jobs.querySelector("div.details").style.display == "") {
    
	
	
    let specificUserURL = usersURL + identifier;
    fetch(specificUserURL)
      .then((response) => response.json())
      .then((responeJSON) => {
		  
        console.log(responeJSON);
		
		
		var findRecent = responeJSON.series.filter(obj => {
		return obj.year >= 2019;
		})
		
		console.log(findRecent);
		console.log(findRecent[0]);
		let annualPayEstimate = "£" + (findRecent[0].estpay*52);
		let anum = (findRecent[0].year);
		console.log(annualPayEstimate);
		console.log(anum);
		
		Jobs.querySelector("span.estPay").innerText = annualPayEstimate;
		Jobs.querySelector("span.year").innerText = anum;
        
        
        Jobs.querySelector("div.details").style.display = "block";
        btn.innerHTML = "Details &#9650;";
      });
  } else {
    Jobs.querySelector("div.details").style.display = "";
    btn.innerHTML = "Details &#9660;";
  }
}
function clear(){

location.reload();
}
// end of file

}