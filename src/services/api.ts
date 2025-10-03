import axios from 'axios'
import type { Airport, AirportConnection } from '../types/flight'

const API_BASE_URL = 'https://api-cert.ezycommerce.sabre.com/api/v1'
const TENANT_IDENTIFIER = '9d7d6eeb25cd6083e0df323a0fff258e59398a702fac09131275b6b1911e202d'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Tenant-Identifier': TENANT_IDENTIFIER,
    'Content-Type': 'application/json'
  }
})

export const fetchOriginsWithConnections = async (): Promise<Airport[]> => {
  try {
    const response = await apiClient.get('/Airport/OriginsWithConnections/en-us')

    const airportsData = response.data?.airports ?? response.data ?? []

    return (airportsData as any[]).map((item: any): Airport => ({
      code: item.code,
      name: item.name,
      currency: item.currency,
      countryCode: item.countryCode,
      restrictedOnDeparture: Boolean(item.restrictedOnDeparture),
      restrictedOnDestination: Boolean(item.restrictedOnDestination),
      connections: (item.connections || []).map((c: any): AirportConnection => ({
        name: c.name,
        code: c.code,
        currency: c.currency,
        countryCode: c.countryCode,
        restrictedOnDeparture: Boolean(c.restrictedOnDeparture),
        restrictedOnDestination: Boolean(c.restrictedOnDestination)
      }))
    }))
  } catch (error) {
    //log error
    console.error('Error fetching airports:', error)
    //return empty array
    return []
  }
}
