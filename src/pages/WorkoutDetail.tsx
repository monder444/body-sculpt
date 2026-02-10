import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Zap, Play, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { workouts } from "@/data/workouts";
import { exercises } from "@/data/exercises";
import { ExerciseCard } from "@/components/ExerciseCard";

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workouts.find((w) => w.id === id);

  if (!workout) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Workout not found</p>
      </div>
    );
  }

  // Get relevant exercises for this workout
  const workoutExercises = exercises.filter((e) =>
    workout.muscles.some((m) => e.primaryMuscles.includes(m as any))
  ).slice(0, workout.exerciseCount);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[300px]">
        <img src={workout.imageUrl} alt={workout.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 safe-top px-4 pt-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card/80 glass flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-card/80 glass flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-card/80 glass flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 px-5">
          <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full mb-2">
            {workout.level}
          </span>
          <h1 className="text-3xl font-display font-bold">{workout.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{workout.duration}</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4" />{workout.calories} kcal</span>
            <span>{workout.exerciseCount} exercises</span>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6 mt-4">
        <p className="text-sm text-muted-foreground">{workout.description}</p>

        {/* Equipment */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Equipment:</span>
          <span className="text-sm font-medium">{workout.equipment}</span>
        </div>

        {/* Exercises */}
        <section>
          <h2 className="font-display font-bold text-lg mb-3">Exercises</h2>
          <div className="space-y-2">
            {workoutExercises.map((ex, i) => (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ExerciseCard exercise={ex} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Start Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" /> Start Workout
        </motion.button>
      </div>
    </div>
  );
}
