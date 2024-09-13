<template>
    <div class="message-bubble">
      <p>{{ message.content }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  defineProps({
    message: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .message-bubble {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>