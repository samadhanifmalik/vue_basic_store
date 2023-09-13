<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:[`item.photo`]="{ item }">
      <v-avatar class="profile" size="50" tile>
        <img :src="item.photo" />
      </v-avatar>
    </template>
    <template v-slot:[`item.categories`]="{ item }">
      <div v-for="category in item.categories" :key="category.id">
        <div>
          {{ category.name }}
        </div>
      </div>
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <div class="search hidden-sm-and-down">
          <v-text-field v-model="search" dense label="Search" outlined />
        </div>

        <v-spacer />
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="">
            <router-link :to="`/products/add`" class="hidden-sm-and-down">
              <v-btn color="primary" dark class="mb-2">
                <v-icon left> mdi-plus </v-icon>
                Add Product
              </v-btn>
            </router-link>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">View Data</span>
            </v-card-title>

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
                  <v-img :src="previewimg"></v-img>
                </v-col>

            </v-row>
  </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="viewItem(item.id)">
        mdi-eye-arrow-left
      </v-icon>
      <router-link
        style="text-decoration: none; color: inherit"
        :to="`/products/edit/${item.id}`"
      >
        <v-icon small class="mr-2"> mdi-pencil </v-icon>
      </router-link>
      <v-icon small @click="showAlertConfirm(item.id)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import {
  getcategories
} from "../../Api/CategoryApi";
import { getproducts, getproductid, deleteproduct } from "../../Api/ProductApi";

export default {
  data: () => ({
    dialog: false,
    products: [],
    search: "",
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "SKU", value: "sku" },
      { text: "Price", value: "price" },
      { text: "Minimum Quantity", value: "minimum_qty" },
      { text: "Categories", value: "categories" },
      { text: "Stock Quantity", value: "stock_qty" },
      { text: "Description", value: "description" },
      { text: "Photo", value: "photo" },
      { text: "Actions", value: "actions", sortable: false },
    ],
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
    url: "",
    getcategories: [],
  }),

  mounted() {
    this.getdata();
    this.getcategory();
  },
  computed: {
    previewimg() {
      return this.url + this.form.photo;
    },
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
    },

    close() {
      this.dialog = false;
    },

    showAlertConfirm(id) {
      console.log("mm");
      this.$swal({
        title: "Are you sure?",
        text: "You want to delete this Product",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          deleteproduct(id).then(() => {
            this.$swal({
              title: "Deleted!",
              text: "Your  has been deleted.",
              type: "success",
              timer: 15000,
            });
            this.getdata();
          });
        }
      });
    },
  },
};
</script>
