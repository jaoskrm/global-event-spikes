import { Activity, Globe, Zap } from "lucide-react";
import { mockClusters } from "@/data/mockClusters";

export default function StatusBar() {
  const criticalCount = mockClusters.filter((c) => c.avg_severity <= -8).length;
  const totalEvents = mockClusters.reduce((s, c) => s + c.event_count, 0);

  return (
    <div className="absolute bottom-6 right-6 z-30 flex items-center gap-4">
      <div className="glass rounded-lg px-3 py-2 flex items-center gap-4 font-mono text-xs">
        <div className="flex items-center gap-1.5">
          <Globe className="h-3 w-3 text-accent" />
          <span className="text-muted-foreground">{mockClusters.length} clusters</span>
        </div>
        <span className="opacity-20">|</span>
        <div className="flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-severity-high" />
          <span className="text-muted-foreground">{totalEvents} events</span>
        </div>
        <span className="opacity-20">|</span>
        <div className="flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-severity-critical animate-pulse-glow" />
          <span className="text-severity-critical font-semibold">{criticalCount} critical</span>
        </div>
      </div>
    </div>
  );
}
