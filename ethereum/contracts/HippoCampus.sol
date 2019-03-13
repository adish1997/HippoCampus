pragma solidity ^0.4.17;

contract ContractFactory {

    address[] public deployedPatients;
    mapping(address => address) public patientContract;

    function createPatient( string bloodG) {

       address newPatient = new Patient( msg.sender, bloodG);
       deployedPatients.push(newPatient);
       patientContract[msg.sender] = newPatient;
    }

    function getDeployedPatients() public view returns ( address[] ) {

        return deployedPatients;
    }

    function getPatientContract() public view returns (address) {

        return patientContract[msg.sender];
    }
}

contract Patient {

    struct Report {

        string description;
        string hashValue;
    }
    address public owner;
    string public bloodGroup;
    Report[] public reports;

    modifier restricted() {

        require( msg.sender == owner );
        _;

    }

    function Patient( address creator, string bloodG ){
        owner = creator;
        bloodGroup = bloodG;
    }

  /*  function getReports() public view returns (Report[]) {

        return reports;
    }*/

    function createReport(string description, string hashValue) {

        Report memory newReport = Report({
            description: description,
            hashValue: hashValue
        });
        reports.push( newReport );
    }

    function getReportsCount() public view returns(uint) {

        return reports.length;
    }
    
}
