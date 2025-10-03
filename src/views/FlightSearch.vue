<template>
  <div class="flight-search-view w-full px-4 sm:px-6 lg:px-8 py-8">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-white/20 p-8">
        <div v-if="loading" class="space-y-8">
          <LoadingSkeleton :count="5" />
        </div>
        <div v-else class="space-y-8">
          <ErrorMessage v-if="error" title="Error" :message="error" />

          <div class="mb-8">
            <h2 class="text-base font-medium text-primary mb-3">Trip Type</h2>
            <FlightTypeSwitch v-model="tripType" />
          </div>

          <div class="border-t-2 border-primary/10 pt-8">
            <h2 class="text-base font-medium text-primary mb-3">Route</h2>
            <AirportSelect
              :airports="airports"
              v-model:originCode="originCode"
              v-model:destinationCode="destinationCode"
            />
          </div>

          <div class="border-t-2 border-primary/10 pt-8">
            <h2 class="text-base font-medium text-primary mb-3">Travel Dates</h2>
            <DatePicker
              :tripType="tripType"
              v-model:departureDate="departureDate"
              v-model:returnDate="returnDate"
            />
          </div>

          <div class="border-t-2 border-primary/10 pt-8">
            <PassengerSelector
              v-model:adults="passengers.adults"
              v-model:children="passengers.children"
              v-model:infants="passengers.infants"
            />
          </div>

          <div class="border-t-2 border-primary/10 pt-8">
            <SearchButton 
              :disabled="!isValid || searching" 
              :loading="searching" 
              @click="handleSearch"
              class="w-full max-w-2xl mx-auto"
            />
          </div>
        </div>
      </div>

      <div class="mt-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-white/20 p-8" v-if="searched">
        <h2 class="text-lg font-medium text-primary mb-3">Search Summary</h2>
        <ul class="space-y-3 text-lg">
          <li><strong>Trip:</strong> {{ tripType === 'one-way' ? 'One-way' : 'Return' }}</li>
          <li><strong>Route:</strong> {{ originCode }} → {{ destinationCode }}</li>
          <li><strong>Departure:</strong> {{ formatDate(departureDate) }}</li>
          <li v-if="tripType === 'return' && returnDate"><strong>Return:</strong> {{ formatDate(returnDate) }}</li>
          <li><strong>Passengers:</strong> {{ passengers.adults }} adults, {{ passengers.children }} children, {{ passengers.infants }} infants</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { fetchAirports } from '../api/airportService'
import FlightTypeSwitch from '../components/FlightTypeSwitch.vue'
import AirportSelect from '../components/AirportSelect.vue'
import DatePicker from '../components/DatePicker.vue'
import PassengerSelector from '../components/PassengerSelector.vue'
import SearchButton from '../components/SearchButton.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import LoadingSkeleton from '../components/LoadingSkeleton.vue'

type TripType = 'one-way' | 'return'

const airports = ref([] as Array<{
  code: string;
  name: string;
  countryCode: string;
  connections?: Array<{ code: string }>;
}>)
const loading = ref(false)
const searching = ref(false)
const searched = ref(false)
const error = ref<string | null>(null)

const tripType = ref<TripType>('return')
const originCode = ref('')
const destinationCode = ref('')
const departureDate = ref('')
const returnDate = ref('')
const passengers = ref({ adults: 1, children: 0, infants: 0 })

const isValid = computed(() => {
  const validRoute = !!(originCode.value && destinationCode.value && originCode.value !== destinationCode.value)
  const validDates = !!(departureDate.value && (tripType.value === 'one-way' || returnDate.value))
  return validRoute && validDates
})

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    const result = await fetchAirports()
    airports.value = (result as unknown) as Array<{
      code: string;
      name: string;
      countryCode: string;
      connections?: Array<{ code: string }>;
    }>
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'An unexpected error occurred.'
    }
  } finally {
    loading.value = false
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  departureDate.value = tomorrow.toISOString().split('T')[0]
})

watch(tripType, (t) => {
  if (t === 'one-way') returnDate.value = ''
})

const handleSearch = () => {
  if (!isValid.value) return
  searching.value = true
  searched.value = true
  setTimeout(() => { searching.value = false }, 800)
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}-${month}-${year}`
}
</script>
