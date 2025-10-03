<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="form-group">
      <label 
        for="departure-date" 
        class="block text-base font-medium text-primary mb-2"
      >
        Departure Date
      </label>
      <input
        id="departure-date"
        type="date"
        :min="today"
        :value="departureDate"
        @input="$emit('update:departureDate', ($event.target as HTMLInputElement).value)"
        class="block w-full h-12 px-4 py-2 text-base border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg bg-white/50 transition-all duration-200 hover:border-primary/50"
      />
    </div>

    <div class="form-group" v-if="showReturn">
      <label 
        for="return-date" 
        class="block text-base font-medium text-primary mb-2"
      >
        Return Date
      </label>
      <input
        id="return-date"
        type="date"
        :min="departureDate || today"
        :value="returnDate"
        @input="$emit('update:returnDate', ($event.target as HTMLInputElement).value)"
        class="block w-full h-12 px-4 py-2 text-base border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg bg-white/50 transition-all duration-200 hover:border-primary/50"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  tripType: 'one-way' | 'return'
  departureDate: string
  returnDate: string
}>()

defineEmits<{
  'update:departureDate': [string]
  'update:returnDate': [string]
}>()

const today = computed(() => new Date().toISOString().split('T')[0])
const showReturn = computed(() => props.tripType === 'return')
</script>


