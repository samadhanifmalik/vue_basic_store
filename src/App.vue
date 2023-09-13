<template>
<v-app>
    <v-main class="grey lighten-4">
        <NavbarView />
        <router-view class="mx-4 mt-2" />
    </v-main>
</v-app>
</template>


<script>
import NavbarView from "./components/NavbarView.vue";
export default {
  name: 'App',
  components: {
        NavbarView
    },
  data: () => ({
    //
  }),
};
</script>

