interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  // Add other properties as needed based on the actual API response
}

export function fetchAirports(): Promise<Airport[]>;