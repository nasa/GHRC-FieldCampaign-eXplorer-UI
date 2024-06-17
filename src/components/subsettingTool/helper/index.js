import moment from "moment/moment";
import {outputSubsetsBucket} from "../../../config";
import { validationCheck } from './validation';
import tokenGenerator from "./tokenGenerator";
import Jsona from 'jsona';

const dataFormatter = new Jsona();

function bodyForPost(start, end, wsTokenId) {
    /**
     * Take in start and end datetime.
     * generate a random 'dir2' (inside subset dir inside bucket)
     */
    const date = start ? moment(start).utc().format('YYYY-MM-DD') : "";
    const startDateTime = start ? moment(start).utc().format('YYYY-MM-DD HH:mm:ss') + " UTC" : "";
    const endDateTime = end ? moment(end).utc().format('YYYY-MM-DD HH:mm:ss') + " UTC" : "";
    const outputbucket = outputSubsetsBucket;
    const dir1 = "subsets";
    const dir2 = `subset-${wsTokenId}`; // unique dir, where subsets sits
    const body =  {
        "type": "subset_trigger_request",
        "subDir": `https://${outputbucket}.s3.amazonaws.com/${dir1}/${dir2}/`,
        "date": date,
        "Start": startDateTime,
        "End": endDateTime,
        "wsTokenId": wsTokenId
    }
    const serializedPost = dataFormatter.serialize({stuff: body});
    return serializedPost;
}

export {bodyForPost, validationCheck, tokenGenerator};