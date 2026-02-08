import { useState, useRef, useEffect, useCallback } from "react";
import { Search, Command } from "lucide-react";

interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

const CITIES: City[] = [
  { name: "New York", lat: 40.7, lon: -74.0, country: "US" },
  { name: "London", lat: 51.5, lon: -0.1, country: "UK" },
  { name: "Tokyo", lat: 35.7, lon: 139.7, country: "JP" },
  { name: "Beijing", lat: 39.9, lon: 116.4, country: "CN" },
  { name: "Moscow", lat: 55.8, lon: 37.6, country: "RU" },
  { name: "Baghdad", lat: 33.3, lon: 44.4, country: "IQ" },
  { name: "Kyiv", lat: 50.4, lon: 30.5, country: "UA" },
  { name: "Jerusalem", lat: 31.8, lon: 35.2, country: "IL" },
  { name: "Taipei", lat: 25.0, lon: 121.5, country: "TW" },
  { name: "Kabul", lat: 34.5, lon: 69.2, country: "AF" },
  { name: "Khartoum", lat: 15.6, lon: 32.5, country: "SD" },
  { name: "Mogadishu", lat: 2.0, lon: 45.3, country: "SO" },
  { name: "Caracas", lat: 10.5, lon: -66.9, country: "VE" },
  { name: "Mexico City", lat: 19.4, lon: -99.1, country: "MX" },
  { name: "Washington DC", lat: 38.9, lon: -77.0, country: "US" },
  { name: "Paris", lat: 48.9, lon: 2.3, country: "FR" },
  { name: "Berlin", lat: 52.5, lon: 13.4, country: "DE" },
  { name: "Tehran", lat: 35.7, lon: 51.4, country: "IR" },
  { name: "Riyadh", lat: 24.7, lon: 46.7, country: "SA" },
  { name: "Mumbai", lat: 19.1, lon: 72.9, country: "IN" },
  { name: "Seoul", lat: 37.6, lon: 127.0, country: "KR" },
  { name: "Sydney", lat: -33.9, lon: 151.2, country: "AU" },
  { name: "São Paulo", lat: -23.6, lon: -46.6, country: "BR" },
  { name: "Cairo", lat: 30.0, lon: 31.2, country: "EG" },
  { name: "Nairobi", lat: -1.3, lon: 36.8, country: "KE" },
];

interface OmniBarProps {
  onCitySelect: (lat: number, lon: number) => void;
}

export default function OmniBar({ onCitySelect }: OmniBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length > 0
    ? CITIES.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSelect = useCallback((city: City) => {
    onCitySelect(city.lat, city.lon);
    setQuery("");
    setIsOpen(false);
  }, [onCitySelect]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div
        className="glass rounded-full flex items-center gap-3 px-4 py-2.5 cursor-text glow-accent"
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
      >
        <Search className="h-4 w-4 text-accent shrink-0" />
        {isOpen ? (
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cities, regions..."
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            autoFocus
          />
        ) : (
          <span className="text-sm text-muted-foreground flex-1">Search hotspots...</span>
        )}
        <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-muted-foreground glass-highlight rounded px-1.5 py-0.5">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </div>

      {isOpen && filtered.length > 0 && (
        <div className="mt-2 glass-strong rounded-xl overflow-hidden shadow-2xl animate-fade-in">
          {filtered.map((city) => (
            <button
              key={city.name}
              onClick={() => handleSelect(city)}
              className="w-full px-4 py-3 text-left text-sm flex items-center justify-between hover:bg-accent/10 transition-colors"
            >
              <span className="text-foreground">{city.name}</span>
              <span className="text-muted-foreground text-xs font-mono">{city.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
