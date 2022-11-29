<template>
  <v-btn color="primary" class="mb-6" @click="getData()" data-test="user-btn"> Click for users </v-btn>
  <div :key="user.id" v-for="user in users" data-test="users">
    <h1>{{ user.username }} <span v-if="user.isAdmin"> - Admin</span></h1>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
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
