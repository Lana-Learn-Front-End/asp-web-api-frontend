<template>
  <div class="mt-10 d-flex justify-center">
    <v-card style="width: 500px">
      <v-card-title>Sign up</v-card-title>
      <v-card-subtitle>Create new Account</v-card-subtitle>
      <v-card-text>
        <form>
          <v-text-field
            v-model="form.email"
            :error-messages="errors.email"
            label="Email"
            persistent-placeholder
            required
          >
          </v-text-field>

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

          <v-text-field
            v-model="form.confirm_password"
            :error-messages="errors.confirm_password"
            label="Confirm Password"
            type="password"
            persistent-placeholder
            required
          >
          </v-text-field>

          <v-text-field
            v-model="form.name"
            :error-messages="errors.name"
            label="Name"
            persistent-placeholder
            required
          >
          </v-text-field>

          <v-text-field
            v-model="form.phone"
            :error-messages="errors.phone"
            label="Phone"
            persistent-placeholder
            required
          >
          </v-text-field>
        </form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" :loading="loading" @click="submit">
          Sign Up
        </v-btn>
        <v-btn @click="clear">Clear</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { useForm, useHttp, useRouter } from '@/use/core';
import { ref } from '@vue/composition-api';

export default {
  name: 'SignUp',

  setup() {
    const { form, errors, setErrors, clearErrors, clearForm } = useForm({
      username: '',
      name: '',
      password: '',
      confirm_password: '',
      phone: '',
      email: '',
    });

    const loading = ref(false);
    const http = useHttp();
    const router = useRouter();

    async function submit() {
      if (form.password !== form.confirm_password) {
        setErrors({
          confirm_password: 'Password confirmation not match',
          password: 'Password confirmation not match',
        });
        return;
      }
      loading.value = true;
      try {
        await http.post('/auth/sign-up', form);
        router.push({ name: 'Login' });
      } catch (e) {
        setErrors(e.response.data);
      } finally {
        loading.value = false;
      }
    }

    function clear() {
      clearErrors();
      clearForm();
    }

    return {
      loading,
      form,
      errors,
      clear,
      submit,
    };
  },
};
</script>
