// app/debug/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ApiDiagnostics } from '@/components/dev/ApiDiagnostics';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// This is a simple debug page that only shows up in development mode
export default function DebugPage() {
  const router = useRouter();
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  
  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    router.push('/');
    return null;
  }
  
  useEffect(() => {
    // Collect environment variables that start with NEXT_PUBLIC_
    const publicEnvVars: Record<string, string> = {};
    
    Object.keys(process.env).forEach(key => {
      if (key.startsWith('NEXT_PUBLIC_')) {
        publicEnvVars[key] = process.env[key] || '';
      }
    });
    
    setEnvVars(publicEnvVars);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">API Debug Tools</h1>
        <Button 
          variant="outline" 
          onClick={() => router.push('/')}
        >
          Return to Home
        </Button>
      </div>
      
      <div className="space-y-8">
        <ApiDiagnostics />
        
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>
              Public environment variables available to the frontend (NEXT_PUBLIC_*)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(envVars).length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(envVars).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No public environment variables found</p>
            )}
            
            <div className="mt-4 bg-amber-50 p-4 rounded-md border border-amber-200">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> Make sure you have these key environment variables set in your <code>.env.local</code> file:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 text-amber-700 text-sm">
                <li>NEXT_PUBLIC_API_URL (e.g., http://localhost:3001)</li>
                <li>NEXT_PUBLIC_STRIPE_PUBLIC_KEY (for payments)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Local Storage</CardTitle>
            <CardDescription>
              Authentication data stored in localStorage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LocalStorageViewer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Component to view localStorage contents
function LocalStorageViewer() {
  const [storageItems, setStorageItems] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Get all localStorage items
    const items: Record<string, string> = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        items[key] = localStorage.getItem(key) || '';
      }
    }
    
    setStorageItems(items);
  }, []);
  
  const clearStorage = () => {
    if (confirm('Are you sure you want to clear all localStorage items? This will log you out.')) {
      localStorage.clear();
      setStorageItems({});
      window.location.reload();
    }
  };
  
  return (
    <>
      {Object.keys(storageItems).length > 0 ? (
        <div>
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(storageItems).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {key}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 break-all">
                      {key === 'token' ? 
                        `${value.substring(0, 20)}...${value.length - 40 > 0 ? `[${value.length - 40} more chars]` : ''}` : 
                        value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button 
              variant="destructive" 
              onClick={clearStorage}
            >
              Clear All Storage
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No items in localStorage</p>
      )}
    </>
  );
}