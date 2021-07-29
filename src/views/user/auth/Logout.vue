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
import { useHttp, useRouter, useUser } from '@/use/core';
import { useLocalStorage } from '@vueuse/core';

export default {
  name: 'Logout',
  setup() {
    const router = useRouter();
    const http = useHttp();
    const tokenStorage = useLocalStorage('token', 'Unauthorized');

    function logout() {
      tokenStorage.value = 'Unauthorized';
      http.unwrapped.defaults.headers.Authorization = 'Bearer Unauthorized';
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
