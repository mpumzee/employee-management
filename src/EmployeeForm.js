// src/EmployeeForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = ({ onSuccess, employee }) => {
    const [name, setName] = useState(employee ? employee.name : '');
    const [position, setPosition] = useState(employee ? employee.position : '');
    const [salary, setSalary] = useState(employee ? employee.salary : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, position, salary };
        try {
            if (employee) {
                // Update existing employee
                await axios.put(`http://127.0.0.1:8000/api/employees/${employee.id}`, data);
            } else {
                // Create new employee
                await axios.post('http://127.0.0.1:8000/api/employees', data);
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} required />
            <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
            <button type="submit">{employee ? 'Update' : 'Add'} Employee</button>
        </form>
    );
};

export default EmployeeForm;