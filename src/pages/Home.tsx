import { motion } from "framer-motion";
import { Play, Crown, ArrowRight, Search, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { workouts } from "@/data/workouts";
import { exercises } from "@/data/exercises";
import { WorkoutCard } from "@/components/WorkoutCard";
import heroImg from "@/assets/hero-home.jpg";

const quickFilters = [
  { label: "Strength", emoji: "💪" },
  { label: "Skills", emoji: "🤸" },
  { label: "Endurance", emoji: "🔥" },
  { label: "Mobility", emoji: "🧘" },
];

export default function Home() {
  const navigate = useNavigate();
  const featured = workouts.filter((w) => w.featured);
  const exerciseOfDay = exercises[4]; // Handstand

  return (
    <div className="pb-4">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img src={heroImg} alt="Calisthenics athlete" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-0 left-0 right-0 safe-top px-5 pt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Hey, Athlete 👋</p>
            <h1 className="text-2xl font-display font-bold mt-0.5">Ready to train?</h1>
          </div>
          <button
            onClick={() => navigate("/workouts")}
            className="w-10 h-10 rounded-full bg-card/80 glass flex items-center justify-center"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-4 left-0 right-0 px-5">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card/90 glass rounded-2xl p-4 card-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Continue workout</p>
                <h3 className="font-display font-bold mt-0.5">Pull Day</h3>
                <p className="text-xs text-muted-foreground mt-0.5">3 of 6 exercises done</p>
              </div>
              <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
              </button>
            </div>
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-primary rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-5 space-y-6 mt-4">
        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {quickFilters.map((f) => (
            <button
              key={f.label}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-card card-shadow text-sm font-medium whitespace-nowrap flex-shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span>{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>

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
