import React, { useState } from 'react';

const AdminPage = ({ healthcareSystem, selectedAccount }) => {
    const [doctorAddress, setDoctorAddress] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [doctorSpecialization, setDoctorSpecialization] = useState('');

    const registerDoctor = async () => {
        if (doctorAddress && doctorName && doctorSpecialization) {
            try {
                await healthcareSystem.methods.registerDoctor(doctorAddress).send({ from: selectedAccount });
                alert('Doctor registered successfully!');
                setDoctorAddress('');
                setDoctorName('');
                setDoctorSpecialization('');
            } catch (error) {
                console.error(error);
                alert('Failed to register doctor.');
            }
        } else {
            alert('Please provide doctor address, name, and specialization.');
        }
    };

    return (
        <div>
            <h2>Admin Page</h2>
            <div>
                <input 
                    type="text" 
                    placeholder="Enter Doctor Address" 
                    value={doctorAddress} 
                    onChange={(e) => setDoctorAddress(e.target.value)} 
                    style={{ margin: '10px', padding: '10px' }} 
                />
                {/* <input 
                    type="text" 
                    placeholder="Enter Doctor Name" 
                    value={doctorName} 
                    onChange={(e) => setDoctorName(e.target.value)} 
                    style={{ margin: '10px', padding: '10px' }} 
                />
                <input 
                    type="text" 
                    placeholder="Enter Doctor Specialization" 
                    value={doctorSpecialization} 
                    onChange={(e) => setDoctorSpecialization(e.target.value)} 
                    style={{ margin: '10px', padding: '10px' }} 
                /> */}
                <button onClick={registerDoctor} style={{ margin: '10px', padding: '10px' }}>Register Doctor</button>
            </div>
        </div>
    );
};

export default AdminPage;