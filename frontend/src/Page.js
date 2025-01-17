import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useLocation } from "react-router-dom";
import { List } from "./routesList";
import './Page.css'
import ReactSearchBox from "react-search-box";



/**
 * Generic Page component. Used to render all routes: Home, Users, Companies, Jobs
 */
export default function Page() {
  let location = useLocation()

  // This will show a Welcome page dependent on the route
  location = location.pathname.split('/')[1]
  return (
    <div className="page" >
      <section className="col">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to {location.slice(0,1).toUpperCase() + location.slice(1)}!
            </h3>
          </CardTitle>

        </CardBody>
      </Card>
      </section>
      <hr />
      
      <List type={location} />
    </div>
    
  );
}
