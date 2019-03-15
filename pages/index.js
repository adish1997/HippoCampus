import React, { Component } from "react";

import factory from "../ethereum/factory.js";
import {
  Card,
  Button
} from "semantic-ui-react";
import Layout from "../components/layout";
import { Link } from "../routes.js";

class PatientIndex extends Component {

  static async getInitialProps() {    
    const patients = await factory.methods
      .getDeployedPatients()
      .call();
    console.log(patients);
    return { patients };    
  }

  
  renderPatients = () => {
    const items = this.props.patients.map(address => {
      return {
        header: address,
        description:(
          <Link route = {`/campaigns/${address}`}>
          <a>View Patient</a>
          </Link> ),
      };
    });

    return (
      <Card.Group items={items} />
    ); 
  };

  render() {
    return (
      <Layout>
        <div>          
          <h3>Registered Patients</h3>
          
          <Link route="/patient/new">
            <a>
              {" "}
              <Button
                content="New Patient"
                icon="add circle"
                labelPosition="left"
                floated="right"
                primary
              />
            </a>
          </Link>

          {this.renderPatients()}
        </div>
      </Layout>
    );
  }
}


export default PatientIndex;

