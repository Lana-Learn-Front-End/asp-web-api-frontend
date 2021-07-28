<template>
  <v-card>
    <v-card-title v-if="isEdit">Edit User (id: {{ form.id }})</v-card-title>
    <v-card-title v-else>Create new User</v-card-title>
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

        <div class="mt-3">
          <v-btn
            class="mr-4"
            @click="submit"
            color="primary"
            :loading="loading"
          >
            Submit
          </v-btn>
          <v-btn
            class="mr-4"
            @click="clear"
            color="green"
          >
            Clear
          </v-btn>
          <v-btn @click="cancel">
            Back
          </v-btn>
        </div>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api';
import { useForm, useHttp, useRouter } from '@/use/core';

export default {
  name: 'CreateUser',
  props: {
    id: {
      type: [Number, String],
    },
  },
  setup(props) {
    const { form, errors, setErrors, clearErrors, clearForm } = useForm({
      id: Number(props.id),
      username: '',
      name: '',
      password: '',
      phone: '',
      email: '',
    });

    const isEdit = computed(() => !!form.id);
    const loading = ref(false);
    const http = useHttp();
    const router = useRouter();

    async function submit() {
      loading.value = true;
      try {
        if (isEdit.value) {
          const data = await http.put(`/users/${form.id}`, form);
          Object.assign(form, data);
          return;
        }
        await http.post('/users', form);
        router.back();
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

    function cancel() {
      router.back();
    }

    onMounted(async () => {
      if (isEdit.value) {
        try {
          loading.value = true;
          const data = await http.get(`/users/${form.id}`);
          Object.assign(form, data);
        } finally {
          loading.value = false;
        }
      }
    });

    return {
      form,
      errors,
      isEdit,
      submit,
      cancel,
      clear,
      loading,
    };
  },
};
</script>
