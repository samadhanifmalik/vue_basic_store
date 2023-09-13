<template>
  <div class="home">
    <h1 class="title grey--text">Home</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 lg4 v-for="product in AllProducts" :key="product.id">
          <v-card center class="text-xs-center ma-3" align="center">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="url + product.photo" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ product.name }}</div>
              <div class="red--text title">{{ product.price }}$</div>
            </v-card-text>
            <v-card-actions>
              <!-- <router-link class="link" to="/cart"> -->
                <v-btn @click="addToCart(product.id)" depressed color="blue darken-2 white--text">
                  <v-icon small left>mdi-cart</v-icon>
                  <span>Add to cart</span>
                </v-btn>
              <!-- </router-link> -->
              <v-spacer></v-spacer>
              <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
          @click="viewItem(product.id)"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >Product Details</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Product Details</v-toolbar>
            <v-card-text>
              <v-container fluid>
                  <v-row>
                      <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="Name"
              required
              disabled
            ></v-text-field>
            </v-col>
             <v-col cols="6">
            <v-text-field
              v-model="form.sku"
              label="Sku"
              required
              disabled
            ></v-text-field>
            </v-col>
            <v-col cols="6">
            <v-text-field v-model="form.price" label="Price" prefix="$" disabled></v-text-field>
            </v-col>
            <v-col cols="6">
            <v-text-field
              label="Minumum Quantity"
              value="1"
              disabled
              suffix="qty"
              v-model="form.minimum_qty"
            ></v-text-field>
            </v-col>
            <v-col cols="6">
            <v-text-field
              label="Stock Quantity"
              suffix="qty"
              disabled
              v-model="form.stock_qty"
            ></v-text-field>
            </v-col>
            <v-col cols="12">
            <v-textarea v-model="form.description" disabled label="Description" />
            </v-col>
            <v-col cols="12">
            <v-select
              v-model="form.categories"
              label="Selecet Category"
              multiple
              chips
              :items="getcategories"
              :item-value="'id'"
              :item-text="'name'"
              disabled
            />
            </v-col>
             <v-col cols="6">
                  <v-img :src="url + form.photo"></v-img>
                </v-col>

            </v-row>
  </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
              <!-- <ProductDetails :proid="viewItem()" :myid=product.id /> -->
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { getproducts, getproductid } from "../Api/ProductApi";
import {getcategories} from "../Api/CategoryApi";
import {addtocart} from "../Api/CartApi";
// import ProductDetails from "../components/ProductDetails.vue";
export default {
  name: "HomeView",
  data() {
    return {
        show: false,
        url: "",
        getcategories: [],
      AllProducts: [],
      cart: {
          quantity: 1,
          user_id:"",
          product_id:""
      },
      form: {
        name: "",
        sku: "",
        price: "",
        minimum_qty: "",
        stock_qty: "",
        description: "",
        photo: "",
        categories: "",
      },
    };
  },
  methods: {

    getcategory() {
      getcategories()
        .then((res) => {
          const result = res.data.data;
          this.getcategories = result.map((category) => ({
            id: category.id,
            name: category.name,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getdata() {
      getproducts()
        .then((res) => {
          console.log(res.data.data);
          this.AllProducts = res.data.data;
          const result = res.data.data;
          this.url = res.data.baseUrl;
          this.products = result.map((product) => ({
            id: product.id,
            name: product.name,
            sku: product.sku,
            price: product.price,
            minimum_qty: product.minimum_qty,
            stock_qty: product.stock_qty,
            description: product.description,
            photo: this.url + product.photo,
            categories: product.categories,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewItem(item) {
        let user = localStorage.getItem("usertoken");
        if (user) {
    this.dialog = true;
      getproductid(item)
        .then((res) => {
          this.form.categories = res.data.data.categories;
          const result = res.data.data;
          console.log(result);
          this.form = result;
        })
        .catch((err) => {
          this.error = err.response.data.error;
          console.log(err);
        });
    }
    else{
        this.$router.push("/login"); 
    }
    
    },

    addToCart(prooid){
        let user = localStorage.getItem("userid");

        if (user) {

        this.cart.user_id = user;
        this.cart.product_id = prooid;
        addtocart(this.cart)
        .then((res) => {
          this.$swal({
            title: "Product added to cart",
            text: res.data.message,
            type: "success",
            timer: 15000,
          });
          console.log(res)
          this.$router.push("/cart");
        })
        .catch((err) => {
          this.$swal({
            title: "Error!",
            text: err.response.data.error,
            type: "error",
            timer: 15000,
          });
        });
    }
    else{
        this.$router.push("/login");
    }
    }


  },
  components: {
    // ProductDetails,
  },
  mounted() {
    this.getdata();
    this.getcategory();
  },
};
</script>
