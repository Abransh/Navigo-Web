// components/dev/ApiDiagnostics.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import apiClient, { basePath } from '@/services/api-client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

// Only render this component in development mode
// This helps diagnose API connectivity issues

export function ApiDiagnostics() {
  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const [results, setResults] = useState<Array<{endpoint: string, status: string, message: string}>>([]);
  const [customEndpoint, setCustomEndpoint] = useState('/auth/debug');
  const [isTestingEndpoint, setIsTestingEndpoint] = useState(false);
  const [isTestingAuth, setIsTestingAuth] = useState(false);
  
  // Common API endpoints to test
  const basicEndpoints = [
    '/auth/debug',
    `${basePath}/auth/debug`,
    '/',
    `${basePath}`,
    '/auth/current-user',
    `${basePath}/auth/current-user`,
    '/auth/me',
    `${basePath}/auth/me`,
  ];

  const testEndpoint = async (endpoint: string) => {
    try {
      const response = await apiClient.get(endpoint, {
        timeout: 5000, // 5 second timeout for faster feedback
      });
      
      return {
        endpoint,
        status: 'success',
        message: `Status: ${response.status} ${response.statusText}`
      };
    } catch (error: any) {
      return {
        endpoint,
        status: 'error',
        message: error.response 
          ? `Error ${error.response.status}: ${error.response.statusText}` 
          : `Error: ${error.message}`
      };
    }
  };

  const testAuth = async () => {
    setIsTestingAuth(true);
    
    const token = localStorage.getItem('token');
    let authStatus = "";
    
    if (!token) {
      authStatus = "No authentication token found in localStorage";
      toast.error(authStatus);
      setIsTestingAuth(false);
      return;
    }
    
    try {
      // Decode token without verification 
      const parts = token.split('.');
      if (parts.length !== 3) {
        authStatus = "Invalid token format (not a proper JWT)";
        toast.error(authStatus);
        setIsTestingAuth(false);
        return;
      }
      
      const payload = JSON.parse(atob(parts[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      
      if (expiry < now) {
        authStatus = `Token has expired (${new Date(expiry).toLocaleString()})`;
        toast.error(authStatus);
      } else {
        const timeLeft = Math.floor((expiry - now) / 1000 / 60); // Minutes left
        authStatus = `Token is valid (expires in ${timeLeft} minutes)`;
        toast.success(authStatus);
        
        // Try to get user profile
        try {
          const userResult = await testEndpoint('/auth/current-user');
          toast.success(`User profile API check: ${userResult.status}`);
        } catch (error) {
          toast.error('Failed to check user profile endpoint');
        }
      }
      
      console.log('Token payload:', payload);
    } catch (error: any) {
      authStatus = `Error decoding token: ${error.message}`;
      toast.error(authStatus);
    }
    
    setIsTestingAuth(false);
  };

  const testAllEndpoints = async () => {
    setIsTestingEndpoint(true);
    setResults([]);
    
    // Test basic endpoints sequentially
    const allResults = [];
    
    for (const endpoint of basicEndpoints) {
      const result = await testEndpoint(endpoint);
      allResults.push(result);
    }
    
    setResults(allResults);
    setIsTestingEndpoint(false);
    
    // Show summary toast
    const successCount = allResults.filter(r => r.status === 'success').length;
    if (successCount > 0) {
      toast.success(`${successCount}/${allResults.length} endpoints accessible`);
    } else {
      toast.error('No endpoints accessible. Check API server and CORS settings.');
    }
  };

  const testCustomEndpoint = async () => {
    setIsTestingEndpoint(true);
    const result = await testEndpoint(customEndpoint);
    setResults([result]);
    setIsTestingEndpoint(false);
    
    if (result.status === 'success') {
      toast.success(`Endpoint accessible: ${customEndpoint}`);
    } else {
      toast.error(`Failed to access endpoint: ${customEndpoint}`);
    }
  };

  return (
    <Card className="mb-8 border-amber-200 bg-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-800">API Diagnostics</CardTitle>
        <CardDescription className="text-amber-700">
          Debug API connectivity issues (development mode only)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Button 
                variant="outline" 
                onClick={testAllEndpoints} 
                disabled={isTestingEndpoint}
                className="w-full border-amber-500 text-amber-700 hover:bg-amber-100"
              >
                Test Common Endpoints
              </Button>
            </div>
            <div>
              <Button 
                variant="outline" 
                onClick={testAuth} 
                disabled={isTestingAuth}
                className="w-full border-amber-500 text-amber-700 hover:bg-amber-100"
              >
                Test Authentication
              </Button>
            </div>
          </div>
          
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="custom-endpoint" className="text-amber-700">Test Custom Endpoint</Label>
              <Input 
                id="custom-endpoint"
                value={customEndpoint}
                onChange={(e) => setCustomEndpoint(e.target.value)}
                className="border-amber-200"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={testCustomEndpoint} 
              disabled={isTestingEndpoint}
              className="flex-shrink-0 border-amber-500 text-amber-700 hover:bg-amber-100"
            >
              Test
            </Button>
          </div>
          
          {results.length > 0 && (
            <div className="mt-4 border rounded-md border-amber-200 overflow-hidden">
              <div className="bg-amber-100 px-4 py-2 font-medium text-amber-800">
                Results
              </div>
              <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
                {results.map((result, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded ${
                      result.status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}
                  >
                    <div className="font-medium">{result.endpoint}</div>
                    <div className="text-sm">{result.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-xs text-amber-600 mt-2">
            <p>API Configuration:</p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Base URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}</li>
              <li>Base Path: {basePath}</li>
              <li>Auth Token: {localStorage.getItem('token') ? '✓ Present' : '✗ Missing'}</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-amber-700">
        This component is only visible in development mode to help diagnose API issues.
      </CardFooter>
    </Card>
  );
}