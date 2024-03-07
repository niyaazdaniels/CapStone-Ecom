<template>
    <!-- Main container -->
    <div class="container main-container">
      <!-- Section for Users -->
      <div>
        <!-- Title -->
        <h1>Users</h1>
        <!-- Component to add a new user -->
        <addUserComp />
        <!-- Responsive table for displaying users -->
        <div class="table-responsive">
          <table class="table table-secondary table-hover caption-top">
            <thead>
              <!-- Table header -->
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Email address</th>
                <th>Profile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-for="user in users" :key="user.userID">
              <!-- Render user data if available -->
              <tr v-if="users">
                <!-- User details -->
                <td data-label="ID">{{ user.userID }}</td>
                <td data-label="Name">{{ user.firstName }}</td>
                <td data-label="Surname">{{ user.lastName }}</td>
                <td data-label="Gender">{{ user.gender }}</td>
                <td data-label="Role">{{ user.userRole }}</td>
                <td data-label="Email">{{ user.emailAdd }}</td>
                <td data-label="Image"><img :src="user.userImage" :alt="user.userImage" class="img-fluid image rounded-5 d-inline-flex" loading="lazy"/></td>
                <!-- Buttons for updating and deleting user -->
                <td>
                  <updateUserComp :user="user"/><button class="btn" @click="deleteUser(user.userID)">Delete</button>
                </td>
              </tr>
              <tr v-else>
                <SpinnerComp />
              </tr>
              <!-- Show spinner component if data is loading -->
            </tbody>
          </table>
        </div>
      </div>
      <!-- Section for Products -->
      <div>
        <!-- Title -->
        <h1>Products</h1>
        <!-- Dropdown for sorting products -->
        <div class="sort-dropdown">
          <button class="btn" @click="toggleSortDirection">Filter by Name: {{ sort === "asc" ? "Ascending" : "Descending " }}</button>
          <button class="btn" @click="refresh">Refresh</button>
        </div>
        <!-- Component to add a new product -->
        <addProductComp />
        <!-- Responsive table for displaying products -->
        <div class="table-responsive">
          <table class="table table-secondary table-hover caption-top">
            <thead>
              <!-- Table header -->
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
              <!-- Render product data if available -->
              <tr v-if="products">
                <!-- Product details -->
                <td data-label="ID">{{ product.prodID }}</td>
                <td data-label="Product Name">{{ product.prodName }}</td>
                <td data-label="Quantity">{{ product.quantity }}</td>
                <td data-label="Price">R {{ product.price }}</td>
                <td data-label="Category">{{ product.category }}</td>
                <td data-label="Image"><img :src="product.prodImage" :alt="product.prodImage" class="img-fluid image" loading="lazy"/></td>
                <!-- Buttons for updating and deleting product -->
                <td><updateProductComp :product="product"/>
                  <button @click="deleteProduct(product.prodID)" class="btn">Delete</button>
                </td>
              </tr>
              <!-- Show spinner component if data is loading -->
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
  // Import necessary external components
  import SpinnerComp from "../components/SpinnerComp.vue";
  import addProductComp from "../components/AddProductComp.vue";
  import addUserComp from "../components/AddUserComp.vue";
  import updateProductComp from "../components/UpdateProduct.vue";
  import updateUserComp from "@/components/UpdateUser.vue";
  
  export default {
    // Register external components
    components: {
      SpinnerComp,
      addProductComp,
      addUserComp,
      updateProductComp,
      updateUserComp,
    },
    // Data properties where keys are set to values
    data() {
      return {
        sort: "",
        sortBy: "id",
        sortMode: "prodID",
      };
    },
   // Computed properties for dynamic data retrieval and manipulation
  computed: {
    // Retrieve users data from the store
    users() {
      // Return users data from Vuex store or an empty array if no data is available
      return this.$store.state.users || [];
    },
    // Retrieve products data from the store
    products() {
      // Return products data from Vuex store or an empty array if no data is available
      return this.$store.state.products || [];
    },
    // Calculate filtered products based on the selected sorting criteria
    filterDBProducts() {
      // Create a copy of the products array to avoid mutating the original data
      let filter = [...this.products];
      // Sort products based on the selected sorting criteria
      if (this.sortBy === "name") {
        // Sort products by name in ascending or descending order
        filter = filter.sort(
          (a, b) => a.prodName.localeCompare(b.prodName) * (this.sort === "asc" ? 1 : -1)
        );
      } else if (this.sortBy === "id") {
        // Sort products by ID in ascending or descending order
        filter = filter.sort(
          (a, b) => (this.sort === "asc" ? 1 : -1) * (a.prodID - b.prodID)
        );
      }
      // Return the filtered products based on sorting criteria
      return filter;
    },
    },
    // Lifecycle hook
    async mounted() {
      // Fetch products and users data from store
      await this.$store.dispatch("fetchProducts");
      await this.$store.dispatch("fetchUsers");
    },
    // Methods
    methods: {
      // Delete a product
      deleteProduct(prodID) {
        if (confirm("Are you sure you want to delete this product?")) { //method of confirm to whether the user wishes to delete the product
          this.$store.dispatch("deleteProduct", prodID);
          // Reload page after deletion
          setTimeout(() => {location.reload();
          }, 500);
        }
      },
      // Refresh products list
      refresh() {
        this.sortBy = "prodID";
      },
      // Toggle sort direction for products
      toggleSortDirection() {
        this.sortBy = 'name' 
        this.sort = this.sort === "asc" ? "desc" : "asc";
      },
      // Delete a user
      deleteUser(userID) {
        if (confirm("Are you sure you want to delete this user?")) { //method of confirming action with user
          this.$store.dispatch("deleteUser", userID);
          // Reload page after deletion
          setTimeout(() => {location.reload();
          }, 500);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styling for product images */
  .image {
    width: 3rem;
  }
  
  /* Styling for sort dropdown */
  .sort-dropdown{
    display: flex;
    justify-content: space-evenly;
  }
  /* General button styling */
  .btn {
    background-color: #7A0000;
    color: white;
    margin-bottom: 1rem;
  }
  .main-container{
    min-height: 100vh;
    margin-top: 60px;
  }
  /* Responsive styling for small screens */
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
  