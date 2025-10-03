<template>
  <div class="flight-results">
    <div class="results-card">
      <h2>Search Results</h2>
      <p class="results-message">{{ results.message }}</p>
      
      <div class="search-summary">
        <h3>Your Search Criteria:</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="label">Trip Type:</span>
            <span class="value">{{ formatTripType(results.criteria.tripType) }}</span>
          </div>
          
          <div class="summary-item">
            <span class="label">Route:</span>
            <span class="value">
              {{ results.criteria.origin?.code }} → {{ results.criteria.destination?.code }}
            </span>
          </div>
          
          <div class="summary-item">
            <span class="label">Departure:</span>
            <span class="value">{{ formatDate(results.criteria.departureDate) }}</span>
          </div>
          
          <div class="summary-item" v-if="results.criteria.returnDate">
            <span class="label">Return:</span>
            <span class="value">{{ formatDate(results.criteria.returnDate) }}</span>
          </div>
          
          <div class="summary-item">
            <span class="label">Passengers:</span>
            <span class="value">
              {{ formatPassengers(results.criteria.passengers) }}
            </span>
          </div>
        </div>
      </div>

      <div class="airport-details" v-if="results.criteria.origin || results.criteria.destination">
        <h3>Airport Details:</h3>
        <div class="airports-grid">
          <div class="airport-info" v-if="results.criteria.origin">
            <h4>Origin: {{ results.criteria.origin.code }}</h4>
            <p><strong>{{ results.criteria.origin.name }}</strong></p>
            <p>Country: {{ results.criteria.origin.countryCode }} | Currency: {{ results.criteria.origin.currency }}</p>
          </div>
          
          <div class="airport-info" v-if="results.criteria.destination">
            <h4>Destination: {{ results.criteria.destination.code }}</h4>
            <p><strong>{{ results.criteria.destination.name }}</strong></p>
            <p>Country: {{ results.criteria.destination.countryCode }} | Currency: {{ results.criteria.destination.currency }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchResults } from '../types/flight'

defineProps<{
  results: SearchResults
}>()

const formatTripType = (tripType: string) => {
  return tripType === 'one-way' ? 'One Way' : 'Return Trip'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatPassengers = (passengers: { adults: number; children: number; infants: number }) => {
  const parts = []
  if (passengers.adults > 0) parts.push(`${passengers.adults} adult${passengers.adults > 1 ? 's' : ''}`)
  if (passengers.children > 0) parts.push(`${passengers.children} child${passengers.children > 1 ? 'ren' : ''}`)
  if (passengers.infants > 0) parts.push(`${passengers.infants} infant${passengers.infants > 1 ? 's' : ''}`)
  return parts.join(', ')
}
</script>
