import axios from "axios";

/**
* A api caller.
* TODO: Use this through thunk, if thunk is available in later merge.
* instead of direct usage.
*/
export default class APICaller {
  constructor() {
    this.config = {
      headers: {
        Accept: "application/json",
      }
    };
  }

  setHeader = apiKey => {
    if (apiKey) {
      this.config.headers['x-api-key'] = apiKey;
    }
  };

  async get(resourceURL, apiKey) {
    if (apiKey) this.setHeader(apiKey);
    return await axios
      .get(resourceURL, this.config)
      .catch(e => e.response);
  }

  async post(resourceURL, body, apiKey) {
    if (apiKey) this.setHeader(apiKey);
    return await axios
      .post(resourceURL, body, this.config)
      .catch(e => e.response);
  }
}