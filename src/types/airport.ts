export interface AirportConnection {
  code: string;
}

export interface Airport {
  code: string;
  name: string;
  countryCode: string;
  connections?: AirportConnection[];
}