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
                        </tr>
                    </thead>
                    <tbody>
                        {models.map(model => (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td><img src={model.picture_url} height="100" alt={model.name} style={{objectFit: 'contain'}} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModelList;
