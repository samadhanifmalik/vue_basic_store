<template>
  <v-data-table
    :headers="headers"
    :items="categories"
    :search="search"
  >
    <template v-slot:[`item.parent_id`]="{ item }">
      {{ item.parent_id }}
    </template>
    <template v-slot:[`item.photo`]="{ item }">
      <v-avatar class="profile" size="50" tile>
        <img :src="item.photo" />
      </v-avatar>
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <div class="search hidden-sm-and-down">
          <v-text-field v-model="search" dense label="Search" outlined />
        </div>

        <v-spacer />
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="">
            <router-link :to="`/categories/add`" class="hidden-sm-and-down">
              <v-btn color="primary" dark class="mb-2">
                <v-icon left> mdi-plus </v-icon>
                Add Category
              </v-btn>
            </router-link>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">View Data</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="form.name"
                      label="Name"
                      disabled
                      class="disable"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="form.parent_id"
                      label="Parent Category"
                      :items="parentname"
                      :item-value="'id'"
                      :item-text="'name'"
                      disabled
                      class="disable"
                    />
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-textarea
                      v-model="form.description"
                      label="Description"
                      disabled
                      class="disable"
                    /> 
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-avatar class="profile" size="150" tile>
                      <img :src="url + form.photo" />
                    </v-avatar>
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
        :to="`/categories/edit/${item.id}`"
      >
        <v-icon small class="mr-2"> mdi-pencil </v-icon>
      </router-link>
      <v-icon small @click="showAlertConfirm(item.id)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import {
  getcategories,
  getcategoryid,
  deletecategory,
} from "../../Api/CategoryApi";

export default {
  data: () => ({
    dialog: false,
    categories: [],
    search: "",
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "Parent", value: "parent_id" },
      { text: "Description", value: "description" },
      { text: "Photo", value: "photo" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    form: { 
      name: "",
      description: "",
      photo: "",
    },
    url: "",
    parentname: "",
  }),

  mounted() {
    this.getdata();
  },

  methods: {
    getdata() {
      getcategories()
        .then((res) => {
          const result = res.data.data;
          this.url = res.data.baseUrl;
          this.categories = result.map((category) => ({
            id: category.id,
            name: category.name,
            description: category.description,
            photo: this.url + category.photo,
            parent_id:
              category.parent_id == null ? " " : category.children.name,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    },

    viewItem(item) {
      this.dialog = true; 
      getcategoryid(item)
        .then((res) => {
          this.parentname = res.data.data.children;
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
        text: "You want to delete this category",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          deletecategory(id).then(() => {
            this.$swal({
              title: "Deleted!",
              text: "Your file has been deleted.",
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
