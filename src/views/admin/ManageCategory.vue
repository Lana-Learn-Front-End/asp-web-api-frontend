<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="query.search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="primary" :to="{ name: 'CreateCategory' }">Create</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      :server-items-length="meta.totalItems"
      :items-per-page="query.size"
      :page="query.page"
      :loading="meta.loading"
      class="elevation-1"
    >
      <template #item.icon="{ item }">
        <v-icon>{{ item.icon || 'label' }}</v-icon>
      </template>

      <template #item.createdAt="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>

      <template #item.action="{ item }">
        <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="primary"
          :to="{ name: 'EditCategory', params: { id: item.id } }"
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
          @click="deleteCategory(item.id)"
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
import { formatDate } from '@/use/date';
import { useHttp, useQuery } from '@/use/core';

export default {
  name: 'ManageCategory',
  setup() {
    useTitle('Manage Category');
    const headers = [
      {
        text: 'Id',
        sortable: false,
        value: 'id',
      },
      { text: 'icon', value: 'icon' },
      { text: 'Name', value: 'name' },
      { text: 'Created At', value: 'createdAt' },
      { text: 'Action', value: 'action' },
    ];

    const { query, data, meta } = useQuery('/categories');
    const http = useHttp();

    async function deleteCategory(id) {
      await http.delete(`/categories/${id}`);
      data.value = data.value.filter((item) => item.id !== id);
    }

    return {
      query,
      meta,
      data,
      headers,
      formatDate,
      deleteCategory,
    };
  },
};
</script>
