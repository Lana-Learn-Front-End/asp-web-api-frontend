<template>
  <div class="d-flex align-center justify-center">
    <v-row style="max-width: 1000px">
      <v-col cols="3" class="pr-4">
        <v-sheet rounded="lg">
          <v-list color="transparent" nav>
            <v-list-item link exact-path :to="{ name: 'ListProduct', params: { category: 'All' } }">
              <v-list-item-content>
                <v-list-item-title>Total: <span class="green--text ml-3">$ • {{ total }}</span></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col>
        <v-card v-for="item of user.cartItems" :key="item.id" class="mb-4">
          <div class="d-flex flex-no-wrap mb-5 pa-2" style="width: 100%">
            <v-avatar
              class="ma-1"
              size="100"
              tile
            >
              <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
            </v-avatar>

            <div class="flex-grow-1">
              <v-card-title class="d-flex justify-space-between">
                <div>{{ item.product.name }}</div>
                <div class="text-body-2 green--text">{{ fixed2(item.product.price * item.quantity) }}</div>
              </v-card-title>
              <v-card-subtitle>
                <div class="subtitle-1">
                  $ • {{ item.product.price }}
                </div>
                <v-badge v-if="item.categoryId" inline tile :content="item.category.name" class="ml-2"></v-badge>
              </v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useUser } from '@/use/core';
import { computed } from '@vue/composition-api';

export default {
  name: 'Cart.vue',
  setup() {
    const user = useUser();

    const total = computed(() => user.value.cartItems
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0));

    function fixed2(num) {
      return num.toFixed(2);
    }

    return {
      fixed2,
      user,
      total,
    };
  },
};
</script>
