import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/layout';
import Patient from '../../../ethereum/patient'


class RequestIndex extends Component {

  static async getInitialProps(props) {

    const { address } = props.query;
    const patient = Patient(address);
    const reportCount = await patient.methods.getReportscount().call();
  
    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) =>{
        return campaign.methods.requests(index).call()
      })
    );

    console.log(requests);

    return { address, requests, requestCount, approversCount };
  }

  renderRows() {

    return this.props.requests.map((request, index) => {
      return <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
    });
  }
  render() {

    const { Header, Row, HeaderCell, Body } = Table;
    return (

      <Layout>
        <h2>Reports List</h2>
        <Link route={`/campaigns/${this.props.address}/reports/new`}>
          <a>
            <Button primary floated="right" style={{marginBottom: 10}}>Add report</Button>
          </a>
        </Link>
        <Table>
          <Body>
          //{this.renderRows()}
          </Body>
        </Table>
        <div>Found {this.props.reportCount} reports.</div>
      </Layout>
    );
  }
}

export default RequestIndex;
