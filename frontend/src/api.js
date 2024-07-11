import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // There are multiple ways to pass an authorization token, this is how you pass it in the header.
    // This has been provided to show you another way to pass the token. You are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

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

  /** Get ALL companies. */
  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Add a new company. */
  static async postCompany({ handle, name, description, numEmployees, logoUrl }) {
    let res = await this.request(`companies/`, { handle, name, description, numEmployees, logoUrl }, 'post');
    return res.company;
  }

  /** Update details of a company by handle. */
  static async patchCompany({ handle, name, description, numEmployees, logoUrl }) {
    let res = await this.request(`companies/`, { handle, name, description, numEmployees, logoUrl }, 'patch');
    return res.company;
  }

  /** Delete a company by handle. */
  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, 'delete');
    return res.company;
  }

  // USERS
  static async getUser(handle) {
    let res = await this.request(`users/${handle}`);
    return res.user;
  }

  static async getUsers() {
    let res = await this.request(`users/`);
    return res.users;
  }

  // JOBS
  static async getJob(handle) {
    let res = await this.request(`jobs/${handle}`);
    return res.job;
  }

  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }
}

// For now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
