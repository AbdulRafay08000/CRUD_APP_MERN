import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/createUser', { name, email, password });
            console.log(res.data);
            alert("User created successfully");
            // Optionally reset the form fields
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
            alert("Error creating user");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create User</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
                Create User
            </button>
        </form>
    );
}

export default CreateUser;
