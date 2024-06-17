import {v4 as uuidv4} from 'uuid';
import moment from "moment/moment";

// extremely low probability to get same random variable on the same time. 
const token = () => `${moment().format("YYMMDDHHmmss")}-${uuidv4()}`;

export default token;