let coordType = "Time";
let dataType = "Eq";
let params = "None";

export function requestBodyLIP(datetime="2017-03-21", pagesize="200", pageno="1", density="1") {
/** 
* LIP data handler
* @summary Takes the necessary common data from the input fields and fills some of the instrument specific fields, needed for the FEGS data fetch.
* @param {string} datetime - The date time of the data collected by FEGS instrument
* @param {number} pagesize- The data elements per page.
* @param {number} pageno - The page from which data is to be fetched.
* @param {number} density - The amount of data that is sampled out of the page. 100%, 50% or 25%
* @return {object} with keys data and labels
*/

  let body = {
              "data": {
                  "type": "data_pre_process_request",
                  "attributes": {
                          "instrument_type" : "LIP",
                          "datetime" : datetime,
                          "coord_type" : coordType,
                          "data_type" : dataType,
                          "params" : params,
                          "pageno" : String(pageno),
                          "pagesize" : String(pagesize),
                          "density": String(density),
                      }
                  }
              }
  return body;
}

export function dataExtractorLIP(rawData) {
  let error = false, data = [], labels= [];
  if(rawData && rawData["data"] && rawData["data"]["errors"]) {
    error = true;
  } else {
    let preprocessedData = JSON.parse(rawData["data"]["data"]["attributes"]["data"])
    data = {
        labels: preprocessedData["index"],
        datasets: [
          {
            label: preprocessedData["columns"][0],
            data: preprocessedData["data"],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };
    labels = {
        xaxis: coordType,
        yaxis: dataType
    }
  }
  return {
      data, labels, error
  }
}