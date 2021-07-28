<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="query.search"
        append-icon="search"
        label="Search users"
        single-line
        hide-details
      >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="primary" :to="{ name: 'CreateUser' }">Create</v-btn>
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
          :to="{ name: 'EditUser', params: { id: item.id } }"
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
          @click="deleteUsers(item.id)"
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
  name: 'ManageUser',
  setup() {
    useTitle('Manage User');
    const headers = [
      {
        text: 'Id',
        sortable: false,
        value: 'id',
      },
      { text: 'Username', value: 'username' },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'Name', value: 'name' },
      { text: 'Created At', value: 'createdAt' },
      { text: 'Action', value: 'action' },
    ];

    const { query, data, meta } = useQuery('/users');
    const http = useHttp();

    async function deleteUsers(id) {
      await http.delete(`/users/${id}`);
      data.value = data.value.filter((item) => item.id !== id);
    }

    return {
      query,
      meta,
      data,
      headers,
      formatDate,
      deleteUsers,
    };
  },
};
</script>
