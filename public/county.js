

function storeVar(area) {
  var county = area.getAttribute('value');
  document.getElementById("searchbar").value = county;
  console.log(county);



var x = document.getElementById("searchbar").value;

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
  
  const getPaginatedData = async ( filters, structure ) => {
      const
          endpoint = 'https://api.coronavirus.data.gov.uk/v1/data',
          apiParams = {
              filters: filters.join(";"),
              structure: JSON.stringify(structure)
          },
          result = [];
      let
          nextPage = null,
          currentPage = 1;
      do {
          const { data, status, statusText } = await axios.get(endpoint, {
              params: {
                  ...apiParams,
                  page: currentPage
              },
              timeout: 10000
          });
          if ( status >= 400 )
              throw Error(statusText);
          if ( "pagination" in data )
              nextPage = data.pagination.next || null;
          result.push(...data.data);  
          currentPage ++;
      } while ( nextPage );
      return result;
  };  // getData

  const main = async () => {
      const
          filters = [
              `areaType=utla;areaName=` + x +'&',
          ],
          structure = {
              date: "date",
              name: "areaName",  
              Vaccinated: "cumPeopleVaccinatedBoosterDoseByPublishDate",
              new: "newCasesBySpecimenDate",    
              cumulative: "cumCasesBySpecimenDate"
          };
      const results = await getPaginatedData(filters, structure);
      console.log(`Length: ${results.length}`)
      console.log('Data (first 7 items):', results.slice(0, 7));
      var sliceinfo = results.slice(0, 1)
      
      let paragraphvariable = document.querySelector("p1");
      
      var last7daysinfoinstringform = JSON.stringify(sliceinfo) 
      console.log(sliceinfo[0].date);
      console.log(sliceinfo[0].name);
      console.log(sliceinfo[0].Vaccinated);
      console.log(sliceinfo[0].new);
      console.log(sliceinfo[0].cumulative);



      document.getElementById("date").innerHTML = (sliceinfo[0].date);
      document.getElementById("name").innerHTML = (sliceinfo[0].name);
      document.getElementById("code").innerHTML = (sliceinfo[0].Vaccinated);
      document.getElementById("new").innerHTML = (sliceinfo[0].new);
      document.getElementById("cumulative").innerHTML = (sliceinfo[0].cumulative);

     // Object.assign(document.querySelector('paragraphvariable.innerText').style, {
       // position: 'fixed',
        //top: 0,
       // right: 0,
        //bottom: 0,
        //left: 0,
        //background: 'blue'
    //})
  };  // main

  main().catch(err => {
      console.error(err);
      process.exitCode = 1;

      
  });

}

