const endpoint = (

    'https://api.coronavirus.data.gov.uk/v1/data?' +

    'filters=areaType=utla;areaName=East Dunbartonshire' +

    'structure={"date":"date","newCases":"newCasesByPublishDate"}'

);



const getData = async ( url ) => {


    const { data, status, statusText } = await axios.get(url, { timeout: 10000 });


    if ( status >= 400 )

        throw new Error(statusText);


    return data


};  // getData