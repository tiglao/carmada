import React, { useState, useEffect } from 'react';

const AddAutomobiles = (props) => {
    const [form, setForm] = useState({
        href: '',
        color: '',
        year: '',
        vin: '',
        model: '',
        sold: '',
        models: []
        });

    useEffect(() => {
        getArrays();
    }, []);

    const getArrays = async () => {
        let response = await fetch('http://localhost:8100/api/models/')
        if (response.ok) {
            const data = await response.json();
            setForm(previousState => {
                return { ...previousState, models: data.models }
            });
        }
    };

    const handleChange = (event) => {
      setForm({
        ...form,
        [event.target.name]: event.target.value
      });
  };

    const handleModelChange = async (event) => {
        const value = event.target.value;
        setForm(previousState => {
            return { ...previousState, model: value }
        });
    }

    const handleCancel = async (event) => {
      console.log("cancel")
      setForm({
          href: '',
          color: '',
          year: '',
          vin: '',
          model: '',
          sold: '',
          models: []
        });
        getArrays()
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            color: form.color,
            year: form.year,
            vin: form.vin,
            model: form.model,
          };
          console.log("-----------------DATA--------------------")
          console.log(data)
          if (form.sold) {
            console.log("returned true")
          } else {
            console.log("returned false")
          }
        const url = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          setForm({
            href: '',
            color: '',
            year: '',
            vin: '',
            model: '',
            models: [],
            sold: [true, false]
          });
        }
        getArrays()
    };
    console.log(form)
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create an Automobile</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
                  <div className="mb-3">
                    <select onChange={handleModelChange} required name="model" id="model" className="form-select">
                      <option>Choose a Model:</option>
                      {form.models.map(mod => {
                        return (
                          <option key={mod.id} value={mod.id} style={{textTransform: 'capitalize'}}>
                            {mod.manufacturer.name + " " + mod.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={form.color} onChange={handleChange} placeholder="color" required type="text" name="color" id="color" className="form-control" />
                    <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={form.year} onChange={handleChange} placeholder="year" required type="text" name="year" id="year" className="form-control" />
                    <label htmlFor="year">Year</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={form.vin} onChange={handleChange} placeholder="reference" required type="text" name="vin" id="vin" className="form-control" />
                    <label htmlFor="vin">VIN</label>
                  </div>
                <button className="btn btn-primary">Create</button>
                <a href="#" onClick={handleCancel} style={{marginLeft: '10px', color: 'gray', fontSize: '0.8em', textDecoration: 'none'}}>Cancel</a>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AddAutomobiles;
