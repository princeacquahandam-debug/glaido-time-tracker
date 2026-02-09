import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";

const adminLinks = [
  { label: "Transcripts", to: "/admin" },
  { label: "Tasks", to: "/admin/tasks" },
  { label: "Users", to: "/admin/users" },
  { label: "Approvals", to: "/admin/approvals" },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Will be wired to Supabase auth later
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader links={adminLinks} onLogout={handleLogout} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
