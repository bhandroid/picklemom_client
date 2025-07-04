import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const OrdersPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Orders management interface will be implemented here.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;