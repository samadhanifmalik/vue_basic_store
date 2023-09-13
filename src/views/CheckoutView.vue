<template>
  <div class="addcategory">
    <h1 class="title grey--text">Checkout</h1>
    <v-form ref="form" @submit.prevent="submitForm()">
      <v-layout row wrap justify-center>
        <v-flex xs10 sm10 md5 class="mr-16">
          <v-list-item-content class="mt-5">
            <v-list-item-title class="text-h5"> Billing Details </v-list-item-title>
          </v-list-item-content>
          <v-divider></v-divider>

          <template>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.name"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.country"
                    label="Country"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.city"
                    label="City"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Postal Code"
                    v-model="form.postal_code"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Phone"
                    v-model="form.phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Email"
                    v-model="form.email"
                  ></v-text-field>
                </v-col>
                 <v-col cols="6">
                  <v-text-field
                    label="Address"
                    v-model="form.address"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="form.delivery_note" label="Delivery Note" />
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-flex>

        <v-flex xs12 sm12 md3>
          <v-card class="pa-4 mt-5">
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-8">
                Your Order
              </v-list-item-title>
            </v-list-item-content>
            <v-layout row wrap justify-center>
              <v-flex xs9 sm9 md9>
                <div class="subtitle-1 font-weight-bold mr-1">Products</div>
              </v-flex>
              <v-flex xs3 sm3 md3>
                <div class="subtitle-1 font-weight-bold">Subtotal</div>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-divider class="mb-2"></v-divider>
              </v-flex>
            </v-layout>
            <v-layout class="mb-5" row wrap justify-center>
              <v-flex xs9 sm9 md9>
                <div class="subtitle-1 mr-4">
                  All Products All Products All Products All Products All
                  Products x 2
                </div>
              </v-flex>
              <v-flex xs3 sm3 md3>
                <div class="subtitle-2 primary--text">180000$</div>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <div class="subtitle-1 font-weight-bold mt-5">Delivery Method</div>
            <v-radio-group v-model="payment" row>
              <v-radio label="COD" value="cod"></v-radio>
              <v-radio label="Other" value="other"></v-radio>
            </v-radio-group>
            <v-divider></v-divider>
            <v-layout class="mb-5 mt-5" row wrap justify-center>
              <v-flex xs9 sm9 md9>
                <div class="subtitle-1 mr-1">Total</div>
              </v-flex>
              <v-flex xs3 sm3 md3>
                <div class="subtitle-2 primary--text">180000$</div>
              </v-flex>
            </v-layout>
            <v-btn
              block
              color="blue darken-2"
              class="mr-4 white--text"
              type="submit"
            >
              Placeorder
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
// import { getcategories} from "../../Api/CategoryApi";
// import { postproduct} from "../../Api/ProductApi";
export default {
  name: "CartView",
  data() {
    return {
      getcategories: [],
      preview: "",
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

  //   methods: {
  //     GetImage() {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(this.form.photo);
  //       reader.onload = (e) => {
  //         this.preview = e.target.result;
  //       };
  //     },
  //     getcategory() {
  //       getcategories()
  //         .then((res) => {
  //           const result = res.data.data;
  //           this.getcategories = result.map((category) => ({
  //             id: category.id,
  //             name: category.name,
  //           }));
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     },

  //     submitForm() {
  //       console.log(this.form);
  //       postproduct(this.form)
  //         .then((res) => {
  //           this.form = "";
  //           this.preview = "";
  //           this.$swal({
  //             title: "Product Added!",
  //             text: res.data.message,
  //             type: "success",
  //             timer: 15000,
  //           });
  //           this.$router.push("/products");
  //         })
  //         .catch((err) => {
  //           this.$swal({
  //             title: "Error!",
  //             text: err.response.data.error,
  //             type: "error",
  //             timer: 15000,
  //           });
  //         });
  //     },
  //   },

  //   mounted() {
  //     this.getcategory();
  //   },
};
</script>

