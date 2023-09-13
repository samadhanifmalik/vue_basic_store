<template>
  <div class="addcategory">
    <h1 class="title grey--text">Edit Category</h1>
    <v-card class="mx-auto mt-16" max-width="600">
      <v-list-item two-line class="blue darken-2 white--text">
        <v-list-item-content>
          <v-list-item-title class="text-h5"> Edit Category </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <template>
          <v-form ref="form" @submit.prevent="updateform()">
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

            <v-btn
              color="blue darken-2"
              class="mr-4 mt-5 white--text"
              type="submit"
            >
              Update category
            </v-btn>
            <v-avatar class="profile" size="150" tile>
              <v-img :src="previewimg" v-if="preview == ''"></v-img>
              <v-img :src="preview" v-else></v-img>
            </v-avatar>
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  getcategoryid,
  getcategories,
  updatecategory,
} from "../../Api/CategoryApi";
export default {
  name: "EditCategory",
  data() {
    return {
      preview: "",
      getcategories: [],
      url: "",
      form: {
        name: "",
        description: "",
        parent_id: "",
        photo: "",
        _method: "put",
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
    editcategorydata() {
      console.log(this.$route.params.id);
      getcategoryid(this.$route.params.id).then((res) => {
        console.log(res);
        this.form.parent_id = res.data.data.children;
        const result = res.data.data;
        console.log(result);
        this.form = result;
      });
    },
    updateform() {
      console.log(this.form);
      updatecategory(this.$route.params.id, this.form)
        .then((res) => {
          this.form = "";
          this.$swal({
            title: "Updated!",
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
  computed: {
    previewimg() {
      return this.url + this.form.photo;
    },
  },

  mounted() {
    this.editcategorydata();
    this.getcategory();
  },
};
</script>

