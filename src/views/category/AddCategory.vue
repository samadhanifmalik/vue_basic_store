<template>
  <div class="addcategory">
    <h1 class="title grey--text">Add Category</h1>
    <v-card class="mx-auto mb-6" max-width="600">
      <v-list-item two-line class="blue darken-2 white--text">
        <v-list-item-content>
          <v-list-item-title class="text-h5"> Add Category </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <template>
          <v-form ref="form" @submit.prevent="submitForm()">
            <v-text-field
              v-model="form.name"
              label="Name"
              required
            ></v-text-field>
            <v-select
              v-model="form.parent_id"
              label="Select Parent"
              placeholder="Select Parent If Applicable"
              :items="getcategories"
              :item-value="'id'"
              :item-text="'name'"
            />
            <v-textarea v-model="form.description" label="Description" />
            <v-file-input
              v-model="form.photo"
              label="Image"
              prepend-icon="mdi-camera"
              @change="GetImage()"
            />

            <v-btn color="blue darken-2" class="mr-4 white--text" type="submit">
              Add category
            </v-btn>
            <v-avatar class="profile" size="150" tile>
              <v-img :src="preview"></v-img>
            </v-avatar>
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { getcategories, postcategory } from "../../Api/CategoryApi";
export default {
  name: "AddCategory",
  data() {
    return {
      getcategories: [],
      preview: "",
      form: {
        name: "",
        description: "",
        parent_id: "",
        photo: "",
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
      postcategory(this.form)
        .then((res) => {
          this.form = "";
          this.preview = "";
          this.$swal({
            title: "Category Added!",
            text: res.data.message,
            type: "success",
            timer: 15000,
          });
          this.$router.push("/categories");
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

