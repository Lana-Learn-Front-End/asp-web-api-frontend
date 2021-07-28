<template>
  <div class="mt-10 d-flex justify-center">
    <v-card style="width: 500px">
      <v-card-title>Logout</v-card-title>
      <v-card-subtitle>Warning</v-card-subtitle>
      <v-card-text>
        You are about to log out of your account
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="logout">
          Logout
        </v-btn>
        <v-btn
          text
          @click="$router.back()"
        >
          Back
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { useRouter, useUser } from '@/use/core';

export default {
  name: 'Logout',
  setup() {
    const router = useRouter();

    function logout() {
      const pass = new Date(new Date().getTime() - 10000);
      document.cookie = `${process.env.VUE_APP_AUTH_COOKIE}= ; expires= ${pass.toUTCString()}; path=/`;
      const user = useUser();
      user.value = null;
      router.push({ name: 'ListProduct' });
    }

    return {
      logout,
    };
  },
};
</script>
