import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronRight, Plus, X, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { workouts } from "@/data/workouts";

type Step = "goal" | "level" | "schedule" | "workouts" | "review";

const steps: Step[] = ["goal", "level", "schedule", "workouts", "review"];

const goals = [
  { id: "strength", label: "Strength", icon: "💪", desc: "Build raw pushing & pulling power" },
  { id: "skill", label: "Skill", icon: "🤸", desc: "Master advanced calisthenics moves" },
  { id: "endurance", label: "Endurance", icon: "🔥", desc: "Improve stamina and work capacity" },
  { id: "mobility", label: "Mobility", icon: "🧘", desc: "Increase flexibility and joint health" },
];

const levels = [
  { id: "Beginner", label: "Beginner", desc: "New to calisthenics or returning after a break" },
  { id: "Intermediate", label: "Intermediate", desc: "Comfortable with basics, ready for progressions" },
  { id: "Advanced", label: "Advanced", desc: "Strong foundation, chasing harder skills" },
  { id: "Expert", label: "Expert", desc: "Ready for levers, muscle-ups, and beyond" },
];

const daysOptions = [2, 3, 4, 5, 6];
const durationOptions = ["20 min", "30 min", "45 min", "60 min"];

const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface PlanDay {
  day: string;
  workoutIds: string[];
}

