import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import { Link, useLocation, useParams } from "react-router-dom";
import { CardBody, CardTitle, Card } from "reactstrap";

/**
 * List
 *
 * Used for /companies, /jobs, and /users. This is the table.
 * Data fetched is dependent on the location.
 */
export function List({ type }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const location = useLocation();

  // Depending on type passed, fetches different data
  async function getItems() {
    let items;
    switch (type) {
      case "companies":
        items = await JoblyApi.getCompanies();
        break;
      case "jobs":
        items = await JoblyApi.getJobs();
        break;
      case "users":
        items = await JoblyApi.getUsers();
        break;
      default:
        console.log("Invalid type");
        items = [];
        break;
    }

    // Items are then sorted by id, if applicable
    items = items.sort((a, b) => a.id - b.id);

    // Set data state here. data is then mapped as Items
    setData(items);

    // Disable loading icon
    setIsLoading(false);
  }

  // Upon first render, get the appropriate item
  useEffect(() => {
    getItems();
  }, [type]);

  // While fetching data from API, show loading icon
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  // The actual content to return
  return (
    <section>
      {/* Search bar. Items, location, and data are passed to redirect to appropriate route */}
      <Search getItems={getItems} location={location} setData={setData} />

      <table className="table table-responsive table-striped">
        <thead>
          {/* If route is /companies, show companies table */}
          {type === "companies" && (
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Number of employees</th>
              <th scope="col">Description</th>
            </tr>
          )}

          {/* If route is /jobs, show jobs table */}
          {type === "jobs" && (
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Salary</th>
              <th>Equity</th>
              <th></th>
            </tr>
          )}

          {/* If route is /users, show users table */}
          {type === "users" && (
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          )}
        </thead>
        <tbody>
          {/* Each row in a List is considered an Item */}
          {data.map((d) => (
            <Item key={d.id} data={d} type={type} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

/**
 * Item
 *
 * An individual company, user, or job.
 * A List will render several Items (i.e. Users, Companies, Jobs)
 */

export function Item({ data, type }) {
  //  Rendered differently depending on the type of data passed
  switch (type) {
    case "companies":
      return (
        <tr>
          <td>
            {/* Link to the company's card */}
            <Link to={"/companies/" + data.handle}>{data.name}</Link>
          </td>
          <td>{data.numEmployees}</td>
          <td>{data.description}</td>
        </tr>
      );
    case "jobs":
      return (
        <tr>
          <td>
            {/* Link to the job card */}
            <Link to={"/jobs/" + data.id}>{data.id}</Link>
          </td>
          <td>{data.title}</td>
          <td>{data?.salary || "N/A"}</td>
          <td>{data?.equity || "N/A"}/1</td>
          <td>
        <ApplyButton />

          </td>
          
        </tr>
        
      );

    /** This should NEVER be accessed by anyone but admin */
    case "users":
      return (
        <tr key={data.username}>
          <td>{data.username}</td>
          <td>{data.email}</td>
        </tr>
      );

    // This should never happen
    default:
      console.log("Invalid type");
      return null;
  }
}

/**
 * Search
 *
 * Search bar rendered inside a List, above the table.
 * Will update the table to match the search query.
 * The entire table will return with an empty search query.
 */
export function Search({ getItems, location, setData }) {
  const [search, setSearch] = useState("");

  return (
    <section>
      {/* This is the actual search bar */}
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          // Update search state after trimming for whitespace
          setSearch(e.target.value.trim());
        }}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          // If the query is empty, just get all the items again
          if (search == ""){
            console.debug("Search bar is empty")
            return getItems();
          }
          async function lookUp() {
            let searchTerm;

            // Filter by location.
            switch (location.pathname) {
              case "/companies":
                searchTerm = await JoblyApi.filterCompanies(search);
                setData(searchTerm);
                break;
              case "/jobs":
                searchTerm = await JoblyApi.filterJobs(search);
                setData(searchTerm);
                break;
              case "/users":
                break;
              default:
                break;
            }
          }
          lookUp();
        }}
      >
        Submit
      </button>
    </section>
  );
}

/**
 * CardComponent
 * 
 * Shows details about a job, company, or user on its own route
 * If the card is for a company, it will also list associated jobs
 */
export function CardComponent({ type }) {
  const [data, setData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const param = useParams();

  // Fetch data depending on the type. 
  // Use params to get the actual company name, username, or job ID
  useEffect(() => {
    async function fetchData() {
      let fetchedData, fetchedJobs;
      switch (type) {

        // Company cards will also show jobs
        case "companies":
          fetchedData = await JoblyApi.getCompany(param.title);
          fetchedJobs = await JoblyApi.filterJobsByCompany(fetchedData.handle);
          break;
        case "jobs":
          fetchedData = await JoblyApi.getJob(param.id);
          fetchedJobs = await JoblyApi.filterJobsByCompany(fetchedData.handle);
          break;
        case "users":
          fetchedData = await JoblyApi.getUsers(param.username);
          break;
        default:
          fetchedData = null;
          break;
      }
      setData(fetchedData);

      // Sort if applicable
      // Sort by job ID, username, and then company name
      try {
        fetchedJobs = fetchedJobs.sort(
          ((a, b) => a.id - b.id) ||
            ((a, b) => a.username > b.username) ||
            ((a, b) => a.name > b.name)
        );
      } catch (e) {}

      setJobs(fetchedJobs);
    }

    fetchData();
  }, [type, param]);

  // Loading
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <h1>{data.title || data.username || data.name}</h1>
        </CardTitle>


        {/* Company card */}

        {type == "companies" && (
          <section>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <td>Employees</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.numEmployees}</td>
                  <td>{data.description}</td>
                </tr>
              </tbody>
            </table>

            <table className="table table-responsive">
              <thead>
                <tr>
                  <td>Job ID</td>
                  <td>Title</td>
                  <td>Salary (USD)</td>
                  <td>Equity</td>
                </tr>
              </thead>
              <tbody>
                {jobs.map((d) => (
                  <Item key={d.id} data={d} type="jobs" />
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* User card */}
        {type == "users" && <h1>{data.username}</h1>}

        {/* Job card */}
        {type == "jobs" && (
          <section>
          <table className="table table-responsive">
            <thead>
              <tr>
                <td>Salary</td>
                <td>Equity</td>
                <td>Company</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.salary}</td>
                <td>{data.equity}</td>
                <td>

                  {/* There are 2 ways to route here
                  Depending on how you route, data will either be the company or the job.
                  If it's the company, use the first one. If job, use the second one

                  This breaks otherwise (data.company will be undefined)
                  */}
                  {data?.handle && (
                    <Link to={`/companies/${data.handle}`}>{data.name}</Link>
                  )}

                  {data?.company?.handle && (
                    <Link to={`/companies/${data.company.handle}`}>
                      {data.company.name}
                    </Link>
                  )}
                </td>
              </tr>
            </tbody>

            
          </table>
          {/* <button className="btn btn-primary" onClick={(e) => 
          {console.log(data)}
        }>Apply</button> */}
        <ApplyButton />
          </section>
        )}
      </CardBody>

      {/* TODO: Refactor to go back via history
      If a user routes to a company via a job, they should be able to back to the job, NOT the companies page */}
      <button className="btn">
        <Link to={"/" + type}>Go back</Link>
      </button>
    </Card>
  );
}

// Button to apply for jobs.
// TODO: Actually apply
export function ApplyButton(){
  const [applied, setApplied] = useState(false);

  const handleClick = (e) => {
    setApplied(true);
  };

  return (
    <button
      className={`btn btn-primary ${applied ? 'btn-danger' : ''}`}
      onClick={handleClick}
      disabled={applied}
    >
      {applied ? 'Applied' : 'Apply'}
    </button>
  );
};
