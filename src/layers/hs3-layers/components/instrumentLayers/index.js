import { flighttrack, cpl, hiwrap } from "./helpers";

class LayerGenerator {
    constructor() {
        this.instruments = ["trackGlobalHawk", "cpl", "hiwrap", ] // add new instrument name here
        // this.globalHawk_dates = ["2012-09-07", "2012-09-12", "2012-09-20", "2012-09-23", "2012-09-27", "2012-10-06", "2012-11-06", "2013-08-01", "2013-08-08", "2013-08-14", "2013-08-16", "2013-08-20", "2013-08-21", "2013-08-25", "2013-08-30", "2013-09-04", "2013-09-05", "2013-09-08", "2013-09-16", "2013-09-17", "2013-09-19", "2013-09-20", "2013-09-26", "2013-10-31", "2013-11-01", "2014-08-27", "2014-08-29", "2014-09-03", "2014-09-06", "2014-09-12", "2014-09-15", "2014-09-17", "2014-09-19", "2014-09-23", "2014-09-29", "2014-09-30"];
        this.globalHawk_dates = ["2013-09-26", "2014-09-17", "2014-09-19", "2014-09-23", "2014-09-29", "2014-09-30"];
        this.cpl_dates = ["2012-09-06", "2014-09-18", "2014-09-22", "2014-09-28", "2014-09-30"];
        // this.hiwrap_dates = ["2013-09-25", "2014-10-15", "2014-10-16", "2014-10-17"];
        this.hiwrap_dates = ["2013-09-25", "2014-10-15"];
        // add dates when data for new instrument are available
    }

    sortedUniqueDates(date) {
        /**
        * @param {array} dates array of dates.
        */
        const unique = [...date].filter((value, index, array) => array.indexOf(value) === index);
        return unique.sort();
    }

    sortedOverlappingDates(date1, date2) {
        /**
       * @param {array} dates array of dates.
       */
       const overlappingElements = [];

       for (let i = 0; i < date1.length; i++) {
           if (date2.includes(date1[i])) {
               overlappingElements.push(date1[i]);
           }
       }
       return overlappingElements.sort();
    }

    getInstrumentsItem(date, instrumentType, index) {
        /**
        * forms a instrument meta for requested instruments in a particular date, i.e. collect the meta of data for various instruments.
        * @param {string} date - YYYY-MM-DD format. Date of the campaign.
        * @param {string} instrumentType - the name of the instrument, whose meta is needed for a particular date.
        * @param {index} number (Optional) - Index of the instrument in the list of instruments that are visualization wanted
        * @return {object} A structured instrument meta item.
        */
        switch (instrumentType) {
            case "trackGlobalHawk":
                if (!this.globalHawk_dates.includes(date)) return null;
                return flighttrack(date, index);
            case "cpl":
                if(!this.cpl_dates.includes(date)) return null;
                return cpl(date, index);
            case "hiwrap":
                if(!this.hiwrap_dates.includes(date)) return null;
                return hiwrap(date, index);
            default:
                return null
            // add case for new instrument here
        }
    }

    generateLayer() {
        /**
        * @return {object} A structured instruments layer.
        */
        // add new instrument dates here, to only get layers for the unique dates.
        return this.sortedUniqueDates([...this.globalHawk_dates, ...this.hiwrap_dates, ...this.cpl_dates]).map(date => ({
            date,
            items: this.instruments.map((instrum, index) => this.getInstrumentsItem(date, instrum, index)).filter(n => n)
        }));
    }
}

let layersGen = new LayerGenerator();
let instrumentLayers = layersGen.generateLayer();

export default instrumentLayers;
