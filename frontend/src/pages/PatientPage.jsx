import React, { useState } from 'react';
import { pinata } from '../config'
import { ethers } from 'ethers';

const PatientPage = ({ healthcareSystem, selectedAccount }) => {
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [doctorAddress, setDoctorAddress] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatmentFile, setTreatmentFile] = useState(null);

    const updateRecord = async () => {
        if (diagnosis && treatmentFile) {
            try {
                
                const response = await pinata.upload.file(treatmentFile)
                const ipfsHash = response.cid

                await healthcareSystem.methods.updateMedicalRecord(ipfsHash).send({ from: selectedAccount });

                alert('Medical record updated successfully!');
                setDiagnosis('');
                setTreatmentFile(null);

            } catch (error) {
                console.error(error);
                alert('Failed to update medical record.');
            }
        } else {
            alert('Please provide both diagnosis and treatment file.');
        }
    };

    const registerPatient = async () => {
        if (patientName && patientAge) {
            try {
                await healthcareSystem.methods.registerPatient().send({ from: selectedAccount, gas: 5000000 });
                alert('Patient registered successfully!');
                setPatientName('');
                setPatientAge('');
            } catch (error) {
                console.error(error);
                alert('Failed to register patient.');
            }
        } else {
            alert('Please provide both patient name and age.');
        }
    };

    const grantAccess = async () => {
        try {
            await healthcareSystem.methods.grantAccessToDoctor(doctorAddress).send({ from: selectedAccount });
            alert('Access granted successfully!');
            setDoctorAddress('');
        } catch (error) {
            console.error(error);
            alert('Failed to grant access.');
        }
    };

    return (
        <div>
            <h2>Patient Page</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter Patient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    style={{ margin: '10px', padding: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Enter Patient Age"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    style={{ margin: '10px', padding: '10px' }}
                />
                <button onClick={registerPatient} style={{ margin: '10px', padding: '10px' }}>Register Patient</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Doctor Address"
                    value={doctorAddress}
                    onChange={(e) => setDoctorAddress(e.target.value)}
                    style={{ margin: '10px', padding: '10px' }}
                />
                <button onClick={grantAccess} style={{ margin: '10px', padding: '10px' }}>Grant Access</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    style={{ margin: '10px', padding: '10px' }}
                />
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setTreatmentFile(e.target.files[0])}
                    style={{ margin: '10px', padding: '10px' }}
                />
                <button onClick={updateRecord} style={{ margin: '10px', padding: '10px' }}>Update Medical Record</button>
            </div>
        </div>
    );
};

export default PatientPage;