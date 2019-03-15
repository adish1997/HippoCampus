import Web3 from 'web3';
import { resolve } from 'path';
import { rejects } from 'assert';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') { //checking if its running on browser or server
// We are in browser
web3 = new Web3(window.web3.currentProvider); //scraping the older version of web3 injected by metamask and replacing it with a newer version

const accounts = new Promise((resolve,rejects)=>{
	resolve(web3.eth.getAccounts())
	}).then(a=>{
		web3.customAccounts = a
		//console.log('accounts',web3.customAccounts)
	})
}
else {
// We are on the server or the user is not running metamask
const provider = new Web3.providers.HttpProvider(
	'https://rinkeby.infura.io/v3/abd0dce74de548d6a376886446d25bbe'
	);

web3 = new Web3(provider);
}




export default web3;
