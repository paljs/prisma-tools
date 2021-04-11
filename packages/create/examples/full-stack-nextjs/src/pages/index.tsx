import * as React from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-start justify-center">
      <button
        className="p-4 rounded-md bg-blue-500 text-white mt-1 shadow-md hover:bg-blue-700"
        onClick={() => router.push('/admin')}
      >
        Go To Admin Pages
      </button>
    </div>
  );
};

export default Index;
