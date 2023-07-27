import React, { useState } from 'react';

const MakeForm = (props) => {
    const [form, setForm] = useState({
      name: '',
    });

    const handleChange = (event) => {
        setForm({
          ...form,
          [event.target.name]: event.target.value
        });
    };

    const handleCancel = async (event) => {
      console.log("cancel")
      setForm({
          name: '',
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
          name: form.name,
        };

        const makeUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(makeUrl, fetchConfig);
        if (response.ok) {
          setForm({
            name: '',
          });

          props.onFormSubmit();
        }
    };

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Manufacturer</h1>
            <form onSubmit={handleSubmit} id="create-make-form">
              <div className="form-floating mb-3">
                <input value={form.name} onChange={handleChange} placeholder="Manufacturer Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Manufacturer Name</label>
              </div>
              <button className="btn btn-primary">Create</button>
              <a href="#" onClick={handleCancel} style={{marginLeft: '10px', color: 'gray', fontSize: '0.8em', textDecoration: 'none'}}>Cancel</a>
            </form>
          </div>
        </div>
      </div>
    );
}

export default MakeForm;
