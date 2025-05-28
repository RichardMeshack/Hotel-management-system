import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms')
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch rooms:', err);
        setRooms([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Room List</h2>
      <ul>
        {rooms.length > 0 ? (
          rooms.map(room => (
            <li key={room._id}>
              {room.number} - {room.type} - ${room.price}
            </li>
          ))
        ) : (
          <li>No rooms available.</li>
        )}
      </ul>
    </div>
  );
};

export default RoomList;
