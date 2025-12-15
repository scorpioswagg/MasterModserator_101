import { useState } from "react";
import { useLocation } from "wouter";
import { ShieldAlert, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Fake network delay
    setTimeout(() => {
      if (password === "admin") { // Mock password
        localStorage.setItem("auth", "true");
        setLocation("/");
        toast({
            title: "Access Granted",
            description: "Welcome back, Commander.",
            className: "border-primary text-primary"
        });
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Invalid credentials.",
        });
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      
      <Card className="w-full max-w-md border-border bg-card/50 backdrop-blur-xl relative z-10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center ring-1 ring-primary/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <ShieldAlert className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-mono tracking-tight text-foreground">MASTER MOD 101</CardTitle>
            <CardDescription className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
              Restricted Access // Authorized Personnel Only
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter Access Code"
                  className="pl-9 font-mono bg-background/50 border-input focus-visible:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono tracking-wide uppercase transition-all duration-300 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]"
                disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Initialize Session"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
