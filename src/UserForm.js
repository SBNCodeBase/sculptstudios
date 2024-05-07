import React, { useState } from 'react';

const UserForm = () => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, mobileNumber }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      setFullName('');
      setMobileNumber('');
      alert('User data saved successfully!');
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('An error occurred while saving user data. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <label htmlFor="mobileNumber">Mobile Number:</label>
      <input
        type="tel"
        id="mobileNumber"
        name="mobileNumber"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        required
      />
      <button type="submit">Save User</button>
    </form>
  );
};

export default UserForm;
