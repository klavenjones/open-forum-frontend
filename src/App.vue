<script setup lang="ts">
import SignUp from './components/SignUp.vue';
import LogIn from './components/LogIn.vue';
</script>

<template>
  <v-content>
    <v-tabs centered v-model="tab">
      <v-tab value="sign-up"> Sign Up </v-tab>
      <v-tab value="log-in">Log In</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="sign-up">
        <SignUp></SignUp>
      </v-window-item>
      <v-window-item value="log-in">
        <LogIn></LogIn>
      </v-window-item>
    </v-window>
  </v-content>
</template>

<script lang="ts">
export default {
  data: () => ({
    tab: 'log-in' as any,
  }),
};
</script>
