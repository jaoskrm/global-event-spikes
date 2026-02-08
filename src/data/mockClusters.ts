export interface HotCluster {
  h3_index: string;
  center_lat: number;
  center_lon: number;
  event_count: number;
  total_mentions: number;
  avg_severity: number;
  last_update: string;
  region_name: string;
}

// Mock data representing global hotspots
export const mockClusters: HotCluster[] = [
  // Middle East
  { h3_index: "840c001", center_lat: 33.3, center_lon: 44.4, event_count: 87, total_mentions: 4200, avg_severity: -8.2, last_update: new Date().toISOString(), region_name: "Baghdad, Iraq" },
  { h3_index: "840c002", center_lat: 36.2, center_lon: 37.1, event_count: 62, total_mentions: 3100, avg_severity: -7.8, last_update: new Date().toISOString(), region_name: "Aleppo, Syria" },
  { h3_index: "840c003", center_lat: 31.8, center_lon: 35.2, event_count: 120, total_mentions: 6800, avg_severity: -9.1, last_update: new Date().toISOString(), region_name: "Jerusalem" },
  { h3_index: "840c004", center_lat: 15.4, center_lon: 44.2, event_count: 55, total_mentions: 2200, avg_severity: -7.5, last_update: new Date().toISOString(), region_name: "Sana'a, Yemen" },
  // Eastern Europe
  { h3_index: "840e001", center_lat: 50.4, center_lon: 30.5, event_count: 95, total_mentions: 5500, avg_severity: -8.8, last_update: new Date().toISOString(), region_name: "Kyiv, Ukraine" },
  { h3_index: "840e002", center_lat: 48.5, center_lon: 35.0, event_count: 78, total_mentions: 3800, avg_severity: -8.1, last_update: new Date().toISOString(), region_name: "Dnipro, Ukraine" },
  { h3_index: "840e003", center_lat: 47.0, center_lon: 37.8, event_count: 45, total_mentions: 2100, avg_severity: -7.2, last_update: new Date().toISOString(), region_name: "Mariupol, Ukraine" },
  // Africa
  { h3_index: "840a001", center_lat: 2.0, center_lon: 45.3, event_count: 42, total_mentions: 1800, avg_severity: -7.0, last_update: new Date().toISOString(), region_name: "Mogadishu, Somalia" },
  { h3_index: "840a002", center_lat: 15.6, center_lon: 32.5, event_count: 68, total_mentions: 3400, avg_severity: -8.5, last_update: new Date().toISOString(), region_name: "Khartoum, Sudan" },
  { h3_index: "840a003", center_lat: 4.8, center_lon: 31.6, event_count: 38, total_mentions: 1500, avg_severity: -6.8, last_update: new Date().toISOString(), region_name: "Juba, South Sudan" },
  { h3_index: "840a004", center_lat: 12.0, center_lon: -1.5, event_count: 31, total_mentions: 1200, avg_severity: -6.5, last_update: new Date().toISOString(), region_name: "Ouagadougou, Burkina Faso" },
  { h3_index: "840a005", center_lat: -1.3, center_lon: 29.2, event_count: 50, total_mentions: 2400, avg_severity: -7.6, last_update: new Date().toISOString(), region_name: "Goma, DRC" },
  // Asia
  { h3_index: "840b001", center_lat: 34.5, center_lon: 69.2, event_count: 55, total_mentions: 2600, avg_severity: -7.4, last_update: new Date().toISOString(), region_name: "Kabul, Afghanistan" },
  { h3_index: "840b002", center_lat: 21.0, center_lon: 96.0, event_count: 40, total_mentions: 1900, avg_severity: -7.1, last_update: new Date().toISOString(), region_name: "Mandalay, Myanmar" },
  { h3_index: "840b003", center_lat: 39.9, center_lon: 116.4, event_count: 30, total_mentions: 3200, avg_severity: -5.8, last_update: new Date().toISOString(), region_name: "Beijing, China" },
  { h3_index: "840b004", center_lat: 25.0, center_lon: 121.5, event_count: 25, total_mentions: 4100, avg_severity: -5.5, last_update: new Date().toISOString(), region_name: "Taipei, Taiwan" },
  // Americas
  { h3_index: "840d001", center_lat: 38.9, center_lon: -77.0, event_count: 20, total_mentions: 5200, avg_severity: -5.2, last_update: new Date().toISOString(), region_name: "Washington DC, USA" },
  { h3_index: "840d002", center_lat: 19.4, center_lon: -99.1, event_count: 35, total_mentions: 1600, avg_severity: -6.9, last_update: new Date().toISOString(), region_name: "Mexico City, Mexico" },
  { h3_index: "840d003", center_lat: 10.5, center_lon: -66.9, event_count: 28, total_mentions: 1400, avg_severity: -6.2, last_update: new Date().toISOString(), region_name: "Caracas, Venezuela" },
  { h3_index: "840d004", center_lat: 4.7, center_lon: -74.1, event_count: 22, total_mentions: 1100, avg_severity: -6.0, last_update: new Date().toISOString(), region_name: "Bogotá, Colombia" },
];

// Related tickers mapping for the Blade
export const regionTickers: Record<string, string[]> = {
  "Iraq": ["USO", "XLE", "KSA"],
  "Syria": ["USO", "XLE", "EZA"],
  "Jerusalem": ["EIS", "ITEQ", "USO"],
  "Yemen": ["USO", "XLE", "KSA"],
  "Ukraine": ["RSX", "ERUS", "WEAT"],
  "Somalia": ["EZA", "FM", "USO"],
  "Sudan": ["EZA", "FM", "GLD"],
  "China": ["FXI", "BABA", "KWEB"],
  "Taiwan": ["EWT", "TSM", "INDA"],
  "USA": ["SPY", "DIA", "QQQ"],
  "Mexico": ["EWW", "MXF", "FMX"],
  "Venezuela": ["USO", "XLE", "ILF"],
  "Afghanistan": ["USO", "XLE", "FM"],
  "Myanmar": ["EWS", "FM", "ASEA"],
  "Colombia": ["GXG", "ILF", "EC"],
  "DRC": ["EZA", "FM", "GLD"],
  "Burkina Faso": ["EZA", "FM", "GLD"],
  "South Sudan": ["EZA", "FM", "USO"],
};

export function getSeverityLabel(severity: number): string {
  if (severity <= -8) return "CRITICAL";
  if (severity <= -7) return "HIGH";
  if (severity <= -6) return "MEDIUM";
  return "ELEVATED";
}

export function getSeverityColor(severity: number): [number, number, number, number] {
  if (severity <= -8) return [220, 50, 50, 220]; // red
  if (severity <= -7) return [240, 140, 30, 200]; // orange
  if (severity <= -6) return [240, 200, 50, 180]; // yellow
  return [50, 180, 200, 160]; // cyan
}

export function getTickersForRegion(regionName: string): string[] {
  for (const [key, tickers] of Object.entries(regionTickers)) {
    if (regionName.includes(key)) return tickers;
  }
  return ["SPY", "VIX", "GLD"];
}
