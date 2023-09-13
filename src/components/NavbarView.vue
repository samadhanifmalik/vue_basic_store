<template>
  <nav>
    <v-toolbar class="blue darken-2">
      <v-toolbar-title class="text-uppercase">
          <router-link class="link" to="/">
        <span class="font-weight-black white--text">Malik</span>
        <span class="white--text">Samad</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-1"
            depressed
            v-bind="attrs"
            v-on="on"
            color="grey lighten-4"
          >
            <v-icon>mdi-arrow-down</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
            <v-divider></v-divider>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <router-link class="link" to="/login">
        <v-btn v-if="!isShow" class="mr-1" color="grey lighten-4">
          <span>Login</span>
          <v-icon right>mdi-login</v-icon>
        </v-btn>
      </router-link>

      <router-link class="link" to="/register">
        <v-btn v-if="!isShow" class="mr-1" color="grey lighten-4">
          <span>Register</span>
          <v-icon right>mdi-account-plus</v-icon>
        </v-btn>
      </router-link>
      <v-list-item-avatar @click="drawer = !drawer">
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
    </v-list-item-avatar>
    </v-toolbar>

    <v-navigation-drawer
      right
      absolute
      v-model="drawer"
      width="250"
      height="230"
      class="primary mt-14"
    >
      <template v-slot:prepend>
        <v-list-item class="white--text" two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title >Jane Smith</v-list-item-title>
            <v-list-item-subtitle class="white--text">Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item class="white--text" v-for="item in profile" :key="item.title" :to="item.route">
          <v-list-item-icon>
            <v-icon fab class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
// import PopUp from './PopUp.vue';
export default {
  name: "NavbarView",
  data() {
    return {
        isShow:true,
      drawer: false,
      profile: [
        { title: "Home", icon: "mdi-view-dashboard", route: "/"},
        { title: "My Account", icon: "mdi-account", route: "/myaccount"},
        { title: "Logout", icon: "mdi-logout-variant", route: "/logout"},
      ],
    };
  },
    mounted() {
    let user = localStorage.getItem("usertoken");
    if (user) {
        this.isShow= true
    }
    else{
        this.isShow= false
    }
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>