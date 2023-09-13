<template>
  <div class="cart">
    <h1 class="title grey--text mb-5">Cart</h1>
    <v-card class="mb-5 ml-12 mr-12" v-for="car in cartproducts" :key="car.id">
      <v-layout row wrap justify-center class="pa-5">
        <v-flex xs4 sm4 md1>
          <div class="caption grey--text">Product</div>
          <v-avatar class="profile" size="50" tile>
            <img :src="url + car.product.photo" alt="" /> 
          </v-avatar>
        </v-flex>
        <v-flex xs8 sm8 md3>
          <div>
            <h5 class="mt-7">{{car.product.name}}</h5>
          </div>
        </v-flex>
        <v-flex xs12 sm12 md2>
          <div class="caption grey--text">Quantity</div>
          <div>
            <v-btn @click="addquantity(car.id, car.quantity)" class="mr-4" fab x-small color="primary">
              <v-icon small> mdi-plus </v-icon>
            </v-btn>
            <h4 style="display: inline" class="mr-4">{{car.quantity}}</h4>
            <v-btn @click="removequantity(car.id, car.quantity)" fab x-small color="primary">
              <v-icon small> mdi-minus </v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs6 sm6 md2>
          <div class="caption grey--text">Unit Price</div>
          <div class="mt-2">{{car.product.price}}$</div>
        </v-flex>
        <v-flex xs6 sm6 md2>
          <div class="caption grey--text">Total Price</div>
          <div class="mt-2">{{car.product.price * car.quantity}}$</div>
        </v-flex>
        <v-flex xs12 sm12 md1>
          <v-btn class="mt-8" @click="deleteitem(car.id)" fab x-small >
              <v-icon x-small> mdi-close </v-icon>
            </v-btn>
        </v-flex>
        <!-- <div style="display: none;">-->
         
      </v-layout>
      
     
    </v-card>
    <!-- <v-btn
    class="ml-12 primary"
        outlined
        rounded
        text
        dark
      >
        Update Cart
      </v-btn> -->
    <!-- <v-card class="d-flex " -->
    <v-card
    v-if="total != 0"
    align-end
    class="ml-auto mr-12"
    max-width="400"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <!-- <div class="text-overline mb-4">
          OVERLINE
        </div> -->
        <v-list-item-title class="text-h5">
          Total Price:
        </v-list-item-title>
        <!-- <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle> -->
      </v-list-item-content>

      <!-- <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar> -->
      <div class="text-h5 primary--text">{{Sum}}$</div>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        color="primary"
      >
        Continue Shopping
      </v-btn>
      <v-btn
        outlined
        rounded
        text
        dark
        class="primary"
      >
        Proced to Checkout
      </v-btn>
    </v-card-actions>
  </v-card>
    
  </div>
</template>

<script>
import {getcartid,deletecart,updatecart} from "../Api/CartApi";
export default {
  name: "CartView",
  data() {
    return {
      countprice: '',
      mytotal :[],
      cartproducts : [],
      url:"",
      form:{
        quantity: "",
      },
    };
  },
  computed: {
        Sum(){ return this.mytotal.reduce( (Sum, mtotal) => mtotal.count + Sum  ,0);},
    },
  methods:{
    addquantity(id, quan){
      this.form.quantity = quan + 1 ;
      updatecart(id, this.form)
        .then((res) => {
          this.getdata();
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        });

    },

  deleteitem(id){
    deletecart(id).then((res)=>{
            this.getdata();
            console.log(res);
          })
  },
    removequantity(id, quan){
      this.form.quantity = quan - 1 ;
      if(this.form.quantity<1)
      {
          deletecart(id).then((res)=>{
            this.getdata();
            console.log(res);
          })
      }
      updatecart(id, this.form)
        .then((res) => {
          this.getdata();
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        });

    },

    getdata(){
      
      let user = localStorage.getItem("userid");
    getcartid(user)
        .then((res) => {
          const result = res.data.data;
          this.url = res.data.baseUrl;
          this.cartproducts = res.data.data;
          this.mytotal = result.map((cart) => ({
            count : (cart.quantity * cart.product.price)
          }));
        })
        .catch((err) => {
          this.error = err.response.data.error;
          console.log(err);
        });
  },


  },
  
  mounted() {
    this.getdata();
  },
};
</script>

<style scoped>
.notdis{
  outline: none;
  display :none,
}
</style>
