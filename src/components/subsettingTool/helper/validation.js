import moment from "moment";

export const validationCheck = (start, end, validationMessageSet) => {
    // check if the start end is in correct format
    if(!start) {
        validationMessageSet("Start date is empty.");
        return false;
    }
    if(!end) {
        validationMessageSet("End date is empty.");
        return false;
    }
    if(!moment(start, "YYYY-MM-DD HH:mm:ss UTC", true).isValid()) {
        validationMessageSet("Start date time format is wrong. (format: YYYY-MM-DD HH:mm:ss UTC)");
        return false;
    }
    if(!moment(end, "YYYY-MM-DD HH:mm:ss UTC", true).isValid()) {
        validationMessageSet("End date time format is wrong. (format: YYYY-MM-DD HH:mm:ss UTC)");
        return false;
    }
    // check, end should be after start
    if((moment(start).isAfter(end))){
        validationMessageSet("End time should be greater than start time.");
        return false;
    }
    //check if the subsetting is for more than 10 seconds.
    if(moment(end).diff(moment(start), "seconds") < 10){
        validationMessageSet("A valid subset should be greater than 10 seconds.");
        return false;
    }
    return true;
}