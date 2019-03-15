// import React, { Component } from 'react';
// import { Card, Button } from 'semantic-ui-react';
// import factory from '../../ethereum/factory';
// //import Layout from '../components/layout';
// import { Link } from '../../routes';
//
// class PatientNew extends Component {
//
// 	static async getInitialProps() {
// 		const patient = await factory.methods.getPatientContract().call();
//     console.log(patient);
// 		return patient;
// 	}
//
//
// 	render() {
// 		return (
//
//       <h1>Hello world</h1>
// 			// <div>
//       //
// 			// 	<h3> New Cntract </h3>
// 			// 	<Link route="/campaigns/new">
// 			// 		<a><Button floated="right" content = "Create Campaign" icon = "add circle" primary/></a>
// 			// 	</Link>
// 			// </div>
// 		);
// 	}
//
// }
//
// export default PatientNew;

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router, Link } from '../../routes';
import { resolve } from 'path';
import { rejects } from 'assert';

class PatientNew extends Component {

	state = {
		bloodGroup: '',
		errorMessage: '',
		loading: false,
		INVALID_ADDRESS:'0x0000000000000000000000000000000000000000'
	};

  	//static async getInitialProps() {
	componentDidMount (){
		  //const account = '0xE1ee5D018c5b7258Cd5415095af6773E3a8EC002'
		  new Promise((resolve,reject)=>{
			  resolve( web3.eth.getAccounts())
		  }).then(accounts=>{
			//console.log('accounts ', accounts)
			new Promise((resolve,reject)=>{
				resolve(factory.methods.patientContract(accounts[0]).call())
			}).then(address=>{			
				
				if(address !== this.state.INVALID_ADDRESS){
					Router.pushRoute(`/patient/${address}`);//Redirecting to the patient dashboard if the user has  already an account.
				}
				this.setState({address})
			})
		  })
	  }

	
	redirectUser = async () => {
		
	}
	  



  // test = async (event) => {
  //   try {
  //     //await ethereum.enable();
  //   //  const accounts = await web3.eth.getAccounts();
  //   } catch (err){
  //     console.log(err);
  //   }
  //
  // }

	onSubmit = async (event) => {
		event.preventDefault();
		this.setState({ loading: true, errorMessage: '' });
		try {
			const accounts = await web3.eth.getAccounts();			
			await factory.methods
			.createPatient(this.state.bloodGroup)
			.send({
			from: accounts[0]
			}).then( () => {
				// const patient = await factory.methods.patientContract(accounts[0]).call();
				// console.log("this returned the smart cotract function",patient);
				new Promise((resolve,reject)=>{
					resolve(factory.methods.patientContract(accounts[0]).call())
				}).then(address=>{					
					if(address !== this.state.INVALID_ADDRESS){
						Router.pushRoute(`/patient/${address}`);//Redirecting to the patient dashboard if the user has  already an account.
					}
				})
			})
			
			//Router.pushRoute('/');

		} catch(err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	}

	render() {

		return (

			<Layout>
				<h3>Create a Patient Contract</h3>
        <Link route={`/patient/${this.state.address}`}>
        		<a className="Item Button" floated="right">Patient Dashboard</a>
        </Link>
				<Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
				 <Form.Field>
				 	<label>Blood Group</label>
				 	<Input
				 		label="eg. A+"
				 		labelPosition="right"
				 		value = {this.state.bloodGroup}
				 		onChange = {event => this.setState({ bloodGroup: event.target.value })}
				 	/>
				 </Form.Field>
				 <Message error header="Oops!" content={this.state.errorMessage} />
				 <Button loading={this.state.loading} primary>Create!</Button>
				</Form>

			</Layout>
		);
	}
}

export default PatientNew;
