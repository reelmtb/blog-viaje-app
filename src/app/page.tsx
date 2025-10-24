'use client';

import CreateTripForm from '@/app/components/CreateTripForm';
import { useEffect, useState } from 'react';

// Mock current user
function useCurrentUser() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const mockUserId = '11111111-1111-1111-1111-111111111111';
    setUserId(mockUserId);
  }, []);

  return userId;
}

export default function HomePage() {
  const userId = useCurrentUser();

  if (!userId) return <p>Loading user...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Create a New Trip</h1>
      <CreateTripForm starterId={userId} />
    </div>
  );
}
