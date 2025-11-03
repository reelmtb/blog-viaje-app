'use client';

import { useState } from 'react';

interface CreateTripFormProps {
  starterId: string; // Current user ID
}

export default function CreateTripForm({ starterId }: CreateTripFormProps) {
  const [tripName, setTripName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trip_name: tripName,
          starter_id: starterId,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Something went wrong');
      setSuccessMessage(`Trip "${data.trip_name}" created!`);
      setTripName('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-sm max-w-md">
      <div>
        <label htmlFor="tripName" className="block font-medium mb-1">
          Trip Name
        </label>
        <input
          id="tripName"
          type="text"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Trip'}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
    </form>
  );
}
