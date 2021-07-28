<template>
  <div>
    <v-row>
      <v-col cols="2" class="pr-5">
        <v-sheet rounded="lg" class="mb-2">
          <v-list color="transparent" nav>
            <v-list-item
              v-for="category in categories"
              :key="category.id"
              :to="{ name: 'ListProduct', params: { category: category.name } }"
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
        <v-carousel
          style="border-radius: 5px"
          cycle
          height="100%"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-sheet
              style="border-radius: 5px"
              :color="colors[i]"
              height="100%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="display-3">
                  {{ slide }} Slide
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <h4 class="text-h5 mb-4 mt-10">News And Discount</h4>
    <v-row>
      <v-col v-for="item of news" :key="item.id">
        <v-card>
          <div class="d-flex flex-no-wrap">
            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
            </v-avatar>

            <div>
              <v-card-title v-text="item.heading"></v-card-title>
              <v-card-subtitle v-text="item.title"></v-card-subtitle>
              <v-card-actions class="pl-3">
                <v-btn
                  color="deep-purple lighten-2"
                  text
                  :to="{ name: 'NewsDetail', params: { id: item.id } }"
                >
                  View Detail
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <h4 class="text-h5 mb-4 mt-10">Featured Products</h4>
    <v-row>
      <v-col v-for="item of product" :key="item.id">
        <product-card :product="item"></product-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useTitle } from '@vueuse/core';
import { useCategories, useQuery } from '@/use/core';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'Home',
  components: { ProductCard },
  setup() {
    useTitle('Prodgon');

    const { data: product } = useQuery('/products/page', { size: 10 }, false);
    const { data: news } = useQuery('/news/page', { size: 3 }, false);

    return {
      product,
      news,
      categories: useCategories(),
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    };
  },
};
</script>
