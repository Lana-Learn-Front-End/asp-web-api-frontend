<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Prodgon
          </v-list-item-title>
          <v-list-item-subtitle>
            Super product market
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="link in drawerLinks"
          :key="link.title"
          :to="link.name ? { name: link.name } : null"
          exact-path
          link
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon || 'dashboard' }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="mt-3 mt-md-4 mt-lg-5 mt-xl-6">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from '@vue/composition-api';
import { useTitle } from '@vueuse/core';

export default {
  name: 'Admin',
  setup() {
    const title = useTitle('Admin', { observe: true });
    const drawer = ref(true);
    const drawerLinks = [
      { title: 'Product', icon: 'inventory_2', name: 'ManageProduct' },
      { title: 'Category', icon: 'label', name: 'ManageCategory' },
      { title: 'News', icon: 'article', name: 'ManageNews' },
      { title: 'Users', icon: 'person', name: 'ManageUser' },
      { title: 'Front', icon: 'other_houses', name: 'Home' },
    ];

    return {
      title,
      drawer,
      drawerLinks,
    };
  },
};
</script>
