<template>
  <div class="flight-search-form p-6">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <fieldset class="trip-type-selector">
        <legend class="sr-only">Select trip type</legend>
        <button 
          :class="{ active: searchCriteria.tripType === 'one-way' }"
          @click="searchCriteria.tripType = 'one-way'"
          :aria-pressed="searchCriteria.tripType === 'one-way'"
          aria-label="Select one-way trip"
        >
          One-way
        </button>
        <button 
          :class="{ active: searchCriteria.tripType === 'return' }"
          @click="searchCriteria.tripType = 'return'"
          :aria-pressed="searchCriteria.tripType === 'return'"
          aria-label="Select return trip"
        >
          Return
        </button>
      </fieldset>

      <ErrorMessage v-if="error" title="Error loading airports" :message="error" class="mb-4" />

      <div class="form-row">
        <template v-if="loading">
          <LoadingSkeleton :count="2" class="mb-4" />
        </template>
        <template v-else>
        <div class="form-group">
          <label for="origin">From</label>
          <select 
            id="origin" 
            v-model="selectedOriginCode"
            @change="handleOriginChange"
            :class="{ 'error': validationErrors.sameAirports }"
            aria-describedby="origin-error"
            aria-required="true"
          >
            <option value="">Select origin airport</option>
            <option 
              v-for="airport in airports" 
              :key="airport.code" 
              :value="airport.code"
              :disabled="airport.code === selectedDestinationCode"
            >
              {{ airport.code }} - {{ airport.name }} ({{ airport.countryCode }})
            </option>
          </select>
          <span v-if="validationErrors.sameAirports" id="origin-error" class="error-message" role="alert">Origin and destination cannot be the same</span>
        </div>

        <button 
          class="swap-button" 
          @click="swapAirports"
          aria-label="Swap origin and destination airports"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M16 3h5v5M21 3l-7 7M8 21H3v-5M3 21l7-7"/>
          </svg>
        </button>

        <div class="form-group">
          <label for="destination">To</label>
          <select 
            id="destination" 
            v-model="selectedDestinationCode"
            @change="handleDestinationChange"
            :class="{ 'error': validationErrors.sameAirports }"
            aria-describedby="destination-error"
            aria-required="true"
          >
            <option value="">Select destination airport</option>
            <option 
              v-for="airport in filteredDestinations" 
              :key="airport.code" 
              :value="airport.code"
              :disabled="airport.code === selectedOriginCode"
            >
              {{ airport.code }} - {{ airport.name }} ({{ airport.countryCode }})
            </option>
          </select>
          <span v-if="validationErrors.sameAirports" id="destination-error" class="error-message" role="alert">Origin and destination cannot be the same</span>
        </div>
        </template>
      </div>

      <div class="form-row dates-row">
        <div class="form-group" :class="{ 'half-width': searchCriteria.tripType === 'return' }">
          <label for="departure-date">Departure Date</label>
          <input 
            id="departure-date"
            type="date" 
            v-model="searchCriteria.departureDate"
            :min="today"
            aria-required="true"
            aria-describedby="departure-date-help"
          />
          <span id="departure-date-help" class="sr-only">Select your departure date</span>
        </div>

        <div class="form-group half-width" v-if="searchCriteria.tripType === 'return'">
          <label for="return-date">Return Date</label>
          <input 
            id="return-date"
            type="date" 
            v-model="searchCriteria.returnDate"
            :min="searchCriteria.departureDate || today"
            aria-required="true"
            aria-describedby="return-date-help"
          />
          <span id="return-date-help" class="sr-only">Select your return date</span>
        </div>
      </div>

      <div class="form-row">
        <fieldset class="form-group passengers">
          <legend>Passengers</legend>
          <div class="passenger-selector">
            <div class="passenger-type">
              <label for="adults-count" class="passenger-label">Adults</label>
              <div class="passenger-controls">
                <button 
                  @click="decrementAdults" 
                  :disabled="searchCriteria.passengers.adults <= 1"
                  aria-label="Decrease number of adults"
                  type="button"
                >-</button>
                <span id="adults-count" class="passenger-count" aria-live="polite">{{ searchCriteria.passengers.adults }}</span>
                <button 
                  @click="incrementAdults"
                  aria-label="Increase number of adults"
                  type="button"
                >+</button>
              </div>
            </div>

            <div class="passenger-type">
              <label for="children-count" class="passenger-label">Children</label>
              <div class="passenger-controls">
                <button 
                  @click="decrementChildren" 
                  :disabled="searchCriteria.passengers.children <= 0"
                  aria-label="Decrease number of children"
                  type="button"
                >-</button>
                <span id="children-count" class="passenger-count" aria-live="polite">{{ searchCriteria.passengers.children }}</span>
                <button 
                  @click="incrementChildren"
                  aria-label="Increase number of children"
                  type="button"
                >+</button>
              </div>
            </div>

            <div class="passenger-type">
              <label for="infants-count" class="passenger-label">Infants</label>
              <div class="passenger-controls">
                <button 
                  @click="decrementInfants" 
                  :disabled="searchCriteria.passengers.infants <= 0"
                  aria-label="Decrease number of infants"
                  type="button"
                >-</button>
                <span id="infants-count" class="passenger-count" aria-live="polite">{{ searchCriteria.passengers.infants }}</span>
                <button 
                  @click="incrementInfants"
                  aria-label="Increase number of infants"
                  type="button"
                >+</button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <button 
        class="search-button" 
        @click="handleSearch"
        :disabled="!isFormValid || searching"
        aria-describedby="search-help"
      >
        <span v-if="searching" aria-live="polite">Searching...</span>
        <span v-else>Search Flights</span>
      </button>
      <span id="search-help" class="sr-only">Search for available flights based on your criteria</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { fetchOriginsWithConnections } from '../services/api'
