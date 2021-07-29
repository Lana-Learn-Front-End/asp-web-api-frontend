<template>
  <div class="mt-10 d-flex justify-center">
    <v-card style="width: 500px">
      <v-card-title>Login</v-card-title>
      <v-card-subtitle>Login to your account</v-card-subtitle>
      <v-card-text>
        <form>
          <v-text-field
            v-model="form.username"
            :error-messages="errors.username"
            label="Username"
            persistent-placeholder
            required
          >
          </v-text-field>
          <v-text-field
            v-model="form.password"
            :error-messages="errors.password"
            label="Password"
            type="password"
            persistent-placeholder
            required
          >
          </v-text-field>
        </form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="submit" :loading="loading">
          Login
        </v-btn>
        <v-btn
          :disabled="loading"
          color="success"
          :to="{ name: 'SignUp'}"
        >
          Sign Up
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { useForm, useHttp, useRouter, useUser } from '@/use/core';
import { ref } from '@vue/composition-api';
import { useLocalStorage } from '@vueuse/core';

export default {
  name: 'Login.vue',

  setup() {
    const tokenStorage = useLocalStorage('token', 'Unauthorized');
    const loading = ref(false);
    const { form, errors, setErrors } = useForm({
      username: '',
      password: '',
    });

    const http = useHttp().unwrapped;
    const router = useRouter();
    const user = useUser();

    async function submit() {
      loading.value = true;
      try {
        const { token, userId } = (await http.post('/auth/login', form)).data;
        user.value = (await http.get(`/users/${userId}`)).data;
        http.defaults.headers.Authorization = `Bearer ${token}`;
        tokenStorage.value = token;
        router.push({ name: 'ListProduct' });
      } catch {
        setErrors({
          username: 'Wrong user name or password',
          password: 'Wrong user name or password',
        });
      } finally {
        loading.value = false;
      }
    }

    return {
      loading,
      submit,
      form,
      errors,
    };
  },
};
</script>
