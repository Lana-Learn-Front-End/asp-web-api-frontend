<template>
  <v-row>
    <v-col cols="2" class="pr-5">
      <v-sheet rounded="lg">
        <v-list color="transparent" nav>
          <v-list-item
            v-for="category in categories"
            :key="category.id"
            :to="{ name: 'ListProduct', params: { category: category.name }, query: { search: route.query.search } }"
            exact-path
            link
          >
            <v-list-item-icon>
              <v-icon>{{ category.icon || 'dashboard' }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item link exact-path :to="{ name: 'ListProduct', params: { category: 'All' } }">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>All category</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col>
      <v-row>
        <v-col v-for="item of data" :key="item.id" cols="3">
          <product-card :product="item"></product-card>
        </v-col>
      </v-row>

      <div class="text-center mt-10">
        <v-pagination
          v-model="query.page"
          :length="meta.totalPages"
        >
        </v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { useTitle } from '@vueuse/core';
import { computed, watch } from '@vue/composition-api';
import { useCategories, useQuery } from '@/use/core';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'ListProduct',
  components: { ProductCard },
  setup(props, { root }) {
    const categories = useCategories();

    const route = computed(() => ({
      query: root.$route.query,
      params: root.$route.params,
    }));

    const { data, query, meta } = useQuery('/products', {
      size: 24,
      search: route.value.query.search,
      category: route.value.params.category,
    });

    watch(route, (to) => {
      query.search = to.query.search;
      query.category = to.params.category ?? 'All';
      useTitle(`Prodgon - ${query.category}`);
      window.scrollTo(0, 0);
    });

    return {
      categories,
      data,
      query,
      meta,
      route,
    };
  },
};
</script>
