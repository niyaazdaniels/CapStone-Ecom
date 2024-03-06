// Importing necessary modules
import { createStore } from "vuex"; // Importing Vuex's createStore function
import axios from "axios"; // Importing Axios for making HTTP requests

// URL for the database API
const DB = "https://capstone-ecom.onrender.com/";

// Creating and exporting the Vuex store
export default createStore({
  state: { // State object to hold the application's data
    users: null, // Placeholder for user data
    user: null, // Placeholder for a single user data
    selectedProduct: null, // Placeholder for selected product data
    products: null, // Placeholder for product data
    product: null, // Placeholder for a single product data
  },
  getters: {}, // Getters for computed properties based on state
  mutations: { // Mutations to directly mutate the state
    // Mutations to set various data in the state
    setUsers(state, users) {
      state.users = users; // Setting users data in the state
    },
    setUser(state, user) {
      state.user = user; // Setting user data in the state
    },
    setProducts(state, products) {
      state.products = products; // Setting products data in the state
    },
    setProduct(state, product) {
      state.product = product; // Setting product data in the state
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product; // Setting selected product data in the state
    },
  },
  actions: { // Actions for asynchronous operations
    // Action to fetch all users data
    async fetchUsers({ commit }) {
      try {
        const res = await axios.get(`${DB}users`); // Making HTTP GET request to fetch users
        commit("setUsers", res.data); // Committing mutation to set users data in the state
      } catch (e) {
        alert("Request Failed! Could not retrieve all users!"); // Alerting user in case of failure
      }
    },
    // Action to fetch a single user data
    async fetchUser({ commit }) {
      try {
        const res = await axios.get(`${DB}user`); // Making HTTP GET request to fetch a user
        commit("setUser", res.data); // Committing mutation to set user data in the state
      } catch (e) {
        alert("Request Failed: Could not retrieve user!"); // Alerting user in case of failure
      }
    },
    // Action to fetch all products data
    async fetchProducts({ commit }) {
      try {
        const res = await axios.get(`${DB}products`); // Making HTTP GET request to fetch products
        commit("setProducts", res.data); // Committing mutation to set products data in the state
      } catch (e) {
        alert("Request Failed: Could not retrieve products from the database."); // Alerting user in case of failure
      }
    },
    // Action to fetch a single product data
    async fetchProduct({ commit }) {
      try {
        const res = await axios.get(`${DB}product`); // Making HTTP GET request to fetch a product
        commit("setProduct", res.data); // Committing mutation to set product data in the state
      } catch (e) {
        alert("Requested Failed: Could not fetch product."); // Alerting user in case of failure
      }
    },
    // Action to register a new user
    async registerNewUser({ commit }, payload) {
      try {
        const res = await axios.post(`${DB}users`, payload); // Making HTTP POST request to register a new user
        const { msg } = await res.data; // Destructuring the response data
        if (msg) {
          commit.dispatch("fetchUsers"); // Dispatching fetchUsers action to update users data
          commit("setUser", msg); // Committing mutation to set user data in the state
        }
      } catch (e) {
        alert("Request Failed: Could not register user."); // Alerting user in case of failure
      }
    },
    // Action to update an existing user
    async updateUser({ commit }, payload) {
      try {
        const res = await axios.patch(`${DB}users/${payload.userID}`, payload.data); // Making HTTP PATCH request to update user
        if (res.data) {
          commit.dispatch("fetchUsers"); // Dispatching fetchUsers action to update users data
          commit("setUser", res.data); // Committing mutation to set updated user data in the state
          alert("Update Successful"); // Notifying user of successful update
        }
      } catch (e) {
        console.error(e); // Logging error to console
        alert("Request Failed: An error occurred while trying to update the user."); // Alerting user in case of failure
      }
    },
    // Action to delete a user
    async deleteUser({ commit }, id) {
      try {
        const res = await axios.delete(`${DB}users/${id}`); // Making HTTP DELETE request to delete a user
        if (res.data) {
          commit("fetchUsers"); // Committing mutation to fetch updated users data
          commit("setUser", res.data); // Committing mutation to set user data in the state
          console.log("User deleted successfully"); // Logging success message
        }
      } catch (e) {
        console.error(e); // Logging error to console
        alert("Request Failed: An error occurred while deleting user."); // Alerting user in case of failure
      }
    },
    // Action to add a new product
    async addProduct({ commit }, payload) {
      try {
        const res = await axios.post(`${DB}products`, payload); // Making HTTP POST request to add a new product
        if (res.data) {
          commit.dispatch("fetchProducts"); // Dispatching fetchProducts action to update products data
          commit("setProduct", res.data); // Committing mutation to set product data in the state
        }
      } catch (e) {
        console.error(e); // Logging error to console
        alert("Request Failed: An error occurred while adding a new product."); // Alerting user in case of failure
      }
    },
    // Action to update an existing product
    async updateProduct({ commit }, payload) {
      try {
        const res = await axios.patch(`${DB}products/${payload.prodID}`, payload); // Making HTTP PATCH request to update a product
        if (res) {
          commit.dispatch("fetchProducts"); // Dispatching fetchProducts action to update products data
          alert("Successfully updated product!"); // Notifying user of successful update
        } else {
          throw new Error("Failed to update product: "); // Throwing error in case of failure
        }
      } catch (error) {
        console.error("An error occurred:", error); // Logging error to console
        alert("An error occurred: " + error); // Alerting user in case of failure
      }
    },
    // Action to delete a product
    async deleteProduct({ commit }, prodID) {
      try {
        const res = await axios.delete(`${DB}products/${prodID}`); // Making HTTP DELETE request to delete a product
        if (res) {
          commit.dispatch("fetchProducts"); // Dispatching fetchProducts action to update products data
          commit("setProduct", res); // Committing mutation to set product data in the state
        }
      } catch (e) {
        alert("An error occurred while deleting the product"); // Alerting user in case of failure
      }
    },
  },
  modules: {}, // Modules for structuring Vuex store into separate modules
});
