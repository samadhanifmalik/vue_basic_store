<template>
  <div class="home">
    <h1 class="title grey--text">Login</h1>
    <v-card class="mx-auto mt-16" max-width="600">
      <v-list-item two-line class="blue darken-2 white--text">
        <v-list-item-content>
          <v-list-item-title class="text-h5"> Login </v-list-item-title>
          <v-list-item-subtitle class="white--text"
            >Login with Email and Password</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <template>
          <v-form ref="form" @submit.prevent="login()">
            <v-text-field
              prepend-icon="mdi-email"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              class="mt-5"
              type="password"
              prepend-icon="mdi-lock"
              v-model="password"
              :rules="passwordRules"
              label="Password"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
            ></v-text-field>

            <v-btn
              type="submit"
              color="blue darken-2"
              class="mr-4 mt-5 white--text"
            >
              Login
            </v-btn>
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [(v) => !!v || "Password is required"],
  }),
  methods: {
   async login() {
     await axios.post("http://localhost:8000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("usertoken", res.data.token);
          localStorage.setItem("userid", res.data.user.id);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    let user = localStorage.getItem("usertoken");
    if (user) {
      this.$router.push("/");
    }
  },
};
</script>

