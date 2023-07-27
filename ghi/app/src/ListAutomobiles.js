import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListAutomobiles() {
    const [automobiles, setAutomobiles] = useState([]);

    useEffect(() => {
        fetchAutomobiles();
    }, []);

    const handleDelete = async (vin) => {
        const response = await fetch(`http://localhost:8100/api/automobiles/${vin}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchAutomobiles();
        }
    };

    const fetchAutomobiles = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/')
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    };

    return (
        <div>
            <h1>Automobiles</h1>
            <div className="mt-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>VIN</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    {automobiles.map(car => {
                        return (
                            <tbody key={car.id}>
                                <tr className="col mb-3">
                                    <td>{car.color}</td>
                                    <td>{car.year}</td>
                                    <td>{car.model.manufacturer.name}</td>
                                    <td>{car.model.name}</td>
                                    <td>{car.vin}</td>
                                    <td>
                                        <button onClick={() => handleDelete(car.vin)} className="btn btn-link">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>

                <div className="mt-5">
                    {automobiles.length < 1 ? (
                        <>
                            <p>There are no automobiles!</p>
                            <Link to="/automobiles/new">Add one here.</Link>
                        </>
                    ) : (
                        <>
                            <p>Need to add a new automobile?</p>
                            <Link to="/automobiles/new">Add another here.</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListAutomobiles;
