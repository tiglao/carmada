import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListCustomers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8090/api/customers/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchCustomers();
        }
    };

    const fetchCustomers = async () => {
        const response = await fetch('http://localhost:8090/api/customers/')
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customer);
        }
    };

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

                    {customers.map(customer => {
                        return (
                            <tbody key={customer.id}>
                                <tr className="col mb-3">
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.phone_number}</td>
                                    <td>
                                        <button onClick={() => handleDelete(customer.id)} className="btn btn-link">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>

                <div className="mt-5">
                    {customers.length < 1 ? (
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

export default ListCustomers;
