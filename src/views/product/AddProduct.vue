<template>
  <div class="addcategory">
    <h1 class="title grey--text">Add Product</h1>
    <v-card class="mx-auto mb-6" max-width="600">
      <v-list-item two-line class="blue darken-2 white--text">
        <v-list-item-content>
          <v-list-item-title class="text-h5"> Add Product </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <template>
          <v-form ref="form" @submit.prevent="submitForm()">
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
              v-model="form.sku"
              label="Sku"
              required
            ></v-text-field>
            </v-col>
            <v-col cols="6">
            <v-text-field v-model="form.price" label="Price" prefix="$"></v-text-field>
            </v-col>
            <v-col cols="6">
            <v-text-field
              label="Minumum Quantity"
              value="1"
              suffix="qty"
              v-model="form.minimum_qty"
            ></v-text-field>
            </v-col>
            <v-col cols="6">
            <v-text-field
              label="Stock Quantity"
              suffix="qty"
              v-model="form.stock_qty"
            ></v-text-field>
            </v-col>
            <v-col cols="12">
            <v-textarea v-model="form.description" label="Description" />
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
            />
            </v-col>
            <v-col cols="6">
            <v-file-input
              v-model="form.photo"
              label="Image"
              prepend-icon="mdi-camera"
              @change="GetImage()"
            />
            </v-col>
            <v-col cols="6">
            <v-img sizes="110" :src="preview"></v-img>
            </v-col>
            <!-- <v-select
              v-model="form.parent_id"
              label="Select Parent"
              placeholder="Select Parent If Applicable"
              :items="getcategories"
              :item-value="'id'"
              :item-text="'name'"
            /> -->

            <v-btn color="blue darken-2" class="mr-4 white--text" type="submit">
              Add Product
            </v-btn>
            <!-- <v-avatar class="profile" size="150" tile>
              <v-img :src="preview"></v-img>
            </v-avatar> -->
            </v-row>
  </v-container>
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { getcategories} from "../../Api/CategoryApi";
import { postproduct} from "../../Api/ProductApi";
export default {
  name: "AddProduct",
  data() {
    return {
      getcategories: [],
      preview: "",
      form: {
        name: "",
        sku:"",
        price:"",
        minimum_qty:"",
        stock_qty:"",
        description: "",
        photo: "",
        categories:"",
      },
    };
  },

  methods: {
    GetImage() {
      let reader = new FileReader();
      reader.readAsDataURL(this.form.photo);
      reader.onload = (e) => {
        this.preview = e.target.result;
      };
    },
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

    submitForm() {
      console.log(this.form);
      postproduct(this.form)
        .then((res) => {
          this.form = "";
          this.preview = "";
          this.$swal({
            title: "Product Added!",
            text: res.data.message,
            type: "success",
            timer: 15000,
          });
          this.$router.push("/products");
        })
        .catch((err) => {
          this.$swal({
            title: "Error!",
            text: err.response.data.error,
            type: "error",
            timer: 15000,
          });
        });
    },
  },

  mounted() {
    this.getcategory();
  },
};
</script>

