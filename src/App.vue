<script setup lang="ts">
import Signup from './components/Signup.vue';
import TheWelcome from './components/TheWelcome.vue';
</script>

<template>
  <v-content>
    <v-tabs v-model="tab" centered>
      <v-tab> Sign Up </v-tab>
    </v-tabs>
    <v-tabs-item v-model="tab">
      <v-tab-item>
        <Signup></Signup>
      </v-tab-item>
    </v-tabs-item>
  </v-content>
</template>
