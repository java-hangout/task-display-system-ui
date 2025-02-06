import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BusinessUnitEventList = ({ buName }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, [buName]); // Refetch data whenever buName changes

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:8084/fetch/bu/${buName}`);
            // const response = await axios.get(`http://localhost:8084/fetch/bu/IT`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to fetch events.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                <h2 style={{ textAlign: 'center' }}>Events for Business Unit: {buName}</h2>

                <table
                    style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        margin: '20px 0',
                        border: '1px solid #ddd',
                        textAlign: 'left',
                    }}
                >
                    <thead>
                        <tr style={{ border: '1px solid black' }}>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Event ID</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Title</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Description</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Type</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Status</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Created Date</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Updated Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id} style={{ border: '1px solid black' }}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{event.id}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{event.title}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{event.description}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{event.type}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    {event.eventActiveFlag ? 'Active' : 'Inactive'}
                                </td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    {new Date(event.createdDate).toLocaleString()}
                                </td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    {new Date(event.updatedDate).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BusinessUnitEventList;
