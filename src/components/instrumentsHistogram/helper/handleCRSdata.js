let coordType = "time";
let dataType = "ref";

export function requestBodyCRS(datetime="2017-05-17", params="1011.825", pagesize="200", pageno="1", density="1") {
    /**
    * CRS data handler
    * @summary Takes the necessary common data from the input fields and fills some of the instrument specific fields, needed for the CRS data fetch.
    * @param {string} datetime - The date time of the data collected by CRS instrument
    * @param {number} pagesize- The data elements per page.
    * @param {number} pageno - The page from which data is to be fetched.
    * @param {number} density - The amount of data that is sampled out of the page. 100%, 50% or 25%
    * @return {object} with keys data and labels
    */
    let body = {
        "data": {
            "type": "data_pre_process_request",
            "attributes": {
                    "instrument_type" : "CRS",
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

export function dataExtractorCRS(rawData) {
    let error = false, data = [], labels= [];
    if(rawData && rawData["data"] && rawData["data"]["errors"]) {
        error = true;
    } else {
        let rawDatawNull = rawData["data"]["data"]["attributes"]["data"].replace(/\bNaN\b/g, "null")
        let preprocessedData = JSON.parse(rawDatawNull)
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

export function requestBodyCRSparams(datetime="2017-05-17") {
 /** 
    * CRS param handler
    * @summary fetches coord value, needed for the CRS data fetch.
    * @param {string} datetime - The date time of the data collected by CRS instruments
    * @return {object} with keys data and labels
    */
    let coordType = "range";
    let body = {
                "data": {
                    "type": "data_pre_process_request",
                    "attributes": {
                            "instrument_type" : "CRS",
                            "datetime" : datetime,
                            "coord_type" : coordType,
                            "data_type" : "",
                            "params" : "None",
                            "pageno" : "None",
                            "pagesize" : "None",
                            "density": "None",
                        }
                    }
                }
    return body;
}

export function dataExtractorCRSparams(rawData) {
    let error = false, params = [];
    if(rawData.data.errors) {
        error = true;
    } else {
        let preprocessedData = JSON.parse(rawData["data"]["data"]["attributes"]["data"])
        params = preprocessedData["coordinate_value"];
    }
    return {
        params: params.filter(onlyUnique),
        error
    }
}

// utils

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}