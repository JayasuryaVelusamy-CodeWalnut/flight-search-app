export interface AirportConnection {
  name: string
  code: string
  currency: string
  countryCode: string
  restrictedOnDeparture: boolean
  restrictedOnDestination: boolean
}

export interface Airport {
  code: string
  name: string
  currency: string
  countryCode: string
  restrictedOnDeparture: boolean
  restrictedOnDestination: boolean
  connections: AirportConnection[]
}

export interface SearchCriteria {
  tripType: 'one-way' | 'return'
  origin: Airport | null
  destination: Airport | null
  departureDate: string
  returnDate: string
  passengers: {
    adults: number
    children: number
    infants: number
  }
}

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  departure: {
    airport: string
    time: string
  }
  arrival: {
    airport: string
    time: string
  }
  duration: string
  price: number
  currency: string
}

export interface SearchResults {
  criteria: SearchCriteria
  flights: Flight[]
  returnFlights?: Flight[]
  message: string
}
