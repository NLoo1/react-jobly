import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import { Link, useLocation } from "react-router-dom";

export function List({ type }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const location = useLocation();

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
    items = items.sort((a, b) => a.id - b.id);
    setData(items);
    setIsLoading(false);
  }

  useEffect(() => {
    getItems();
  }, [type]);

  // While fetching data from API, show loading icon
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <section>
      <Search
        getItems={getItems}
        location={location}
        setData={setData}
      />

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
            </tr>
          )}

          {/* If route is /users, show users table */}
          {type === "users" && (
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          )}
        </thead>
        <tbody>
          {data.map((d) => (
            <Item key={d.id} data={d} type={type} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

// An individual company, user, or job
// A List will render several Items (i.e. Users, Companies, Jobs)
export function Item({ data, type }) {

    //  Rendered differently depending on the type of data passed
  switch (type) {
    case "companies":
      return (
        <tr>
          <td>
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
            <Link to={"/jobs/" + data.id}>{data.id}</Link>
          </td>
          <td>{data.title}</td>
          <td>${data.salary}</td>
          <td>{data.equity}/1</td>
        </tr>
      );
    case "users":
      return (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.username}</td>
          <td>{data.email}</td>
        </tr>
      );
    default:
      console.log("Invalid type");
      return null;
  }
}

// Search bar. Rendered inside of List
export function Search({ getItems, location, setData }) {
  const [search, setSearch] = useState("");

  return (
    <section>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value.trim());
        }}
      />
      <button
        onClick={() => {
          if (search == "") return getItems();
          async function lookUp() {
            let searchTerm;
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
