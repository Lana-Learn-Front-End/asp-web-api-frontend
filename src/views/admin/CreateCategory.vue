<template>
  <v-card>
    <v-card-title v-if="isEdit">Edit category (id: {{ form.id }})</v-card-title>
    <v-card-title v-else>Create new Category</v-card-title>
    <v-card-text>
      <form>
        <v-text-field
          v-model="form.icon"
          :error-messages="errors.icon"
          label="Icon"
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
  name: 'CreateCategory',
  props: {
    id: {
      type: [Number, String],
    },
  },
  setup(props) {
    const { form, errors, setErrors, clearErrors, clearForm } = useForm({
      id: Number(props.id),
      icon: '',
      name: '',
    });

    const isEdit = computed(() => !!form.id);
    const loading = ref(false);
    const http = useHttp();
    const router = useRouter();

    async function submit() {
      loading.value = true;
      try {
        if (isEdit.value) {
          const data = await http.put(`/categories/${form.id}`, form);
          Object.assign(form, data);
          return;
        }
        await http.post('/categories', form);
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
          const data = await http.get(`/categories/${form.id}`);
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
