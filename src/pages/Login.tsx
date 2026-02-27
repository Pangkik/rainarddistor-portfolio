import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/admin");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <a href="/" className="font-serif text-2xl font-semibold text-foreground tracking-wide">
            raingoesaway
          </a>
          <p className="text-sm font-sans font-light tracking-[0.2em] uppercase text-muted-foreground mt-3">
            Admin Access
          </p>
        </div>

        <div className="silver-line mb-8" />

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-muted-foreground">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-muted-foreground">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="bg-secondary border-border"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <a href="/" className="hover:text-primary transition-colors">← Back to site</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
