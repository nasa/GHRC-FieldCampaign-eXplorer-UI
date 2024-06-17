export class StepUp {
    constructor() {
        this.step = 1000;
    }

    filter(dataset) {
        // select only one data from each step
        // do know how long the given dataset is
        // ASSUMPTION: the given dataset is sorted

        // get the first element
        let first = dataset.at(0);
        // get the last element
        let last = dataset.at(-1);
        // represent them in terms of 1000th
        let repFirst = this.steppedRep(first);
        let repLast = this.steppedRep(last);
        // so, we now know how many steps (m) there are
        let m = ((repLast - repFirst) / this.step) + 1;
        // And the final result should have m distinct values, if not for edge condition

        let result = []; // array to store rep. values.
        // for each value in the dataset (n),
        dataset.forEach((data) => {
            let resultPosition = result.length; // position of new rep. value

            if(result.length > m) {
                return;
            }

            if (this.steppedRep(data) > (resultPosition + 1)*1000) {
                // edge case: if the rad range value was not available for the given step?
                                // the placement on the result will be unfullfilled
                                // solution: // if current_val_representation > next unfullfilled value representation
                                                // store null for the next unfullfilled value representation.
                                            // filter null value at the end
                result.push(null);
                return;
            }

            // check if the step representation is fulfilled ?? when is it fullfilled?
                // - when the position for the result is done.
                // - when the 
            if (!result[resultPosition] && (((result.length + 1) * 1000) === this.steppedRep(data))) {
                // if not, add it to step representation
                result.push(data); 
                // the next unfulfilled representation is "current length of result"
                // length of result should not exceed m
            } else {
                // if yes, skip the value 
            }
            // O(n)
        });
        return result.filter(x => x);
    }

    steppedRep(data) {
        // represent the data as per the step
        // eg. 1023.12312321 will be represented as 1000
        return Math.trunc(data / this.step) * this.step;
    }
}