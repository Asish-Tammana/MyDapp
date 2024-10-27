import React from 'react';

const HomePage = ({ TypeSelect }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome to the Healthcare System</h1>
            <h2>Select Your Role</h2>
            <button onClick={() => TypeSelect('doctor')} style={{ margin: '10px', padding: '10px' }}>Doctor</button>
            <button onClick={() => TypeSelect('patient')} style={{ margin: '10px', padding: '10px' }}>Patient</button>
            <button onClick={() => TypeSelect('admin')} style={{ margin: '10px', padding: '10px' }}>Admin</button>
        </div>
    );
};

export default HomePage;