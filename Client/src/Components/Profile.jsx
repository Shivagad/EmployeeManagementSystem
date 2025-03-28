
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'


const AdminProfile = () => {
    const [admin, setAdmin] = useState([]);
    const {id} = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get('http://localhost:3000/admin/profile'+id)
            .then(result => {
                setAdmin(result.data[0]);
            })
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:3000/admin/logout')
            .then(() => {
              if(result.data.Status) {
                localStorage.removeItem("valid")
                navigate('/')
              }
            })
            .catch(err => console.log(err));
    };
    return (
        <div>
           <div className="p-2 d-flex justify-content-center shadow">
            <h2>Admin Profile</h2>
            <div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {admin.name}</h3>
                <h3>Email: {admin.email}</h3>
                </div>
            </div>
            <button className='btn btn-primary me-2'>Edit</button>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
            </div>
        </div>
    );
};

export default AdminProfile;
