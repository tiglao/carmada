import React from 'react';
import { Link } from 'react-router-dom';

class ListCustomers extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            customers: [],
        }
        this.fetchCustomers = this.fetchCustomers.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    async handleDelete(id){
        const response = await fetch(`http://localhost:8090/api/customers/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            this.fetchCustomers();
        } else {
        }
    }

    async fetchCustomers() {
        const response = await fetch('http://localhost:8090/api/customers/')
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            this.setState({customers: data.customer})
        }
    }

    render() {
        return (
            <div>
                <h1>Customers</h1>
                <div className="mt-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {this.state.customers.map(customer => {
                            return (
                                <tbody key={customer.id}>
                                    <tr className="col mb-3">
                                        <td>{customer.first_name}</td>
                                        <td>{customer.last_name}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.phone_number}</td>
                                        <td><button onClick={() =>
                                            this.handleDelete(customer.id)} className="btn btn-link">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>

                    <div className="mt-5">
                        {this.state.customers.length < 1 ? (
                            <>
                                <p>There are no customers!</p>
                                <Link to="/customers/new">Add one here.</Link>
                            </>
                        ) : (
                            <>
                                <p>Need to add a new customer?</p>
                                <Link to="/customers/new">Add another here.</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ListCustomers;
