<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="query.search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        class="mr-4"
      >
      </v-text-field>
      <v-select
        v-model="query.category"
        :items="categories"
        append-icon="category"
        item-value="name"
        item-text="name"
        label="Category"
        single-line
        hide-details
        style="max-width: 200px"
      >
      </v-select>
      <v-spacer></v-spacer>
      <v-btn color="primary" :to="{ name: 'CreateProduct' }">Create</v-btn>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="data"
      :server-items-length="meta.totalItems"
      :items-per-page.sync="query.size"
      :page.sync="query.page"
      :loading="meta.loading"
      class="elevation-1"
    >
      <template #item.updatedAt="{ item }">
        {{ formatDate(item.updatedAt) }}
      </template>

      <template #item.action="{ item }">
        <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="primary"
          :to="{ name: 'EditProduct', params: { id: item.id } }"
        >
          <v-icon dark>
            edit
          </v-icon>
        </v-btn>

        <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="error"
          @click="deleteProduct(item.id)"
        >
          <v-icon dark>
            delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { useTitle } from '@vueuse/core';
import { useCategories, useHttp, useQuery } from '../../use/core';
import { formatDate } from '../../use/date';

export default {
  name: 'ManageProduct',
  setup() {
    useTitle('Manage Product');
    const headers = [
      { text: 'Id', value: 'id' },
      { text: 'Code', value: 'code' },
      { text: 'Name', value: 'name' },
      { text: 'Image', value: 'image' },
      { text: 'Price', value: 'price' },
      { text: 'Category', value: 'category.name' },
      { text: 'Updated At', value: 'updatedAt' },
      { text: 'Action', value: 'action' },
    ];

    const { query, data, meta } = useQuery('/products');

    const categories = useCategories();
    const http = useHttp();

    async function deleteProduct(id) {
      await http.delete(`/products/${id}`);
      data.value = data.value.filter((product) => product.id !== id);
    }

    return {
      query,
      data,
      meta,
      headers,
      formatDate,
      deleteProduct,
      categories,
    };
  },
};
</script>
