const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>User management tools</li>
        <li>Incident summary + analytics</li>
        <li>System status overview</li>
        <li>Access to configuration and integrations</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
