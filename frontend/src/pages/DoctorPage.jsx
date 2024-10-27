import React, { useState } from 'react';

const DoctorPage = ({ healthcareSystem, selectedAccount }) => {

    const [patientAddress, setPatientAddress] = useState('');
    const [record, setRecord] = useState('');

    const viewRecord = async () => {
        console.log(window.web3)
        try {
            const fetchedRecord = await healthcareSystem.methods.viewMedicalRecord(patientAddress).call();
            setRecord(fetchedRecord);
        } catch (error) {
            console.error(error);
            alert('Failed to retrieve medical record.');
        }
    };

    return (
        <div>
            <h2>Doctor Page</h2>

            <div>
                <input
                    type="text"
                    placeholder="Enter Patient Address"
                    value={patientAddress}
                    onChange={(e) => setPatientAddress(e.target.value)}
                    style={{ margin: '10px', padding: '10px' }}
                />
                <button onClick={viewRecord} style={{ margin: '10px', padding: '10px' }}>View Medical Record</button>
                {record && <div>Medical Record: {record}</div>}
            </div>
        </div>
    );
};

export default DoctorPage;