export default function CreatePlan() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("goal");
  const [planName, setPlanName] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [sessionDuration, setSessionDuration] = useState("30 min");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Wed", "Fri"]);
  const [planDays, setPlanDays] = useState<PlanDay[]>([]);
  const [showWorkoutPicker, setShowWorkoutPicker] = useState<string | null>(null);

  const stepIndex = steps.indexOf(currentStep);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case "goal": return !!selectedGoal;
      case "level": return !!selectedLevel;
      case "schedule": return selectedDays.length > 0;
      case "workouts": return planDays.some(d => d.workoutIds.length > 0);
      case "review": return true;
      default: return false;
    }
  };

  const goNext = () => {
    const idx = steps.indexOf(currentStep);
    if (currentStep === "schedule") {
      // Initialize planDays from selectedDays
      setPlanDays(selectedDays.map(day => ({
        day,
        workoutIds: planDays.find(p => p.day === day)?.workoutIds || [],
      })));
    }
    if (idx < steps.length - 1) setCurrentStep(steps[idx + 1]);
  };

  const goBack = () => {
    const idx = steps.indexOf(currentStep);
    if (idx > 0) setCurrentStep(steps[idx - 1]);
    else navigate("/plans");
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const addWorkoutToDay = (day: string, workoutId: string) => {
    setPlanDays(prev => prev.map(p =>
      p.day === day ? { ...p, workoutIds: [...p.workoutIds, workoutId] } : p
    ));
    setShowWorkoutPicker(null);
  };

  const removeWorkoutFromDay = (day: string, workoutId: string) => {
    setPlanDays(prev => prev.map(p =>
      p.day === day ? { ...p, workoutIds: p.workoutIds.filter(id => id !== workoutId) } : p
    ));
  };

  const handleFinish = () => {
    // For now, just navigate back to plans (persistence requires backend)
    navigate("/plans");
  };

  const filteredWorkouts = workouts.filter(w => {
    if (selectedLevel && w.level !== selectedLevel) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-8 safe-top">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-display font-bold flex-1">Create Plan</h1>
        <span className="text-xs text-muted-foreground">{stepIndex + 1}/{steps.length}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-muted mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Step: Goal */}
          {currentStep === "goal" && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-1">What's your goal?</h2>
              <p className="text-sm text-muted-foreground mb-6">This helps us suggest the right workouts for your plan.</p>
              <div className="space-y-3">
                {goals.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`w-full p-4 rounded-2xl text-left flex items-center gap-4 transition-all ${
                      selectedGoal === g.id
                        ? "bg-primary/15 border-2 border-primary"
                        : "bg-card card-shadow border-2 border-transparent"
                    }`}
                  >
                    <span className="text-2xl">{g.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-display font-semibold">{g.label}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{g.desc}</p>
                    </div>
                    {selectedGoal === g.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step: Level */}
          {currentStep === "level" && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-1">Your fitness level?</h2>
              <p className="text-sm text-muted-foreground mb-6">We'll match workout difficulty to your experience.</p>
              <div className="space-y-3">
                {levels.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLevel(l.id)}
                    className={`w-full p-4 rounded-2xl text-left flex items-center gap-4 transition-all ${
                      selectedLevel === l.id
                        ? "bg-primary/15 border-2 border-primary"
                        : "bg-card card-shadow border-2 border-transparent"
                    }`}
                  >
                    <div className="flex-1">
                      <h4 className="font-display font-semibold">{l.label}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{l.desc}</p>
                    </div>
                    {selectedLevel === l.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step: Schedule */}
          {currentStep === "schedule" && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-1">Set your schedule</h2>
              <p className="text-sm text-muted-foreground mb-6">Pick your training days and session length.</p>

              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
                Training Days
              </label>
              <div className="flex gap-2 mb-6">
                {weekDayLabels.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`flex-1 py-3 rounded-xl text-xs font-semibold transition-all ${
                      selectedDays.includes(day)
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
                Session Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {durationOptions.map(d => (
                  <button
                    key={d}
                    onClick={() => setSessionDuration(d)}
                    className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                      sessionDuration === d
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step: Workouts */}
          {currentStep === "workouts" && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-1">Add workouts</h2>
              <p className="text-sm text-muted-foreground mb-6">Assign workouts to each training day.</p>

              <div className="space-y-4">
                {planDays.map(pd => {
                  const dayWorkouts = pd.workoutIds.map(id => workouts.find(w => w.id === id)).filter(Boolean);
                  return (
                    <div key={pd.day} className="rounded-2xl bg-card card-shadow p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-display font-semibold">{pd.day}</h4>
                        <button
                          onClick={() => setShowWorkoutPicker(pd.day)}
                          className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4 text-primary" />
                        </button>
                      </div>
                      {dayWorkouts.length === 0 ? (
                        <p className="text-xs text-muted-foreground">No workouts yet. Tap + to add.</p>
                      ) : (
                        <div className="space-y-2">
                          {dayWorkouts.map(w => w && (
                            <div key={w.id} className="flex items-center gap-3 p-2 rounded-xl bg-muted/50">
                              <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <img src={w.imageUrl} alt={w.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{w.title}</p>
                                <p className="text-[10px] text-muted-foreground">{w.duration} · {w.level}</p>
                              </div>
                              <button
                                onClick={() => removeWorkoutFromDay(pd.day, w.id)}
                                className="w-6 h-6 rounded-full bg-destructive/15 flex items-center justify-center flex-shrink-0"
                              >
                                <X className="w-3 h-3 text-destructive" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Workout picker modal */}
              <AnimatePresence>
                {showWorkoutPicker && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end"
                    onClick={() => setShowWorkoutPicker(null)}
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 25 }}
                      className="w-full max-h-[70vh] rounded-t-3xl bg-card p-5 overflow-y-auto"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-bold text-lg">Add to {showWorkoutPicker}</h3>
                        <button onClick={() => setShowWorkoutPicker(null)}>
                          <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {filteredWorkouts.map(w => {
                          const alreadyAdded = planDays
                            .find(p => p.day === showWorkoutPicker)
                            ?.workoutIds.includes(w.id);
                          return (
                            <button
                              key={w.id}
                              onClick={() => !alreadyAdded && addWorkoutToDay(showWorkoutPicker, w.id)}
                              className={`flex items-center gap-3 p-3 rounded-xl w-full text-left transition-all ${
                                alreadyAdded ? "opacity-40" : "hover:bg-muted/50"
                              }`}
                              disabled={alreadyAdded}
                            >
                              <img src={w.imageUrl} alt={w.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{w.title}</p>
                                <p className="text-xs text-muted-foreground">{w.duration} · {w.level} · {w.exerciseCount} exercises</p>
                              </div>
                              {alreadyAdded ? (
                                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                              ) : (
                                <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Step: Review */}
          {currentStep === "review" && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-1">Review your plan</h2>
              <p className="text-sm text-muted-foreground mb-6">Give it a name and confirm your setup.</p>

              <input
                type="text"
                placeholder="Plan name (e.g. My Strength Plan)"
                value={planName}
                onChange={e => setPlanName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
              />

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-card card-shadow">
                  <span className="text-sm text-muted-foreground">Goal</span>
                  <span className="text-sm font-semibold capitalize">{selectedGoal}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-card card-shadow">
                  <span className="text-sm text-muted-foreground">Level</span>
                  <span className="text-sm font-semibold">{selectedLevel}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-card card-shadow">
                  <span className="text-sm text-muted-foreground">Days/week</span>
                  <span className="text-sm font-semibold">{selectedDays.length}x ({selectedDays.join(", ")})</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-card card-shadow">
                  <span className="text-sm text-muted-foreground">Session</span>
                  <span className="text-sm font-semibold">{sessionDuration}</span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {planDays.filter(pd => pd.workoutIds.length > 0).map(pd => (
                  <div key={pd.day} className="p-4 rounded-2xl bg-card card-shadow">
                    <h4 className="font-display font-semibold text-sm mb-2">{pd.day}</h4>
                    {pd.workoutIds.map(id => {
                      const w = workouts.find(w => w.id === id);
                      return w ? (
                        <div key={id} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>•</span>
                          <span>{w.title}</span>
                          <span className="text-[10px]">({w.duration})</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom action */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background to-transparent safe-bottom flex justify-center">
        <button
          onClick={currentStep === "review" ? handleFinish : goNext}
          disabled={!canProceed()}
          className={`max-w-xs w-full py-4 rounded-2xl font-display font-bold text-sm transition-all ${
            canProceed()
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {currentStep === "review" ? "Create Plan" : "Continue"}
        </button>
      </div>
    </div>
  );
}