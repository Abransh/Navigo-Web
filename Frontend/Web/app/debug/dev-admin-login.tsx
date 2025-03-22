// app/dev-admin-login.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function DevAdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Simple password check (only for development)
    if (password === 'admin123') {
      // Set up admin bypass
      const adminUser = {
        id: 'admin-dev',
        email: 'admin@navigo.com',
        firstName: 'Admin',
        lastName: 'Developer',
        role: 'admin'
      };
      
      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('forceAdmin', 'true');
      localStorage.setItem('token', 'mock-admin-token-for-development');
      
      // Redirect to admin
      router.push('/admin');
    } else {
      setError('Invalid development password');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Development Admin Access</h1>
        <p className="text-center text-gray-500">This is only for development purposes.</p>
        
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Development Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter development password"
            />
          </div>
          
          <Button
            onClick={handleLogin}
            className="w-full"
          >
            Access Admin
          </Button>
          
          <p className="text-xs text-center text-gray-500">
            Password hint: admin123
          </p>
        </div>
      </div>
    </div>
  );
}