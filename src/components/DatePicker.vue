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
        @blur="$emit('blur', 'departureDate')"
        class="block w-full h-12 px-4 py-2 text-base border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg bg-white/50 transition-all duration-200 hover:border-primary/50"
      />
      <p v-if="departureDateError" class="text-red-500 text-xs mt-1">{{ departureDateError }}</p>
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
        @blur="$emit('blur', 'returnDate')"
        class="block w-full h-12 px-4 py-2 text-base border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg bg-white/50 transition-all duration-200 hover:border-primary/50"
      />
      <p v-if="returnDateError" class="text-red-500 text-xs mt-1">{{ returnDateError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  tripType: 'one-way' | 'return'
  departureDate: string
  returnDate: string
  departureDateError?: string
  returnDateError?: string
}>(), {
  departureDateError: '',
  returnDateError: '',
})

defineEmits<{
  'update:departureDate': [string]
  'update:returnDate': [string]
  'blur': [field: 'departureDate' | 'returnDate']
}>()

const today = computed(() => new Date().toISOString().split('T')[0])
const showReturn = computed(() => props.tripType === 'return')
</script>
