// Importing necessary modules
import { createStore } from "vuex"; // Importing Vuex's createStore function
import router from '../router/index.js'
import axios from "axios"; // Importing Axios for making HTTP requests
import sweet from "sweetalert"
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
    LoggedIn: false,
    cart: null,
  },
  getters: {
    getUser: (state) => state.user,
  }, // Getters for computed properties based on state
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
    setLoggedIn(state, LoggedIn) {
      state.LoggedIn = LoggedIn;
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
        const res = await axios.get(`${DB}users`);
        commit("setUser", res.data);
      } catch (e) {
        sweet("Request Failed: Could not retrieve user!");
      }
    },
    // Action to fetch all products data
    async fetchProducts({ commit }) {
      try {
        const res = await axios.get(`${DB}products`);
        commit("setProducts", res.data);
      } catch (e) {
        sweet("Request Failed: Could not retrieve products from the database.");
      }
    },
    // Action to fetch a single product data
    async fetchProduct({ commit }) {
      try {
        const res = await axios.get(`${DB}products`);
        commit("setProduct", res.data);
      } catch (e) {
        sweet("Requested Failed: Could not fetch product.");
      }
    },
    // Action to register a new user
    async registerNewUser({ commit, dispatch }, registerUser) {
      try {
        const res = await axios.post(`${DB}signup`, registerUser);
        const msg = await res.data.msg;
        if (msg) {
          sweet("Successfully registered");

          await router.push('/')
    
          dispatch("fetchUsers");
          commit("setUser", msg);
        }
      } catch (e) {
        sweet("Request Failed: Could not register user.");
      }
    },
    
    // Action to update an existing user
    async updateUser({ commit }, payload) {
      try {
        const res = await axios.patch(`${DB}users/${payload.userID}`, payload.data);
        if (res.data) {
          commit("fetchUsers"); // Assuming fetchUsers is a mutation, otherwise use dispatch if it's an action
          commit("setUser", res.data);
          sweet("Update Successful");
        }
      } catch (e) {
        console.error(e);
        sweet("Request Failed: An error occurred while trying to update the user.");
      }
    },    
    // Action to delete a user
    async deleteUser({ commit }, id) {
      try {
        await axios.delete(`${DB}users/${id}`);
        commit("fetchUsers");
        console.log("User deleted successfully");
      } catch (e) {
        console.error(e);
        sweet("Request Failed: An error occurred while deleting user.");
      }
    },
    // Action to add a new product
    async addProduct({ commit }, payload) {
      try {
        const res = await axios.post(`${DB}products`, payload);
        if (res.data) {
          commit("fetchProducts");
          commit("setProduct", res.data);
        }
      } catch (e) {
        console.error(e);
        sweet("Request Failed: An error occurred while adding a new product.");
      }
    },
    // Action to update an existing product
    async updateProduct({ commit }, payload) {
      try {
        const res  = await axios.patch(`${DB}products/${payload.prodID}`, payload); 
        console.log(res.data);        
        if (res) {
          commit("fetchProducts"); 
          sweet("Successfully updated product!");
        } else {
          throw new Error("Failed to update product");
        }
      } catch (error) {
        sweet("An error occurred:", error);
        console.error("An error occurred: " + error.message);
      }
    },        
   // Action to delete a product
async deleteProduct({ commit }, prodID) {
  try {
    await axios.delete(`${DB}products/${prodID}`);
    commit("fetchProducts");
    console.log("Product deleted successfully");
  } catch (e) {
    sweet("An error occurred while deleting the product");
  }
},
    async login({ commit }, loginUser) {
      try {
        const { data } = await axios.post(`${DB}login`, loginUser);
        const token = data.token;
        $cookies.set('jwt', token);
        sweet(data.msg);
        await router.push('/');
        const res = await axios.get(`${DB}users/${id}}`)
        commit('setUser', res.data );
        commit('setLoggedIn', true);
        window.location.reload()
      } catch (error) {
        sweet('Error during login:', error);
      }
    },
    async logOut (context) {
      let cookies = $cookies.keys()
       $cookies.remove('jwt')
         await router.push('/');
          window.location.reload()  

    },
      async getCart({ commit }, userID) {
        try {
          const res = await axios.get(`${DB}/cart`, userID);
          const data = res.data;
          if (data != null) {
            commit("setCart", data);
          } else {
            commit("setCart", null);
          }
        } catch (error) {
          sweet('Error getting cart:', error);
        }
      },
    
      async addToCart({ commit }, { userID, products }) {
        try {
          await axios.post(`${DB}users/${userID}cart`, products);
          commit("getCart", userID);
        } catch (error) {
          sweet('Error adding to cart:', error);
        }
      },
    
      async deleteFromCart({ commit }, { userID, cart }) {
        try {
          await axios.delete(`${DB}users/${userID}cart/${cart}`);
          commit("getCart", userID);
        } catch (error) {
          sweet('Error deleting from cart:', error);
        }
      },
    
      async deleteCart({ commit }, userID) {
        try {
          await axios.delete(`${DB}cart`);
          commit("getCart", userID);
        } catch (error) {
          sweet('Error deleting cart:', error);
        }
      },
      checkAdmin(context) {
        if (context.state.user != null && context.state.user.userRole === "Admin") {
          return true;
        } else {
          return false;
        }
      },
    },      
  modules: {
    },
})