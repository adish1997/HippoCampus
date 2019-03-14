import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/layout';
import Patient from '../../../ethereum/patient'


class ReportIndex extends Component {

  static async getInitialProps(props) {

    const { address } = props.query;
    const patient = Patient(address);
    const reportCount = await patient.methods.getReportsCount().call();
    const reports = await Promise.all(
      Array(parseInt(reportCount)).fill().map((element, index) =>{
        return patient.methods.reports(index).call()
      })
    );

    console.log(reports);

    return { address, reports, reportCount };
  }

  renderRows() {

    const { Row, Cell } = Table;
    const { report, reportCount } = this.props;
    return this.props.reports.map((report, index) => {
      return (

        <Row>
          <Cell>{index}</Cell>
          <Cell>{report.description}</Cell>
          <Cell>{report.hashValue}</Cell>
          <Cell>{reportCount}</Cell>
        </Row>
      );
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
                  <Header>
                    <Row>
                      <HeaderCell>ID</HeaderCell>
                      <HeaderCell>Description</HeaderCell>
                      <HeaderCell>Content Id</HeaderCell>
                      <HeaderCell>View</HeaderCell>
                    </Row>
                  </Header>
                  <Body>
                    {this.renderRows()}
                  </Body>
                </Table>

        <div>Found {this.props.reportCount} reports.</div>
      </Layout>
    );
  }
}

export default ReportIndex;
