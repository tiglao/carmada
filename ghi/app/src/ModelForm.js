import React, { useState, useEffect } from 'react';

const ModelForm = (props) => {
    const [form, setForm] = useState({
      name: '',
      picture_url: '',
      manufacturer_id: '',
    });

    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
      fetchManufacturers();
    }, []);

    const fetchManufacturers = async () => {
      const response = await fetch('http://localhost:8100/api/manufacturers/');
      if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
      }
    };

    const handleCancel = async (event) => {
      setForm({
          name: '',
          picture_url: '',
          manufacturer_id: ''
        });

        fetchManufacturers();
    };

    const handleChange = (event) => {
        setForm({
          ...form,
          [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
          name: form.name,
          picture_url: form.picture_url,
          manufacturer_id: form.manufacturer,
        };
        console.log(data)
        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
          setForm({
            name: '',
            picture_url: '',
            manufacturer_id: ''
          });
        }
    };

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Model</h1>
            <form onSubmit={handleSubmit} id="create-model-form">
              <div className="form-floating mb-3">
                <input value={form.name} onChange={handleChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={form.picture_url} onChange={handleChange} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select value={form.manufacturer} onChange={handleChange} required name="manufacturer" id="manufacturer" className="form-select">
                  <option value="">Select a Manufacturer</option>
                  {manufacturers.map(manufacturer => (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
              <button onClick={handleCancel} className="btn btn-secondary mx-2">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ModelForm;
