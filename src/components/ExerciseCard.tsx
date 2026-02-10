import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Exercise } from "@/data/exercises";

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const navigate = useNavigate();
  const levelColors: Record<string, string> = {
    beginner: "bg-green-500/20 text-green-500",
    intermediate: "bg-yellow-500/20 text-yellow-500",
    advanced: "bg-orange-500/20 text-orange-500",
    expert: "bg-red-500/20 text-red-500",
  };

  return (
    <button
      onClick={() => navigate(`/exercise/${exercise.slug}`)}
      className="flex items-center gap-3 p-3 rounded-xl bg-card card-shadow w-full text-left group transition-all hover:elevated-shadow"
    >
      <img
        src={exercise.imageUrl}
        alt={exercise.name}
        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-semibold text-sm truncate">{exercise.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${levelColors[exercise.level]}`}>
            {exercise.level}
          </span>
          <span className="text-xs text-muted-foreground">{exercise.reps || exercise.duration}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
    </button>
  );
}
