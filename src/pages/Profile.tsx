import { useState } from "react";
import { Settings, ChevronRight, Crown, Moon, LogOut, HelpCircle, Shield, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PremiumDialog } from "@/components/PremiumDialog";
import imgHero from "@/assets/hero-home.jpg";

const stats = [
  { label: "Workouts", value: "24" },
  { label: "Streak", value: "7 days" },
  { label: "Level", value: "Intermediate" },
];

// menuItems moved inside component to access setPremiumOpen

export default function Profile() {
  const [premiumOpen, setPremiumOpen] = useState(false);

  const menuItems = [
    { icon: Crown, label: "Go Premium", subtitle: "Unlock advanced features", accent: true, action: () => setPremiumOpen(true) },
    { icon: Settings, label: "Preferences", subtitle: "Level, goals, equipment", action: () => toast("Preferences coming soon ⚙️") },
    { icon: Moon, label: "Appearance", subtitle: "Light / Dark / System", action: () => { document.documentElement.classList.toggle("dark"); toast("Theme toggled 🌓"); } },
    { icon: HelpCircle, label: "Help & FAQ", subtitle: "Get support", action: () => toast("Help center coming soon 📖") },
    { icon: Shield, label: "Privacy & Terms", subtitle: "Legal information", action: () => toast("Privacy & Terms coming soon 🔒") },
    { icon: Mail, label: "Contact Us", subtitle: "Send feedback", action: () => toast("Contact form coming soon ✉️") },
  ];

  return (
    <div className="px-5 pt-6 safe-top">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Profile</h1>
        <button className="w-10 h-10 rounded-full bg-card card-shadow flex items-center justify-center">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* User Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-5 rounded-2xl bg-card card-shadow"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-background">
            <img src={imgHero} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg">Alex Athlete</h2>
            <p className="text-sm text-muted-foreground">Training since Jan 2025</p>
            <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full">
              Free Plan
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-2.5 rounded-xl bg-muted/50">
              <p className="font-display font-bold">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <section className="mt-6">
        <h3 className="font-display font-bold mb-3">Achievements</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {[
            { emoji: "🎯", title: "First Workout", earned: true },
            { emoji: "🔥", title: "7-Day Streak", earned: true },
            { emoji: "💪", title: "10 Push-Ups", earned: true },
            { emoji: "🏆", title: "First Pull-Up", earned: false },
            { emoji: "🤸", title: "Handstand Hold", earned: false },
          ].map((a) => (
            <div
              key={a.title}
              className={`flex-shrink-0 w-20 text-center p-3 rounded-2xl ${a.earned ? "bg-card card-shadow" : "bg-muted/50 opacity-40"}`}
            >
              <span className="text-2xl">{a.emoji}</span>
              <p className="text-[10px] font-medium mt-1 leading-tight">{a.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="mt-6 space-y-1">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={item.action}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left group"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.accent ? "bg-primary/15" : "bg-muted"}`}>
              <item.icon className={`w-4 h-4 ${item.accent ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-[10px] text-muted-foreground">{item.subtitle}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.button>
        ))}
      </section>

      {/* Logout */}
      <button onClick={() => toast("Logged out successfully 👋")} className="w-full flex items-center justify-center gap-2 mt-6 py-3 text-destructive text-sm font-semibold">
        <LogOut className="w-4 h-4" /> Log Out
      </button>

      <PremiumDialog open={premiumOpen} onOpenChange={setPremiumOpen} />
    </div>
  );
}
