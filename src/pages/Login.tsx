import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import glaidoLogo from "@/assets/glaido-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Placeholder — will be replaced with Supabase auth
    setTimeout(() => {
      if (email === "admin@glaido.local") {
        navigate("/admin");
      } else {
        navigate("/app");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex justify-center">
          <img src={glaidoLogo} alt="Glaido" className="h-8" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground text-xs uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@glaido.local"
              required
              className="bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-muted-foreground text-xs uppercase tracking-wider">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:bg-primary/90 transition-all"
          >
            {loading ? "Signing in…" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
