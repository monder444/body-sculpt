import { useState } from "react";
import { Plus, Calendar, Trophy, Flame, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { programs } from "@/data/workouts";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const mockCompletedDays = [true, false, true, true, false, false, false];

export default function Plans() {
  const [activeTab, setActiveTab] = useState<"my-plans" | "programs">("my-plans");

  return (
    <div className="px-5 pt-6 safe-top">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Plans</h1>
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Tab Toggle */}
      <div className="flex mt-4 bg-muted rounded-xl p-1">
        {(["my-plans", "programs"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === t ? "bg-card card-shadow text-foreground" : "text-muted-foreground"
            }`}
          >
            {t === "my-plans" ? "My Plans" : "Programs"}
          </button>
        ))}
      </div>

      {activeTab === "my-plans" ? (
        <div className="mt-4 space-y-4">
          {/* Weekly Progress */}
          <section className="p-4 rounded-2xl bg-card card-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> This Week
              </h3>
              <span className="text-xs text-primary font-semibold">3/5 days</span>
            </div>
            <div className="flex gap-2">
              {weekDays.map((day, i) => (
                <div key={day} className="flex-1 text-center">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-semibold mb-1 ${
                      mockCompletedDays[i] ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {mockCompletedDays[i] ? "✓" : ""}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{day}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Streak", value: "7", icon: Flame, color: "text-orange-500" },
              { label: "Workouts", value: "24", icon: Trophy, color: "text-primary" },
              { label: "This Month", value: "12", icon: Calendar, color: "text-blue-500" },
            ].map((stat) => (
              <div key={stat.label} className="p-3 rounded-xl bg-card card-shadow text-center">
                <stat.icon className={`w-5 h-5 mx-auto ${stat.color}`} />
                <p className="text-xl font-display font-bold mt-1">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Empty Plan CTA */}
          <div className="p-6 rounded-2xl border-2 border-dashed border-border text-center">
            <Plus className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="font-display font-bold">Create Your First Plan</h3>
            <p className="text-xs text-muted-foreground mt-1">Build a custom workout schedule tailored to your goals</p>
            <button className="mt-3 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {programs.map((program, i) => (
            <motion.button
              key={program.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-full p-4 rounded-xl bg-card card-shadow text-left group flex items-center gap-3"
            >
              <div className="flex-1">
                <h4 className="font-display font-semibold">{program.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{program.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>{program.weeks} weeks</span>
                  <span>·</span>
                  <span>{program.daysPerWeek}x/week</span>
                  <span>·</span>
                  <span>{program.level}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
