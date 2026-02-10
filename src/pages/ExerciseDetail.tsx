import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, CheckCircle2, AlertTriangle, ChevronRight, Wind } from "lucide-react";
import { motion } from "framer-motion";
import { exercises } from "@/data/exercises";

export default function ExerciseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const exercise = exercises.find((e) => e.slug === slug);

  if (!exercise) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Exercise not found</p>
      </div>
    );
  }

  const levelColors: Record<string, string> = {
    beginner: "bg-green-500/20 text-green-500",
    intermediate: "bg-yellow-500/20 text-yellow-500",
    advanced: "bg-orange-500/20 text-orange-500",
    expert: "bg-red-500/20 text-red-500",
  };

  return (
    <div>
      {/* Hero Image */}
      <div className="relative h-[45vh] min-h-[300px]">
        <img src={exercise.imageUrl} alt={exercise.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="absolute top-0 left-0 right-0 safe-top px-4 pt-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card/80 glass flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-4 left-0 right-0 px-5">
          <span className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full mb-2 ${levelColors[exercise.level]}`}>
            {exercise.level}
          </span>
          <h1 className="text-3xl font-display font-bold">{exercise.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            {exercise.reps && <span>{exercise.reps}</span>}
            {exercise.duration && <span>{exercise.duration}</span>}
            <span>• {exercise.equipment === 'none' ? 'No equipment' : exercise.equipment}</span>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6 mt-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{exercise.description}</p>

        {/* Muscles */}
        <section>
          <h3 className="font-display font-bold mb-2">Muscles Worked</h3>
          <div className="flex flex-wrap gap-2">
            {exercise.primaryMuscles.map((m) => (
              <span key={m} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold capitalize">{m}</span>
            ))}
            {exercise.secondaryMuscles.map((m) => (
              <span key={m} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium capitalize">{m}</span>
            ))}
          </div>
        </section>

        {/* Step-by-step Cues */}
        <section>
          <h3 className="font-display font-bold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" /> Form Cues
          </h3>
          <div className="space-y-2">
            {exercise.cues.map((cue, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-card card-shadow"
              >
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm">{cue}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section>
          <h3 className="font-display font-bold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" /> Common Mistakes
          </h3>
          <div className="space-y-2">
            {exercise.mistakes.map((m, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
                <span className="text-orange-500 text-sm">✗</span>
                <p className="text-sm text-muted-foreground">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Breathing */}
        <section className="p-4 rounded-2xl bg-card card-shadow">
          <h3 className="font-display font-bold mb-1 flex items-center gap-2">
            <Wind className="w-5 h-5 text-primary" /> Breathing
          </h3>
          <p className="text-sm text-muted-foreground">Inhale on the eccentric (lowering) phase. Exhale on the concentric (pushing/pulling) phase.</p>
        </section>

        {/* Safety */}
        <section className="p-4 rounded-2xl bg-destructive/5 border border-destructive/10">
          <h3 className="font-display font-bold mb-1 text-destructive">⚠️ Safety</h3>
          <p className="text-sm text-muted-foreground">{exercise.safety}</p>
        </section>

        {/* Progressions */}
        <section>
          <h3 className="font-display font-bold mb-3">Progressions</h3>
          <div className="space-y-2">
            {exercise.regressions.map((r) => (
              <div key={r} className="flex items-center gap-3 p-3 rounded-xl bg-card card-shadow">
                <span className="text-xs font-semibold text-green-500 uppercase w-14 flex-shrink-0">Easier</span>
                <span className="text-sm">{r}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <span className="text-xs font-semibold text-primary uppercase w-14 flex-shrink-0">Current</span>
              <span className="text-sm font-semibold">{exercise.name}</span>
            </div>
            {exercise.progressions.map((p) => (
              <div key={p} className="flex items-center gap-3 p-3 rounded-xl bg-card card-shadow">
                <span className="text-xs font-semibold text-orange-500 uppercase w-14 flex-shrink-0">Harder</span>
                <span className="text-sm">{p}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Tips */}
        <section className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Pro Tips
            </h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Premium</span>
          </div>
          <div className="space-y-2">
            {exercise.premiumTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 blur-[2px] select-none">
                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
            Unlock Premium
          </button>
        </section>
      </div>
    </div>
  );
}
