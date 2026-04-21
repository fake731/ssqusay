import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, Shield, Trash2 } from "lucide-react";

interface UserRole {
  id: string;
  user_id: string;
  role: string;
}

interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  role: string | null;
  created_at: string | null;
}

const UserManagementTab = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const { toast } = useToast();

  const load = useCallback(async () => {
    const { data: p } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (p) setProfiles(p as Profile[]);
    const { data: r } = await supabase.from("user_roles").select("*");
    if (r) setRoles(r as UserRole[]);
  }, []);

  useEffect(() => { load(); }, [load]);

  const getUserRoles = (userId: string) => roles.filter((r) => r.user_id === userId);

  const addRole = async (userId: string, role: string) => {
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: role as any });
    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تمت الإضافة" });
      load();
    }
  };

  const removeRole = async (roleId: string) => {
    await supabase.from("user_roles").delete().eq("id", roleId);
    toast({ title: "تم الحذف" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-amiri text-lg text-primary">المستخدمون ({profiles.length})</h3>
        </div>
        <div className="space-y-3">
          {profiles.map((p) => {
            const userRoles = getUserRoles(p.id);
            return (
              <div key={p.id} className="p-4 bg-muted/20 rounded-xl border border-primary/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-iphone text-sm text-foreground">{p.display_name || p.username}</span>
                    <span className="font-mono text-[10px] text-muted-foreground mr-2">{p.id.slice(0, 8)}...</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-iphone">{p.created_at ? new Date(p.created_at).toLocaleDateString("ar") : ""}</span>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {userRoles.map((r) => (
                    <span key={r.id} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      <Shield className="w-3 h-3" />{r.role}
                      <button onClick={() => removeRole(r.id)} className="mr-1 text-destructive hover:text-destructive/80"><Trash2 className="w-3 h-3" /></button>
                    </span>
                  ))}
                  <select
                    onChange={(e) => { if (e.target.value) { addRole(p.id, e.target.value); e.target.value = ""; } }}
                    className="text-xs font-iphone rounded-lg bg-muted/30 border border-primary/10 px-2 py-1 text-muted-foreground"
                    defaultValue=""
                  >
                    <option value="" disabled>+ إضافة دور</option>
                    <option value="admin">admin</option>
                    <option value="developer">developer</option>
                    <option value="user">user</option>
                  </select>
                </div>
              </div>
            );
          })}
          {profiles.length === 0 && <p className="text-center text-muted-foreground font-iphone py-6">لا يوجد مستخدمون</p>}
        </div>
      </div>
    </div>
  );
};

export default UserManagementTab;