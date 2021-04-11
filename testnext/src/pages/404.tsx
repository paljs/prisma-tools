import React from 'react';
import { useRouter } from 'next/router';

export default function Error() {
  const router = useRouter();
  return (
    <div style={{ height: '100vh' }} className="flex items-center justify-center w-full">
      <div style={{ maxWidth: '20rem' }} className="flex flex-col justify-center items-center">
        <h1>404 Page Not Found</h1>
        <small className="mb-2">The page you were looking for doesn&apos;t exist</small>
        <button
          className="p-4 rounded-md bg-blue-500 text-white mt-1 shadow-md hover:bg-blue-700"
          onClick={() => router.push('/')}
        >
          Take me home
        </button>
      </div>
    </div>
  );
}
