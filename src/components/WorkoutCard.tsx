import { Clock, Zap, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Workout } from "@/data/workouts";

interface WorkoutCardProps {
  workout: Workout;
  variant?: "default" | "compact" | "featured";
}

export function WorkoutCard({ workout, variant = "default" }: WorkoutCardProps) {
  const navigate = useNavigate();

  if (variant === "featured") {
    return (
      <button
        onClick={() => navigate(`/workouts/${workout.id}`)}
        className="relative w-full overflow-hidden rounded-2xl aspect-[16/10] group text-left"
      >
        <img
          src={workout.imageUrl}
          alt={workout.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full mb-2">
            {workout.level}
          </span>
          <h3 className="text-lg font-display font-bold text-card">{workout.title}</h3>
          <div className="flex items-center gap-3 mt-1 text-card/70 text-xs">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{workout.duration}</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{workout.calories} kcal</span>
          </div>
        </div>
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        onClick={() => navigate(`/workouts/${workout.id}`)}
        className="flex items-center gap-3 p-3 rounded-2xl bg-card card-shadow w-full text-left group"
      >
        <img
          src={workout.imageUrl}
          alt={workout.title}
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-sm truncate">{workout.title}</h4>
          <div className="flex items-center gap-2 mt-0.5 text-muted-foreground text-xs">
            <span>{workout.duration}</span>
            <span>·</span>
            <span>{workout.level}</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(`/workouts/${workout.id}`)}
      className="block w-full rounded-2xl overflow-hidden bg-card card-shadow group text-left"
    >
      <div className="relative aspect-video">
        <img
          src={workout.imageUrl}
          alt={workout.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
            {workout.level}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold">{workout.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{workout.description}</p>
        <div className="flex items-center gap-3 mt-3 text-muted-foreground text-xs">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{workout.duration}</span>
          <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{workout.calories} kcal</span>
          <span>{workout.exerciseCount} exercises</span>
        </div>
      </div>
    </button>
  );
}
