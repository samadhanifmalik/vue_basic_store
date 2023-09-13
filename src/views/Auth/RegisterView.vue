<template>
  <div class="register">
    <h1 class="title grey--text">Register</h1>
    <v-card class="mx-auto mt-16" max-width="600">
      <v-list-item two-line class="blue darken-2 white--text">
        <v-list-item-content>
          <v-list-item-title class="text-h5"> Register </v-list-item-title>
          <v-list-item-subtitle class="white--text"
            >Register with Name, Email and Password</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <template>
          <v-form ref="form" @submit.prevent="register()">
            <v-text-field
              prepend-icon="mdi-account"
              v-model="form.name"
              :counter="20"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-email"
              v-model="form.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              class="mt-5"
              type="password"
              prepend-icon="mdi-lock"
              v-model="form.password"
              :rules="passwordRules"
              label="Password"
            ></v-text-field>

            <v-btn
              color="blue darken-2"
              class="mr-4 mt-5 white--text"
              type="submit"
            >
              Register
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
  name: "RegisterView",
  methods:{
   async register () {
      //  let result = await axios.post("http://localhost:8000/api/auth/register",{
      //    name: this.name,
      //    email:this.email,
      //    password: this.password
      //    });
      //    if(result.status==201){
      //      console.log(result);
      //      localStorage.setItem("usertoken", JSON.stringify(result.data), "usertoken", result.data.token);
      //      this.$router.push("/cart");
      //    }
      await axios.post("http://localhost:8000/api/auth/register", {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        })
        .then((res) => {
          console.log(res.data.user)
          localStorage.setItem("usertoken", res.data.token);
          localStorage.setItem("userid", res.data.user.id);
          // this.email = "";
          // this.password = "";
          console.log(res); 
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
      },
      
  },
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
    },

    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    passwordRules: [
      (v) => !!v || "Password is required",
    ],
  }),
 mounted() {
    let user = localStorage.getItem("usertoken");
    if (user) {
      this.$router.push("/");
    }
  },
  
};
</script>

