import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useLocation } from "react-router-dom";
import { List } from "./routesList";
import './Page.css'


// Generic component for both companies and pages
export default function Page() {
  let location = useLocation()
  location = location.pathname.split('/')[1]
  return (
    <div className="page" >
      <section className="col">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to {location}!
              
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