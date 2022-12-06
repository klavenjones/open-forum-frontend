<template>
  <v-card>
    <v-card-title>Sign Up</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitForm()" v-model="isValid" role="form">
        <v-text-field
          label="Username"
          name="username"
          role="input"
          v-model="username"
          required
          :rules="usernameRules"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          required
          :rules="passwordRules"
          error-count="2"
        ></v-text-field>
        <v-btn type="submit" color="primary">Sign Up</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  <h1 class="mt-6">Message: {{ message }}</h1>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      username: null,
      password: null,
      isValid: false,
      message: null,
      passwordRules: [
        (verify: any) => !!verify || 'Password is required',
        (verify: string | any[]) => (verify && verify.length >= 5) || 'Password must have 5+ characters',
        (verify: string | any[]) => (verify && verify.length < 20) || 'Password must be less than 60 characters',
      ] as any,
      usernameRules: [
        (verify: any) => !!verify || 'Username is required',
        (verify: string | any[]) => (verify && verify.length <= 20) || 'Password must be less than 120 characters',
      ],
    };
  },
  methods: {
    async submitForm() {
      try {
        const {
          data: { message, status },
        } = await axios.post('http://localhost:3000/auth/register', {
          username: this.username,
          password: this.password,
        });

        this.message = message;
        alert(`Logged in successfully with a status: ${status}`);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
