import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";

const employeeLinks = [
  { label: "My Tasks", to: "/app" },
  { label: "My Time", to: "/app/time" },
];

const EmployeeLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Will be wired to Supabase auth later
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader links={employeeLinks} onLogout={handleLogout} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
