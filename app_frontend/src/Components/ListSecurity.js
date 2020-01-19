import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import '../index.css';
import SecurityService from './Services';

var divStyle = {
  margin: '8% 8%',
};

class ListSecurity extends Component {
  constructor(props) {
    super(props);
    this.SecurityService = new SecurityService();
    this.state = {
      securities: []
    }
    this.deleteSecurity = this.deleteSecurity.bind(this);
  }

  componentDidMount = () => {
    this.getSecurityList();
  }

  // To get all the employees
  async getSecurityList() {
     await axios.get('http://localhost:8000/allSecurities')
    .then((response) => {
      console.log("In client side response")
      console.log(response);
      this.setState({
        securities: response.data
    });
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  // To delete any Security
  deleteSecurity(id) {
    this.SecurityService.deleteSecurity(id);
  this.getSecurityList();
  }

  render() {
  const { securities } = this.state;
  console.log(securities);
  return (
    <div style={divStyle}>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Average Price</th>
            <th>No of Shares</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          securities && securities.map((security, i) => {
          return (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{security.companyTicker}</td>
              <td>{security.avgPrice}</td>
              <td>{security.sharesLeft}</td>
              <td>
              <Link to={"EditSecurity/" + security.companyTicker} className="btn btn-primary">Buy/Sell</Link>
              </td>
              <td>
              <Button onClick={() => this.deleteSecurity(security.companyTicker)} bsStyle="danger" >Delete</Button>
              </td>
            </tr>
            )
          })
        }
        </tbody>
      </Table>
    </div>
  );
  }
}

export default ListSecurity;
