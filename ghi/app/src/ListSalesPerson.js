import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListSalesperson() {
    const [salesperson, setSalesperson] = useState([]);

    useEffect(() => {
        fetchSalesperson();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8090/api/salespeople/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchSalesperson();
        }
    };

    const fetchSalesperson = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/')
        if (response.ok) {
            const data = await response.json();
            setSalesperson(data.salesperson);
        }
    };

    return (
        <div>
            <h1>Sales</h1>
            <div className="mt-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Employee ID</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    {salesperson.map(salesperson => {
                        return (
                            <tbody key={salesperson.id}>
                                <tr className="col mb-3">
                                    <td>{salesperson.first_name}</td>
                                    <td>{salesperson.last_name}</td>
                                    <td>{salesperson.employee_id}</td>
                                    <td>
                                        <button onClick={() => handleDelete(salesperson.id)} className="btn btn-link">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>

                <div className="mt-5">
                    {salesperson.length < 1 ? (
                        <>
                            <p>There are no salespeople!</p>
                            <Link to="/salesperson/new">Add one here.</Link>
                        </>
                    ) : (
                        <>
                            <p>Need to add a new salesperson?</p>
                            <Link to="/salesperson/new">Add another here.</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListSalesperson;
