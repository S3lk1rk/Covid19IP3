


function apicall() {
  
  var x = document.getElementById("myText").value;





const endpoint = (

    'https://api.coronavirus.data.gov.uk/v1/data?' +

    'filters=areaType=utla;areaName=' + x +'&' +

    'structure={    "date":"date","areaName":"areaName","areaCode":"areaCode","newCasesByPublishDate": "newCasesByPublishDate","cumCasesByPublishDate": "cumCasesByPublishDate","newDeaths28DaysByPublishDate": "newDeaths28DaysByPublishDate","cumDeaths28DaysByPublishDate": "cumDeaths28DaysByPublishDate"}'

);



const getData = async ( url ) => {


    const { data, status, statusText } = await axios.get(url, { timeout: 10000 });


    if ( status >= 400 )

        throw new Error(statusText);


    return data


};  // getData



const main = async () => {


    const result = await getData(endpoint);


    console.log(result);


};  // main



main().catch(err => {

    console.error(err);

    process.exitCode = 1;

});

}