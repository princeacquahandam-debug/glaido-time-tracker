import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import glaidoLogo from "@/assets/glaido-logo.png";

interface AppHeaderProps {
  links: { label: string; to: string }[];
  onLogout: () => void;
}

const AppHeader = ({ links, onLogout }: AppHeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-3 bg-card">
      <div className="flex items-center gap-8">
        <Link to="/">
          <img src={glaidoLogo} alt="Glaido" className="h-6" />
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-foreground">
        <LogOut className="h-4 w-4 mr-1.5" />
        Logout
      </Button>
    </header>
  );
};

export default AppHeader;
