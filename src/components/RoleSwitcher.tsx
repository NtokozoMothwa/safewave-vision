import { setUserRole } from '@/utils/auth';

const RoleSwitcher = () => {
  const changeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as any);
    window.location.reload(); // simulate auth refresh
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-2 shadow rounded">
      <label className="mr-2">Switch Role:</label>
      <select onChange={changeRole} defaultValue="guard">
        <option value="admin">Admin</option>
        <option value="responder">Responder</option>
        <option value="guard">Guard</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;
