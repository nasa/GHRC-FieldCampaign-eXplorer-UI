import axios from "axios";

export default class APICall {
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