import type { Airport, SearchCriteria } from '../types/flight'
import LoadingSkeleton from './LoadingSkeleton.vue'
import ErrorMessage from './ErrorMessage.vue'

const emit = defineEmits<{
  search: [criteria: SearchCriteria]
}>()

const airports = ref<Airport[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searching = ref(false)

const selectedOriginCode = ref('')
const selectedDestinationCode = ref('')

const searchCriteria = ref<SearchCriteria>({
  tripType: 'return',
  origin: null,
  destination: null,
  departureDate: '',
  returnDate: '',
  passengers: {
    adults: 1,
    children: 0,
    infants: 0
  }
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const validationErrors = ref<{
  sameAirports: boolean
}>({
  sameAirports: false
})

const filteredDestinations = computed<Airport[]>(() => {
  const origin = airports.value.find(a => a.code === selectedOriginCode.value)
  if (!origin) return airports.value
  const allowedCodes = new Set(origin.connections.map(c => c.code))
  return airports.value.filter(a => allowedCodes.has(a.code))
})

const isFormValid = computed(() => {
  // Check if origin and destination are the same
  validationErrors.value.sameAirports = !!(
    searchCriteria.value.origin && 
    searchCriteria.value.destination && 
    searchCriteria.value.origin.code === searchCriteria.value.destination.code
  )
  
  return (
    searchCriteria.value.origin &&
    searchCriteria.value.destination &&
    searchCriteria.value.departureDate &&
    (searchCriteria.value.tripType === 'one-way' || searchCriteria.value.returnDate) &&
    !validationErrors.value.sameAirports
  )
})

const loadAirports = async () => {
  loading.value = true
  try {
    airports.value = await fetchOriginsWithConnections()
  } catch (err) {
    console.error('Failed to load airports:', err)
    error.value = 'Failed to load airports. Please try again later.'
  } finally {
    loading.value = false
  }
}

const handleOriginChange = () => {
  const airport = airports.value.find(a => a.code === selectedOriginCode.value)
  searchCriteria.value.origin = airport || null
  
  // If origin is same as destination, clear destination
  if (searchCriteria.value.destination && searchCriteria.value.origin?.code === searchCriteria.value.destination.code) {
    selectedDestinationCode.value = ''
    searchCriteria.value.destination = null
  }
}

const handleDestinationChange = () => {
  const airport = airports.value.find(a => a.code === selectedDestinationCode.value)
  searchCriteria.value.destination = airport || null
  
  // If destination is same as origin, clear origin
  if (searchCriteria.value.origin && searchCriteria.value.destination?.code === searchCriteria.value.origin.code) {
    selectedOriginCode.value = ''
    searchCriteria.value.origin = null
  }
}

const swapAirports = () => {
  const temp = selectedOriginCode.value
  selectedOriginCode.value = selectedDestinationCode.value
  selectedDestinationCode.value = temp
  
  const tempAirport = searchCriteria.value.origin
  searchCriteria.value.origin = searchCriteria.value.destination
  searchCriteria.value.destination = tempAirport
}

// Helper function to validate and set return date
const setReturnDateFromDeparture = (departureDate: string) => {
  if (searchCriteria.value.tripType === 'return' && departureDate) {
    const departure = new Date(departureDate)
    departure.setDate(departure.getDate() + 1)
    return departure.toISOString().split('T')[0]
  }
  return ''
}

const incrementAdults = () => searchCriteria.value.passengers.adults++
const decrementAdults = () => searchCriteria.value.passengers.adults = Math.max(1, searchCriteria.value.passengers.adults - 1)

const incrementChildren = () => searchCriteria.value.passengers.children++
const decrementChildren = () => searchCriteria.value.passengers.children = Math.max(0, searchCriteria.value.passengers.children - 1)

const incrementInfants = () => searchCriteria.value.passengers.infants++
const decrementInfants = () => searchCriteria.value.passengers.infants = Math.max(0, searchCriteria.value.passengers.infants - 1)

const handleSearch = () => {
  if (isFormValid.value) {
    searching.value = true
    emit('search', { ...searchCriteria.value })
    
    // Reset searching state after a delay
    setTimeout(() => {
      searching.value = false
    }, 2000)
  }
}

// Handle trip type changes - maintain common values and clear uncommon values
watch(() => searchCriteria.value.tripType, (newType, oldType) => {
  // Only process if the trip type actually changed
  if (newType !== oldType) {
    if (newType === 'one-way') {
      // When switching to one-way, clear return date (uncommon value)
      // Maintain common values: origin, destination, departure date, passengers
      searchCriteria.value.returnDate = ''
    } else if (newType === 'return') {
      // When switching to return, maintain common values:
      // - Origin and destination airports (common)
      // - Departure date (common)
      // - Passenger counts (common)
      // - Return date will be set by user or defaults to departure date + 1 day
      
      // If no return date is set, set it to departure date + 1 day
      if (!searchCriteria.value.returnDate && searchCriteria.value.departureDate) {
        searchCriteria.value.returnDate = setReturnDateFromDeparture(searchCriteria.value.departureDate)
      }
    }
  }
})

// Watch departure date to update return date when switching to return trips
watch(() => searchCriteria.value.departureDate, (newDepartureDate, oldDepartureDate) => {
  // Only update if departure date changed and we're on a return trip
  if (newDepartureDate !== oldDepartureDate && searchCriteria.value.tripType === 'return') {
    // If return date is not set or is before the new departure date, update it
    if (!searchCriteria.value.returnDate || 
        (searchCriteria.value.returnDate && new Date(searchCriteria.value.returnDate) <= new Date(newDepartureDate))) {
      searchCriteria.value.returnDate = setReturnDateFromDeparture(newDepartureDate)
    }
  }
})

onMounted(() => {
  loadAirports()
  // Set default departure date to tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  searchCriteria.value.departureDate = tomorrow.toISOString().split('T')[0]
})
</script>
