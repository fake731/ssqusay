import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const DevLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username.includes("@") ? username : `${username}@ottoman.dev`,
        password,
      });

      if (error) throw error;

      // Check if user has developer role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "developer");

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        toast({
          title: "غير مصرّح",
          description: "ما عندك صلاحيات مطوّر",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({ title: "أهلاً وسهلاً!", description: "تم تسجيل الدخول بنجاح" });
      navigate("/لوحة-التحكم");
    } catch (err: any) {
      toast({
        title: "خطأ",
        description: err.message || "فشل تسجيل الدخول",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="ottoman-card p-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-amiri text-gradient-gold">لوحة المطوّر</h1>
            <p className="text-muted-foreground font-iphone text-sm">سجّل دخولك للوصول للوحة التحكم</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="dev-username" className="text-sm text-muted-foreground font-iphone">اسم المستخدم</label>
              <Input
                id="dev-username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="font-iphone text-right"
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dev-password" className="text-sm text-muted-foreground font-iphone">كلمة السر</label>
              <div className="relative">
                <Input
                  id="dev-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة السر"
                  className="font-iphone text-right pl-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full font-iphone bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "جاري الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default DevLogin;
