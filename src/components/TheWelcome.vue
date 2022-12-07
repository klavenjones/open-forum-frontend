<template>
  <v-btn color="primary" class="mb-6" @click="getUsers()" role="button"> Click for users </v-btn>
  <ul role="list">
    <li :key="user.id" v-for="user in users" data-testid="users">
      <h1>{{ user.username }} <span v-if="user.isAdmin"> - Admin</span></h1>
    </li>
  </ul>
</template>

<script lang="ts">
import type { User } from '@/interfaces/User';
import axios from 'axios';

export default {
  data() {
    return {
      users: [] as User[],
    };
  },
  methods: {
    async getUsers() {
      const result = await axios.get('http://localhost:3000/users');
      this.users = result.data;
    },
  },
};
</script>
