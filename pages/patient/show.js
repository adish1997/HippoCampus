import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Patient from '../../ethereum/patient';
import web3 from '../../ethereum/web3';
import { Router, Link } from '../../routes';


class PatientShow extends Component {

	static async getInitialProps(props)	{
		const patientContract = Patient(props.query.address);

		const bloodGroup = await patientContract.methods.bloodGroup().call();
    const reportCount = await patientContract.methods.getReportsCount().call();
    const address = props.query.address;
    const owner = await patientContract.methods.owner().call();
		return {

      owner: owner,
			bloodGroup: bloodGroup,
      reportCount: reportCount,
      address: address
		};
	}



	render() {
		return (
			<Layout>
				<h3>Patient Dashboard of {this.props.owner}</h3>
        <h3>Blood Group</h3>
				{this.props.bloodGroup}
        <h3>Total number of reports</h3>
        {this.props.reportCount}
        <h3></h3>
        <Link route={`/patient/${this.props.address}/reports`}>
        		<a className="Item Button" floated="right">Show Reports</a>
        </Link>
			</Layout>
		);
	}
}

export default PatientShow;
