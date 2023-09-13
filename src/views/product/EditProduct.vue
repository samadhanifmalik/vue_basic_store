<template>
  <div class="addcategory">
    <h1 class="title grey--text">Edit Category</h1>
    <v-card class="mx-auto" max-width="600">
      <v-list-item two-line class="blue darken-2 white--text">
        <v-list-item-content>
          <v-list-item-title class="text-h5"> Edit Category </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <template>
          <v-form ref="form" @submit.prevent="updateform()">
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
                  <v-text-field
                    v-model="form.price"
                    label="Price"
                    prefix="$"
                  ></v-text-field>
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
                  <v-img :src="previewimg" v-if="preview == ''"></v-img>
                  <v-img :src="preview" v-else></v-img>
                </v-col>

                <v-btn
                  color="blue darken-2"
                  class="mr-4 white--text"
                  type="submit"
                >
                  Update Product
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {getcategories} from "../../Api/CategoryApi";
import { getproductid, updateproduct} from "../../Api/ProductApi";
export default {
  name: "EditProduct",
  data() {
    return {
      categoryinserted: [],
      preview: "",
      getcategories: [],
      url: "",
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
          this.url = res.data.baseUrl;
          this.getcategories = result.map((category) => ({
            id: category.id,
            name: category.name,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editproductdata() {
      getproductid(this.$route.params.id).then((res) => {
        // console.log(res.data.data.categories);
        const result = res.data.data;
        // console.log(res);
        this.form = result;
        this.form.categories = res.data.data.categories;
        
      })
      .catch((err) => {
            this.error = err.response.data.error

            console.log(err)
          })
    },
    updateform() {
      if (this.form.categories[0].name) {
          console.log(this.form.categories)
          for (let i = 0; i < this.form.categories.length; i++) {
            this.categoryinserted.push(this.form.categories[i].id)
          }
          this.form.categories = this.categoryinserted
        }
      updateproduct(this.$route.params.id, this.form)
        .then((res) => {
          this.form = "";
          this.$swal({
            title: "Updated!",
            text: res.data.message,
            type: "success",
            timer: 15000,
          });
        //   this.$router.push("/categories");
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
  computed: {
    previewimg() {
      return this.url + this.form.photo;
    },
  },

  mounted() {
    this.editproductdata();
    this.getcategory();
  },
};
</script>

