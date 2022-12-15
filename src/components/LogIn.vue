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
      username: '',
      password: '',
      isValid: false,
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
          const { message } = await authService.loginUser(this.username, this.password, {
            withCredentials: true,
            credentials: 'include',
          });
          alert(message);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
