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

  static async request(endpoint, data = {}, method = "get", token=JoblyApi.token) {
    console.debug("API Call:", endpoint, data, method);
    // There are multiple ways to pass an authorization token, this is how you pass it in the header.
    // This has been provided to show you another way to pass the token. You are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
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


  /** ----------------------------------- COMPANIES ------------------------------------------------------------ */
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

  // Get list of companies by name, partial matches.
  static async filterCompanies(name) {
    let res = await this.request(`companies?name=${name}`);
    return res.companies;
  }

  /** Add a new company. */
  // TODO: add authentication
  static async postCompany({ handle, name, description, numEmployees, logoUrl }) {
    let res = await this.request(`companies/`, { handle, name, description, numEmployees, logoUrl }, 'post');
    return res.company;
  }

  /** Update details of a company by handle. */
  static async patchCompany({ handle, name, description, numEmployees, logoUrl }) {
    let res = await this.request(`companies/${handle}`, { handle, name, description, numEmployees, logoUrl }, 'patch');
    return res.company;
  }

  /** Delete a company by handle. */
  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, 'delete');
    return res.company;
  }

    /** ----------------------------------- USERS ------------------------------------------------------------ */


  static async login(username, password) {
    let res = await this.request(`auth/token`, {username, password}, 'post');
    return res;
  }

  // Get a user by id
  static async getUser(username, token) {
    let res = await this.request(`users/${username}`, {}, "get", token)
    return res
  }

  // Get ALL users.
  static async getUsers() {
    let res = await this.request(`users/`);
    return res.users;
  }

    /** Add a new user. */
  static async register({username, password, firstName, lastName, email}) {
    let res = await this.request(`auth/register`, {username, password, firstName, lastName, email}, 'post');
    return res
  }

  // TODO: add authentication
  static async postUserAdmin({user, token}){
    let res = await this.request(`users/`, {user, token}, 'post');
    return res.user;
  }

  // Get all users matching an id, partial matches included.
  static async filterUsers(id) {
    let res = await this.request(`users?id=${id}`);
    return res.users;
  }

  /** Update details of a user by id. */
  static async patchUser({ }) {
    let res = await this.request(`users/`, {  }, 'patch');
    return res.company;
  }

  static async deleteUser(id) {
    let res = await this.request(`users/${id}`, {}, 'delete');
    return res;
  }

    /** ----------------------------------- JOBS ------------------------------------------------------------ */

    // Get job by id
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  // Get all jobs
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  // Get all jobs matching a title, partial matches included.
  static async filterJobs(title) {
    let res = await this.request(`jobs?title=${title}`);
    return res.jobs;
  }
// Get all jobs matching a company.
static async filterJobsByCompany(company_handle) {
  let res = await this.request(`jobs`);
  let filteredJobs = res.jobs.filter((e) => e.companyHandle === company_handle);
  return filteredJobs;
}


    /** Add a new job. */
  // TODO: add authentication
  static async postJob({ title, salary, equity, companyHandle }) {
    let res = await this.request(`jobs/`, { title, salary, equity, companyHandle }, 'post');
    return res.job;
  }

    /** Update details of a user by id. */
  static async patchJob({title, salary, equity}) {
    let res = await this.request(`jobs/`, {title, salary, equity}, 'patch');
    return res.user;
  }

  // Delete a job by ID.
  static async deleteJob(id) {
    let res = await this.request(`jobs/${id}`, {}, 'delete');
    return res;
  }
}

// For now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
