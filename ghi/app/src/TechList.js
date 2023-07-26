import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TechList() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    fetchTechs();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/api/technicians/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        fetchTechs();
    }
};

const fetchTechs = async () => {
    const response = await fetch('http://localhost:8080/api/technicians/')
    if (response.ok) {
        const data = await response.json();
        setTechs(data.technicians);
    }
};

  return (
    <div>
        <h1>Service Technicians</h1>
        <div className="mt-4">
            <table className="table table-striped">
                <thead>
                    <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {techs.map(tech => (
                    <tr key={tech.id}>
                    <td>{tech.employee_id}</td>
                    <td>{tech.first_name}</td>
                    <td>{tech.last_name}</td>
                    <td>
                        <button onClick={() => handleDelete(tech.id)} className="btn btn-link">Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  );


}

export default TechList;
