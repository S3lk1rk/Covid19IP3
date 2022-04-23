function darkMode() {                                                           //dark mode function for map page
    var element = document.body;                                                //sets varaible element to the body
    element.classList.toggle("dark-mode1");                                     //toggles dark mode class
};

function darkModeAbout() {                                                      //dark mode function
    var element = document.body;                                                //sets varaible element to the body
    element.classList.toggle("dark-mode2");                                     //toggles dark mode class
};


function storeVar(area) {                                                       //function to store varaibles
  var county = area.getAttribute('value');                                      //sets varaible county to the value of the area
  document.getElementById("searchbar").value = county;                          //sets the value of searchbar to the value of county
  console.log(county);                                                          //prints county to console



var x = document.getElementById("searchbar").value;                             //sets varaible x to the value of searchbar

  /**
   * Extracts paginated data by requesting all of the pages
   * and combining the results.
   * @param filters { Array<string> }                                           
   *          API filters. See the API documentations for additional
   *          information.
   * @param structure { Object<string, any> }
   *          Structure parameter. See the API documentations for
   *          additional information.
   * @returns {Promise<Array<any>>}
   *          Comprehensive list of dictionaries containing all the data for
   *          the given ``filters`` and ``structure``.
   */
  
  const getPaginatedData = async ( filters, structure ) => {                    //declares function getPaginatedData
      const
          endpoint = 'https://api.coronavirus.data.gov.uk/v1/data',             //declares endpoint
          apiParams = {                                                         //declares apiParams
              filters: filters.join(";"),
              structure: JSON.stringify(structure)
          },
          result = [];
      let                                                                       //declares varaibles
          nextPage = null,      
          currentPage = 1;
      do {
          const { data, status, statusText } = await axios.get(endpoint, {      //sets varaibles to the data, status and statusText of axios.get
              params: {                                                         //sets params to the apiParams
                  ...apiParams,
                  page: currentPage
              },
              timeout: 10000                                                    //sets timeout to 10 seconds
          });
          if ( status >= 400 )                                                  //if status is greater than or equal to 400
              throw Error(statusText);                                          //throw error
          if ( "pagination" in data )                                           //if pagination in data
              nextPage = data.pagination.next || null;                          //set nextPage to the value of data.pagination.next or null
          result.push(...data.data);                                            //push data.data to result
          currentPage ++;                                                       //add 1 to currentPage
      } while ( nextPage );                                                    
      return result;                                                            //return result
  };  // getData

  const main = async () => {                                                    //declares function main
      const
          filters = [                                                           //declares filters         
              `areaType=utla;areaName=` + x +'&',                               
          ],
          structure = {                                                         //declares structure for api call
              Date: "date",
              Name: "areaName",  
              Vaccinated: "cumPeopleVaccinatedFirstDoseByPublishDate",
              Vaccinatedtot: "cumPeopleVaccinatedSecondDoseByPublishDate",
              New: "newCasesBySpecimenDate",    
              Cumulative: "cumCasesBySpecimenDate",
              Deaths: "cumDeaths28DaysByDeathDate"
          };
      const results = await getPaginatedData(filters, structure);               //sets varaible results to the value of getPaginatedData
      console.log(`Length: ${results.length}`)                                  
      console.log('Data (first 7 items):', results.slice(0, 7));
      var sliceinfo = results.slice(0, 1)                                       
          
      let paragraphvariable = document.querySelector("p1");                     
      
      var last7daysinfoinstringform = JSON.stringify(sliceinfo) 
      console.log(sliceinfo[0].Date);
      console.log(sliceinfo[0].Name);
      console.log(sliceinfo[0].Vaccinated);
      console.log(sliceinfo[0].Vaccinatedtot);
      console.log(sliceinfo[0].New);   
      console.log(sliceinfo[0].Cumulative);
      console.log(sliceinfo[0].Deaths);



      document.getElementById("date").innerHTML = (sliceinfo[0].Date);                                  //sets the innerHTML of date to the value of sliceinfo[0].Date
      document.getElementById("name").innerHTML = (sliceinfo[0].Name);                                  //sets the innerHTML of name to the value of sliceinfo[0].Name
      document.getElementById("vaccinated").innerHTML = (sliceinfo[0].Vaccinated);                      //sets the innerHTML of vaccinated to the value of sliceinfo[0].Vaccinated
      document.getElementById("vaccinatedtot").innerHTML = (sliceinfo[0].Vaccinatedtot);                //sets the innerHTML of vaccinatedtot to the value of sliceinfo[0].Vaccinatedtot
      document.getElementById("new").innerHTML = (sliceinfo[0].New);                                    //sets the innerHTML of new to the value of sliceinfo[0].New
      document.getElementById("cumulative").innerHTML = (sliceinfo[0].Cumulative);                      //sets the innerHTML of cumulative to the value of sliceinfo[0].Cumulative
      document.getElementById("deaths").innerHTML = (sliceinfo[0].Deaths);                              //sets the innerHTML of deaths to the value of sliceinfo[0].Deaths

     // Object.assign(document.querySelector('paragraphvariable.innerText').style, {
       // position: 'fixed',
        //top: 0,
       // right: 0,
        //bottom: 0,
        //left: 0,
        //background: 'blue'
    //})
  };  // main

  main().catch(err => {                                                                 //catches error
      console.error(err);
      process.exitCode = 1;                                                             //if there is an error, set process.exitCode to 1

      
  });

}

function contactForm() {                                                                //function for contact form
                                                                                        //imports data from the html form as varaibles 
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

                                                                                        //prints each variable to the console with some text saying what each value is
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Subject" + subject);
    console.log("Message: " + message);
}