import React, { Component } from 'react';
import Layout from '../../../components/layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Patient from '../../../ethereum/patient';
import factory from '../../../ethereum/factory';
import web3 from '../../../ethereum/web3';
import { Router } from '../../../routes';
import ipfs from '../../../ipfs';


class ReportNew extends Component {


  constructor(props) {
      super(props)

      this.state = {

        description: '',
        ipfsHashValue: '',
    		errorMessage: '',
    		loading: false,
        address: null,
        buffer: null
      }
      this.captureFile = this.captureFile.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }


  	//static async getInitialProps() {
    // GETTING USER ADDRESS FROM METAMASK
	componentDidMount (){
		  //const account = '0xE1ee5D018c5b7258Cd5415095af6773E3a8EC002'
		  new Promise((resolve,reject)=>{
			  resolve( web3.eth.getAccounts())
		  }).then(accounts=>{

			new Promise((resolve,reject)=>{
				resolve(factory.methods.patientContract(accounts[0]).call())
			}).then(address=>{

				if(address !== this.state.INVALID_ADDRESS){
					//Router.pushRoute(`/patient/${address}`);//Redirecting to the patient dashboard if the user has  already an account.
				}
				this.setState({address});
			})
    });
	  }


	redirectUser = async () => {

	}

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
//generate hash for the captured file and store
    ipfs.files.add(this.state.buffer, async (error, result) => {
     if(error) {
       this.setState({ errorMessage: error });
       return
     } else {
       this.setState({ ipfsHashValue: result[0].hash });
     }
     console.log("Description:"+ this.state.description + " Hash:" + this.state.ipfsHashValue);
     try {
       const patient = Patient(this.state.address);
       const accounts = await web3.eth.getAccounts();
       await patient.methods.createReport(this.state.description, this.state.ipfsHashValue)
       .send({
         from: accounts[0]
       });
       }
       catch(err) {
       this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
      Router.pushRoute(`/patient/${address}/reports`);
     });


   }



  captureFile = async (event) => {
    event.preventDefault()

    const file = event.target.files[0]
    console.log(file);
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
    this.setState({ buffer: Buffer(reader.result) })
    console.log('buffer', this.state.buffer)
    }
  }


		// this.setState({ loading: true, errorMessage: '' });
		// try {
		// 	const accounts = await web3.eth.getAccounts();
		// 	await Patient.methods
		// 	patient.createReport(this.state.description, this.state.ipfsHashValue )
		// 	.send({
		// 	from: accounts[0]
		// 	}).then( () => {
		// 		// const patient = await factory.methods.patientContract(accounts[0]).call();
		// 		// console.log("this returned the smart cotract function",patient);
		// 		new Promise((resolve,reject)=>{
    //
		// 				Router.pushRoute(`/patient/${props.query.address}/reports`);//Redirecting to the reports page
		// 		})
		// 	})
    //
		// 	//Router.pushRoute('/');
    //
		// } catch(err) {
		// 	this.setState({ errorMessage: err.message });
		// }
		// this.setState({ loading: false });



	render() {

		return (

			<Layout>
				<h3>Create a Report</h3>
				<Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
				 <Form.Field>
				 	<label>Description</label>
				 	<Input
				 		label="eg. Cold"
				 		labelPosition="right"
				 		value = {this.state.description}
				 		onChange = {event => this.setState({ description: event.target.value })}
				 	/>
				 </Form.Field>

         <Form.Field>
				 	<label>Upload The Report</label>
				 	<Input
				 		labelPosition="right"
            type="file"
				 		onChange = { this.captureFile }
				 	/>
				 </Form.Field>

				 <Message error header="Oops!" content={this.state.errorMessage} />
				 <Button loading={this.state.loading} primary>Create!</Button>
				</Form>

			</Layout>
		);
	}
}

export default ReportNew;
