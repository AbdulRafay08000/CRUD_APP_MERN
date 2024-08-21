import React, { useState, useEffect } from "react";
import axios from 'axios';

function DisplayUser() {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');

    useEffect(() => {
        // Function to fetch users from the server
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:3000/readalluser');
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                alert('Error fetching users');
            }
        };

        fetchUsers(); // Call the async function to fetch users
    }, []); // Empty dependency array to run only on component mount

    // Function to delete a user
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/delete/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    // Function to initiate user update
    const handleEditClick = (user) => {
        setEditUserId(user._id);
        setUpdatedName(user.name);
        setUpdatedEmail(user.email);
        setUpdatedPassword(user.password);
    };

    // Function to update user
    const updateUser = async () => {
        try {
            await axios.put(`http://localhost:3000/updateuser/${editUserId}`, {
                name: updatedName,
                email: updatedEmail,
                password: updatedPassword,
            });
            setUsers(users.map(user =>
                user._id === editUserId
                    ? { ...user, name: updatedName, email: updatedEmail, password: updatedPassword }
                    : user
            ));
            setEditUserId(null);
            alert('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {editUserId === user._id ? (
                                    <input
                                        type="text"
                                        value={updatedName}
                                        onChange={(e) => setUpdatedName(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {editUserId === user._id ? (
                                    <input
                                        type="email"
                                        value={updatedEmail}
                                        onChange={(e) => setUpdatedEmail(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {editUserId === user._id ? (
                                    <>
                                        <button
                                            onClick={updateUser}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => setEditUserId(null)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayUser;
