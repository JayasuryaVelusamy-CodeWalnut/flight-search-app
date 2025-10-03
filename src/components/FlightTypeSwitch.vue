<template>
  <fieldset class="grid grid-cols-2 rounded-xl shadow-lg p-2 bg-white/20 backdrop-blur-sm w-full max-w-md mx-auto gap-2">
    <legend class="sr-only">Select trip type</legend>
    <button 
      :class="[
        'px-6 py-3 text-base font-medium rounded-xl transition-all duration-300 flex-1',
        modelValue === 'one-way' 
          ? 'bg-gradient-primary text-white shadow-lg transform scale-105' 
          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-primary shadow-md'
      ]"
      @click="$emit('update:modelValue', 'one-way')"
      :aria-pressed="modelValue === 'one-way'"
      aria-label="Select one-way trip"
      type="button"
    >
      One-way
    </button>
    <button 
      :class="[
        'px-6 py-3 text-base font-medium rounded-xl transition-all duration-300 flex-1',
        modelValue === 'return' 
          ? 'bg-gradient-primary text-white shadow-lg transform scale-105' 
          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-primary shadow-md'
      ]"
      @click="$emit('update:modelValue', 'return')"
      :aria-pressed="modelValue === 'return'"
      aria-label="Select return trip"
      type="button"
    >
      Return
    </button>
  </fieldset>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: 'one-way' | 'return'
}>()
defineEmits<{
  'update:modelValue': ['one-way' | 'return']
}>()
</script>


