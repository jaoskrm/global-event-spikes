import { useState, useCallback } from "react";
import GlobeCanvas from "@/components/GlobeCanvas";
import OmniBar from "@/components/OmniBar";
import Blade from "@/components/Blade";
import StatusBar from "@/components/StatusBar";
import { mockClusters } from "@/data/mockClusters";
import type { HotCluster } from "@/data/mockClusters";

const Index = () => {
  const [selectedCluster, setSelectedCluster] = useState<HotCluster | null>(null);

  const handleClusterClick = useCallback((cluster: HotCluster) => {
    setSelectedCluster(cluster);
  }, []);

  const handleCloseBlacle = useCallback(() => {
    setSelectedCluster(null);
  }, []);

  const handleCitySelect = useCallback((_lat: number, _lon: number) => {
    // Find nearest cluster
    const nearest = mockClusters.reduce((best, c) => {
      const dist = Math.hypot(c.center_lat - _lat, c.center_lon - _lon);
      const bestDist = Math.hypot(best.center_lat - _lat, best.center_lon - _lon);
      return dist < bestDist ? c : best;
    });
    setSelectedCluster(nearest);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <GlobeCanvas
        clusters={mockClusters}
        onClusterClick={handleClusterClick}
        selectedCluster={selectedCluster}
      />
      <OmniBar onCitySelect={handleCitySelect} />
      <Blade cluster={selectedCluster} onClose={handleCloseBlacle} />
      <StatusBar />

      {/* Title watermark */}
      <div className="absolute top-6 left-6 z-30">
        <h1 className="text-lg font-semibold text-foreground tracking-tight">
          GDELT<span className="text-accent">SCOPE</span>
        </h1>
        <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
          Global Event Monitor
        </p>
      </div>
    </div>
  );
};

export default Index;
