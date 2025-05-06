import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';


const Inventory = () => {
    const [items, setItems] = useState([]);
    const { isLoggedIn, logout } = useAuth(); // ✅ get auth + logout from context

    useEffect(() => {
        axios.get('http://localhost:5195/api/KitchenItems')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, []);

    const handleMarkUsed = (id) => {
        axios.put(`http://localhost:5195/api/KitchenItems/${id}/mark-used`)
            .then(() => {
                setItems(prev =>
                    prev.map(item =>
                        item.id === id ? { ...item, status: "Used" } : item
                    )
                );
            })
            .catch(err => console.error('Error marking used:', err));
    };

    const handleMarkExpired = (id) => {
        axios.put(`http://localhost:5195/api/KitchenItems/${id}/mark-expired`)
            .then(() => {
                setItems(prev =>
                    prev.map(item =>
                        item.id === id ? { ...item, status: "Expired" } : item
                    )
                );
            })
            .catch(err => console.error('Error marking expired:', err));
    };

    const handleResetStatus = (id) => {
        axios.put(`http://localhost:5195/api/KitchenItems/${id}/reset-status`)
            .then(() => {
                setItems(prev =>
                    prev.map(item =>
                        item.id === id ? { ...item, status: "Available" } : item
                    )
                );
            })
            .catch(err => console.error('Error resetting status:', err));
    };

    return (
        <div>
            <h1>Kitchen Inventory</h1>

            {isLoggedIn && (
                <>
                    <p style={{ color: 'green' }}>✅ Logged in as admin</p>
                    <button onClick={logout} style={{ marginBottom: '20px' }}>Logout</button>
                </>
            )}

            {!isLoggedIn && (
                <p style={{ color: 'red' }}>⚠️ You must log in to perform actions</p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {items.map(item => (
                    <div key={item.id} style={{
                        border: '1px solid gray',
                        borderRadius: '8px',
                        padding: '16px',
                        width: '220px'
                    }}>
                        <h3>
                            {item.itemName}
                            {item.status === "Expired" && <span style={{ color: 'gray' }}> (EXPIRED)</span>}
                            {item.status === "Used" && <span style={{ color: 'red' }}> (USED)</span>}
                        </h3>

                        <p>Quantity: {item.quantity} {item.unit}</p>
                        <p>Expires: {new Date(item.expirationDate).toLocaleDateString()}</p>
                        <p>Zone: {item.refrigeratorZone}</p>
                        <p>Temp: {item.storageTemperature}</p>

                        {isLoggedIn && (
                            <>
                                <button
                                    onClick={() => handleMarkUsed(item.id)}
                                    disabled={item.status === "Used" || item.status === "Expired"}
                                    style={{
                                        marginTop: '8px',
                                        opacity: item.status === "Used" || item.status === "Expired" ? 0.5 : 1,
                                        cursor: item.status === "Used" || item.status === "Expired" ? 'not-allowed' : 'pointer',
                                        marginRight: '8px'
                                    }}
                                >
                                    Mark as Used
                                </button>

                                <button
                                    onClick={() => handleMarkExpired(item.id)}
                                    disabled={item.status === "Expired" || item.status === "Used"}
                                    style={{
                                        marginTop: '8px',
                                        opacity: item.status === "Expired" || item.status === "Used" ? 0.5 : 1,
                                        cursor: item.status === "Expired" || item.status === "Used" ? 'not-allowed' : 'pointer',
                                        marginRight: '8px'
                                    }}
                                >
                                    Mark as Expired
                                </button>

                                <button
                                    onClick={() => handleResetStatus(item.id)}
                                    disabled={item.status === "Available"}
                                    style={{
                                        marginTop: '8px',
                                        opacity: item.status === "Available" ? 0.5 : 1,
                                        cursor: item.status === "Available" ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Reset
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
