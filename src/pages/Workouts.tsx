import { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { workouts } from "@/data/workouts";
import { exercises, muscleGroups } from "@/data/exercises";
import { WorkoutCard } from "@/components/WorkoutCard";
import { ExerciseCard } from "@/components/ExerciseCard";

type Tab = "workouts" | "exercises";

export default function Workouts() {
  const [tab, setTab] = useState<Tab>("workouts");
  const [search, setSearch] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const filteredWorkouts = workouts.filter((w) => {
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = !selectedMuscle || w.muscles.includes(selectedMuscle);
    return matchesSearch && matchesMuscle;
  });

  const filteredExercises = exercises.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = !selectedMuscle || e.primaryMuscles.includes(selectedMuscle as any);
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="px-5 pt-6 safe-top">
      <h1 className="text-2xl font-display font-bold">Workouts</h1>

      {/* Search */}
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search workouts or exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Tab Toggle */}
      <div className="flex mt-4 bg-muted rounded-xl p-1">
        {(["workouts", "exercises"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all capitalize ${
              tab === t ? "bg-card card-shadow text-foreground" : "text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Muscle Filters */}
      <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedMuscle(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
            !selectedMuscle ? "bg-primary text-primary-foreground" : "bg-card card-shadow text-muted-foreground"
          }`}
        >
          All
        </button>
        {muscleGroups.map((mg) => (
          <button
            key={mg.id}
            onClick={() => setSelectedMuscle(mg.id === selectedMuscle ? null : mg.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
              selectedMuscle === mg.id ? "bg-primary text-primary-foreground" : "bg-card card-shadow text-muted-foreground"
            }`}
          >
            {mg.icon} {mg.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-4 space-y-3 pb-4"
        >
          {tab === "workouts" ? (
            filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((w) => <WorkoutCard key={w.id} workout={w} variant="compact" />)
            ) : (
              <p className="text-center text-muted-foreground text-sm py-8">No workouts found</p>
            )
          ) : filteredExercises.length > 0 ? (
            filteredExercises.map((e) => <ExerciseCard key={e.id} exercise={e} />)
          ) : (
            <p className="text-center text-muted-foreground text-sm py-8">No exercises found</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
