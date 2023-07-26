import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ApptList() {
    const [appts, setAppts] = useState([]);
    const [autos, setAutos] = useState([]);

    useEffect(() => {
        fetchAppts();
        fetchAutos();
    }, []);

    const handleCancel = async (id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel`, {
            method: 'PUT',
        });

        if (response.ok) {
            fetchAppts();
        }
    };

    const handleFinish = async (id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish`, {
            method: 'PUT',
        });

        if (response.ok) {
            fetchAppts();
        }
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

    return (
        <div>
            <h1>Service Appointments</h1>
            <div className="mt-4">
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
                        console.log(appt)
                        const date = new Date(appt.date_time).toLocaleDateString();
                        const time = new Date(appt.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const isVip = autos.some(auto => auto.vin === appt.vin && auto.sold);
                        return (
                            <tbody key={appt.id}>
                                <tr className="col mb-3">
                                    <td>{appt.vin}</td>
                                    <td>{isVip ? "Yes" : "No"}</td>
                                    <td>{appt.customer}</td>
                                    <td>{date}</td>
                                    <td>{time}</td>
                                    <td>{`${appt.technician.first_name} ${appt.technician.last_name}`}</td>
                                    <td>{appt.reason}</td>
                                    <td>
                                        <button onClick={() => handleCancel(appt.id)} className="btn btn-link">
                                            Cancel
                                        </button>
                                        <button onClick={() => handleFinish(appt.id)} className="btn btn-link">
                                            Finish
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>

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
        </div>
    );
}

export default ApptList;
