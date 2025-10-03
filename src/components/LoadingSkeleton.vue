<template>
  <div class="space-y-4">
    <div v-for="i in count" :key="i" class="skeleton h-10"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count?: number
}>()
</script>