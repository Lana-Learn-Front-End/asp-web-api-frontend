<template>
  <v-card>
    <v-card-title v-if="isEdit">Edit product (id: {{ form.id }})</v-card-title>
    <v-card-title v-else>Create new Product</v-card-title>
    <v-card-text>
      <v-form>
        <v-file-input
          accept="image/*"
          prepend-icon=""
          show-size
          v-model="image"
          label="Image"
          persistent-placeholder
          required
          @change="imageChanged = true"
        >
          <template v-slot:selection="{ file }">
            <v-img
              v-if="file"
              class="my-3"
              max-height="150"
              max-width="250"
              :src="createImageUrlFromFile(file)"
            >
            </v-img>
          </template>
        </v-file-input>
        <v-text-field
          v-model="form.code"
          :error-messages="errors.code"
          label="Code"
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
          v-model="form.quantity"
          :error-messages="errors.quantity"
          label="Quantity"
          type="number"
          persistent-placeholder
          required
        >
        </v-text-field>
        <v-text-field
          v-model="form.price"
          :error-messages="errors.price"
          label="Price"
          type="number"
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

        <editor v-model="form.description" :error-messages="errors.description"></editor>

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
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api';
import { useCategories, useForm, useHttp, useRouter } from '@/use/core';
import Editor from '@/components/Editor.vue';

export default {
  name: 'CreateProduct',
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
      code: '',
      name: '',
      imageId: '',
      quantity: null,
      price: null,
      categoryId: null,
      description: '',
    });

    const categories = useCategories();
    const isEdit = computed(() => !!form.id);
    const loading = ref(false);
    const http = useHttp();
    const router = useRouter();

    async function submit() {
      form.price = form.price || null;
      form.quantity = form.quantity || null;

      loading.value = true;

      try {
        await uploadImage();
      } catch (e) {
        loading.value = false;
        setErrors(e.response.data);
      }

      try {
        if (isEdit.value) {
          const data = await http.put(`/products/${form.id}`, form);
          Object.assign(form, data);
          return;
        }
        await http.post('/products', form);
        router.back();
      } catch (e) {
        setErrors(e.response.data);
        if (imageChanged && form.imageId) {
          await http.delete(`/data/images/${form.imageId}`);
          form.imageId = null;
        }
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
          const data = await http.get(`/products/${form.id}`);
          Object.assign(form, data);
          if (data.imageId) {
            const blob = await http.get(`/data/images/${data.imageId}`, { responseType: 'blob' });
            image.value = new File([blob], `${data.code}_img_${data.imageId}`);
          }
        } finally {
          loading.value = false;
        }
      }
    });

    const image = ref(null);
    const imageChanged = ref(false);

    async function uploadImage() {
      if (!imageChanged.value) {
        return;
      }
      if (form.imageId) {
        await http.delete(`/data/images/${form.imageId}`);
        form.imageId = null;
      }
      if (image.value) {
        const formData = new FormData();
        formData.append('files', image.value);
        const imageData = await http.post('/data/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        form.imageId = imageData.id;
      }
    }

    function createImageUrlFromFile(file) {
      return URL.createObjectURL(file);
    }

    return {
      form,
      errors,
      categories,
      isEdit,
      submit,
      cancel,
      clear,
      loading,
      image,
      createImageUrlFromFile,
      imageChanged,
    };
  },
};
</script>
