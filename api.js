import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  
  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Don't use these yet; need to add data
  static async postCompany({ handle, name, description, numEmployees, logoUrl }) {
    let res = await this.request(`companies/`, method='post', data={
      { handle:handle, name:name, description: description, numEmployees:numEmployees, 
        logoUrl:logoUrl }
    );
    return res.company;
  }
  static async postCompany({ handle, name, description, numEmployees, logoUrl }) {
    let res = await this.request(`companies/`, method='patch', data={
      { handle:handle, name:name, description: description, numEmployees:numEmployees, 
        logoUrl:logoUrl }
    );
    return res.company;
  }
  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, method='delete');
    return res.company;
  }


  // USERS
  static async getUser(handle) {
    let res = await this.request(`users/${handle}`);
    return res.user;

    // JOBS
  }static async getJob(handle) {
    let res = await this.request(`job/${handle}`);
    return res.job;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
