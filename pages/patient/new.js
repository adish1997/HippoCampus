import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
//import Layout from '../components/layout';
import { Link } from '../../routes';

class PatientNew extends Component {

	static async getInitialProps() {
		const patient = await factory.methods.getPatientContract().call();
    console.log(patient);
		return patient;
	}


	render() {
		return (

      <h1>Hello world</h1>
			// <div>
      //
			// 	<h3> New Cntract </h3>
			// 	<Link route="/campaigns/new">
			// 		<a><Button floated="right" content = "Create Campaign" icon = "add circle" primary/></a>
			// 	</Link>
			// </div>
		);
	}

}

export default PatientNew;
