let coordType = "Second";
let dataType = "ATB_1064";

export function requestBodyCPL(datetime="2017-04-27", params="0", pagesize="200", pageno="1", density="1") {
    /**
    * CPL data handler
    * @summary Takes the necessary common data from the input fields and fills some of the instrument specific fields, needed for the CPL data fetch.
    * @param {string} datetime - The date time of the data collected by CPL instrument
    * @param {number} pagesize- The data elements per page.
    * @param {number} pageno - The page from which data is to be fetched.
    * @param {number} density - The amount of data that is sampled out of the page. 100%, 50% or 25%
    * @return {object} with keys data and labels
    */
    let body = {
                "data": {
                    "type": "data_pre_process_request",
                    "attributes": {
                            "instrument_type" : "CPL",
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

export function dataExtractorCPL(rawData) {
    let error = false, data = [], labels= [];
    if(rawData && rawData["data"] && rawData["data"]["errors"]) {
        error = true;
    } else {
        let rawDatawNull = rawData["data"]["data"]["attributes"]["data"].replace(/\bInfinity\b/g, "null")
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

export function requestBodyCPLparams(datetime="2017-04-27") {
    /** 
    * CPL param handler
    * @summary fetches coord value, needed for the CPL data fetch.
    * @param {string} datetime - The date time of the data collected by CPL instruments
    * @return {object} with keys data and labels
    */
    let coordType = "Second";
    let body = {
                "data": {
                    "type": "data_pre_process_request",
                    "attributes": {
                            "instrument_type" : "CPL",
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

export function dataExtractorCPLparams(rawData) {
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