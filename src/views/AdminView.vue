<template>
    <div class="container main-container">
      <div>
        <h1>Users</h1>
        <addUserComp />
        <div class="table-responsive">
          <table class="table table-secondary table-hover caption-top">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Role</th>
                <th>Email address</th>
                <th>Profile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-for="user in users" :key="user.userID">
              <tr v-if="users">
                <td data-label="ID">{{ user.userID }}</td>
                <td data-label="Name">{{ user.firstName }}</td>
                <td data-label="Surname">{{ user.lastName }}</td>
                <td data-label="Gender">{{ user.gender }}</td>
                <td data-label="Age">{{ user.age }}</td>
                <td data-label="Role">{{ user.userRole }}</td>
                <td data-label="Email">{{ user.emailAdd }}</td>
                <td data-label="Image"><img :src="user.userImage" :alt="user.userImage" class="img-fluid image rounded-5 d-inline-flex" loading="lazy"/></td>
                <td>
                  <updateUserComp :user="user"/><button class="btn" @click="deleteUser(user.userID)">Delete</button>
                </td>
              </tr>
              <tr v-else>
                <SpinnerComp />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h1>Products</h1>
        <div class="sort-dropdown">
          <button class="btn" @click="toggleSortDirection">Filter by Name: {{ sort === "asc" ? "Ascending" : "Descending " }}</button>
          <button class="btn" @click="refresh">Refresh</button>
        </div>
        <addProductComp />
        <div class="table-responsive">
          <table class="table table-secondary table-hover caption-top">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-for="product in filterDBProducts" :key="product.prodID">
              <tr v-if="products">
                <td data-label="ID">{{ product.prodID }}</td>
                <td data-label="Product Name">{{ product.prodName }}</td>
                <td data-label="Quantity">{{ product.quantity }}</td>
                <td data-label="Price">R {{ product.price }}</td>
                <td data-label="Category">{{ product.category }}</td>
                <td data-label="Image"><img :src="product.prodImage" :alt="product.prodImage" class="img-fluid image" loading="lazy"/></td>
                <td><updateProductComp :product="product"/>
                  <button @click="deleteProduct(product.prodID)" class="btn">Delete</button>
                </td>
              </tr>
              <tr v-else>
                <SpinnerComp/>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SpinnerComp from "../components/SpinnerComp.vue";
  import addProductComp from "../components/AddProductComp.vue";
  import addUserComp from "../components/AddUserComp.vue";
  import updateProductComp from "../components/UpdateProduct.vue";
  import updateUserComp from "@/components/UpdateUser.vue";
  
  export default {
    components: {
      SpinnerComp,
      addProductComp,
      addUserComp,
      updateProductComp,
      updateUserComp,
    },
    data() {
      return {
        sort: "",
        sortBy: "id",
        sortMode: "prodID",
      };
    },
  computed: {
    users() {
      return this.$store.state.users || []; 
    },
    products() {
      return this.$store.state.products || [];
    },
    filterDBProducts() {
      let filter = [...this.products];
      if (this.sortBy === "name") {
        filter = filter.sort(
          (a, b) => a.prodName.localeCompare(b.prodName) * (this.sort === "asc" ? 1 : -1)
        );
      } else if (this.sortBy === "id") {
        filter = filter.sort(
          (a, b) => (this.sort === "asc" ? 1 : -1) * (a.prodID - b.prodID)
        );
      }
      return filter;
    },
    },
    async mounted() {
      await this.$store.dispatch("fetchProducts");
      await this.$store.dispatch("fetchUsers");
    },
    methods: {
      // Delete a product
      deleteProduct(prodID) {
        if (confirm("Are you sure you want to delete this product?")) { 
          this.$store.dispatch("deleteProduct", prodID);
          setTimeout(() => {location.reload();
          }, 1000);
        }
      },
      refresh() {
        this.sortBy = "prodID";
      },
      toggleSortDirection() {
        this.sortBy = 'name' 
        this.sort = this.sort === "asc" ? "desc" : "asc";
      },
      deleteUser(userID) {
        if (confirm("Are you sure you want to delete this user?")) { 
          this.$store.dispatch("deleteUser", userID);
          setTimeout(() => {location.reload();
          }, 1000);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .image {
    width: 3rem;
  }
  
  .sort-dropdown{
    display: flex;
    justify-content: space-evenly;
  }
  .btn {
    background-color: #7A0000;
    color: white;
    margin-bottom: 1rem;
  }
  .main-container{
    min-height: 100vh;
    margin-top: 60px;
  }
  @media screen and (max-width: 300px) {
    .table {
      width: 280px !important;
    }
  }
  @media  (max-width: 980px ) {

.table thead{
  display: none !important;

}

.table, .table tbody, .table tr, .table td{
  display: block !important;
  width: 100% !important;
}

.table tr{
  margin-bottom: 20px !important;
}

.table tbody{
  background: white;
}

.table tbody tr td{
  text-align: right;
  position: relative;
  width: 100%;
}

.table td:before{
  display: block;
  color: black;
  content: attr(data-label) !important;
  text-align: left;
}

.modal-body p{
  text-align: left;
}
}
  </style>
  