import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListSales() {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetchSales();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8090/api/sales/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchSales();
        }
    };

    const fetchSales = async () => {
        const response = await fetch('http://localhost:8090/api/sales/')
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    };

    return (
        <div>
            <h1>Sales</h1>
            <div className="mt-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>Automobile VIN</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    {sales.map(sale => {
                        return (
                            <tbody key={sale.id}>
                                <tr className="col mb-3">
                                    <td>{sale.salesperson.first_name + " " + sale.salesperson.last_name}</td>
                                    <td>{sale.customer.first_name + " " + sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                    <td>
                                        <button onClick={() => handleDelete(sale.id)} className="btn btn-link">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>

                <div className="mt-5">
                    {sales.length < 1 ? (
                        <>
                            <p>There are no sales!</p>
                            <Link to="/sales/new">Add one here.</Link>
                        </>
                    ) : (
                        <>
                            <p>Need to add a new sale?</p>
                            <Link to="/sales/new">Add another here.</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListSales;
