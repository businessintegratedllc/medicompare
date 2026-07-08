import { PillBottle } from "lucide-react";

export default function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "light" ? "text-slate-900" : "text-white";
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-teal-600 to-indigo-600 shadow-lg shadow-teal-900/20">
        <PillBottle className="h-5 w-5 text-white" strokeWidth={2.4} />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-amber-400 ring-2 ring-white" />
      </div>
      <div className="leading-tight">
        <p className={`font-display text-lg font-extrabold tracking-tight ${textColor}`}>
          Medi<span className="text-teal-600">Compare</span>
        </p>
        <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${variant === "light" ? "text-slate-400" : "text-teal-200"}`}>
          Costa Rica
        </p>
      </div>
    </div>
  );
}
