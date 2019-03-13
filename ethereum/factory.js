import web3 from './web3';
import ContractFactory from './build/ContractFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(ContractFactory.interface),
	'0x9f7BF46F33D121a903fC5275Ff713e10Fa2085Ca'
);

export default instance;
