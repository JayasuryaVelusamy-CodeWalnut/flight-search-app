<template>
  <div class="w-full">
    <div class="grid grid-cols-1 lg:grid-cols-[minmax(300px,_1fr)_auto_minmax(300px,_1fr)] gap-6 items-center">
        <div class="form-group">
          <label for="origin" class="block text-sm font-medium text-primary mb-2">From</label>
          <select 
            id="origin" 
            :value="originCode" 
            @change="onOriginChange"
            class="block w-full h-16 px-6 py-4 text-lg border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary rounded-xl bg-white/50 transition-all duration-200 hover:border-primary/50"
            style="text-align-last: center;"
          >
            <option value="" disabled>Select origin airport</option>
            <option 
              v-for="a in airports" 
              :key="a.code" 
              :value="a.code"
              class="py-3 text-lg"
            >
              {{ a.code }} - {{ a.name }} ({{ a.countryCode }})
            </option>
          </select>
        </div>

        <div class="flex justify-center">
          <button 
            class="swap-button text-white transform hover:rotate-180 transition-transform duration-300"
            @click="swapAirports"
            :disabled="!canSwap"
            :class="{'opacity-50 cursor-not-allowed': !canSwap}"
            aria-label="Swap airports"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        <div class="form-group">
          <label for="destination" class="block text-sm font-medium text-primary mb-2">To</label>
          <select 
            id="destination" 
            :value="destinationCode" 
            @change="onDestinationChange"
            class="block w-full h-16 px-6 py-4 text-lg border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary rounded-xl bg-white/50 transition-all duration-200 hover:border-primary/50"
            style="text-align-last: center;"
          >
            <option value="" disabled>{{ destinationSelectMessage }}</option>
            <template v-if="hasConnections">
              <option 
                v-for="a in filteredDestinations" 
                :key="a.code" 
                :value="a.code"
                class="py-3 text-lg"
              >
                {{ a.code }} - {{ a.name }} ({{ a.countryCode }})
              </option>
            </template>
          </select>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { Airport } from '../types/airport';

const props = defineProps<{
  airports: Airport[]
  originCode: string
  destinationCode: string
}>()

const emit = defineEmits<{
  'update:originCode': [string]
  'update:destinationCode': [string]
}>()

const hasConnections = computed(() => {
  const origin = props.airports.find(a => a.code === props.originCode)
  if (!origin || !origin.connections) return false
  return origin.connections.length > 0
})

const destinationSelectMessage = computed(() => {
  if (!props.originCode) return 'Select destination airport'
  return hasConnections.value ? 'Select destination airport' : 'No available connections from selected origin'
})

const filteredDestinations = computed(() => {
  const origin = props.airports.find(a => a.code === props.originCode)
  if (!origin || !origin.connections?.length) return []
  const allowedCodes = new Set(origin.connections.map(c => c.code))
  return props.airports.filter(a => allowedCodes.has(a.code))
})

const canSwap = computed(() => {
  return props.originCode && props.destinationCode && props.originCode !== props.destinationCode
})

const swapAirports = () => {
  if (!canSwap.value) return
  
  const currentOrigin = props.originCode
  const currentDestination = props.destinationCode
  
  if (currentOrigin && currentDestination) {
    emit('update:originCode', '')
    emit('update:destinationCode', '')
    
    setTimeout(() => {
      emit('update:originCode', currentDestination)
      emit('update:destinationCode', currentOrigin)
    }, 0)
  }
}

const onOriginChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value
  emit('update:originCode', value)
  emit('update:destinationCode', '')
}

const onDestinationChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value
  emit('update:destinationCode', value)
  if (value === props.originCode) {
    emit('update:originCode', '')
  }
}
</script>


