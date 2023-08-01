import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApptForm from './ApptForm';

function ApptList() {
    const [appts, setAppts] = useState([]);
    const [autos, setAutos] = useState([]);
    const [selectedAppt, setSelectedAppt] = useState(null);
    const [form, setForm] = useState({});
    const [technicians, setTechnicians] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const resetForm = () => {
        setShowForm(false);
        setForm({});
    }

    useEffect(() => {
        fetchAppts();
        fetchAutos();
    }, [form]);

    const handleUpdate = async (appt) => {
        await setupForm(appt);
        setSelectedAppt(appt);
        setShowForm(true);
    };

    // const handleApptCancel = async (id) => {
    //     const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel`, {
    //         method: 'PUT',
    //     });

    //     if (response.ok) {
    //         fetchAppts();
    //     }
    // };

    const handleApptCancel = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            } else {
                fetchAppts();
            }
        } catch (error) {
            console.log("An error occurred:", error.message);
        }
    };


    const handleApptFinish = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            } else {
                await fetchAppts();
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };

    // const handleApptFinish = async (id) => {
    //     const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish`, {
    //         method: 'PUT',
    //     });

    //     if (response.ok) {
    //         fetchAppts();
    //     }
    // };

    const handleCancel = () => {
        resetForm();
        setShowForm(false);
      };

    const fetchAppts = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/')
        if (response.ok) {
            const data = await response.json();
            const activeAppts = data.appts.filter(appt => appt.appt_status !== 'canceled' && appt.appt_status !== 'finished');
            setAppts(activeAppts);
        }
    };

    const fetchAutos = async () => {
        const response = await fetch('http://localhost:8080/api/autosvo/')
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    };

    const fetchTechnicians = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    };

    async function setupForm(appointment) {
        await fetchTechnicians();
        if (appointment) {
            let dateTime = new Date(appointment.date_time);
            let date = dateTime.toISOString().split("T")[0];
            console.log("date-string:", date);
            let time = dateTime.toTimeString().split(" ")[0];
            console.log("time-string:", time);
            console.log(appointment.vip_status);
            setForm(prevState => ({
                ...prevState,
                ...appointment,
                date,
                time,
                technician: appointment.technician,
                vip_status: appointment.vip_status,
            }));
        }
    }

    return (
        <div className="px-4 py-5 my-5 text-center">
            <h1>Service Appointments</h1>
            <div className="mt-4">
                {!showForm && (
                    <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>VIN</th>
                                    <th>Is VIP?</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Technician</th>
                                    <th>Reason</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {appts.map(appt => {
                                console.log("current appt:", appt)
                                const date = new Date(appt.date_time).toLocaleDateString();
                                const time = new Date(appt.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                // const isVip = autos.some(auto => auto.vin === appt.vin && auto.sold);
                                return (
                                    <tbody key={appt.id}>
                                        <tr className="col mb-3">
                                            <td>{appt.vin}</td>
                                            {/* <td>{isVip ? "Yes" : "No"}</td> */}
                                            <td>{appt.vip_status ?
                                            "Yes" : "No"}</td>
                                            <td>{appt.customer}</td>
                                            <td>{date}</td>
                                            <td>{time}</td>
                                            <td>{`${appt.technician.first_name} ${appt.technician.last_name}`}</td>
                                            <td>{appt.reason}</td>
                                            <td>
                                                <button onClick={() => handleUpdate(appt)} className="btn btn-primary" style={{ marginRight: '20px' }}>
                                                    Update
                                                </button>
                                                <button onClick={() => handleApptCancel(appt.id)} className="btn btn-primary" style={{ marginRight: '20px' }}>
                                                    Cancel
                                                </button>
                                                <button onClick={() => handleApptFinish(appt.id)} className="btn btn-primary" style={{ marginRight: '20px' }}>
                                                    Finish
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </>
                )}

                {showForm &&
                    <ApptForm
                        appointment={selectedAppt}
                        form={form}
                        setForm={setForm}
                        technicians={technicians}
                        onCancel={handleCancel}
                        onFormSubmit={fetchAppts}
                    />
                }
            </div>
            <div className="mt-5">
                {appts.length < 1 ? (
                    <>
                        <p>There are no appointments!</p>
                        <Link to="/appts/new">Add one here.</Link>
                    </>
                ) : (
                    <>
                        <p>Need to add a new appointment?</p>
                        <Link to="/appts/new">Add another here.</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default ApptList;
