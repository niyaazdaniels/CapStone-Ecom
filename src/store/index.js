// Importing necessary modules
import { createStore } from "vuex"; // Importing Vuex's createStore function
import router from '../router/index.js'
import axios from "axios"; // Importing Axios for making HTTP requests
axios.defaults.withCredentials = true;
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
    isLoggedIn: false,
    cart: null,
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
    setLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setCart: (state, cart) => {
      if (cart === null) {
        state.cart = null;
      } else {
        state.cart = cart;
      }
    },
  },
  actions: {
    // Action to fetch all users data
    async fetchUsers({ commit }) {
      try {
        const res = await axios.get(`${DB}users`);
        commit("setUsers", res.data);
      } catch (e) {
        alert("Request Failed! Could not retrieve all users!");
      }
    },
    // Action to fetch a single user data
    async fetchUser({ commit }) {
      try {
        const res = await axios.get(`${DB}user`);
        commit("setUser", res.data);
      } catch (e) {
        alert("Request Failed: Could not retrieve user!");
      }
    },
    // Action to fetch all products data
    async fetchProducts({ commit }) {
      try {
        const res = await axios.get(`${DB}products`);
        commit("setProducts", res.data);
      } catch (e) {
        alert("Request Failed: Could not retrieve products from the database.");
      }
    },
    // Action to fetch a single product data
    async fetchProduct({ commit }) {
      try {
        const res = await axios.get(`${DB}product`);
        commit("setProduct", res.data);
      } catch (e) {
        alert("Requested Failed: Could not fetch product.");
      }
    },
    // Action to register a new user
    async registerNewUser({ commit }, payload) {
      try {
        const res = await axios.post(`${DB}users`, payload);
        const { msg } = await res.data;
        if (msg) {
          commit.dispatch("fetchUsers");
          commit("setUser", msg);
        }
      } catch (e) {
        alert("Request Failed: Could not register user.");
      }
    },
    // Action to update an existing user
    async updateUser({ commit }, payload) {
      try {
        const res = await axios.patch(`${DB}users/${payload.userID}`, payload.data);
        if (res.data) {
          commit.dispatch("fetchUsers");
          commit("setUser", res.data);
          alert("Update Successful");
        }
      } catch (e) {
        console.error(e);
        alert("Request Failed: An error occurred while trying to update the user.");
      }
    },
    // Action to delete a user
    async deleteUser({ commit }, id) {
      try {
        await axios.delete(`${DB}users/${id}`);
        commit.dispatch("fetchUsers");
        console.log("User deleted successfully");
      } catch (e) {
        console.error(e);
        alert("Request Failed: An error occurred while deleting user.");
      }
    },
    // Action to add a new product
    async addProduct({ commit }, payload) {
      try {
        const res = await axios.post(`${DB}products`, payload);
        if (res.data) {
          commit.dispatch("fetchProducts");
          commit("setProduct", res.data);
        }
      } catch (e) {
        console.error(e);
        alert("Request Failed: An error occurred while adding a new product.");
      }
    },
    // Action to update an existing product
    async updateProduct({ commit }, payload) {
      try {
        const res = await axios.patch(`${DB}products/${payload.prodID}`, payload);
        if (res.data) {
          commit.dispatch("fetchProducts");
          alert("Successfully updated product!");
        } else {
          throw new Error("Failed to update product: ");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred: " + error);
      }
    },
    // Action to delete a product
    async deleteProduct({ commit }, prodID) {
      try {
        await axios.delete(`${DB}products/${prodID}`);
        commit.dispatch("fetchProducts");
        console.log("Product deleted successfully");
      } catch (e) {
        alert("An error occurred while deleting the product");
      }
    },
    async login({ commit }, loginUser) {
      try {
        const { data } = await axios.post(`${DB}login`, loginUser);
        const token = data.token;
        $cookies.set('jwt', token);
        alert(data.msg);
        // await router.push('/');
        commit('setLoggedIn', true);
        // console.log(await router.push('/'));
      } catch (error) {
        console.error('Error during login:', error);
        console.log('err');
      }
    },
      async getCart({ commit }, userID) {
        try {
          const res = await axios.get(`${DB}users/${userID}/cart`);
          const data = res.data;
          if (data != null) {
            commit("setCart", data);
          } else {
            commit("setCart", null);
          }
        } catch (error) {
          console.error('Error getting cart:', error);
        }
      },
    
      async addToCart({ commit }, { userID, item }) {
        try {
          await axios.post(`${DB}users/${userID}/cart`, item);
          commit("getCart", userID);
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      },
    
      async deleteFromCart({ commit }, { userID, cart }) {
        try {
          await axios.delete(`${DB}users/${userID}/cart/${cart}`);
          commit("getCart", userID);
        } catch (error) {
          console.error('Error deleting from cart:', error);
        }
      },
    
      async deleteCart({ commit }, userID) {
        try {
          await axios.delete(`${DB}users/${userID}/cart`);
          commit("getCart", userID);
        } catch (error) {
          console.error('Error deleting cart:', error);
        }
      },
    
      checkAdmin(context) {
        if (context.state.user != null) {
          if (context.state.user.userRole === "Admin") {
            context.state.admin = true;
          } else {
            context.state.admin = false;
          }
        }
      },
    },
  modules: {
    },
})