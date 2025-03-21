// utils/create-admin.js
// Run this script with Node.js to create an admin user

// Replace with your actual API URL
const API_URL = 'http://localhost:3001/api';
const axios = require('axios');
const bcrypt = require('bcrypt');

async function createAdminUser() {
  try {
    // Create admin user directly
    const response = await axios.post(`${API_URL}/auth/register`, {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@navigo.com',
      password: 'admin123',  // Remember to use a strong password in production
      role: 'admin'
    });

    console.log('Admin user created successfully:', response.data);
    console.log('\nYou can now log in with:');
    console.log('Email: admin@navigo.com');
    console.log('Password: admin123');
  } catch (error) {
    if (error.response?.data?.message?.includes('already exists')) {
      console.log('Admin user already exists. You can log in with:');
      console.log('Email: admin@navigo.com');
      console.log('Password: admin123');
    } else {
      console.error('Error creating admin user:', error.response?.data || error.message);
    }
  }
}

createAdminUser();