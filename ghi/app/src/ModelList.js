import React, { useState, useEffect } from 'react';

function ModelList() {
    const [models, setModels] = useState([]);

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        const response = await fetch('http://localhost:8100/api/models/')
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8100/api/models/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchModels();
        }
    };

    return (
        <div>
            <h1>Models</h1>
            <div className="mt-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Picture</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map(model => (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td><img src={model.picture_url} height="100" alt={model.name} style={{objectFit: 'contain'}} /></td>
                                <td><button onClick={() => handleDelete(model.id)} className="btn btn-link">
                                    Delete
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModelList;
