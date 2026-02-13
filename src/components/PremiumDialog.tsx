import { Crown, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const features = [
  { text: "Unlimited custom plans", free: false, premium: true },
  { text: "Basic exercises library", free: true, premium: true },
  { text: "Advanced technique cues", free: false, premium: true },
  { text: "Exercise troubleshooting", free: false, premium: true },
  { text: "Enhanced analytics", free: false, premium: true },
  { text: "Priority support", free: false, premium: true },
];

interface PremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PremiumDialog({ open, onOpenChange }: PremiumDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-6 pb-4">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-primary" />
              <DialogTitle className="font-display text-xl">Go Premium</DialogTitle>
            </div>
            <DialogDescription className="text-sm mt-1">
              Unlock the full calisthenics experience
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Comparison */}
        <div className="px-6 pb-2">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-2 text-sm">
            <span className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">Feature</span>
            <span className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-center">Free</span>
            <span className="text-primary font-semibold text-xs uppercase tracking-wider text-center">Pro</span>

            {features.map((f) => (
              <div key={f.text} className="contents">
                <span className="py-1">{f.text}</span>
                <span className="flex justify-center py-1">
                  {f.free ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground/40" />
                  )}
                </span>
                <span className="flex justify-center py-1">
                  <Check className="w-4 h-4 text-primary" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="px-6 pb-6 space-y-3">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-center justify-between">
            <div>
              <p className="font-display font-bold">Annual</p>
              <p className="text-xs text-muted-foreground">€4.99/mo · billed yearly</p>
            </div>
            <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Save 50%</span>
          </div>
          <div className="rounded-xl border p-4 flex items-center justify-between">
            <div>
              <p className="font-display font-bold">Monthly</p>
              <p className="text-xs text-muted-foreground">€9.99/mo</p>
            </div>
          </div>

          <Button
            className="w-full rounded-full h-12 text-base font-bold"
            onClick={() => {
              toast.success("Free trial activated! Enjoy 7 days of Premium 🎉");
              onOpenChange(false);
            }}
          >
            Start 7-Day Free Trial
          </Button>
          <p className="text-[10px] text-center text-muted-foreground">Cancel anytime. No charge during trial.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
