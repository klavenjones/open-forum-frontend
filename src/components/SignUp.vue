<template>
  <v-card>
    <v-card-title>Sign Up</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitForm" v-model="isValid" role="form">
        <v-text-field label="Username" id="username" role="input" v-model="username" required :rules="usernameRules" />
        <v-text-field
          label="Password"
          id="password"
          v-model="password"
          type="password"
          required
          :rules="passwordRules"
          error-count="3"
        />
        <v-btn type="submit" data-testid="submit-button" color="primary">Sign Up</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  <h1 class="mt-6">Message: {{ message }}</h1>
</template>

<script lang="ts">
import { authService } from '@/api/services';

export default {
  data() {
    return {
      username: null,
      password: null,
      isValid: false,
      message: null,
      passwordRules: [
        (verify: any) => !!verify || 'Password is required',
        (verify: string | any[]) => (verify && verify.length <= 20) || 'Password must be less than 20 characters',
        (verify: string | any[]) => (verify && verify.length >= 5) || 'Password must have 5+ characters',
      ] as any,
      usernameRules: [
        (verify: any) => !!verify || 'Username is required',
        (verify: string | any[]) =>
          (verify && verify.length <= 20) || 'Username must be less than or equal to 20 characters',
      ],
    };
  },
  methods: {
    async submitForm() {
      if (this.isValid) {
        try {
          if (this.username !== null && this.password !== null) {
            const { message } = await authService.registerUser(this.username, this.password);
            this.message = message;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
