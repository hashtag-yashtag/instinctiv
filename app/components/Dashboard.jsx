import React from 'react';
import {Link, IndexLink} from 'react-router';
var Bootstrap = require('bootstrap');
import { Table } from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>View Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>100</td>
            <td>
              <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>View</Button>
               <Collapse isOpen={this.state.collapse}>
                 <Card>
                   <CardBody>
                   Name: Mark
                   Score: 100
                   </CardBody>
                 </Card>
               </Collapse>
               </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>78</td>
              <td>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>View</Button>
                 <Collapse isOpen={this.state.collapse}>
                   <Card>
                     <CardBody>
                     Name: Jacob
                     Score: 78
                     </CardBody>
                   </Card>
                 </Collapse>
                 </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>67</td>
              <td>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>View</Button>
                 <Collapse isOpen={this.state.collapse}>
                   <Card>
                     <CardBody>
                     Name: Larry
                     Score: 67
                     </CardBody>
                   </Card>
                 </Collapse>
                 </td>
          </tr>
        </tbody>
      </Table>
       </div>
    );
  }
}
module.exports = Dashboard;
