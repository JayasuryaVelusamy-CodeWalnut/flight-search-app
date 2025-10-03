import axios from 'axios';

const API_URL = 'https://api-cert.ezycommerce.sabre.com/api/v1/Airport/OriginsWithConnections/en-us';
const TENANT_ID = '9d7d6eeb25cd6083e0df323a0fff258e59398a702fac09131275b6b1911e202d';

interface AirportConnection {
  code: string;
}

interface Airport {
  code: string;
  name: string;
  countryCode: string;
  connections?: AirportConnection[];
}

interface ApiAirport {
  code: string;
  name: string;
  countryCode: string;
  country: string;
  city: string;
  connections?: { code: string }[];
}

export async function fetchAirports(): Promise<Airport[]> {
  try {
    const response = await axios.get<{ airports: ApiAirport[] }>(API_URL, {
      headers: {
        'Tenant-Identifier': TENANT_ID
      }
    });
    
    // Transform API response to match our Airport type
    const airports: Airport[] = (response.data.airports || []).map(airport => {
      const connections: AirportConnection[] | undefined = airport.connections?.map(conn => ({
        code: conn.code
      }));

      return {
        code: airport.code,
        name: airport.name,
        countryCode: airport.countryCode,
        connections
      };
    });
    
    return airports;
  } catch (error) {
    return [];
  }
}