


function apicall() {
  
    var x = document.getElementById("myText").value;
    var poot = document.getElementById('Poutine');
    



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
                code: "areaCode",
                new: "newCasesBySpecimenDate",    
                cumulative: "cumCasesBySpecimenDate"
            };
        const results = await getPaginatedData(filters, structure);
        console.log(`Length: ${results.length}`)
        console.log('Data (first 7 items):', results.slice(0, 7));
        var Dumbo = results.slice(0, 7)
        let Poutine = document.querySelector("p1");
        var jerry = JSON.stringify(Dumbo) 
        Poutine.innerText = x +"health data is shown as "+ jerry;
    };  // main
    
    main().catch(err => {
        console.error(err);
        process.exitCode = 1;
    });
  
  }