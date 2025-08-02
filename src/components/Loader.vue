<template>
  <div class="my-6 flex justify-center" v-if="loading">
    <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
  </div>
</template>

<script setup>
defineProps({ loading: Boolean });
</script>
