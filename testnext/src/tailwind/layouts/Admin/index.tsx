import React from 'react';
import { useRouter } from 'next/router';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AdminLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const auth = router.pathname === '/admin/auth';
  return auth ? (
    <>{children}</>
  ) : (
    <>
      <Sidebar />
      <div className="relative overflow-auto h-screen md:ml-64 bg-gray-100">
        <Navbar />
        {/* Header */}
        <div className="relative bg-pink-600 md:pt-12 px-4 shadow-lg">
          <div className="px-4 md:px-10 mx-auto w-full" />
        </div>
        <div className="p-3 md:p-6 mx-auto w-full">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
