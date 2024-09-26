// src/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, [refresh]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/employees/${id}`);
            setRefresh(!refresh); // Refresh the employee list
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div>
            <h1>Employee Management</h1>
            <EmployeeForm onSuccess={() => { setRefresh(!refresh); setEditingEmployee(null); }} employee={editingEmployee} />
            <h2>Employee List</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.name} - {employee.position} - ${employee.salary}
                        <button onClick={() => setEditingEmployee(employee)}>Edit</button>
                        <button onClick={() => handleDelete(employee.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;