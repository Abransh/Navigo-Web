// Frontend/Web/app/debug/admin-test.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import apiClient from '@/services/api-client';
import { ADMIN_PATHS } from '@/services/admin-paths';

export default function AdminApiTest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testAdminEndpoint = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(ADMIN_PATHS.STATS);
      setResult(response.data);
    } catch (err: any) {
      setError(err.message);
      console.error('Admin API test error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-md">
      <h2 className="text-xl font-bold">Admin API Test</h2>
      <Button onClick={testAdminEndpoint} disabled={loading}>
        {loading ? 'Testing...' : 'Test Admin API'}
      </Button>
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          <p className="font-medium">Error:</p>
          <pre className="mt-2 whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}
      
      {result && (
        <div className="p-4 bg-green-50 text-green-700 rounded-md">
          <p className="font-medium">Success!</p>
          <pre className="mt-2 whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}