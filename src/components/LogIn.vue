<template>
  <v-card>
    <v-card-title>Log In</v-card-title>
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
        <v-btn type="submit" data-testid="submit-button" color="primary">Log In</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { authService } from '@/api/services';
export default {
  data() {
    return {
      username: null,
      password: null,
      isValid: false,
      passwordRules: [
        (verify: any) => !!verify || 'Password is required',
        (verify: string | any[]) => (verify && verify.length <= 64) || 'Password must be no more than 64 characters',
        (verify: string | any[]) => (verify && verify.length >= 8) || 'Password must have 8+ characters',
      ] as any,
      usernameRules: [
        (verify: any) => !!verify || 'Username is required',
        (verify: string | any[]) => (verify && verify.length <= 30) || 'Username must be no more than 30 characters',
        (verify: string | any[]) => (verify && verify.length >= 6) || 'Username must have 6+ characters',
      ],
    };
  },
  methods: {
    async submitForm() {
      if (this.isValid) {
        try {
          if (this.username !== null && this.password !== null) {
            const { message } = await authService.loginUser(this.username, this.password, {
              withCredentials: true,
              credentials: 'include',
            });
            alert(message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
