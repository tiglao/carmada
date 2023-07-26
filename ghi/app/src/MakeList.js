import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MakeList() {
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    fetchMakes();
  }, []);

  const fetchMakes = async () => {
    const response = await fetch('http://localhost:8100/api/manufacturers/')
    if (response.ok) {
        const data = await response.json();
        setMakes(data.manufacturers);
    }
  };

  return (
    <div>
        <h1>Manufacturers</h1>
        <div className="mt-4">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {makes.map(make => (
                        <tr key={make.id}>
                        <td>{make.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );


}

export default MakeList;
