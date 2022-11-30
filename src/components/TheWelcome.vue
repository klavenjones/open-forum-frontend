<template>
  <v-btn color="primary" class="mb-6" @click="getUsers()" data-test="user-btn"> Click for users </v-btn>
  <div :key="user.id" v-for="user in users" data-test="users">
    <h1>{{ user.username }} <span v-if="user.isAdmin"> - Admin</span></h1>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export interface User {
  username: string;
  isAdmin: boolean;
  id: number;
}

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
