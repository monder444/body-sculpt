import { motion } from "framer-motion";
import { Play, Crown, ArrowRight, Search, Flame, Activity, Dumbbell, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { workouts } from "@/data/workouts";
import { exercises } from "@/data/exercises";
import { WorkoutCard } from "@/components/WorkoutCard";
import heroImg from "@/assets/hero-home.jpg";

const activityCards = [
  { label: "Strength", icon: Dumbbell, value: "12", unit: "sessions", filter: "strength" },
  { label: "Mobility", icon: Activity, value: "8", unit: "sessions", filter: "mobility" },
  { label: "Skills", icon: Sparkles, value: "5", unit: "sessions", filter: "skills" },
];

export default function Home() {
  const navigate = useNavigate();
  const featured = workouts.filter((w) => w.featured);
  const exerciseOfDay = exercises[4]; // Handstand

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="px-5 pt-6 safe-top flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-background">
            <img src={heroImg} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold">Hello Cristina,</h1>
            <p className="text-xs text-muted-foreground">Performance 70%</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/workouts")}
          className="w-10 h-10 rounded-full bg-card card-shadow flex items-center justify-center"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="px-5 space-y-6 mt-6">
        {/* Activity Analytics */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-display font-bold text-muted-foreground uppercase tracking-wider">Activity Analytics</h2>
            <button className="text-xs text-primary font-semibold">See all</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {activityCards.map((card, i) => (
              <motion.button
                key={card.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => navigate(`/workouts?category=${card.filter}`)}
                className="p-4 rounded-2xl bg-card card-shadow flex flex-col items-center gap-2 group hover:bg-primary/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground">{card.label}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Continue Workout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative overflow-hidden rounded-2xl"
        >
          <img src={heroImg} alt="Continue workout" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
          <div className="relative p-5 flex items-center justify-between min-h-[140px]">
            <div>
              <div className="flex items-center gap-2 text-[10px] text-primary font-semibold uppercase tracking-wider">
                <Flame className="w-3 h-3" /> Fitness Session
              </div>
              <h3 className="font-display font-bold text-xl text-card mt-1">Pull Day</h3>
              <p className="text-xs text-card/60 mt-0.5">Workout Sessions</p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-card/70">
                <span>🕐 1.5 Hours</span>
                <span>🔥 550 Kcal</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/workouts/push-pull-legs-pull")}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold"
            >
              See Stat
            </button>
          </div>
        </motion.div>

        {/* Featured Workouts */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-display font-bold">Featured</h2>
            <button onClick={() => navigate("/workouts")} className="text-xs text-primary font-semibold flex items-center gap-0.5">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {featured.map((w) => (
              <WorkoutCard key={w.id} workout={w} variant="featured" />
            ))}
          </div>
        </section>

        {/* Exercise of the Day */}
        <section>
          <h2 className="text-lg font-display font-bold mb-3 flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" /> Exercise of the Day
          </h2>
          <button
            onClick={() => navigate(`/exercise/${exerciseOfDay.slug}`)}
            className="relative w-full rounded-2xl overflow-hidden aspect-[16/9] group text-left"
          >
            <img src={exerciseOfDay.imageUrl} alt={exerciseOfDay.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-display font-bold text-card">{exerciseOfDay.name}</h3>
              <p className="text-xs text-card/70 mt-1">{exerciseOfDay.description.slice(0, 80)}…</p>
            </div>
          </button>
        </section>

        {/* Premium Upsell */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20"
        >
          <Crown className="w-8 h-8 text-primary mb-2" />
          <h3 className="font-display font-bold text-lg">Go Premium</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Unlock advanced tips, unlimited plans, and exclusive skill programs.
          </p>
          <button className="mt-3 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            Try Free for 7 Days
          </button>
        </motion.section>
      </div>
    </div>
  );
}
