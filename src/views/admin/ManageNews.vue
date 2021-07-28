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
      <v-btn color="primary" :to="{ name: 'CreateNews' }">Create</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      :server-items-length="meta.totalItems"
      :items-per-page="query.size"
      :sort-by="query.sortBy"
      :page="query.page"
      :loading="meta.loading"
      class="elevation-1"
    >
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
          :to="{ name: 'EditNews', params: { id: item.id } }"
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
          @click="deleteNews(item.id)"
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
  name: 'ManageNews',
  setup() {
    useTitle('Manage News');
    const headers = [
      {
        text: 'Id',
        sortable: false,
        value: 'id',
      },
      { text: 'Title', value: 'title' },
      { text: 'Heading', value: 'heading' },
      { text: 'Category', value: 'category.name' },
      { text: 'Created At', value: 'createdAt' },
      { text: 'Action', value: 'action' },
    ];

    const { query, data, meta } = useQuery('/news');
    const http = useHttp();

    async function deleteNews(id) {
      await http.delete(`/news/${id}`);
      data.value = data.value.filter((item) => item.id !== id);
    }

    return {
      query,
      meta,
      data,
      headers,
      formatDate,
      deleteNews,
    };
  },
};
</script>
