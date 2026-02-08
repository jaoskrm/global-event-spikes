import { X, AlertTriangle, TrendingDown, Clock, ExternalLink, Sparkles } from "lucide-react";
import type { HotCluster } from "@/data/mockClusters";
import { getSeverityLabel, getTickersForRegion } from "@/data/mockClusters";
import { useState, useCallback } from "react";

interface BladeProps {
  cluster: HotCluster | null;
  onClose: () => void;
}

export default function Blade({ cluster, onClose }: BladeProps) {
  const [summaryState, setSummaryState] = useState<"idle" | "loading" | "done">("idle");
  const [summary, setSummary] = useState("");

  const handleGenerateSummary = useCallback(() => {
    setSummaryState("loading");
    // Simulate AI summary (no background AI per spec — only on explicit click)
    setTimeout(() => {
      setSummary(
        `Escalating tensions detected in ${cluster?.region_name}. ${cluster?.event_count} events recorded in the last 24 hours with ${cluster?.total_mentions?.toLocaleString()} media mentions. Goldstein severity index at ${cluster?.avg_severity?.toFixed(1)} indicates significant conflict activity. Key actors include state military forces and non-state armed groups. Situation trending toward further escalation based on mention velocity.`
      );
      setSummaryState("done");
    }, 2200);
  }, [cluster]);

  if (!cluster) return null;

  const severityLabel = getSeverityLabel(cluster.avg_severity);
  const tickers = getTickersForRegion(cluster.region_name);

  const severityClass =
    severityLabel === "CRITICAL" ? "bg-severity-critical" :
    severityLabel === "HIGH" ? "bg-severity-high" :
    severityLabel === "MEDIUM" ? "bg-severity-medium" :
    "bg-severity-low";

  const severityTextClass =
    severityLabel === "CRITICAL" ? "text-severity-critical" :
    severityLabel === "HIGH" ? "text-severity-high" :
    severityLabel === "MEDIUM" ? "text-severity-medium" :
    "text-severity-low";

  return (
    <div className="absolute top-5 right-5 bottom-5 w-[380px] z-40 glass-strong rounded-2xl flex flex-col overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="p-5 border-b border-border/50">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{cluster.region_name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className={`${severityClass} text-primary-foreground px-2 py-0.5 rounded text-[10px] font-bold tracking-wider`}>
                {severityLabel}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {cluster.avg_severity.toFixed(1)} GSI
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-px bg-border/30 border-b border-border/50">
        <div className="p-4 bg-card/50 text-center">
          <div className={`text-xl font-bold font-mono ${severityTextClass}`}>
            {cluster.event_count}
          </div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Events</div>
        </div>
        <div className="p-4 bg-card/50 text-center">
          <div className="text-xl font-bold font-mono text-foreground">
            {(cluster.total_mentions / 1000).toFixed(1)}K
          </div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Mentions</div>
        </div>
        <div className="p-4 bg-card/50 text-center">
          <div className="text-xl font-bold font-mono text-accent">24h</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Window</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* AI Summary */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">AI Summary</span>
          </div>

          {summaryState === "idle" && (
            <button
              onClick={handleGenerateSummary}
              className="w-full glass rounded-xl p-4 text-sm text-accent hover:bg-accent/10 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Generate Summary
            </button>
          )}

          {summaryState === "loading" && (
            <div className="glass rounded-xl p-4 space-y-2">
              <div className="h-3 bg-muted rounded animate-pulse w-full" />
              <div className="h-3 bg-muted rounded animate-pulse w-4/5" />
              <div className="h-3 bg-muted rounded animate-pulse w-3/5" />
              <div className="h-3 bg-muted rounded animate-pulse w-4/5" />
            </div>
          )}

          {summaryState === "done" && (
            <div className="glass rounded-xl p-4 text-sm text-secondary-foreground leading-relaxed">
              {summary}
            </div>
          )}
        </div>

        {/* Market Context */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="h-3.5 w-3.5 text-severity-high" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Market Context</span>
          </div>
          <div className="space-y-2">
            {tickers.map((ticker) => (
              <div key={ticker} className="glass rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-foreground">{ticker}</span>
                  <span className="text-xs text-muted-foreground">—</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-6 bg-muted/50 rounded flex items-center justify-center">
                    <span className="text-[9px] text-muted-foreground font-mono">SPARKLINE</span>
                  </div>
                  <span className="text-xs font-mono text-severity-critical">-2.4%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Timeline */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Recent Events</span>
          </div>
          <div className="space-y-2">
            {[
              { time: "2m ago", title: "Military escalation reported", severity: "critical" },
              { time: "18m ago", title: "Diplomatic talks stalled", severity: "high" },
              { time: "1h ago", title: "Civilian displacement surge", severity: "high" },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-3 p-3 glass rounded-xl">
                <AlertTriangle className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${
                  event.severity === "critical" ? "text-severity-critical" : "text-severity-high"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.time}</p>
                </div>
                <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
          <span>H3: {cluster.h3_index}</span>
          <span>Updated: {new Date(cluster.last_update).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
