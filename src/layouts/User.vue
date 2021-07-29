<template>
  <v-app id="inspire">
    <v-app-bar
      app
      flat
    >
      <v-container class="py-0 fill-height">
        <v-toolbar-title class="ml-1">Prodgon</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-responsive>
          <v-text-field
            v-model="keyword"
            dense
            flat
            clearable
            hide-details
            solo-inverted
            prepend-inner-icon="search"
            @click:clear="clear"
            @change="search"
            @click:prepend-inner="search"
          >
          </v-text-field>
        </v-responsive>

        <v-spacer></v-spacer>

        <v-btn
          class="mr-3"
          v-for="link in navs"
          :key="link.text"
          :to="{ name: link.name }"
          text
          exact-path
        >
          {{ link.text }}
        </v-btn>

        <v-btn
          v-if="!isLoggedIn"
          color="purple darken-1"
          class="mr-3"
          :to="{ name: 'Login' }"
          exact-path
        >
          Login
        </v-btn>

        <div v-else>
          <v-menu
            bottom
            min-width="200px"
            rounded
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                x-large
                v-on="on"
              >
                <v-badge
                  bordered
                  overlap
                  color="green"
                  :content="user.cartItems.length + ''"
                >
                  <v-avatar color="purple darken-1"></v-avatar>
                </v-badge>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar color="purple darken-1 mb-2"></v-avatar>
                  <h3>{{ user.name }}</h3>
                  <p class="caption mt-1">
                    {{ user.email }}
                  </p>
                  <v-divider class="my-1"></v-divider>
                  <v-btn
                    depressed
                    dense
                    text
                    :to="{ name: 'Cart' }"
                  >
                    View Cart
                  </v-btn>
                  <v-divider class="my-1"></v-divider>
                  <v-btn
                    depressed
                    dense
                    text
                    :to="{ name: 'Logout' }"
                  >
                    Log out
                  </v-btn>
                  <v-divider class="my-1"></v-divider>
                  <v-btn
                    v-if="isAdmin"
                    depressed
                    dense
                    text
                    :to="{ name: 'Admin' }"
                  >
                    Admin
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="mt-3 mt-md-4 mt-lg-5 mt-xl-6">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { computed, ref } from '@vue/composition-api';
import { useRouter, useUser } from '@/use/core';

export default {
  name: 'User',
  setup(props, { root }) {
    const navs = [
      {
        text: 'Home',
        name: 'Home',
      },
      {
        text: 'News',
        name: 'ListNews',
      },
      {
        text: 'Products',
        name: 'ListProduct',
      },
    ];

    const user = useUser();
    const isLoggedIn = computed(() => !!user.value);
    const isAdmin = computed(() => isLoggedIn.value && user.value.roles?.some((role) => role.name === 'Admin'));

    const router = useRouter();
    const keyword = ref(root.$route.query.search ?? '');

    function search() {
      if (keyword.value !== root.$route.query.search) {
        router.push({ name: 'ListProduct', params: { category: 'All' }, query: { search: keyword.value } });
      }
    }

    function clear() {
      keyword.value = '';
      search();
    }

    return {
      isLoggedIn,
      user,
      navs,
      keyword,
      isAdmin,
      search,
      clear,
    };
  },
};
</script>
