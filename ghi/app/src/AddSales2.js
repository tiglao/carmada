import React from 'react';
import { Link } from 'react-router-dom';

class AddSales extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          employee_id: '',
          phone_number: '',
          vin: '',
          price: '',
          salespeople: [],
          customers: [],
          automobiles: []
        };
        this.handleSalespersonChange = this.handleSalespersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.salespeople;
        delete data.customers;
        delete data.automobiles;

        const LocationUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          }
        };
        const response = await fetch(LocationUrl, fetchConfig);
        if (response.ok) {
          const cleared = {
            employee_id: '',
            phone_number: '',
            vin: '',
            price: ''
          };
          this.setState(cleared);
        }
      }

    handleSalespersonChange(event) {
        const value = event.target.value;
        this.setState({employee_id: value})
        }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({phone_number: value})
        }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({vin: value})
        }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({price: value})
        }

    async componentDidMount() {
        let c_url = 'http://localhost:8090/api/customers/';

        let c_response = await fetch(c_url);
        if (c_response.ok) {
            let data = await c_response.json();
            this.setState({customers: data.customer});
        }

        let s_url = 'http://localhost:8090/api/salespeople/';

        let s_response = await fetch(s_url);
        if (s_response.ok) {
            let data = await s_response.json();
            this.setState({salespeople: data.salesperson});
        }

        let a_url = 'http://localhost:8090/api/automobilevo/';

        let a_response = await fetch(a_url);
        if (a_response.ok) {
            let data = await a_response.json();
            this.setState({automobiles: data.automobiles});
        }
    }

      render() {
        return (
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Add a Sale</h1>
                <form onSubmit={this.handleSubmit} id="create-sale-form">
                  <div className="mb-3">
                    <select value={this.state.salesperson} onChange={this.handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select">
                      <option value="">Choose a Salesperson:</option>
                      {this.state.salespeople.map(salesperson => {
                        return (
                          <option key={salesperson.id} value={salesperson.employee_id} style={{textTransform: 'capitalize'}}>
                            {salesperson.first_name + " " + salesperson.last_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select value={this.state.customer} onChange={this.handleCustomerChange} required name="customer" id="customer" className="form-select">
                      <option value="">Choose a Customer:</option>
                      {this.state.customers.map(customer => {
                        return (
                          <option key={customer.id} value={customer.phone_number} style={{textTransform: 'capitalize'}}>
                            {customer.first_name + " " + customer.last_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select value={this.state.automobile} onChange={this.handleAutomobileChange} required name="automobile" id="automobile" className="form-select">
                      <option value="">Choose an Automobile by VIN:</option>
                      {this.state.automobiles.map(automobile => {
                        return (
                          <option key={automobile.id} value={automobile.vin} style={{textTransform: 'capitalize'}}>
                            {automobile.vin}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.price} onChange={this.handlePriceChange} placeholder="price" required type="number" name="price" id="price" className="form-control"/>
                    <label htmlFor="price">Price</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                  <button href="#" onClick={this.props.onCancel} style={{marginLeft: '10px', color: 'gray', fontSize: '0.8em', textDecoration: 'none'}}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        );
      }
    }

export default AddSales;
