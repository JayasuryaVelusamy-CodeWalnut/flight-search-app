<template>
  <fieldset>
    <legend class="text-base font-medium text-primary px-3 py-1.5 bg-white/50 rounded-lg mb-3">Passengers</legend>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white/50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-4">
          <label class="text-sm font-medium text-primary">Adults</label>
          <span class="text-sm text-gray-500">(12+ years)</span>
        </div>
        <div class="flex items-center justify-between">
          <button 
            type="button" 
            @click="update('adults', Math.max(1, adults - 1))" 
            :disabled="adults <= 1"
            class="h-12 w-12 inline-flex items-center justify-center border-2 border-primary/20 rounded-xl hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-primary"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
            </svg>
          </button>
          <span class="w-12 text-center text-lg font-bold text-primary">{{ adults }}</span>
          <button 
            type="button" 
            @click="update('adults', adults + 1)"
            class="h-12 w-12 inline-flex items-center justify-center border-2 border-primary/20 rounded-xl hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-primary"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="bg-white/50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-4">
          <label class="text-sm font-medium text-primary">Children</label>
          <span class="text-sm text-gray-500">(2-11 years)</span>
        </div>
        <div class="flex items-center justify-between">
          <button 
            type="button" 
            @click="update('children', Math.max(0, children - 1))" 
            :disabled="children <= 0"
            class="h-12 w-12 inline-flex items-center justify-center border-2 border-primary/20 rounded-xl hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-primary"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
            </svg>
          </button>
          <span class="w-12 text-center text-lg font-bold text-primary">{{ children }}</span>
          <button 
            type="button" 
            @click="update('children', children + 1)"
            class="h-12 w-12 inline-flex items-center justify-center border-2 border-primary/20 rounded-xl hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-primary"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="bg-white/50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-4">
          <label class="text-sm font-medium text-primary">Infants</label>
          <span class="text-sm text-gray-500">(0-2 years)</span>
        </div>
        <div class="flex items-center justify-between">
          <button 
            type="button" 
            @click="update('infants', Math.max(0, infants - 1))" 
            :disabled="infants <= 0"
            class="h-12 w-12 inline-flex items-center justify-center border-2 border-primary/20 rounded-xl hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-primary"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
            </svg>
          </button>
          <span class="w-12 text-center text-lg font-bold text-primary">{{ infants }}</span>
          <button 
            type="button" 
            @click="update('infants', infants + 1)"
            class="h-12 w-12 inline-flex items-center justify-center border-2 border-primary/20 rounded-xl hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-primary"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
defineProps<{ adults: number; children: number; infants: number }>()
const emit = defineEmits<{
  'update:adults': [number]
  'update:children': [number]
  'update:infants': [number]
}>()

const update = (key: 'adults' | 'children' | 'infants', value: number) => {
  if (key === 'adults') emit('update:adults', value)
  if (key === 'children') emit('update:children', value)
  if (key === 'infants') emit('update:infants', value)
}
</script>


