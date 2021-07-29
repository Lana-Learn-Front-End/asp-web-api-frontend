<template>
  <div>
    <h1 class="text-h5 mb-5">News and Discount</h1>
    <v-card v-for="item of data" :key="item.id">
      <div class="d-flex flex-no-wrap mb-5 pa-2">
        <v-avatar
          class="ma-3"
          size="160"
          tile
        >
          <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
        </v-avatar>

        <div>
          <v-card-title>
            {{ item.heading }}
            <v-badge v-if="item.categoryId" inline tile :content="item.category.name" class="ml-2"></v-badge>
          </v-card-title>
          <v-card-subtitle v-text="item.title"></v-card-subtitle>
          <v-card-text v-text="item.content"></v-card-text>
          <v-card-actions class="pl-3">
            <v-btn
              color="deep-purple darken-1"
              :to="{ name: 'NewsDetail', params: { id: item.id } }"
            >
              Read More
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>

    <div class="text-center mt-10">
      <v-pagination
        v-model="query.page"
        :length="meta.totalPages"
      >
      </v-pagination>
    </div>
  </div>
</template>

<script>
import { watch } from '@vue/composition-api';
import { useTitle } from '@vueuse/core';
import { useQuery } from '@/use/core';

export default {
  name: 'ListNews.vue',
  setup() {
    const { data, query, meta } = useQuery('/news', { size: 5 });

    watch(() => query.page, () => {
      useTitle(`Prodgon news - page ${query.page}`);
      window.scrollTo(0, 0);
    });

    return {
      data,
      query,
      meta,
    };
  },
};
</script>
