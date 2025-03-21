// Frontend/Web/utils/auth-debug.ts
export async function testAuthCredentials(email: string, password: string) {
    try {
      console.log(`Attempting to authenticate user: ${email}`);
      
      // Get API URL from environment
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const API_PREFIX = '/api'; // Make sure this matches your backend
      
      // Make direct fetch call to avoid any middleware issues
      const response = await fetch(`${API_URL}${API_PREFIX}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Log the raw response status
      console.log(`Login response status: ${response.status}`);
      
      // Try to parse response as JSON (may fail if not JSON)
      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (parseError) {
        const text = await response.text();
        console.log('Raw response text:', text);
        throw new Error(`Failed to parse response: ${parseError.message}`);
      }
      
      // If response is not ok, throw error with details
      if (!response.ok) {
        throw new Error(`Authentication failed: ${data.message || response.statusText}`);
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Authentication error:', error);
      return { 
        success: false, 
        error: error.message || 'Unknown authentication error' 
      };
    }
  }
  
  // This function creates an admin user directly via API
  export async function createAdminUser() {
    try {
      // Get API URL from environment
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const API_PREFIX = '/api';
      
      // Create admin user with fixed credentials
      const adminData = {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@navigo.com',
        password: 'Admin@123', // Strong password
        role: 'admin'
      };
      
      console.log('Attempting to create admin user:', adminData.email);
      
      // Register the admin user
      const response = await fetch(`${API_URL}${API_PREFIX}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
      
      console.log(`Create admin response status: ${response.status}`);
      
      // Try to parse response
      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (parseError) {
        const text = await response.text();
        console.log('Raw response text:', text);
        throw new Error(`Failed to parse response: ${parseError.message}`);
      }
      
      // If successful, return the token and user
      if (response.ok) {
        return { 
          success: true, 
          message: 'Admin user created successfully', 
          token: data.access_token,
          user: data.user
        };
      } else {
        // The user might already exist
        if (response.status === 400 && data.message?.includes('exists')) {
          // Try to login with the admin user
          const loginResult = await testAuthCredentials(adminData.email, adminData.password);
          if (loginResult.success) {
            return { 
              success: true, 
              message: 'Admin user already exists, logged in successfully',
              token: loginResult.data.access_token,
              user: loginResult.data.user
            };
          }
        }
        
        throw new Error(`Failed to create admin user: ${data.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Create admin error:', error);
      return { 
        success: false, 
        error: error.message || 'Unknown error creating admin user'
      };
    }
  }