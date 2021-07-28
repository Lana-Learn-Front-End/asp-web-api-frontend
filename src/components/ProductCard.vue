<template>
  <v-card
    class="mx-auto"
    max-width="330"
  >
    <v-img
      width="330"
      :src="resolveImage(product.imageId)"
      :aspect-ratio="330/250"
    >
    </v-img>

    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>{{ product.code }} - {{ product.quantity }} left</v-card-subtitle>
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="subtitle-1 mt-4">
        $ • {{ product.price }}
      </div>
    </v-card-text>

    <v-card-actions class="d-flex justify-space-between">
      <v-btn
        color="deep-purple lighten-2"
        text
        :to="{ name: 'ProductDetail', params: { id: product.id } }"
      >
        Show
      </v-btn>

      <v-btn
        v-if="isBuyable"
        color="green lighten-2"
        text
        @click="addToCart"
      >
        Add To Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { computed, ref } from '@vue/composition-api';
import { useHttp, useUser } from '@/use/core';

export default {
  name: 'ProductCard',

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const loading = ref(false);
    const user = useUser();
    const isBuyable = computed(() => !!user.value && props.product.quantity > 0);

    const http = useHttp();

    async function addToCart() {
      loading.value = true;
      try {
        const cart = await http.post('/users/cart', {
          userId: user.value.id,
          productId: props.product.id,
          quantity: 1,
        });

        const existed = user.value.cartItems.find((item) => item.id === cart.id);
        if (existed) {
          Object.assign(existed, cart);
        } else {
          user.value.cartItems.push(cart);
        }
        user.value = { ...user.value };
      } finally {
        loading.value = false;
      }
    }

    function resolveImage(imageId) {
      if (imageId) {
        return http.resolve('data', 'images', imageId);
      }
      return 'https://cdn.vuetifyjs.com/images/cards/cooking.png';
    }

    return {
      isBuyable,
      loading,
      addToCart,
      resolveImage,
    };
  },
};
</script>
