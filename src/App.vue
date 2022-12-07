<script setup lang="ts">
import Signup from './components/SignUp.vue';
</script>

<template>
  <v-content>
    <v-tabs centered>
      <v-tab> Sign Up </v-tab>
    </v-tabs>
    <v-tabs-item>
      <v-tab-item>
        <Signup></Signup>
      </v-tab-item>
    </v-tabs-item>
  </v-content>
</template>
