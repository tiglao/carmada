import React from 'react';
import { Link } from 'react-router-dom';

class AddCustomer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          first_name: '',
          last_name: '',
          address: '',
          phone_number: ''
        };
        this.handleFnChange = this.handleFnChange.bind(this);
        this.handleLnChange = this.handleLnChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const LocationUrl = 'http://localhost:8090/api/customers/';
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
            first_name: '',
            last_name: '',
            address: '',
            phone_number: ''
          };
          this.setState(cleared);
        }
      }

    handleFnChange(event) {
    const value = event.target.value;
    this.setState({first_name: value})
    }

    handleLnChange(event) {
        const value = event.target.value;
        this.setState({last_name: value})
        }

    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({address: value})
        }

    handlePhoneChange(event) {
        const value = event.target.value;
        this.setState({phone_number: value})
        }

      render() {
        return (
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Add a Customer</h1>
                <form onSubmit={this.handleSubmit} id="create-salesperson-form">
                <div className="form-floating mb-3">
                    <input value={this.state.first_name} onChange={this.handleFnChange} placeholder="first_name" required type="text" name="first_name" id="first_name" className="form-control" />
                    <label htmlFor="first_name">First Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.last_name} onChange={this.handleLnChange} placeholder="last_name" required type="text" name="last_name" id="last_name" className="form-control" />
                    <label htmlFor="last_name">Last Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.address} onChange={this.handleAddressChange} placeholder="address" required type="text" name="address" id="address" className="form-control" />
                    <label htmlFor="address">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.phone_number} onChange={this.handlePhoneChange} placeholder="phone_number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                    <label htmlFor="phone_number">Phone Number</label>
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

export default AddCustomer;
