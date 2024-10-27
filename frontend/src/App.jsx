import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DoctorPage from './pages/DoctorPage';
import PatientPage from './pages/PatientPage';
import AdminPage from './pages/AdminPage';
import Web3 from 'web3';

const App = () => {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [healthcareSystem, setHealthcareSystem] = useState(null);
    const navigate = useNavigate();

    const abi = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_initialSupply",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "doctor",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "patient",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "accessGranted",
            "type": "bool"
          }
        ],
        "name": "AccessAttempt",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "patient",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "doctor",
            "type": "address"
          }
        ],
        "name": "AccessGranted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "patient",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "doctor",
            "type": "address"
          }
        ],
        "name": "AccessRevoked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "doctor",
            "type": "address"
          }
        ],
        "name": "DoctorRegistered",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "patient",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "ipfsHash",
            "type": "string"
          }
        ],
        "name": "MedicalRecordUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "patient",
            "type": "address"
          }
        ],
        "name": "PatientRegistered",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "admin",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "doctors",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_patient",
            "type": "address"
          }
        ],
        "name": "emergencyAccess",
        "outputs": [
          {
            "internalType": "string",
            "name": "ipfsHash",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_doctor",
            "type": "address"
          }
        ],
        "name": "grantAccessToDoctor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "patients",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_doctor",
            "type": "address"
          }
        ],
        "name": "registerDoctor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "registerPatient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_doctor",
            "type": "address"
          }
        ],
        "name": "revokeAccessFromDoctor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_ipfsHash",
            "type": "string"
          }
        ],
        "name": "updateMedicalRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_patient",
            "type": "address"
          }
        ],
        "name": "viewMedicalRecord",
        "outputs": [
          {
            "internalType": "string",
            "name": "ipfsHash",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

    const initialize = async (userType) => {
        if (window.ethereum) {
            try {
              const web3 = new Web3('http://127.0.0.1:8545');
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = window.ethereum.selectedAddress;
                setSelectedAccount(account);
                console.log('MetaMask Account:', account);

                const system = new web3.eth.Contract(abi, contractAddress);
                setHealthcareSystem(system);
                console.log("healthcareSystem", system);

                // Redirect based on userType
                if (system) {
                    navigate(`/${userType}`);
                }else {
                  console.error("Failed to initialize healthcare system.");
              }
            } catch (error) {
                console.error("User  denied MetaMask connection.");
                alert("Please allow access to your MetaMask account.");
            }
        } else {
            alert('Please install MetaMask to use this DApp.');
        }
    };

    const handleUser = (type) => {
        // setUser(type);
        initialize(type);
    };

    // useEffect(() => {
    //     if (selectedAccount && userType) {
    //         navigate(`/${userType}`);
    //     }
    // }, [selectedAccount, userType, navigate]);

    return (
        <div style={{ padding: '20px' }}>
            <Routes>
                <Route path="/" element={<HomePage TypeSelect={handleUser} />} />
                <Route path="/doctor" element={<DoctorPage healthcareSystem={healthcareSystem} selectedAccount={selectedAccount} />} />
                <Route path="/patient" element={<PatientPage healthcareSystem={healthcareSystem} selectedAccount={selectedAccount} />} />
                <Route path="/admin" element={<AdminPage healthcareSystem={healthcareSystem} selectedAccount={selectedAccount} />} />
            </Routes>
        </div>
    );
};

export default App;