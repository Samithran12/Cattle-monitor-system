// Geolocation and Geodesic Distance Utilities for Indian Livestock Marketplace

export interface GeoLocation {
  name: string;
  city?: string;
  state: string;
  latitude: number;
  longitude: number;
  isMajorHub?: boolean;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
}

export const DEFAULT_USER_LOCATION: GeoLocation = {
  name: "Coimbatore",
  city: "Coimbatore",
  state: "Tamil Nadu",
  latitude: 11.0168,
  longitude: 76.9558,
  isMajorHub: true,
};

export const MAJOR_AGRICULTURAL_DISTRICTS: GeoLocation[] = [
  { name: "Coimbatore", city: "Coimbatore", state: "Tamil Nadu", latitude: 11.0168, longitude: 76.9558, isMajorHub: true },
  { name: "Tiruppur", city: "Tiruppur", state: "Tamil Nadu", latitude: 11.1085, longitude: 77.3411, isMajorHub: true },
  { name: "Erode", city: "Erode", state: "Tamil Nadu", latitude: 11.3410, longitude: 77.7172, isMajorHub: true },
  { name: "Dharapuram", city: "Dharapuram", state: "Tamil Nadu", latitude: 10.7300, longitude: 77.5300, isMajorHub: true },
  { name: "Salem", city: "Salem", state: "Tamil Nadu", latitude: 11.6643, longitude: 78.1460, isMajorHub: true },
  { name: "Dindigul", city: "Dindigul", state: "Tamil Nadu", latitude: 10.3673, longitude: 77.9803, isMajorHub: true },
  { name: "Madurai", city: "Madurai", state: "Tamil Nadu", latitude: 9.9252, longitude: 78.1198, isMajorHub: true },
  { name: "Thanjavur", city: "Thanjavur", state: "Tamil Nadu", latitude: 10.7870, longitude: 79.1378, isMajorHub: true },
  { name: "Tirunelveli", city: "Tirunelveli", state: "Tamil Nadu", latitude: 8.7139, longitude: 77.7567, isMajorHub: true },
  { name: "Pudukkottai", city: "Pudukkottai", state: "Tamil Nadu", latitude: 10.3833, longitude: 78.8001, isMajorHub: true },
  { name: "Vellore", city: "Vellore", state: "Tamil Nadu", latitude: 12.9165, longitude: 79.1325, isMajorHub: true },
  { name: "Chennai", city: "Chennai", state: "Tamil Nadu", latitude: 13.0827, longitude: 80.2707, isMajorHub: true },
  { name: "Mandya", city: "Mandya", state: "Karnataka", latitude: 12.5218, longitude: 76.8951, isMajorHub: true },
  { name: "Hassan", city: "Hassan", state: "Karnataka", latitude: 13.0033, longitude: 76.1004, isMajorHub: true },
  { name: "Bengaluru", city: "Bengaluru", state: "Karnataka", latitude: 12.9716, longitude: 77.5946, isMajorHub: true },
  { name: "Ongole", city: "Ongole", state: "Andhra Pradesh", latitude: 15.5057, longitude: 80.0499, isMajorHub: true },
  { name: "Guntur", city: "Guntur", state: "Andhra Pradesh", latitude: 16.3067, longitude: 80.4365, isMajorHub: true },
  { name: "Junagadh", city: "Junagadh", state: "Gujarat", latitude: 21.5222, longitude: 70.4579, isMajorHub: true },
  { name: "Anand", city: "Anand", state: "Gujarat", latitude: 22.5645, longitude: 72.9289, isMajorHub: true },
  { name: "Rohtak", city: "Rohtak", state: "Haryana", latitude: 28.8955, longitude: 76.6066, isMajorHub: true },
  { name: "Karnal", city: "Karnal", state: "Haryana", latitude: 29.6857, longitude: 76.9905, isMajorHub: true },
];

/**
 * Calculates Great-Circle Distance (Haversine formula) in Kilometers
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function formatDistance(distanceKm?: number): string {
  if (distanceKm === undefined || distanceKm === null) return "Nearby";
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m`;
  return `${distanceKm.toFixed(1)} km`;
}

export function findNearestDistrict(lat: number, lon: number): GeoLocation {
  let minDistance = Infinity;
  let nearest: GeoLocation = MAJOR_AGRICULTURAL_DISTRICTS[0];

  for (const district of MAJOR_AGRICULTURAL_DISTRICTS) {
    const dist = calculateDistanceKm(lat, lon, district.latitude, district.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = district;
    }
  }

  return nearest;
}

/**
 * Resolves approximate coordinates from city or location text
 */
export function resolveCoordinatesFromText(locationStr: string): GeoLocation {
  if (!locationStr) return DEFAULT_USER_LOCATION;
  const lower = locationStr.toLowerCase();

  for (const district of MAJOR_AGRICULTURAL_DISTRICTS) {
    if (
      lower.includes(district.name.toLowerCase()) ||
      (district.city && lower.includes(district.city.toLowerCase())) ||
      lower.includes(district.state.toLowerCase())
    ) {
      return district;
    }
  }

  return DEFAULT_USER_LOCATION;
}

/**
 * Obtains browser GPS position with high accuracy
 */
export function getCurrentGpsPosition(): Promise<GeoLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const nearest = findNearestDistrict(lat, lon);
        resolve({
          name: nearest.name,
          city: nearest.name,
          state: nearest.state,
          latitude: lat,
          longitude: lon,
          isMajorHub: true,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}
