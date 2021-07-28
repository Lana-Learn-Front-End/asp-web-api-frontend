<template>
  <v-card>
    <v-card-title v-if="isEdit">Edit News (id: {{ form.id }})</v-card-title>
    <v-card-title v-else>Create new News</v-card-title>
    <v-card-text>
      <form>
        <v-text-field
          v-model="form.heading"
          :error-messages="errors.heading"
          label="Heading"
          persistent-placeholder
          required
        >
        </v-text-field>
        <v-text-field
          v-model="form.title"
          :error-messages="errors.title"
          label="Title"
          persistent-placeholder
          required
        >
        </v-text-field>
        <v-select
          v-model="form.categoryId"
          :items="categories"
          :error-messages="errors.categoryId"
          item-value="id"
          item-text="name"
          label="Category"
          persistent-placeholder
          required
        >
        </v-select>

        <editor v-model="form.content" :error-messages="errors.content"></editor>

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
import { useCategories, useForm, useHttp, useRouter } from '@/use/core';
import Editor from '@/components/Editor.vue';

export default {
  name: 'CreateNews',
  components: {
    Editor,
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  setup(props) {
    const { form, errors, setErrors, clearErrors, clearForm } = useForm({
      id: Number(props.id),
      heading: '',
      title: '',
      content: null,
      categoryId: null,
    });

    const categories = useCategories();
    const isEdit = computed(() => !!form.id);
    const loading = ref(false);
    const http = useHttp();
    const router = useRouter();

    async function submit() {
      loading.value = true;
      try {
        if (isEdit.value) {
          const data = await http.put(`/news/${form.id}`, form);
          Object.assign(form, data);
          return;
        }
        await http.post('/news', form);
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
          const data = await http.get(`/news/${form.id}`);
          Object.assign(form, data);
        } finally {
          loading.value = false;
        }
      }
    });

    return {
      form,
      errors,
      categories,
      isEdit,
      submit,
      cancel,
      clear,
      loading,
    };
  },
};
</script>
