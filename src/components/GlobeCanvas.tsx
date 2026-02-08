import { useCallback, useMemo, useState } from "react";
import { DeckGL } from "@deck.gl/react";
import { ColumnLayer, ScatterplotLayer, SolidPolygonLayer } from "@deck.gl/layers";
import { _GlobeView as GlobeView, MapView, FlyToInterpolator, LightingEffect, AmbientLight, DirectionalLight } from "@deck.gl/core";
import type { HotCluster } from "@/data/mockClusters";
import { getSeverityColor } from "@/data/mockClusters";

const INITIAL_VIEW_STATE = {
  longitude: 30,
  latitude: 20,
  zoom: 1.2,
  pitch: 0,
  bearing: 0,
};

// Create a polygon approximating the earth's surface
function createGlobePolygon() {
  const coords: [number, number][] = [];
  for (let lon = -180; lon <= 180; lon += 5) {
    coords.push([lon, -85]);
  }
  for (let lat = -85; lat <= 85; lat += 5) {
    coords.push([180, lat]);
  }
  for (let lon = 180; lon >= -180; lon -= 5) {
    coords.push([lon, 85]);
  }
  for (let lat = 85; lat >= -85; lat -= 5) {
    coords.push([-180, lat]);
  }
  return coords;
}

const GLOBE_POLYGON = createGlobePolygon();

// Lighting
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.5,
});

const sunLight = new DirectionalLight({
  color: [255, 245, 230],
  intensity: 2.0,
  direction: [-3, -9, -1],
});

const moonLight = new DirectionalLight({
  color: [180, 200, 255],
  intensity: 0.6,
  direction: [5, 5, -1],
});

const lightingEffect = new LightingEffect({
  ambientLight,
  sunLight,
  moonLight,
});

interface GlobeCanvasProps {
  clusters: HotCluster[];
  onClusterClick: (cluster: HotCluster) => void;
  selectedCluster: HotCluster | null;
}

export default function GlobeCanvas({ clusters, onClusterClick, selectedCluster }: GlobeCanvasProps) {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const isGlobeMode = viewState.zoom < 3;

  const handleViewStateChange = useCallback(({ viewState: newVS }: any) => {
    setViewState(newVS);
  }, []);

  const flyTo = useCallback((cluster: HotCluster) => {
    setViewState((prev) => ({
      ...prev,
      longitude: cluster.center_lon,
      latitude: cluster.center_lat,
      zoom: 6,
      pitch: 45,
      bearing: 0,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    }));
    onClusterClick(cluster);
  }, [onClusterClick]);

  const layers = useMemo(() => {
    if (isGlobeMode) {
      return [
        // Globe surface
        new SolidPolygonLayer({
          id: "globe-surface",
          data: [{ polygon: GLOBE_POLYGON }],
          getPolygon: (d: any) => d.polygon,
          getFillColor: [12, 18, 30, 255],
          material: {
            ambient: 0.4,
            diffuse: 0.8,
            shininess: 20,
            specularColor: [40, 60, 100],
          },
        }),
        // Spikes
        new ColumnLayer({
          id: "hot-clusters-columns",
          data: clusters,
          diskResolution: 8,
          radius: 45000,
          extruded: true,
          elevationScale: 100,
          getPosition: (d: HotCluster) => [d.center_lon, d.center_lat],
          getElevation: (d: HotCluster) => d.total_mentions,
          getFillColor: (d: HotCluster) => getSeverityColor(d.avg_severity),
          pickable: true,
          onClick: (info: any) => {
            if (info.object) flyTo(info.object);
          },
          material: {
            ambient: 0.8,
            diffuse: 0.9,
            shininess: 60,
          },
          updateTriggers: {
            getFillColor: [selectedCluster?.h3_index],
          },
        }),
      ];
    }

    return [
      new ScatterplotLayer({
        id: "hot-clusters-scatter",
        data: clusters,
        getPosition: (d: HotCluster) => [d.center_lon, d.center_lat],
        getRadius: (d: HotCluster) => Math.sqrt(d.total_mentions) * 200,
        getFillColor: (d: HotCluster) => getSeverityColor(d.avg_severity),
        getLineColor: [255, 255, 255, 80],
        stroked: true,
        lineWidthMinPixels: 1,
        pickable: true,
        radiusMinPixels: 6,
        radiusMaxPixels: 40,
        onClick: (info: any) => {
          if (info.object) {
            onClusterClick(info.object);
          }
        },
      }),
    ];
  }, [clusters, isGlobeMode, flyTo, onClusterClick, selectedCluster]);

  const views = useMemo(() => {
    if (isGlobeMode) {
      return new GlobeView({ id: "globe", resolution: 2 });
    }
    return new MapView({ id: "map" });
  }, [isGlobeMode]);

  const effects = useMemo(() => [lightingEffect], []);

  return (
    <div className="absolute inset-0">
      {/* Starfield background */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: isGlobeMode ? 1 : 0,
          background: "radial-gradient(ellipse at center, hsl(220 20% 6%) 0%, hsl(220 25% 2%) 100%)",
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, hsl(0 0% 80%) 50%, transparent 100%),
            radial-gradient(1px 1px at 30% 70%, hsl(0 0% 60%) 50%, transparent 100%),
            radial-gradient(1px 1px at 50% 10%, hsl(0 0% 70%) 50%, transparent 100%),
            radial-gradient(1px 1px at 70% 50%, hsl(0 0% 50%) 50%, transparent 100%),
            radial-gradient(1px 1px at 90% 80%, hsl(0 0% 60%) 50%, transparent 100%),
            radial-gradient(1px 1px at 15% 55%, hsl(0 0% 55%) 50%, transparent 100%),
            radial-gradient(1px 1px at 45% 35%, hsl(0 0% 65%) 50%, transparent 100%),
            radial-gradient(1px 1px at 75% 15%, hsl(0 0% 45%) 50%, transparent 100%),
            radial-gradient(1px 1px at 85% 45%, hsl(0 0% 70%) 50%, transparent 100%),
            radial-gradient(1px 1px at 25% 90%, hsl(0 0% 55%) 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 60% 60%, hsl(185 70% 60%) 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 20% 40%, hsl(185 70% 50%) 50%, transparent 100%)
          `,
        }} />
      </div>

      {/* Map background for tactical mode */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: isGlobeMode ? 0 : 1,
          background: "hsl(220 20% 4%)",
        }}
      />

      <DeckGL
        viewState={viewState}
        onViewStateChange={handleViewStateChange}
        controller={true}
        layers={layers}
        views={views}
        effects={effects}
        getCursor={({ isHovering }: { isHovering: boolean }) => isHovering ? "pointer" : "grab"}
        style={{ position: "absolute", inset: "0" }}
      />

      {/* Zoom indicator */}
      <div className="absolute bottom-6 left-6 glass rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground">
        <span className="text-accent">{isGlobeMode ? "GLOBE" : "MAP"}</span>
        <span className="mx-2 opacity-30">|</span>
        Z{viewState.zoom.toFixed(1)}
      </div>
    </div>
  );
}
